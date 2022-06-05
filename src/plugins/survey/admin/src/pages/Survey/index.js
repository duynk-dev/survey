/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect, useCallback } from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { Checkbox } from "@strapi/design-system/Checkbox";
import { TextInput } from "@strapi/design-system/TextInput";
import axiosInstance from "../../utils/axiosInstance.js";
import { LoadingIndicatorPage, useNotification } from "@strapi/helper-plugin";
import { useHistory } from "react-router-dom";
import { Button } from "@strapi/design-system/Button";
import { Box } from "@strapi/design-system/Box";
import { Flex } from "@strapi/design-system/Flex";
import { searchFields } from "./Filters/config";
import SelectWrapper from "../../components/SelectWrapper";
import { clone, set } from "lodash";

const Survey = (props) => {
  const [data, setData] = useState();
  const { formatMessage } = useIntl();
  const { push } = useHistory();
  const id = props.match.params.id ?? 1;
  const [donViHanhChinh, setDonViHanhChinh] = useState({});
  const [result, setResult] = useState({});
  const toggleNotification = useNotification();

  useEffect(() => {
    getSurveyById();
  }, [id]);

  const handleChange = (e, item) => {
    const tmp = clone(donViHanhChinh);
    set(tmp, [item.name], e.target.value);
    setDonViHanhChinh(tmp);
  };

  const handleChangeResult = (e, item, parent) => {
    const tmp = clone(result);
    let choice;
    if (item.isCheckBox) {
      if (!parent?.isMultiChoice) {
        if (e.target.checked) {
          choice = item;
        } else {
          choice = null;
        }
      } else {
        choice = tmp[parent.id]?.choice || [];
        const obj = choice.find((el) => el.id == item?.id);
        if (!obj && e.target.checked) {
          choice.push(item);
        } else {
          choice = choice.filter((el) => el.id != item?.id);
        }
      }

      set(tmp, [parent.id], {
        id: parent.id,
        name: parent.name,
        choice,
      });
    } else {
      set(tmp, [parent.id], {
        id: parent.id,
        name: parent.name,
        choice: { ...item, value: e.target.value },
      });
    }
    setResult(tmp);
  };

  const getSurveyById = async () => {
    const result = await axiosInstance.get(
      `/${pluginId}/get-survey-by-id/${id}`
    );
    setData(result?.data);
    setResult(renderRecursiveInitData(result?.data));
  };
  const renderRecursiveInitData = (data, tmp = {}) => {
    (data || []).map((item) => {
      const question = item?.question || [];
      const SurveyQ = item?.SurveyQ || [];
      if (SurveyQ.length > 0) {
        set(tmp, [item.id], {
          id: item.id,
          name: item.name,
          choice: null,
        });
      }
      renderRecursiveInitData(question, tmp);
    });
    return tmp;
  };

  const renderRecursive = (data) => {
    return (data || []).map((item) => {
      const question = item?.question || [];
      const SurveyQ = item?.SurveyQ || [];
      return (
        <div
          style={{
            marginLeft: "1rem",
            display: SurveyQ?.length == 1 ? "flex" : "",
          }}
        >
          <div
            style={{
              fontWeight: question.length > 0 ? "bold" : "500",
              margin: "0.5rem 0",
            }}
          >
            {item?.name}
          </div>
          <div
            style={{
              marginLeft: "0.5rem",
              display: item?.inline ? "flex" : "",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {renderRecursive(question)}
            {SurveyQ.map((el) => {
              if (el.isCheckBox)
                return (
                  <div style={{ marginRight: "0.5rem", minWidth: "7rem" }}>
                    <Checkbox
                      value={
                        result?.[item.id]?.choice?.id
                          ? result?.[item.id]?.choice?.id == el?.id
                          : result?.[item.id]?.choice?.find(
                              (v) => v?.id == el?.id
                            )
                      }
                      onChange={(e) => handleChangeResult(e, el, item)}
                    >
                      {el.name}
                    </Checkbox>
                  </div>
                );
              else
                return (
                  <span style={{ marginRight: "1rem", fontSize: "0.875rem" }}>
                    {el.name}{" "}
                    <input
                      aria-label={el.name}
                      style={{
                        border: "none",
                        borderBottom: " 1px dashed",
                      }}
                      onChange={(e) => handleChangeResult(e, el, item)}
                    />
                  </span>
                );
            })}
          </div>
        </div>
      );
    });
  };

  const invalidateResult = () => {
    return Object.values(result).some(
      (item) => item?.choice == null || item?.choice?.length == 0
    );
  };

  return (
    <div
      style={{
        lineHeight: "1.5",
      }}
    >
      <Box
        background="neutral0"
        hasRadius
        shadow="filterShadow"
        paddingTop={2}
        paddingBottom={2}
        position="sticky"
        top={0}
      >
        <Flex>
          {searchFields.map((item) => {
            const { name, fieldSchema, labelAction, metadatas, queryInfos } =
              item;
            console.log({
              ...queryInfos,
              defaultParams: {
                "filters[administrative][id][$eq]":
                  donViHanhChinh[queryInfos.filter],
              },
            });
            return (
              <Box style={{ minWidth: 200, marginLeft: "1rem" }}>
                <SelectWrapper
                  {...fieldSchema}
                  {...metadatas}
                  isCreatingEntry={false}
                  key={name}
                  description={metadatas.description}
                  intlLabel={{
                    id: metadatas.label,
                    defaultMessage: metadatas.label,
                  }}
                  labelAction={labelAction}
                  name={name}
                  relationsType={fieldSchema.relationType}
                  queryInfos={{
                    ...queryInfos,
                    defaultParams: {
                      ...queryInfos.defaultParams,
                      ...(queryInfos.filter
                        ? {
                            "filters[administrative][id][$eq]":
                              donViHanhChinh[queryInfos.filter]?.id || -1,
                          }
                        : null),
                    },
                  }}
                  placeholder={metadatas.label}
                  onChange={(e) => handleChange(e, item)}
                  defaultValue={donViHanhChinh[name]}
                />
              </Box>
            );
          })}
          <Box style={{ minWidth: 200, marginLeft: "1rem" }}>
            <Button
              data-testid="create-button"
              onClick={() => {
                console.log(result);
                toggleNotification({
                  type: "success",
                  message: "Lưu thành công",
                });
                window.scrollTo(0, 0);
              }}
              //disabled={invalidateResult()}
            >
              {formatMessage({
                id: "create",
                defaultMessage: "Lưu",
              })}
            </Button>
          </Box>
        </Flex>
      </Box>
      <Box
        background="neutral0"
        hasRadius
        shadow="filterShadow"
        marginTop={1}
        paddingTop={2}
        paddingBottom={2}
      >
        {renderRecursive(data)}
      </Box>
    </div>
  );
};

export default memo(Survey);
