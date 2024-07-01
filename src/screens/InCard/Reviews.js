import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import StarRating from "react-native-star-rating";
import { getImageUrl } from "../../common/utils/Functions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import Button from "react-native-button";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, postReviews } from "../../services/product/product";
import { getProductReviews } from "../../services/product/product";
import TimeAgo from "react-native-timeago";
import { getUser } from "../../services/user/user";
import { deleteReview } from "../../services/product/product";
import { IMAGEGETbaseUrl } from "../../services/constants";
import { Avatar } from "react-native-paper";

const deviceHeight = Dimensions.get("window").height;

const Reviews = (props) => {
  const baseUrl = IMAGEGETbaseUrl;
  const [profileImage, setProfileImage] = useState();
  const productId = props?.data?.Data?.id;
  const dispatch = useDispatch();
  const [reviewData, setReviewData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [starCount, setStarCount] = useState(0);
  const [reviewId, setReviewId] = useState();
  const [userDetails, setUserDetails] = useState({});
  const productReviews = useSelector(
    (state) => state.getReviewsSlice.productReviews
  );
  const reviews = useSelector((state) => state.postReviewsSlice.Reviews);
  const userData = useSelector((state) => state.getUserSlice.user);
  const reviewDelete = useSelector(
    (state) => state.deleteReviewSlice.reviewDelete
  );
  const UId = userData?.data?.user?.id;

  useEffect(() => {
    dispatch(getProductReviews(productId));
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (productReviews.isSuccess) {
      const Rdata = productReviews.data.reviews;
      const array2 = [];
      Rdata?.forEach((val) => {
        array2.push({
          description: val.description,
          rating: val.rating,
          userId: val.userId,
          username: val.user?.name,
          photo: getImageUrl(val.user?.image),
          commentTime: val.commentTime,
          reviewId: val.id,
        });
      });
      setReviewData(array2);
    }
  }, [productReviews]);

  useEffect(() => {
    if (reviews.isSuccess) {
      dispatch(getProductReviews(productId));
      dispatch(getAllProducts());
    }
  }, [reviews]);

  useEffect(() => {
    if (reviewDelete.isSuccess) {
      dispatch(getProductReviews(productId));
    }
  }, [reviewDelete]);

  useEffect(() => {
    if (userData.isSuccess) {
      const user = userData.data.user;
      setUserDetails(user);
      setProfileImage(userData?.data?.user?.image);
    }
  }, [userData]);

  const profileImageSource = useMemo(
    () =>
      profileImage ? `${baseUrl}${profileImage}?t=${Date.now()}` : undefined,
    [profileImage]
  );

  const handleModal = () => {
    setIsModalVisible(true);
  };

  const handleSubmit = () => {
    setIsModalVisible(false);
    const Data = {
      description: comment,
      rating: starCount,
      userId: UId,
      username: userDetails.name,
      photo: getImageUrl(userDetails.image),
    };
    dispatch(postReviews({ Data, productId }));
    setComment("");
    setStarCount(0);
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setComment("");
    setStarCount(0);
  };

  const handleCancel = () => {
    setIsDeleteModalVisible(false);
  };

  const handleDeleteModel = (item) => {
    setIsDeleteModalVisible(true);
    setReviewId(item);
  };

  const handleDelete = () => {
    dispatch(deleteReview(reviewId));
    dispatch(getProductReviews(productId));
    setIsDeleteModalVisible(false);
  };

  const onStarRatingPress = (rating) => {
    setStarCount(rating);
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.reviewContainer}
        data={reviewData}
        renderItem={({ item }) => {
          return (
            <View style={styles.Card}>
              <View style={styles.Upper}>
                <View style={styles.UpperSection}>
                  <View style={styles.UpperSectionItem}>
                    {item.userId === UId && (
                      <Avatar.Image
                        source={{ uri: profileImageSource }}
                        size={43}
                      />
                    )}
                    {item.userId !== UId && (
                      <Image style={styles.img} source={{ uri: item.photo }} />
                    )}
                    <Text style={styles.NameTxt}>
                      {item.username}
                      {item.userId === UId && (
                        <Text style={styles.YouTxt}> (You)</Text>
                      )}
                    </Text>
                    <Text style={styles.timeTxt}>
                      <TimeAgo time={item.commentTime} hideAgo={false} />
                    </Text>
                  </View>

                  <View style={{ flex: 1.5, marginTop: "2%" }}>
                    <View style={styles.StarRatingBar}>
                      <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={parseFloat(item?.rating)}
                        fullStarColor={"#f7a214"}
                        starSize={17}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.CommentContainor}>
                <Text style={styles.CommentTxt}>{item.description}</Text>
              </View>

              <View style={styles.DeleteContainor}>
                {item.userId === UId && (
                  <TouchableOpacity
                    onPress={() => {
                      handleDeleteModel(item.reviewId);
                    }}
                  >
                    <MaterialCommunityIcons
                      name="delete-circle"
                      size={30}
                      color="#808080"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.reviewId}
        keyboardDismissMode="on-drag"
      />

      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            onChangeText={setComment}
            value={comment}
            placeholder=" Add review "
            placeholderTextColor="#C1C1C1"
            keyboardType="default"
            color="black"
          />
        </View>
        <View style={styles.sendIcon}>
          <TouchableOpacity onPress={handleModal}>
            <MaterialCommunityIcons name="send" size={30} color="#808080" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <View style={styles.nameflex}>
            <Text style={styles.name}>{props?.data?.Data?.name}</Text>
          </View>
          <View style={styles.starflex}>
            <TouchableOpacity>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={starCount}
                selectedStar={(rating) => onStarRatingPress(rating)}
                fullStarColor={"#f7a214"}
                starSize={35}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonflex}>
            <View style={styles.okbutton}>
              <Button
                style={{ fontSize: 20, color: "#FFFFFF", textAlign: "center" }}
                containerStyle={{
                  padding: 2,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: "#f7a214",
                  width: 60,
                }}
                onPress={handleSubmit}
              >
                ok
              </Button>
            </View>
            <View style={styles.closebutton}>
              <Button
                style={{ fontSize: 20, color: "#f7a214", textAlign: "center" }}
                containerStyle={{
                  padding: 2,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: "#F6F6F6",
                  width: 60,
                }}
                onPress={handleClose}
              >
                close
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      <Modal isVisible={isDeleteModalVisible}>
        <View style={styles.modal}>
          <View style={styles.deleteflex}>
            <Text style={styles.deletetxt}>
              Are you sure you want to delete your review?
            </Text>
          </View>

          <View style={styles.buttonflex}>
            <View style={styles.okbutton}>
              <Button
                style={{ fontSize: 20, color: "#FFFFFF", textAlign: "center" }}
                containerStyle={{
                  padding: 2,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: "#f7a214",
                  width: 80,
                }}
                onPress={handleDelete}
              >
                Delete
              </Button>
            </View>
            <View style={styles.closebutton}>
              <Button
                style={{ fontSize: 20, color: "#f7a214", textAlign: "center" }}
                containerStyle={{
                  padding: 2,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: "#F6F6F6",
                  width: 80,
                }}
                onPress={handleCancel}
              >
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  reviewContainer: {
    flexGrow: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  inputBox: {
    flex: 1,
    marginRight: 8,
  },
  sendIcon: {
    marginLeft: 8,
  },
  Card: {
    backgroundColor: "#F6F6F6",
    width: "90%",
    height: "80%",
    marginLeft: "5%",
    borderRadius: 20,
    paddingLeft: "1%",
    paddingRight: "1%",
    flex: 1,
    flexDirection: "column",
    marginBottom: "5%",
  },
  img: {
    flex: 1.5,
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  StarRatingBar: {
    width: "80%",
    marginLeft: "10%",
  },
  Upper: {
    flex: 1,
    marginTop: "1%",
  },
  UpperSection: {
    flex: 2,
    flexDirection: "row",
    marginTop: "2%",
  },
  UpperSectionItem: {
    flex: 3,
    flexDirection: "row",
    gap: 10,
    marginTop: "2%",
    marginLeft: "1%",
  },
  nameContainer: {
    flex: 3,
    backgroundColor: "green",
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "pink",
  },
  timeTxt: {
    flex: 2,
    color: "#C1C1C1",
    justifyContent: "center",
  },
  NameTxt: {
    flex: 3,
    fontSize: 15,
    color: "#474747",
  },
  CommentTxt: {
    color: "#A5A5A5",
    padding: "1%",
  },
  CommentContainor: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "1%",
  },
  DeleteContainor: {
    flex: 1,
    justifyContent: "center",
    marginBottom: "1%",
    alignItems: "center",
    marginLeft: "90%",
  },
  input: {
    height: 45,
    padding: "2%",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
  modal: {
    flex: 1,
    flexDirection: "column",
    width: "90%",
    borderRadius: 20,
    backgroundColor: "white",
    alignSelf: "center",
    maxHeight: deviceHeight * 0.25,
    padding: "2%",
  },
  nameflex: {
    flex: 1.5,
  },
  name: {
    fontSize: 25,
    fontWeight: "500",
    color: "#989898",
    textAlign: "center",
  },
  deletetxt: {
    fontSize: 20,
    fontWeight: "500",
    color: "black",
    textAlign: "center",
  },
  starflex: {
    flex: 1,
    alignItems: "center",
  },
  buttonflex: {
    flex: 1.5,
    marginTop: "2%",
    alignItems: "center",
    flexDirection: "row",
  },
  okbutton: {
    flex: 1,
    alignItems: "center",
    paddingLeft: "20%",
  },
  closebutton: {
    flex: 1,
    alignItems: "center",
    paddingRight: "20%",
  },
  deleteflex: {
    flex: 1,
    marginTop: "3%",
    alignItems: "center",
    padding: "3%",
  },
  YouTxt: {
    fontSize: 12,
    color: "#C1C1C1",
  },
});
