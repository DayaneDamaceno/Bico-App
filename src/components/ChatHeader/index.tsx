import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ChatHeaderProps {
  name: string;
  avatarUrl: string;
  isOnline: boolean;
}
export default function ChatHeader(props: Readonly<ChatHeaderProps>) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TouchableOpacity
        style={styles.btnBack}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>
      <Image source={{ uri: props.avatarUrl }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.status}>
          {props.isOnline ? "Online" : "Offline"}
        </Text>
      </View>

      <TouchableOpacity onPress={() => alert("This is an icon!")}>
        <Ionicons name="megaphone-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
}
