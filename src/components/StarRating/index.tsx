import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      stars.push(<Ionicons key={i} name="star" color={"#DAA520"} size={24} />);
    } else if (i < rating) {
      stars.push(
        <Ionicons
          key={i}
          name="star-half-outline"
          color={"#DAA520"}
          size={24}
        />
      );
    } else {
      stars.push(
        <Ionicons key={i} name="star-outline" color={"#DAA520"} size={24} />
      );
    }
  }
  return <View style={styles.starContainer}>{stars}</View>;
};

export default StarRating;
