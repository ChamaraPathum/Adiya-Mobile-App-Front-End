import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet } from "react-native";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <Searchbar
      style={Styles.searchBar}
      inputStyle={Styles.input}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      placeholderTextColor="#CDCDCD"
      iconColor="#CDCDCD"
    />
  );
};

export default SearchBar;

const Styles = StyleSheet.create({
  searchBar: {
    borderColor: "#B4B4B4",
    borderWidth: 0.8,
    width: "100%",
    backgroundColor: null,
  },
  input: {
    paddingVertical: 1,
    height: 5,
    marginTop: -3,
    paddingHorizontal: 0,
  },
});
