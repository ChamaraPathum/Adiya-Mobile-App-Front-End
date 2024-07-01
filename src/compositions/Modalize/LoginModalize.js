import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Modalize } from "react-native-modalize";
import { TextInput, Button } from "react-native-paper";

const LoginModalize = (props, ref) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const modalizeRef = useRef(null);
  function onOpen() {
    modalizeRef.current?.open();
  }

  useImperativeHandle(ref, () => ({ onOpen }));

  return (
    <View>
      <Modalize ref={modalizeRef} snapPoint={10}>
        <View style={{ borderRadius: 10 }}>
          <TextInput
            style={styles.TxtIn1}
            mode="outlined"
            label="Email :"
            value={email}
            onChangeText={(text) => setEmail(text)}
            theme={{
              colors: {
                primary: "#E2E2E2",
                background: "#E2E2E2",
              },
            }}
          />
          <TextInput
            style={styles.TxtIn}
            mode="outlined"
            label="Password :"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
            theme={{
              colors: {
                primary: "#E2E2E2",
                background: "#E2E2E2",
              },
            }}
          />
          <TouchableOpacity style={{ marginTop: "5%", marginLeft: "60%" }}>
            <Text style={{ color: "#f2b305", fontWeight: "bold" }}>
              ForgotPassword?
            </Text>
          </TouchableOpacity>

          <Button
            mode="contained"
            onPress={() => Navigation.navigate("BottomTabNavigator")}
            style={styles.Btn}
            contentStyle={styles.BtnContent}
          >
            Log In
          </Button>
          <View style={{ flexDirection: "row", marginTop: "7%" }}>
            <View
              style={{
                flex: 1,
                width: "25%",
                height: 1,
                backgroundColor: "grey",
              }}
            />
            <Text
              style={{
                flex: 1,
                marginTop: "-2.5%",
                textAlign: "center",
                color: "grey",
              }}
            >
              Or Sign up
            </Text>
            <View
              style={{
                flex: 1,
                width: "30%",
                height: 1,
                backgroundColor: "grey",
              }}
            />
          </View>

          <View style={styles.SignUP}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => Navigation.navigate("SignUp")}>
              <Text style={styles.SignUPTxt}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
    </View>
  );
};

export default forwardRef(LoginModalize);

const styles = StyleSheet.create({
  containor: {
    flex: 1,
    backgroundColor: "red",
    borderRadius: 15,
  },
  TxtIn1: {
    width: "80%",
    marginLeft: "10%",
    marginTop: "12%",
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  TxtIn: {
    width: "80%",
    marginLeft: "10%",
    marginTop: "5%",
    backgroundColor: "#fff",
    borderRadius: 40,
    borderColor: "red",
  },
  Btn: {
    backgroundColor: "#f2b305",
    marginTop: "5%",
    width: "80%",
    marginLeft: "10%",
    height: 50,
    borderRadius: 11,
  },
  BtnContent: {
    fontSize: 16,
    fontWeight: "bold",
  },
  SignUP: {
    flexDirection: "row",
    marginTop: "10%",
    justifyContent: "center",
    alignSelf: "center",
  },
  SignUPTxt: {
    fontWeight: "bold",
    color: "green",
    fontSize: 16,
    marginTop: "-1%",
  },
});
