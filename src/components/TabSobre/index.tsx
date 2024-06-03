import React from "react";
import { View, Text, FlatList } from "react-native";
import { Prestador } from "../../api/ApiService";
import { styles } from "./styles";

interface TabSobreProps {
  prestadores?: Prestador[];
}

const TabSobre: React.FC<TabSobreProps> = ({ prestadores }) => (
  <View style={styles.tabView}>
    {prestadores?.map((prestador, index) => (
      <Text key={index}>{prestador.sobre}</Text>
    ))}
    <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
      Habilidades
    </Text>
    <View style={styles.imagensContainer}>
      <FlatList
        data={prestadores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FlatList
            data={item.habilidades}
            keyExtractor={(habilidade) => habilidade.id.toString()}
            renderItem={({ item: habilidade }) => (
              <View style={styles.inputContainer}>
                <Text style={{ fontSize: 16 }}>{habilidade.nome}</Text>
              </View>
            )}
            horizontal
          />
        )}
      />
    </View>
  </View>
);

export default TabSobre;
