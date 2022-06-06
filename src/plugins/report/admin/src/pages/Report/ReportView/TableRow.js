import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingLeft: 10,
    //borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    //textAlign: 'center',
    flexGrow: 1,
    fontSize: 10,
  },
  rowGrey: {
    backgroundColor: "#ccc",
    flexDirection: "row",
    paddingLeft: 10,
    //borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    //textAlign: 'center',
    flexGrow: 1,
    fontSize: 10,
  },
  col1: {
    width: "15%",
    textAlign: "center",
  },
  col2: {
    width: "25%",
  },
  col3: {
    width: "15%",
    textAlign: "right",
  },
  col4: {
    width: "15%",
    textAlign: "right",
  },
  col5: {
    width: "15%",
    textAlign: "right",
  },
  col6: {
    width: "15%",
    textAlign: "right",
  },
});

const TableRow = ({ items }) => {
  const rows = <Text>abc</Text>;
  return <Fragment>{rows}</Fragment>;
};

export default TableRow;
