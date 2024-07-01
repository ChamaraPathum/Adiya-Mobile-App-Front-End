import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    SafeAreaView, FlatList,
} from "react-native";
import SearchBar from "../compositions/SearchBar"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getPromotion} from "../services/restaurant/restaurant";
import {getImageUrl} from "../common/utils/Functions"

const Promotion = () => {

    const Navigation = useNavigation();
    const dispatch = useDispatch();
    const promotion = useSelector((state) => state.promotionSlice.promotion);
    const [data, setData] = useState([]);
    const restaurantId = 5;

    useEffect(() => {
        dispatch(getPromotion(restaurantId));
    }, []);

    useEffect(() => {
        if (promotion.isSuccess) {
            const promotionData = promotion?.data;
            const array1 = [];
            promotionData.forEach((val) => {
                array1.push({
                    name: val.name,
                    percentage: val.percentage,
                    endDate: val.endDate,
                    image: getImageUrl(val.image),
                    id: val.id
                })
            })
            setData(array1);
        }
    }, [promotion]);

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
                    <Text style={Styles.header}>Promotions</Text>
                    <View style={Styles.Line} />
                </View>

                <View style={Styles.cardcontainer}>
                    <FlatList
                        style={Styles.flatList}
                        data={data}
                        renderItem={({ item }) => {
                            return (
                                <View style={Styles.Containor}>
                                    <View style={{flexDirection:"row" }}>
                                        <View style={{ flex: 2 }}>
                                            <View style={Styles.imgContainor}>
                                                <Image style={Styles.img2} source={{ uri: item.image }} />
                                            </View>
                                        </View>
                                        <View style={{ flex: 3}}>
                                            <View style={Styles.firstFlex}>
                                                <Text style={Styles.foodName}>{item.name}</Text>
                                            </View>

                                            <View style={Styles.secondFlex}>
                                                <View style={{flex:1}}>
                                                    <Text style={Styles.description}>{item.percentage}</Text>
                                                </View>
                                                <View style={{flex:1}}>
                                                    <Text style={Styles.description2}> OFF</Text>
                                                </View>
                                            </View>

                                            <View style={Styles.thirdFlex}>
                                                <View style={{flex:1}}>
                                                    <Text style={Styles.word}>Until : </Text>
                                                </View>
                                                <View style={{flex:2}}>
                                                    <Text style={Styles.date}>{item.endDate}</Text>
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

export default Promotion;

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
        width: "80%",
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
    txt: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#fff",
        alignItems: "center",
    },
    Containor: {
        flex:1,
        marginTop: "3%",
        marginLeft: "3%",
        marginRight: "3%",
        marginBottom:"3%",
        height:"100%",
        backgroundColor:"#FFFFFF",
        borderRadius: 15,
        shadowColor: "black",
        shadowRadius: 3,
        elevation: 8,
    },
    imgContainor:{
        flex:1,
        borderRadius: 15,
        justifyContent:"center",
        alignItems:"center",
        padding:"3%"
    },
    img2: {
        height: "100%",
        width: "100%",
        borderRadius: 15,
    },
    firstFlex:{
        flex: 1,
        width: "100%",
    },
    secondFlex: {
        flex: 2,
        flexDirection: "row",
        width: "100%",
    },
    thirdFlex: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
    },
    foodName: {
        textAlign:"center",
        color: "black",
        fontSize: 17,
        fontWeight: "500",
        marginTop:"2%"
    },
    description: {
        color: "#DD8A00",
        fontSize: 45,
        fontWeight: "800",
        textAlign:"right"
    },
    description2: {
        color: "#000000",
        fontSize: 45,
        fontWeight: "800",
        textAlign:"left"
    },
    date: {
        color: "#DD8A00",
        fontSize: 15,
    },
    word: {
        color: "#A6A6A6",
        fontSize: 15,
        textAlign:"right",
    }
});
