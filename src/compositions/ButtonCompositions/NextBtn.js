import * as React from "react";
import { Button } from "react-native-paper";
import { StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NextBtn = () => {
  const Navigation = useNavigation();
  return (
    <Button
      mode="outlined"
      onPress={() => Navigation.navigate("Screen1")}
      style={styles.btn}
    >
      <Text style={styles.txt}>Next</Text>
    </Button>
  );
};

export default NextBtn;

const styles = StyleSheet.create({
  btn: {
    borderColor: "#fff",
    borderWidth: 1.7,
    marginBottom: "20%",
    width: "30%",
    color: "#fff",
  },
  txt: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
