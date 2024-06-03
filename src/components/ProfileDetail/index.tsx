import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Prestador } from "../../api/ApiService";
import { styles } from "./styles";

interface ProfileDetailProps {
  data?: Prestador[];
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ data }) => (
  <View style={styles.header}>
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.header}>
          <View style={styles.imagemContainer}>
            <Image
              source={{ uri: item.avatarUrl }}
              style={styles.imagemPerfil}
            />
          </View>
          <View style={styles.textoContainer}>
            <Text style={{ fontSize: 25 }}>{item.nome}</Text>
            <Text style={{ fontSize: 14, color: "#64748B" }}>
              Alcance de atuação: área de {item.raioDeAlcance / 1000}km
            </Text>
            <Text style={{ marginTop: 5, fontSize: 18 }}>
              <Ionicons name="star" color={"#DAA520"} size={18} />{" "}
              {item.mediaEstrelas} ({item.avaliacoes.length})
            </Text>
          </View>
        </View>
      )}
    />
  </View>
);

export default ProfileDetail;
