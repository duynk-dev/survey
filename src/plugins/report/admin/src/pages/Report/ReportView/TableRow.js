import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    //borderBottomWidth: 1,
    alignItems: "center",
    //textAlign: 'center',
    flexWrap: "wrap",
    fontSize: 13,
    fontWeight: "bold",
    border: 1,
    marginBottom: -1,
    borderLeft: 1,
    borderRight: 1,
  },
  flexCenter: {
    flexDirection: "row",
    height: "100%",
    borderRight: 1,
    padding: 2,
  },
  col1: {
    width: "10%",
    textAlign: "center",
  },
  col2: {
    width: "60%",
    height: "100%",
  },
  col3: {
    width: "15%",
    height: "100%",
    textAlign: "right",
    justifyContent: "flex-end",
  },
  col4: {
    width: "15%",
    height: "100%",
    justifyContent: "flex-end",
  },
});

const TableRow = ({ items }) => {
  const rows = items.map((item, index) => {
    const surveyQ = item.SurveyQ || [];
    const name = item.name.split(".");
    let stt = "";
    let content = "";
    if (name.length == 1) {
      content = name[0];
    } else if (name.length >= 2) {
      stt = `${name[0]}.`;
      content = item.name.replace(stt, "").trim();
    }
    return (
      <View>
        <View style={styles.row} break={true}>
          <View style={[styles.flexCenter, styles.col1]}>
            <Text>{stt || " "}</Text>
          </View>
          <View style={[styles.flexCenter, styles.col2]}>
            <Text>{content}</Text>
          </View>
          <View style={[styles.flexCenter, styles.col3]}>
            <Text>{item?.total}</Text>
          </View>
          <View style={[styles.flexCenter, styles.col4, { borderRight: 0 }]}>
            <Text>{item?.percent}</Text>
          </View>
        </View>
        {surveyQ.map((el, index) => {
          return (
            el.name && (
              <>
                <View
                  style={[styles.row, { fontWeight: "normal" }]}
                  break={true}
                >
                  <View
                    style={[
                      styles.flexCenter,
                      styles.col1,
                      { justifyContent: "center" },
                    ]}
                  >
                    <Text>{index + 1}</Text>
                  </View>
                  <View style={[styles.flexCenter, styles.col2]}>
                    <Text>{el.name}</Text>
                  </View>
                  <View style={[styles.flexCenter, styles.col3]}>
                    <Text>{el?.count}</Text>
                  </View>
                  <View
                    style={[styles.flexCenter, styles.col4, { borderRight: 0 }]}
                  >
                    <Text>
                      {item?.totalByRow == 0
                        ? 0
                        : ((el?.count / item?.totalByRow) * 100).toFixed(1)}
                    </Text>
                  </View>
                </View>
                {el.children.map((c) => {
                  return (
                    <View
                      style={[
                        styles.row,
                        { fontWeight: "normal", fontStyle: "italic" },
                      ]}
                      break={true}
                    >
                      <View
                        style={[
                          styles.flexCenter,
                          styles.col1,
                          { justifyContent: "center" },
                        ]}
                      ></View>
                      <View style={[styles.flexCenter, styles.col2]}>
                        <Text>- {c.name}</Text>
                      </View>
                      <View style={[styles.flexCenter, styles.col3]}>
                        <Text>{c?.count}</Text>
                      </View>
                      <View
                        style={[
                          styles.flexCenter,
                          styles.col4,
                          { borderRight: 0 },
                        ]}
                      >
                        {/* <Text>
                          {item?.totalByRow == 0
                            ? 0
                            : ((c?.count / item?.totalByRow) * 100).toFixed(1)}
                        </Text> */}
                      </View>
                    </View>
                  );
                })}
              </>
            )
          );
        })}
      </View>
    );
  });
  return <Fragment>{rows}</Fragment>;
};

export default TableRow;
