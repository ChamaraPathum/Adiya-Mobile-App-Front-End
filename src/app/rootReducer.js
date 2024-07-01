//signIn slice
import loginSlice from "../store/slice/login/loginSlice";

//SignUp slice
import signUpSlice from "../store/slice/signUp/signUpSlice";

//user details
import getUserSlice from "../store/slice/user/getUserSlice";

//promotion slice
import promotionSlice from "../store/slice/restuarant/promotionSlice";

//food slice
import foodSlice from "../store/slice/restuarant/foodSlice";

//product slice
import productSlice from "../store/slice/restuarant/productSlice";

//all products slice
import allProductSlice from "../store/slice/product/allProductSlice";

//productScreen slice
import productScreenSlice from "../store/slice/product/productScreenSlice";

//postReview slice
import postReviewsSlice from "../store/slice/product/addReviews";

//getReviews slice
import getReviewsSlice from "../store/slice/product/getReview";

//user profile pic update
import proPicSlice from "../store/slice/user/proPicSlice";

import editProfileSlice from "../store/slice/user/editProfileSlice";
//deleteReview slice
import deleteReviewSlice from "../store/slice/product/deleteReview";

const rootReducer = {
  loginSlice,
  signUpSlice,
  getUserSlice,
  promotionSlice,
  foodSlice,
  productSlice,
  allProductSlice,
  proPicSlice,
  editProfileSlice,
  productScreenSlice,
  postReviewsSlice,
  getReviewsSlice,
  deleteReviewSlice,
};

export default rootReducer;
