import React, { useRef, useEffect } from "react";
import { TextInput } from "react-native-paper";
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../services/signUp/signUp";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter your full name."),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email address."),
  password: Yup.string()
    .min(8)
    .required("Please enter your password.")
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "Must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character "
    ),
  mobileNumber: Yup.string()
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits")
    .matches("^[0-9]+$", "Must be only digits")
    .required("Please enter your mobile number."),
});

const SignUpBottomSheet = () => {
  const Navigation = useNavigation();

  const bottomSheetY = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        bottomSheetY.setValue(gestureState.dy);
      },

      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          Animated.timing(bottomSheetY, {
            toValue: 500,
            duration: 300,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(bottomSheetY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const dispatch = useDispatch();
  const signUpState = useSelector((state) => state.signUpSlice.signUp);

  const SignUpAction = (values) => {
    const signUpData = {
      name: values.name,
      email: values.email,
      mobileNumber: values.mobileNumber,
      password: values.password,
      image: values.image,
    };
    dispatch(signUp(signUpData));
  };

  useEffect(() => {
    if (signUpState.isSuccess) {
      Navigation.navigate("Login");
    }
  }, [signUpState.isSuccess, Navigation]);

  return (
    <View style={styles.Maincontainor}>
      <View style={styles.Containor}>
        <View style={styles.LineContainor}>
          <View style={styles.Line} />
        </View>

        <View style={styles.DetailsContainor}>
          <View style={styles.MiddleContainor}>
            <Formik
              initialValues={{
                name: "",
                email: "",
                mobileNumber: "",
                password: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => SignUpAction(values)}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                setFieldTouched,
                isValid,
                handleSubmit,
              }) => (
                <View style={{ flex: 1 }}>
                  <View style={styles.TxtInputContainor}>
                    <Animatable.View animation="slideInRight">
                      <TextInput
                        style={styles.TxtIn}
                        mode="outlined"
                        label="Name :"
                        value={values.name}
                        onChangeText={handleChange("name")}
                        onBlur={() => setFieldTouched("name")}
                        theme={{
                          colors: {
                            primary: "#E2E2E2",
                            background: "#E2E2E2",
                          },
                        }}
                      />
                      {touched.name && errors.name && (
                        <Text style={styles.errorTxt}>{errors.name}</Text>
                      )}
                    </Animatable.View>
                  </View>

                  <View style={styles.TxtInputContainor}>
                    <Animatable.View animation="slideInLeft">
                      <TextInput
                        style={styles.TxtIn}
                        mode="outlined"
                        label="Email :"
                        value={values.email}
                        onChangeText={handleChange("email")}
                        onBlur={() => setFieldTouched("email")}
                        theme={{
                          colors: {
                            primary: "#E2E2E2",
                            background: "#E2E2E2",
                          },
                        }}
                      />
                      {touched.email && errors.email && (
                        <Text style={styles.errorTxt}>{errors.email}</Text>
                      )}
                    </Animatable.View>
                  </View>

                  <View style={styles.TxtInputContainor}>
                    <Animatable.View animation="slideInRight">
                      <TextInput
                        style={styles.TxtIn}
                        mode="outlined"
                        label="Mobile number :"
                        keyboardType="number-pad"
                        value={values.mobileNumber}
                        onChangeText={handleChange("mobileNumber")}
                        onBlur={() => setFieldTouched("mobileNumber")}
                        theme={{
                          colors: {
                            primary: "#E2E2E2",
                            background: "#E2E2E2",
                          },
                        }}
                      />
                      {touched.mobileNumber && errors.mobileNumber && (
                        <Text style={styles.errorTxt}>{errors.mobile}</Text>
                      )}
                    </Animatable.View>
                  </View>

                  <View style={styles.TxtInputContainor}>
                    <Animatable.View animation="slideInLeft">
                      <TextInput
                        style={styles.TxtIn}
                        mode="outlined"
                        label="Password :"
                        secureTextEntry={true}
                        value={values.password}
                        onChangeText={handleChange("password")}
                        onBlur={() => setFieldTouched("password")}
                        theme={{
                          colors: {
                            primary: "#E2E2E2",
                            background: "#E2E2E2",
                          },
                        }}
                      />
                      {touched.password && errors.password && (
                        <Text style={styles.errorTxt}>{errors.password}</Text>
                      )}
                    </Animatable.View>
                  </View>
                  <View style={styles.TxtInputContainor}>
                    <Animatable.View animation="slideInRight">
                      <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={!isValid}
                        style={[
                          styles.Btn,
                          { backgroundColor: isValid ? "#DD8A00" : "#fccb79" },
                        ]}
                      >
                        <Text style={styles.Btntxt}>Sign Up</Text>
                      </TouchableOpacity>
                    </Animatable.View>
                  </View>
                </View>
              )}
            </Formik>
          </View>

          <View style={styles.bottomContainor}>
            <View style={styles.DevideLineContainor}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.DevideLine1} />
                <Text style={styles.DevideLineTxt}>Or Log In</Text>
                <View style={styles.DevideLine2} />
              </View>
            </View>
            <View style={styles.BottomContainor}>
              <View style={styles.SignUP}>
                <Text style={{ color: "#8A8A8A" }}>I have an account? </Text>
                <TouchableOpacity onPress={() => Navigation.navigate("Login")}>
                  <Text style={styles.SignUPTxt}> Log In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Maincontainor: {
    height: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },

  Containor: {
    flex: 1,
  },

  LineContainor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  Line: {
    width: "30%",
    height: 4,
    backgroundColor: "#BCBCBC",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  DetailsContainor: {
    flex: 20,
  },

  MiddleContainor: {
    flex: 10,
  },
  bottomContainor: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  DevideLineContainor: {
    flex: 0.5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  DevideLine1: {
    flex: 1,
    marginLeft: "5%",
    height: 1,
    backgroundColor: "#CFCECE",
  },

  DevideLineTxt: {
    flex: 1,
    textAlign: "center",
    color: "#5E5E5E",
  },

  DevideLine2: {
    flex: 1,
    marginRight: "5%",
    height: 1,
    backgroundColor: "#CFCECE",
  },

  BottomContainor: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  SignUP: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  SignUPTxt: {
    fontWeight: "bold",
    color: "#68B55C",
    fontSize: 16,
  },

  TxtIn: {
    width: "80%",
    marginLeft: "10%",
    backgroundColor: "#fff",
  },

  errorTxt: {
    marginLeft: "10%",
    color: "red",
  },

  Btn: {
    backgroundColor: "#DD8A00",
    width: "80%",
    height: "90%",
    marginLeft: "10%",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  Btntxt: {
    textAlign: "center",
    fontSize: 22,
    color: "#fff",
  },

  TxtInputContainor: {
    flex: 1,
    justifyContent: "center",
  },
});

export default SignUpBottomSheet;
