import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import moment from "moment";
import logo from "../assets/image/logo.png";

// Create styles

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: "20px",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    marginTop: "25px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  content: {
    marginTop: "70px",
    fontSize: "14px",
  },
  image: {
    marginVertical: 15,
    width: "170px",
    textAlign: "left",
  },
  detailsContainer: {
    width: "70%",
  },
  detailsTitle: {
    marginTop: "50px",
    marginBottom: "15px",
  },
  details: {
    marginVertical: "5px",
    fontSize: "13px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

// Create Document Component
export const MyDocument = ({ details }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src={logo} style={styles.image} />
      <View style={styles.title}>
        <Text>Details receipt of order ID: </Text>
        <Text>{details.receiptNumber}</Text>
      </View>
      <View>
        <Text style={styles.detailsTitle}>Package Details:</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.details}>
          <Text>Package creation date:</Text>
          <Text>{moment(details.createdAt).format("LLL")}</Text>
        </View>
        <View style={styles.details}>
          <Text>Package service type:</Text>
          <Text>{details.typeService}</Text>
        </View>
        <View style={styles.details}>
          <Text>Package type:</Text>
          <Text>{details.typeProduct}</Text>
        </View>
        <View style={styles.details}>
          <Text>Package total price:</Text>
          <Text>{details.shipmentPrice}</Text>
        </View>
        <View>
          <Text style={{ marginTop: 20 }}>Sender Data:</Text>
        </View>
        <View style={styles.details}>
          <Text>Sender name:</Text>
          <Text>{details.senderName}</Text>
        </View>
        <View style={styles.details}>
          <Text>Sender phone:</Text>
          <Text>{details.senderPhone}</Text>
        </View>
        <View>
          <Text style={{ marginTop: 20 }}>Recipient Data:</Text>
        </View>
        <View style={styles.details}>
          <Text>Sender name:</Text>
          <Text>{details.recipientName}</Text>
        </View>
        <View style={styles.details}>
          <Text>Sender phone:</Text>
          <Text>{details.recipientPhone}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

// ReactPDF.renderToStream(<MyDocument />);
