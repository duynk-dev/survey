import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingLeft: 10,
    flexGrow: 1,
    fontSize: 10,
    fontWeight: "bold",
  },
  col1: {
    width: "15%",
  },
  col2: {
    width: "25%",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  col3: {
    width: "15%",
    textAlign: "right",
    color: "green",
  },
  col4: {
    width: "15%",
    textAlign: "right",
    color: "blue",
  },
  col5: {
    width: "15%",
    textAlign: "right",
  },
  col6: {
    width: "15%",
    textAlign: "right",
    color: "red",
  },
});

const TableFooter = ({ items }) => {
  const veryGood = items.reduce(
    (accumulator, currentValue) => accumulator + currentValue?.veryGood,
    0
  );
  const good = items.reduce(
    (accumulator, currentValue) => accumulator + currentValue?.good,
    0
  );
  const normal = items.reduce(
    (accumulator, currentValue) => accumulator + currentValue?.normal,
    0
  );
  const bad = items.reduce(
    (accumulator, currentValue) => accumulator + currentValue?.bad,
    0
  );
  let total = veryGood + good + normal + bad;
  if (total == 0) {
    total = 1;
  }
  return (
    <View style={styles.row}>
      <Text style={styles.col1}> </Text>
      <Text style={styles.col2}>Tổng cộng</Text>
      <Text style={styles.col2}></Text>
      <Text style={styles.col3}>{`${veryGood} (${(
        (veryGood / total) *
        100
      ).toFixed(1)})`}</Text>
      <Text style={styles.col4}>{`${good} (${((good / total) * 100).toFixed(
        1
      )})`}</Text>
      <Text style={styles.col5}>{`${normal} (${((normal / total) * 100).toFixed(
        1
      )})`}</Text>
      <Text style={styles.col6}>{`${bad} (${((bad / total) * 100).toFixed(
        1
      )})`}</Text>
    </View>
  );
};

export default TableFooter;
