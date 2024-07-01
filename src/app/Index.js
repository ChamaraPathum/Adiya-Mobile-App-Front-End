import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import StackNavigation from "../Navigators/StackNavigation";
import { getItem } from "../common/utils/Storage/Storage";
import { Bars } from "react-native-loader";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [authentication, setAuthentication] = useState(false);

  useEffect(() => {
    const login = getItem("login-token");

    if (login) {
      setAuthentication(true);
    } else {
      setAuthentication(false);
    }
  }, []);

  return <StackNavigation />;
};

export default Index;
