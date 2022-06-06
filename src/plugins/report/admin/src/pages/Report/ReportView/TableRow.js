import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    //borderBottomWidth: 1,
    alignItems: "center",
    //textAlign: 'center',

    fontSize: 13,
    fontWeight: "bold",
    borderBottom: 1,
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
    return (
      <Fragment>
        <View style={styles.row}>
          <View style={[styles.flexCenter, styles.col1]}>
            <Text>{item.name.split(".")[0]}.</Text>
          </View>
          <View style={[styles.flexCenter, styles.col2]}>
            <Text>{item.name.split(".")[1].trim()}</Text>
          </View>
          <View style={[styles.flexCenter, styles.col3]}>
            <Text>0</Text>
          </View>
          <View style={[styles.flexCenter, styles.col4, { borderRight: 0 }]}>
            <Text>0</Text>
          </View>
        </View>
        {surveyQ.map((el, index) => {
          return (
            el.name && (
              <View style={[styles.row, { fontWeight: "normal" }]}>
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
                  <Text>0</Text>
                </View>
                <View
                  style={[styles.flexCenter, styles.col4, { borderRight: 0 }]}
                >
                  <Text>0</Text>
                </View>
              </View>
            )
          );
        })}
      </Fragment>
    );
  });
  return <Fragment>{rows}</Fragment>;
};

export default TableRow;
