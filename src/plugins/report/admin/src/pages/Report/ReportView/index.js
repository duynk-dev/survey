import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import TableItems from "./TableItems";
import Header from "./Header";
import TableFooter from "./TableFooter";

// Register Font
Font.register({
  family: "TimesNewRoman",
  fonts: [
    {
      src: require(`../TimesNewRoman/SVN-Times New Roman 2.ttf`),
    },
    {
      src: require(`../TimesNewRoman/SVN-Times New Roman 2 bold.ttf`),
      fontWeight: "bold",
    },
    {
      src: require(`../TimesNewRoman/SVN-Times New Roman 2 italic.ttf`),
      fontWeight: "normal",
      fontStyle: "italic",
    },
    {
      src: require(`../TimesNewRoman/SVN-Times New Roman 2 bold italic.ttf`),
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "TimesNewRoman",
    padding: 60,
  },
  pageIndex: {
    fontFamily: "TimesNewRoman",
    fontSize: 13,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

// Create Document Component
const ReportView = ({ reportData: { header, description, columns, data } }) => {
  return (
    <Document title={header}>
      <Page orientation="portrait" size="A4" style={styles.page} break={true}>
        <Header
          data={{
            header,
            description,
            columns,
          }}
        />
        <TableItems items={data} />
        {/* <TableFooter items={data} /> */}
        <Text
          style={styles.pageIndex}
          render={({ pageNumber, totalPages }) => `${pageNumber}`}
          fixed
        />
      </Page>
    </Document>
  );
};

export default ReportView;
