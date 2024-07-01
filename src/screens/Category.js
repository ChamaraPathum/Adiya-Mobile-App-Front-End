import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    SafeAreaView, FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchBar from "../compositions/SearchBar";
import HirizontalFlatList from "../compositions/HirizontalFlatList";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../services/restaurant/restaurant";
import {getImageUrl} from "../common/utils/Functions";
import StarRating from "react-native-star-rating";

const Category = () => {

    const Navigation = useNavigation();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productSlice.products);
    const [data, setData] = useState([]);
    const [categoryData, setCategoryData] = useState("all")
    const restaurantId = 5;
    const brandMaxLength = 7;

    useEffect(() => {
        dispatch(getProducts(restaurantId));
    }, []);

    useEffect(() => {
        if (products.isSuccess) {
            if (categoryData === "all") {
                const productData = products?.data;
                const array1 = [];
                productData.forEach((val) => {
                    array1.push({
                        name: val.name,
                        description: val.description,
                        brand: val.brand,
                        price: val.price,
                        date: new Date(val.date).toDateString().slice(4, 11),
                        image: getImageUrl(val.image),
                        averageRatingPercentage: (val.averageRatingPercentage) / 20,
                        id: val.id
                    })
                })
                setData(array1)
            }
        }
    }, [products, categoryData]);

    const loadCategoryData = (value) => {
        if (products.isSuccess) {
            const productData = products?.data;
            if (value === "all") {
                const array1 = [];
                productData.forEach((val) => {
                    array1.push({
                        name: val.name,
                        description: val.description,
                        brand: val.brand,
                        price: val.price,
                        date: new Date(val.date).toDateString().slice(4, 11),
                        image: getImageUrl(val.image),
                        averageRatingPercentage: (val.averageRatingPercentage) / 20,
                        id: val.id
                    })
                })
                setData(array1);
            } else {
                const data = productData.filter(brandData => {
                    return brandData.brand.toLowerCase() === value
                })
                const array1 = [];
                data.forEach((val) => {
                    array1.push({
                        name: val.name,
                        description: val.description,
                        brand: val.brand,
                        price: val.price,
                        date: new Date(val.date).toDateString().slice(4, 11),
                        image: getImageUrl(val.image),
                        averageRatingPercentage: (val.averageRatingPercentage) / 20,
                        id: val.id
                    })
                })
                setData(array1);
            }
        }
    }

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
                    <View style={Styles.LineContainer}>
                            <Text style={Styles.header}>Categories</Text>
                            <View style={Styles.Line} />
                    </View>
                    <View style={Styles.categoryContainer}>
                        <HirizontalFlatList item={(value)=>{
                            loadCategoryData(value);
                            setCategoryData(value);
                        }} />
                    </View>
                </View>

                <View style={Styles.cardcontainer}>
                    <FlatList
                        style={Styles.flatList}
                        data={data}
                        renderItem={({ item }) => {
                            const displayBrand = item.brand.length > brandMaxLength
                                ? item.brand.substring(0, brandMaxLength) + '...'
                                : item.brand;
                            return (
                                    <View style={Styles.Containor}>
                                    <View style={{ flex: 1,flexDirection:"row" }}>
                                        <View style={{ flex: 1 }}>
                                            {/* //product img added to card */}
                                            <View style={Styles.imgContainor}>
                                                <Image style={Styles.img2} source={{ uri: item.image }} />
                                            </View>
                                        </View>
                                        <View style={{ flex: 3}}>
                                            <View style={Styles.firstFlex}>
                                                <View style={{flex:2}}>
                                                    <Text style={Styles.bottleName}>{item.name}</Text>
                                                </View>
                                                <View style={{flex:1, alignItems:"center"}}>
                                                    <Text style={Styles.brandName}>{displayBrand}</Text>
                                                </View>
                                            </View>

                                            <View style={Styles.secondFlex}>
                                                <View style={{flex:2}}>
                                                    <Text style={Styles.description}>{item.description}</Text>
                                                </View>
                                                <View style={{flex:1,alignItems:"center"}}>
                                                    <Text style={Styles.date}>{item.date}</Text>
                                                </View>
                                            </View>

                                            <View style={Styles.thirdFlex}>
                                                <StarRating
                                                    disabled={false}
                                                    maxStars={5}
                                                    rating={item?.averageRatingPercentage}
                                                    fullStarColor={'#f7a214'}
                                                    starSize={17}
                                                />
                                                <View style={Styles.price}>
                                                    <Text style={{ color: "#DD8A00" }}>Rs: {item.price}</Text>
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

export default Category;

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
        flex:1,
        flexDirection:"column",
    },
    cardcontainer: {
        flex:6,
        backgroundColor:"brown",
    },
    LineContainer: {
        flex:1.5,
        flexDirection:"row",
        marginLeft:"3%",
        marginRight:"3%"
    },
    categoryContainer: {
        flex:2,
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
    firstFlex:{
        flex: 1,
        flexDirection: "row",
        width: "100%",
        marginTop: "2%",
    },
    secondFlex: {
        flex: 4,
        flexDirection: "row",
        width: "100%",
        marginTop: "2%",
    },
    thirdFlex: {
        flex: 2,
        flexDirection: "row",
        width: "100%",
        marginTop: "2%",
        marginBottom: "2%",
        marginLeft: "2%"
    },
    bottleName: {
        marginTop: "1%",
        marginLeft: "3%",
        color: "black",
        fontSize: 15,
        fontWeight: "500",
    },
    description: {
        marginLeft: "3%",
        color: "#A6A6A6",
        fontSize: 14,
    },
    brandName: {
        backgroundColor: "#DD8A00",
        width: "90%",
        // height: "90%",
        borderRadius: 8,
        color: "#fff",
        textAlign: "center",
        paddingLeft:"3%",
        paddingRight:"3%",
    },
    date: {
        color: "#BFBFBF",
        fontSize: 12,
        marginTop: "20%",
        marginRight:"5%"
    },
    price: {
        flex: 1,
        flexDirection: "row",
        marginLeft: "40%",
    },
});
