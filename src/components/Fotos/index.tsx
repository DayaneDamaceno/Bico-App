import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import { Prestador } from "../../api/ApiService";
import { styles } from "./styles";

interface FotosProps {
  data?: Prestador[];
}

const Fotos: React.FC<FotosProps> = ({ data }) => (
  <View style={styles.fotosServico}>
    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Fotos</Text>
    <View style={styles.imagensContainer}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FlatList
            data={item.fotosServico}
            keyExtractor={(foto) => foto.id.toString()}
            renderItem={({ item: foto }) => (
              <Image source={{ uri: foto.foto }} style={styles.imagem} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      />
    </View>
  </View>
);

export default Fotos;
