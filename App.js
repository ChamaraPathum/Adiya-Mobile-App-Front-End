import React from "react";
import StackNavigation from "./src/Navigators/StackNavigation";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { StatusBar } from "react-native";

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar hidden />
      <StackNavigation />
    </Provider>
  );
};

export default App;
