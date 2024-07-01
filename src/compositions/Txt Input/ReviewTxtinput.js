import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

const ReviewTxtinput = () => {
  const [text, setText] = React.useState("");
  return (
    <View style={{ marginTop: "40%" }}>
      <TextInput
        label="Reviews"
        value={text}
        mode="outlined"
        onChangeText={(text) => setText(text)}
        style={styles.TxtInput}
      />
    </View>
  );
};

export default ReviewTxtinput;

const styles = StyleSheet.create({
  TxtInput: {
    width: "80%",
    backgroundColor: null,
    borderRadius: 50,
  },
});
