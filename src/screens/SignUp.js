import {
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import React from "react";
import SignUpBottomSheet from "../compositions/SignUpBottomSheet";
import * as Animatable from "react-native-animatable";

const SignUP = () => {
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
              <Text style={styles.LoginTxt1}>Sign up to Your </Text>
              <Text style={styles.LoginTxt2}>Account </Text>
              <Text style={styles.LoginTxt3}>Sign up to Your Account</Text>
            </View>

            <View style={styles.BottomSheetContainor}>
              <Animatable.View animation="fadeInUpBig">
                <SignUpBottomSheet />
              </Animatable.View>
            </View>
          </ImageBackground>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default SignUP;

const styles = StyleSheet.create({
  MainContainor: {
    flex: 1,
  },

  Containor: {
    flex: 1,
  },

  BottleContainor: {
    flex: 1,
  },

  backgroundImg: {
    flex: 1,
  },

  bottleImg: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  TxtContainor: {
    flex: 1,
    justifyContent: "center",
  },

  BottomSheetContainor: {
    flex: 3,
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
});
