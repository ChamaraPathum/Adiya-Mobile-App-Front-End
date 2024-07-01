import React, {useEffect, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

const HirizontalFlatList = ({item}) => {
  const BRAND_NAMES = [
    {
      id: 0,
      name: "All",
      accessor: "all",
    },
    {
      id: 1,
      name: "VA Black",
      accessor: "va black",
    },
    {
      id: 2,
      name: "Jameson",
      accessor: "jameson",
    },
    {
      id: 3,
      name: "Beer",
      accessor: "beer",
    },
    {
      id: 4,
      name: "Vodka",
      accessor: "vodka",
    },
    {
      id: 5,
      name: "Arrack",
      accessor: "arrack",
    },
    {
      id: 6,
      name: "Wine",
      accessor: "wine",
    },
    {
      id: 7,
      name: "Bacardi",
      accessor: "bacardi",
    },
    {
      id: 8,
      name: "Gin",
      accessor: "gin",
    },
    {
      id: 9,
      name: "Wisky",
      accessor: "wisky",
    },
    {
      id: 10,
      name: "Morosha Vodka",
      accessor: "morshavodka",
    },
    {
      id: 11,
      name: "Velog",
      accessor: "velog",
    },
  ];

  const [selectedBrand, setSelectedBrand] = useState(BRAND_NAMES[0].id);

  const ItemRender = ({ id, name, accessor }) => {
    const onPress = () => {
      setSelectedBrand(id);
      item(accessor);
    };
    const isSelected = selectedBrand === id;
    const itemStyle = isSelected ? styles.selectedItem : styles.item;
    const itemStyleTxt = isSelected ? styles.selecteditemText : styles.itemText;
    return (
      <TouchableOpacity style={itemStyle} onPress={onPress}>
        <Text style={itemStyleTxt}>{name}</Text>
      </TouchableOpacity>
    );
  };

  const Separator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={BRAND_NAMES}
        renderItem={({ item }) => <ItemRender id={item.id} name={item.name} accessor={item.accessor} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={Separator}
        horizontal={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: "1%",
    // marginTop: 10,
    shadowColor: "black"
  },
  item: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#B4B4B4",
    borderWidth: 1,
    paddingLeft:10,
    paddingRight:10
  },
  selectedItem: {
    backgroundColor: "#DD8A00",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#B4B4B4",
    borderWidth: 1,
    paddingLeft:10,
    paddingRight:10
  },
  itemText: {
    fontSize: 14,
    color: "#B4B4B4",
    textAlign: "center",
  },
  selecteditemText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  separator: {
    height: 50,
    width: 15,
    backgroundColor: "#F9F9F9"
  },
});

export default HirizontalFlatList;
