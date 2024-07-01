import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { TextInput, Avatar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../services/user/user";
import { getUser } from "../services/user/user";
import { useNavigation } from "@react-navigation/native";
import { IMAGEGETbaseUrl } from "../services/constants";
import { Formik } from "formik";
import * as Yup from "yup";

const baseUrl = IMAGEGETbaseUrl;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(6, "Name should be at least 6 characters")
    .max(50, "Name should not exceed 50 characters")
    .required("Please enter your full name"),
  mobile: Yup.string()
    .matches(/^\d+$/, "Mobile number should only contain digits")
    .min(10, "Mobile number should be at least 10 digits")
    .max(10, "Mobile number should not exceed 10 digits")
    .required("Please enter your mobile number"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
});

const EditProfile = () => {
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.getUserSlice.user);
  const EditProfile = useSelector((state) => state.editProfileSlice.editUser);
  const [number, setNumber] = useState(
    user?.data?.user?.mobileNumber.toString()
  );
  const [email, setEmail] = useState(user?.data?.user?.email);
  const [profileImage, setProfileImage] = useState(user?.data?.user?.image);
  const [loader, setLoader] = useState(false);

  const id = user?.data?.user?.id;

  useEffect(() => {
    setProfileImage(user?.data?.user?.image);
  }, [user.data]);

  useEffect(() => {
    if (loader) {
      setLoader(false);
      dispatch(getUser());
      Navigation.navigate("BottomTabNavigator");
    }
  }, [EditProfile.data]);

  const handleUpdateProfile = (values) => {
    const Data = {
      name: values.name,
      mobileNumber: values.mobile,
      email: values.email,
    };
    setLoader(true);
    dispatch(editProfile({ Data, id }));
  };

  const profileImageSource = useMemo(
    () =>
      profileImage
        ? `${baseUrl}${profileImage}?t=${Date.now()}`
        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThLP6xJXBY_W2tT5waakogfnpHk4uhpVTy7A&usqp=CAU",
    [profileImage]
  );

  return (
    <View style={styles.mainContainer}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", marginTop: "5%" }}>
          <TouchableOpacity
            style={{ marginTop: "3%", marginLeft: "5%" }}
            onPress={() => Navigation.navigate("BottomTabNavigator")}
          >
            <Image source={require("../assets/back.png")} />
          </TouchableOpacity>
          <Text style={styles.upperTxt}>Edit Profile</Text>
        </View>
        <View style={{ alignItems: "center", marginTop: "5%" }}>
          <Avatar.Image source={{ uri: profileImageSource }} size={130} />
          <Text style={styles.NameTxt}>{user?.data?.user?.name}</Text>
        </View>
      </View>
      <Formik
        initialValues={{
          name: user?.data?.user?.name,
          mobile: number,
          email: email,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleUpdateProfile(values)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
        }) => (
          <View style={{ flex: 1.5 }}>
            <View style={styles.nameTxt}>
              <TextInput
                mode="outlined"
                label="Name"
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                style={{ backgroundColor: "#F9F9F9" }}
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
            </View>

            <View style={styles.numberTxt}>
              <TextInput
                mode="outlined"
                label="Number"
                keyboardType="number-pad"
                value={values.mobile}
                onChangeText={handleChange("mobile")}
                onBlur={handleBlur("mobile")}
                style={{ backgroundColor: "#F9F9F9" }}
                theme={{
                  colors: {
                    primary: "#E2E2E2",
                    background: "#E2E2E2",
                  },
                }}
              />
              {touched.mobile && errors.mobile && (
                <Text style={styles.errorTxt}>{errors.mobile}</Text>
              )}
            </View>

            <View style={styles.emailTxt}>
              <TextInput
                mode="outlined"
                label="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                style={{ backgroundColor: "#F9F9F9" }}
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
            </View>
            <View style={{ marginTop: "10%" }}>
              <TouchableOpacity
                style={[
                  styles.Btn,
                  { backgroundColor: isValid ? "#DD8A00" : "#fccb79" },
                ]}
                onPress={handleSubmit}
                disabled={!isValid}
              >
                <Text style={styles.updateTxt}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },

  upperTxt: {
    marginLeft: "20%",
    fontSize: 24,
    marginTop: "4%",
    color: "#000",
    fontWeight: "500",
  },

  Btn: {
    backgroundColor: "#DD8A00",
    height: "37%",
    width: "80%",
    marginLeft: "10%",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },

  nameTxt: {
    width: "80%",
    marginLeft: "10%",
    marginTop: "5%",
  },

  numberTxt: {
    width: "80%",
    marginLeft: "10%",
    marginTop: "5%",
  },
  emailTxt: {
    width: "80%",
    marginLeft: "10%",
    marginTop: "5%",
  },

  updateTxt: {
    fontSize: 23,
    color: "#fff",
  },

  NameTxt: {
    color: "#000",
    marginTop: "2%",
    fontSize: 20,
    fontWeight: "500",
  },

  errorTxt: {
    color: "red",
  },
});
