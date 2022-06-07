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
import { PDFViewer } from "@react-pdf/renderer";
import ReportView from "./ReportView";
import { Helmet } from "react-helmet";

const Survey = (props) => {
  const [data, setData] = useState();
  const { formatMessage } = useIntl();
  const { push } = useHistory();
  //const id = props.match.params.id ?? 1;
  const [general, setGeneral] = useState({});
  const [unlockApp, setUnLockApp] = useState(true);

  const handleChange = (e, item) => {
    const tmp = clone(general);
    set(tmp, [item.name], e.target.value);
    setGeneral(tmp);
    setData();
  };

  const getReport = async () => {
    const result = await axiosInstance.post(`/${pluginId}/get-report`, {
      khao_sat: general?.khao_sat,
      phu_luc: general?.phu_luc,
    });
    setData(result?.data);
  };
  const invalidateResult = () => {
    return false;
    // return (
    //   result &&
    //   Object.values(result).some(
    //     (item) => item?.choice == null || item?.choice?.length == 0
    //   )
    // );
  };

  const handleSubmit = async () => {
    setUnLockApp(true);
    await getReport();
    setUnLockApp(false);
  };

  return (
    <div
      style={{
        lineHeight: "1.5",
      }}
    >
      <Helmet title={general?.khao_sat?.name || ""} />
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
            return (
              <Box style={{ minWidth: 300, marginLeft: "1rem" }}>
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
                              general[queryInfos.filter]?.id || -1,
                          }
                        : null),
                    },
                  }}
                  placeholder={metadatas.label}
                  onChange={(e) => handleChange(e, item)}
                  defaultValue={general[name]}
                />
              </Box>
            );
          })}
          <Box style={{ minWidth: 200, marginLeft: "1rem" }}>
            <Button
              data-testid="create-button"
              onClick={handleSubmit}
              disabled={!unlockApp && invalidateResult()}
            >
              {formatMessage({
                id: "create",
                defaultMessage: "Xem báo cáo",
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
        {data && (
          <PDFViewer
            fileName={"Báo Cáo"}
            width={"100%"}
            height={"100%"}
            style={{
              height: "90vh",
            }}
          >
            <ReportView reportData={data} />
          </PDFViewer>
        )}
      </Box>
    </div>
  );
};

export default memo(Survey);
