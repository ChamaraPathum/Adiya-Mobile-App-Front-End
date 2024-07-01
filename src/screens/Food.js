import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    SafeAreaView, FlatList,
} from "react-native";
import SearchBar from "../compositions/SearchBar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getFoods} from "../services/restaurant/restaurant";
import {getImageUrl} from "../common/utils/Functions";

const Food = () => {

    const Navigation = useNavigation();
    const dispatch = useDispatch();
    const foods = useSelector((state) => state.foodSlice.foods);
    const [data, setData] = useState([]);
    const restaurantId = 5;

    useEffect(() => {
        dispatch(getFoods(restaurantId));
    }, []);

    useEffect(() => {
        if (foods.isSuccess) {
            const foodData = foods?.data;
            const array1 = [];
            foodData.forEach((val) => {
                array1.push({
                    name: val.name,
                    description: val.description,
                    price: val.price,
                    image: getImageUrl(val.image),
                    id: val.id
                })
            })
            setData(array1);
        }
    }, [foods]);

    return (
        <SafeAreaView style={Styles.area}>
            <View style={Styles.box}>
                <View style={Styles.backicon}>
                    <TouchableOpacity
                        onPress={() => Navigation.navigate("BottomTabNavigator")}
                    >
                        <MaterialIcons name="arrow-back-ios" size={20}/>
                    </TouchableOpacity>
                </View>
                <View style={Styles.searchbar}>
                    <SearchBar />
                </View>
                <View style={Styles.filtericon}>
                    <TouchableOpacity>
                        <Image source={require("../assets/filter.png")} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={Styles.categories}>
                <View style={Styles.categoryLine}>
                        <Text style={Styles.header}>Foods</Text>
                        <View style={Styles.Line} />
                </View>

                <View style={Styles.cardcontainer}>
                    <FlatList
                        style={Styles.flatList}
                        data={data}
                        renderItem={({ item }) => {
                            return (
                                <View style={Styles.Containor}>
                                    <View style={{ flex: 1, flexDirection:"row" }}>
                                        <View style={{ flex: 1}}>
                                            <View style={Styles.imgContainor}>
                                                <Image style={Styles.img2} source={{ uri: item.image }} />
                                            </View>
                                        </View>

                                        <View style={{ flex: 4 }}>
                                            <View style={Styles.secondFlex}>
                                                <Text style={Styles.foodName}>{item.name}</Text>
                                                <Text style={Styles.description}>{item.description}</Text>
                                            </View>
                                            <View style={Styles.thirdFlex}>
                                                <View style={{ flex: 1, flexDirection: "row", marginBottom:"2%" }}>
                                                    <Text style={{ color: "#DD8A00", marginLeft:"70%" }}>Rs. {item.price}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            );
                        }}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Food;

const Styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: "#F9F9F9",
        flexDirection:"column"
    },
    box: {
        flex:1,
        flexDirection: "row",
        backgroundColor:"#FFFFFF"
    },
    categories: {
        flex:5,
        flexDirection:"column",
    },
    backicon: {
        flex:0.8,
        justifyContent:"center",
        alignItems:"center"
    },
    searchbar: {
        flex:5,
        justifyContent:"center",
    },
    filtericon: {
        flex:0.8,
        justifyContent:"center",
        alignItems:"center",
    },
    categoryLine: {
        flex:0.5,
        flexDirection:"row",
        marginLeft:"3%",
        marginRight:"3%"
    },
    cardcontainer: {
        flex:6,
        backgroundColor:"red"
    },
    Line: {
        width: "90%",
        height: 1,
        backgroundColor: "#DFDFDF",
        marginTop: "3%",
    },
    header:{
        fontSize: 15,
        color: "#636363",
    },
    flatList: {
        backgroundColor: "#F9F9F9",
        shadowColor: "black",
    },
    Containor: {
        backgroundColor: "#fff",
        borderColor: null,
        marginTop: "3%",
        marginBottom:"3%",
        marginLeft: "3%",
        marginRight: "3%",
        borderRadius: 15,
        shadowColor: "black",
        shadowRadius: 3,
        elevation: 8,
    },
    imgContainor: {
        backgroundColor: "#fff",
        borderRadius: 15,
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:"5%"
    },
    img2: {
        height: "100%",
        width: "100%",
        borderRadius: 15,
    },
    secondFlex: {
        flex: 4,
        width: "68%",
        marginLeft: "3%",
    },
    thirdFlex: {
        flex: 1,
        marginTop: "1%",
    },
    foodName: {
        marginTop: "2%",
        color: "black",
        fontSize: 15,
        fontWeight: "500",
    },
    description: {
        marginTop: "2%",
        color: "#A6A6A6",
        fontSize: 14,
    },
});
