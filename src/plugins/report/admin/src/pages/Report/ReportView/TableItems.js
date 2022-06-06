import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableBlankSpace from "./TableBlankSpace";
import TableFooter from "./TableFooter";

const tableRowsCount = 11;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
  },
});

const TableItems = ({ items }) => (
  <View style={styles.tableContainer}>
    <TableHeader />
    <TableRow items={[]} />
  </View>
);

export default TableItems;
