import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { isEmpty } from "lodash";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 10,
  },
  reportTitle: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    flexDirection: "row",
  },
  reportBranch: {
    textAlign: "left",
    fontSize: 9,
    textTransform: "uppercase",
    flexDirection: "row",
    lineHeight: 1.5,
  },
  reportSubTitle: {
    marginTop: 5,
    fontSize: 13,
    textAlign: "center",
    flexDirection: "row",
    fontStyle: "italic",
  },
  center: {
    width: "50%",
  },
});

const Header = ({ data: { header, description, columns } }) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>{header}</Text>
        <Text style={styles.reportSubTitle}>{description}</Text>
      </View>
    </View>
  );
};

export default Header;
