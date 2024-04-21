import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";
import { Categoria } from "../../api/ApiService";

interface CategoriaProps {
  item: Categoria;
  onPress: () => void;
}
export default function CategoriaItem(props: CategoriaProps) {
  const setting = categoriaSettings[props.item.id] || {};

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ backgroundColor: setting.color, ...styles.button }}
    >
      <Ionicons name={setting.icon} size={24} color="white" />
      <Text style={styles.buttonText}>{props.item.nome}</Text>
    </TouchableOpacity>
  );
}

interface CategorySettings {
  [key: number]: {
    icon: "cut-outline" | "build-outline" | "car-outline" | "home-outline";
    color: string;
  };
}

const categoriaSettings: CategorySettings = {
  1: { icon: "cut-outline", color: "#7C3AED" },
  2: { icon: "build-outline", color: "#F97316" },
  3: { icon: "car-outline", color: "#14B8A6" },
  4: { icon: "home-outline", color: "#3B82F6" },
};
