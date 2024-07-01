import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CustomTabLine = ({ text }) => {
  return (
    <View style={styles.customTabTextContainer}>
      <Text style={styles.customTabText}>{text}</Text>
    </View>
  );
};

export default CustomTabLine;

const styles = StyleSheet.create({
  customTabTextContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  customTabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
