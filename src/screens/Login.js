import {
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  View,
} from "react-native";
import React, { useRef } from "react";
import BottomSheet from "../compositions/BottomSheet";
import * as Animatable from "react-native-animatable";

const Login = () => {
  const modalizeRef = useRef(null);

  function onOpen() {
    modalizeRef.current?.onOpen();
  }

  return (
    <KeyboardAvoidingView style={styles.MainContainor}>
      <ImageBackground
        source={require("../assets/background.png")}
        style={styles.backgroundImg}
      >
        <View style={styles.BottleContainor}>
          <ImageBackground
            source={require("../assets/bottle.png")}
            style={styles.bottleImg}
          >
            <View style={styles.TxtContainor}>
              <Text style={styles.LoginTxt1}>Log In to Your </Text>
              <Text style={styles.LoginTxt2}>Account </Text>
              <Text style={styles.LoginTxt3}>Log In to Your Account</Text>
            </View>

            <View style={styles.BottomSheetContainor}>
              <Animatable.View animation="fadeInUpBig">
                <BottomSheet />
              </Animatable.View>
            </View>
          </ImageBackground>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  MainContainor: {
    flex: 1,
  },

  backgroundImg: {
    flex: 1,
  },

  BottleContainor: {
    flex: 1,
  },

  bottleImg: {
    flex: 1,
    height: "100%",
    width: "100%",
  },

  TxtContainor: {
    flex: 1,
    justifyContent: "center",
  },

  BottomSheetContainor: {
    flex: 1.5,
  },

  container: {
    backgroundColor: "#fff",
    height: "80%",
    borderRadius: 40,
    marginTop: "70%",
  },

  txtInput1: {
    backgroundColor: null,
    width: "70%",
    marginLeft: "15%",
    marginTop: "8%",
  },

  LoginTxt1: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: "5%",
  },
  LoginTxt2: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: "5%",
    marginTop: "-2%",
  },
  LoginTxt3: {
    color: "#f6fae8",
    fontSize: 15,
    marginLeft: "5%",
    marginTop: "0%",
    fontWeight: "600",
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
});
