import { View, Text, StyleSheet } from "react-native";
import React, {useEffect} from "react";
import * as Progress from "react-native-progress";
import {useDispatch, useSelector} from "react-redux";
import {getProductReviews} from "../services/product/product";

const ProgressBar = (props) => {

    const productId = props?.ratings?.id;
    const dispatch = useDispatch();
    const productReviews = useSelector(
        (state) => state.getReviewsSlice.productReviews);

    useEffect(() => {
        dispatch(getProductReviews(productId));
    },[]);

    return (
    <View style={styles.Containor}>
      <View style={styles.TxtBar}>
        <Text style={styles.Txt}>5 Star</Text>
        <View>
          <Progress.Bar progress={productReviews.data.FiveStarRatingRatio} width={90} color="#FDCE0B" />
        </View>
      </View>

      <View style={styles.TxtBar}>
        <Text style={styles.Txt}>4 Star</Text>
        <View>
          <Progress.Bar progress={productReviews.data.FourStarRatingRatio} width={90} color="#FDCE0B" />
        </View>
      </View>

      <View style={styles.TxtBar}>
        <Text style={styles.Txt}>3 Star</Text>
        <View>
          <Progress.Bar progress={productReviews.data.ThreeStarRatio} width={90} color="#FDCE0B" />
        </View>
      </View>

      <View style={styles.TxtBar}>
        <Text style={styles.Txt}>2 Star</Text>
        <View>
          <Progress.Bar progress={productReviews.data.TwoStarRatio} width={90} color="#FDCE0B" />
        </View>
      </View>

      <View style={styles.TxtBar}>
        <Text style={styles.Txt}>1 Star</Text>
        <View>
          <Progress.Bar progress={productReviews.data.OneStarRatio} width={90} color="#FDCE0B" />
        </View>
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  Containor: {},

  TxtBar: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "baseline",
    gap: 5,
    marginTop: "2%",
  },

  Txt: {
    color: "#BFBFBF",
    fontSize: 15,
  },
});
