import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Avatar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import IconArrow from "react-native-vector-icons/dist/MaterialIcons";
import ImagePicker from "react-native-image-crop-picker";
import { useNavigation } from "@react-navigation/native";
import { getUser } from "../services/user/user";
import { removeItem } from "../common/utils/Storage/Storage";
import { ProPic } from "../services/user/proPic";
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
  }, [user?.data?.user?.image]);

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
    <View style={Styles.container}>
      <View style={Styles.profileContainer}>
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

        <Text style={Styles.nameText}>{user?.data?.user?.name}</Text>
      </View>

      <View style={Styles.detailsContainer}>{/* Display user details */}</View>

      <View style={Styles.infoContainer}>
        {/* Display information section */}
      </View>

      <View style={Styles.helpContainer}>{/* Display help section */}</View>

      <TouchableOpacity style={Styles.logoutButton} onPress={handleLogout}>
        <Text style={Styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  profileContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    marginTop: -8,
    marginLeft: "25%",
    backgroundColor: "#fff",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  nameText: {
    color: "#000",
    marginTop: 10,
    fontSize: 20,
    fontWeight: "500",
  },
  detailsContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: "3%",
    width: "92%",
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 20,
  },
  infoContainer: {
    backgroundColor: "#fff",
    width: "92%",
    borderRadius: 20,
    marginTop: -8,
    height: "20%",
    justifyContent: "center",
    alignSelf: "center",
  },
  helpContainer: {
    backgroundColor: "#fff",
    width: "92%",
    borderRadius: 20,
    justifyContent: "center",
    marginTop: "3%",
    height: "20%",
    alignSelf: "center",
  },
  logoutButton: {
    width: "92%",
    backgroundColor: "#fff",
    marginTop: "3%",
    borderRadius: 20,
    height: "20%",
    justifyContent: "center",
    alignSelf: "center",
  },
  logoutText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Profile;
