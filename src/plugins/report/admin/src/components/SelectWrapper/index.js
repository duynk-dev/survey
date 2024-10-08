import React, { useCallback, useState, useEffect, useMemo, memo } from "react";
import PropTypes from "prop-types";
import {
  // FormattedMessage,
  useIntl,
} from "react-intl";
import { useLocation } from "react-router-dom";
import { Link } from "@strapi/design-system/Link";
import { Stack } from "@strapi/design-system/Stack";
import { useTheme } from "styled-components";
import findIndex from "lodash/findIndex";
import get from "lodash/get";
import isArray from "lodash/isArray";
import isEmpty from "lodash/isEmpty";
import set from "lodash/set";
import {
  NotAllowedInput,
  useCMEditViewDataManager,
  useQueryParams,
} from "@strapi/helper-plugin";
import { stringify } from "qs";
import axios from "axios";
import { axiosInstance } from "../../utils";
import { getTrad } from "../../utils";
import Label from "./Label";
import SelectOne from "../SelectOne";
import SelectMany from "../SelectMany";
import ClearIndicator from "./ClearIndicator";
import DropdownIndicator from "./DropdownIndicator";
import IndicatorSeparator from "./IndicatorSeparator";
import Option from "./Option";
import { connect, select } from "./utils";
import getSelectStyles from "./utils/getSelectStyles";

const initialPaginationState = {
  contains: "",
  limit: 20,
  start: 0,
};

const buildParams = (query, paramsToKeep) => {
  if (!paramsToKeep) {
    return {};
  }

  return paramsToKeep.reduce((acc, current) => {
    const value = get(query, current, null);

    if (value) {
      set(acc, current, value);
    }
    return acc;
  }, {});
};
function SelectWrapper({
  description,
  editable,
  labelAction,
  intlLabel,
  isCreatingEntry,
  isFieldAllowed,
  isFieldReadable,
  mainField,
  name,
  relationType,
  targetModel,
  placeholder,
  queryInfos,
  onChange,
  defaultValue,
}) {
  const { formatMessage } = useIntl();
  const [{ query }] = useQueryParams();

  const { pathname } = useLocation();
  const theme = useTheme();

  const value = defaultValue ?? null;
  const [state, setState] = useState(initialPaginationState);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = useMemo(() => {
    return options.filter((option) => {
      if (!isEmpty(value)) {
        // SelectMany
        if (Array.isArray(value)) {
          return findIndex(value, (o) => o.id === option.value.id) === -1;
        }

        // SelectOne
        return get(value, "id", "") !== option.value.id;
      }

      return true;
    });
  }, [options, value]);

  const {
    endPoint,
    containsKey,
    defaultParams,
    shouldDisplayRelationLink,
    paramsToKeep,
  } = queryInfos;

  const isSingle = [
    "oneWay",
    "oneToOne",
    "manyToOne",
    "oneToManyMorph",
    "oneToOneMorph",
  ].includes(relationType);

  const idsToOmit = useMemo(() => {
    if (!value || !value?.id) {
      return [];
    }

    if (isSingle) {
      return [value.id];
    }

    return value.map((val) => val.id);
  }, [isSingle, value]);

  const getData = useCallback(
    async (source) => {
      setIsLoading(true);
      const params = {
        limit: state.limit,
        ...defaultParams,
        start: state.start,
      };
      if (state.contains) {
        params[`filters[${containsKey}][$contains]`] = state.contains;
      }
      try {
        const { data } = await axiosInstance.post(
          endPoint,
          { idsToOmit },
          { params, cancelToken: source.token }
        );

        const formattedData = data.map((obj) => {
          return { value: obj, label: obj[mainField.name] };
        });

        setOptions((prevState) =>
          prevState.concat(formattedData).filter((obj, index) => {
            const objIndex = prevState.findIndex(
              (el) => el.value.id === obj.value.id
            );

            if (objIndex === -1) {
              return true;
            }

            return (
              prevState.findIndex((el) => el.value.id === obj.value.id) ===
              index
            );
          })
        );
        setIsLoading(false);
      } catch (err) {
        // Silent
        setIsLoading(false);
      }
    },
    [
      containsKey,
      defaultParams,
      endPoint,
      mainField.name,
      state.contains,
      state.limit,
      state.start,
    ]
  );

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    if (isOpen) {
      getData(source);
    }

    return () => source.cancel("Operation canceled by the user.");
  }, [getData, isOpen]);

  const handleInputChange = (inputValue, { action }) => {
    if (action === "input-change") {
      setState((prevState) => {
        if (prevState.contains === inputValue) {
          return prevState;
        }

        return { ...prevState, contains: inputValue, start: 0 };
      });
    }

    return inputValue;
  };

  const handleMenuScrollToBottom = () => {
    setState((prevState) => ({
      ...prevState,
      start: prevState.start + 20,
    }));
  };

  const handleMenuClose = () => {
    setState(initialPaginationState);
    setIsOpen(false);
  };

  const handleChange = (value) => {
    onChange({ target: { name, value: value ? value.value : value } });
  };

  const handleMenuOpen = () => {
    setIsOpen(true);
  };
  const searchToPersist = stringify(buildParams(query, paramsToKeep), {
    encode: false,
  });

  const styles = getSelectStyles(theme);
  const Component = SelectOne;

  return (
    <Stack spacing={1}>
      <Component
        components={{
          ClearIndicator,
          DropdownIndicator,
          IndicatorSeparator,
          Option,
        }}
        displayNavigationLink={shouldDisplayRelationLink}
        id={name}
        isLoading={isLoading}
        isClearable
        mainField={mainField}
        name={name}
        options={filteredOptions}
        placeholder={placeholder}
        searchToPersist={searchToPersist}
        styles={styles}
        targetModel={targetModel}
        value={value}
        description={description}
        onChange={handleChange}
        onInputChange={handleInputChange}
        onMenuClose={handleMenuClose}
        onMenuOpen={handleMenuOpen}
        onMenuScrollToBottom={handleMenuScrollToBottom}
      />
    </Stack>
  );
}

SelectWrapper.defaultProps = {
  editable: true,
  description: "",
  labelAction: null,
  isFieldAllowed: true,
  placeholder: null,
};

SelectWrapper.propTypes = {
  editable: PropTypes.bool,
  description: PropTypes.string,
  intlLabel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
    values: PropTypes.object,
  }).isRequired,
  labelAction: PropTypes.element,
  isCreatingEntry: PropTypes.bool.isRequired,
  isFieldAllowed: PropTypes.bool,
  isFieldReadable: PropTypes.bool.isRequired,
  mainField: PropTypes.shape({
    name: PropTypes.string.isRequired,
    schema: PropTypes.shape({
      type: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
    values: PropTypes.object,
  }),
  relationType: PropTypes.string.isRequired,
  targetModel: PropTypes.string.isRequired,
  queryInfos: PropTypes.shape({
    containsKey: PropTypes.string.isRequired,
    defaultParams: PropTypes.object,
    endPoint: PropTypes.string.isRequired,
    shouldDisplayRelationLink: PropTypes.bool.isRequired,
    paramsToKeep: PropTypes.array,
  }).isRequired,
};

const Memoized = memo(SelectWrapper);

export default connect(Memoized, select);
