import React, { useState } from "react";

import StarRating from "react-native-star-rating";

const StarRatingBar = () => {
  const [starCount, setStarCount] = useState(3.5);

  const onStarRatingPress = (rating) => {
    setStarCount(rating);
  };

  return (
    <StarRating
      disabled={false}
      maxStars={5}
      rating={starCount}
      selectedStar={(rating) => onStarRatingPress(rating)}
      starStyle={{ color: "#f7a214" }}
      starSize={17}
    />
  );
};

export default StarRatingBar;
