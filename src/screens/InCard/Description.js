import { StyleSheet, Text, View } from "react-native";
import React, {useEffect} from "react";
import ProgressBar from "../../compositions/ProgressBar";
import StarRating from "react-native-star-rating";
import {getProductReviews} from "../../services/product/product";
import {useDispatch, useSelector} from "react-redux";

const Description = (props) => {

  const productId = props?.data?.Data?.id;
  const dispatch = useDispatch();
  const productReviews = useSelector((state) => state.getReviewsSlice.productReviews);

  useEffect(() => {
    dispatch(getProductReviews(productId));
  },[]);

  return (
    <View style={styles.Containor}>
      <View style={styles.DescriptionTxtContainor}>
        <Text style={styles.DescriptionTxt}>{productReviews.data.description}</Text>
      </View>

      <View style={styles.RatingBox}>
        <View style={styles.RatingBoxContainor}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <Text style={styles.FourTxt}>{productReviews.data.averageRating}</Text>
              <Text style={styles.FiveTxt}>/5</Text>
            </View>
            <Text style={styles.ReviewTxt}>Based on {productReviews.data.reviewCount} reviews</Text>

            <View style={styles.StarRating}>
              <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={parseFloat(productReviews.data.averageRating)}
                  fullStarColor={"#f7a214"}
                  starSize={17}
              />
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <ProgressBar ratings={props?.data?.Data}/>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({
  Containor: {
    flex: 1,
    backgroundColor:"green"
  },
  DescriptionTxtContainor: {
    flex: 1,
    textAlign:"left",
    backgroundColor:"#FFFFFF"
  },
  DescriptionTxt: {
    marginLeft: "7%",
    color: "#A6A6A6",
    marginRight: "5%",
    marginTop: "1%",
  },
  RatingBox: {
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  RatingBoxContainor: {
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#F6F6F6",
    borderRadius: 30,
    marginTop: "1%",
    marginBottom: "1%",
    padding:"1%"
  },
  FourTxt: {
    fontSize: 25,
    fontWeight: "700",
    marginLeft: "5%",
    marginTop: "3%",
    color:"#000000"
  },
  FiveTxt: {
    fontSize: 15,
    color:"#000000"
  },
  ReviewTxt: {
    marginLeft: "5%",
    marginTop: "1%",
    color:"#BFBFBF"
  },
  StarRating: {
    width: "45%",
    marginLeft: "5%",
    marginTop: "5%",
  },
});
