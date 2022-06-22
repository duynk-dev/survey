import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    //borderBottomWidth: 1,
    alignItems: "center",
    //textAlign: 'center',
    flexGrow: 1,
    fontSize: 13,
    fontWeight: "bold",
    border: 1,
    height: 50,
    marginBottom: -1,
  },
  flexCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    borderRight: 1,
  },
  col1: {
    width: "10%",
  },
  col2: {
    width: "60%",
    height: "100%",
  },
  col3: {
    width: "15%",
    height: "100%",
    textAlign: "center",
  },
  col4: {
    width: "15%",
    height: "100%",
    textAlign: "center",
  },
});

const TableHeader = () => (
  <View style={styles.container}>
    <View style={[styles.flexCenter, styles.col1]}>
      <Text>STT</Text>
    </View>
    <View style={[styles.flexCenter, styles.col2]}>
      <Text>Nội dung/tiêu chí</Text>
    </View>
    <View style={[styles.flexCenter, styles.col3]}>
      <Text>Số phiếu</Text>
    </View>
    <View style={[styles.flexCenter, styles.col4, { borderRight: 0 }]}>
      <Text>Tỷ lệ (%)</Text>
    </View>
  </View>
);

export default TableHeader;
