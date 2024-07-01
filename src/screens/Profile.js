import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import IconArrow from "react-native-vector-icons/dist/MaterialIcons";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../services/user/user";
import { removeItem } from "../common/utils/Storage/Storage";
import { ProPic } from "../services/user/proPic";
import { useNavigation } from "@react-navigation/native";
import { IMAGEGETbaseUrl } from "../services/constants";

const baseUrl = IMAGEGETbaseUrl;

const Profile = () => {
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.getUserSlice.user);
  const proPic = useSelector((state) => state.proPicSlice.proPic);
  const [profileImage, setProfileImage] = useState(user?.data?.user?.image);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setProfileImage(user?.data?.user?.image);
  }, [user.data]);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (user.isSuccess) {
      setProfileImage(user?.data?.user?.image);
    }
  }, [user.data]);

  const handleImageUpload = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      const formData = new FormData();
      formData.append("image", {
        uri: image.path,
        name: `${user?.data?.user?.id}_profile_pic.jpg`,
        type: image.mime,
      });

      await dispatch(ProPic({ Data: formData, id: user?.data?.user?.id }));
      setLoader(true);
    } catch (error) {
      console.log("Image picker error", error);
    }
  };

  useEffect(() => {
    if (loader) {
      dispatch(getUser());
      setLoader(false);
    }
  }, [loader]);

  useEffect(() => {
    if (proPic.isSuccess) {
      if (proPic.data && proPic.data.success) {
        setProfileImage(user?.data?.user?.image);
        Alert.alert("Success", "Profile picture updated successfully!");
      } else if (proPic.error) {
        Alert.alert("Error", proPic.error);
      }
    }
  }, [proPic]);

  const handleLogout = async () => {
    await removeItem("login-token");
    Navigation.navigate("Login");
  };

  return (
    <View style={Styles.containor}>
      <View style={{ flex: 4, justifyContent: "center", alignItems: "center" }}>
        <View>
          <Avatar.Image
            key={profileImage}
            source={{
              uri: profileImage
                ? `${baseUrl}${profileImage}?t=${Date.now()}`
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThLP6xJXBY_W2tT5waakogfnpHk4uhpVTy7A&usqp=CAU",
            }}
            size={130}
          />

          <TouchableOpacity style={Styles.camera} onPress={handleImageUpload}>
            <Image source={require("../assets/camera.png")} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={Styles.nameTxt}>{user?.data?.user?.name}</Text>
        </View>
      </View>
      <View style={Styles.detailsContainor}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={Styles.nameDetail}>Name : </Text>
            <Text style={Styles.nameDetail_2}>{user?.data?.user?.name}</Text>
            <TouchableOpacity
              style={{ marginTop: "6%" }}
              onPress={() => Navigation.navigate("EditProfile")}
            >
              <IconArrow name="arrow-forward-ios" size={20} color="#B0B0B0" />
            </TouchableOpacity>
          </View>

          <View style={Styles.Line} />
          <View style={{ flexDirection: "row" }}>
            <Text style={Styles.nameDetail}>Number : </Text>
            <Text style={Styles.nameDetail_2}>
              {user?.data?.user?.mobileNumber}
            </Text>
            <TouchableOpacity
              style={{ marginTop: "6%" }}
              onPress={() => Navigation.navigate("EditProfile")}
            >
              <IconArrow name="arrow-forward-ios" size={20} color="#B0B0B0" />
            </TouchableOpacity>
          </View>

          <View style={Styles.Line} />

          <View style={{ flexDirection: "row" }}>
            <Text style={Styles.nameDetail}>Email : </Text>
            <Text style={Styles.nameDetail_2}>{user?.data?.user?.email}</Text>
            <TouchableOpacity
              style={{ marginTop: "6%" }}
              onPress={() => Navigation.navigate("EditProfile")}
            >
              <IconArrow name="arrow-forward-ios" size={20} color="#B0B0B0" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }}>
        <View style={Styles.inofoContainor}>
          <View style={{ flexDirection: "row" }}>
            <View style={Styles.infoIcon}>
              <Icon name="information" size={23} color="grey" />
            </View>
            <Text style={Styles.infoTxt}>Information</Text>
            <TouchableOpacity>
              <View style={Styles.iconArrow}>
                <IconArrow name="arrow-forward-ios" size={20} color="#B0B0B0" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={Styles.helpContainor}>
          <View style={{ flexDirection: "row" }}>
            <View style={Styles.infoIcon}>
              <Icon name="help-circle-outline" size={23} color="grey" />
            </View>
            <Text style={Styles.infoTxt}>help</Text>
            <TouchableOpacity>
              <View style={Styles.iconArrowHelp}>
                <IconArrow name="arrow-forward-ios" size={20} color="#B0B0B0" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={Styles.BtnContainor}>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={Styles.logOutTxt}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const Styles = StyleSheet.create({
  containor: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },

  camera: {
    marginTop: "-8%",
    marginLeft: "25%",
    backgroundColor: "#fff",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  nameTxt: {
    color: "#000",
    marginTop: "2%",
    fontSize: 20,
    fontWeight: "500",
  },

  idTxt: {
    color: "#9D9797",
  },

  detailsContainor: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: "3%",
    width: "92%",
    alignSelf: "center",
    marginTop: "0%",
    borderRadius: 20,
  },

  nameDetail: {
    flex: 1,
    color: "#5C5C5C",
    marginTop: "5%",
    fontSize: 18,
    marginLeft: "5%",
  },
  nameDetail_2: {
    flex: 2,
    color: "#B0B0B0",
    marginTop: "5%",
    fontSize: 18,
    marginLeft: "5%",
  },
  Line: {
    width: 320,
    height: 1.5,
    backgroundColor: "#E7E7E7",
    alignSelf: "center",
    marginTop: "5%",
  },

  inofoContainor: {
    backgroundColor: "#fff",
    width: "92%",
    borderRadius: 20,
    marginTop: "-8%",
    height: "20%",
    justifyContent: "center",
  },
  helpContainor: {
    backgroundColor: "#fff",
    width: "92%",
    borderRadius: 20,
    justifyContent: "center",
    marginTop: "3%",
    height: "20%",
  },

  BtnContainor: {
    width: "92%",
    backgroundColor: "#fff",
    marginTop: "3%",
    borderRadius: 20,
    height: "20%",
    justifyContent: "center",
  },

  infoTxt: {
    flex: 3,
    color: "#5C5C5C",
    fontSize: 18,
    marginLeft: "5%",
  },
  logOutTxt: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
  infoIcon: {
    flex: 0.5,
    marginLeft: "5%",
  },

  iconArrow: {
    flex: 1,
    marginLeft: "5%",
  },
  iconArrowHelp: {
    marginLeft: "5%",
  },
});
