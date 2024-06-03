import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { Prestador } from "../../api/ApiService";
import { styles } from "./styles";
import StarRating from "../StarRating";

interface TabAvaliacoesProps {
  prestadores?: Prestador[];
}

const TabAvaliacoes: React.FC<TabAvaliacoesProps> = ({ prestadores }) => (
  <View style={styles.tabView}>
    <FlatList
      data={prestadores}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View>
          <View style={styles.headerAvaliacao}>
            <View style={styles.imagemContainer}>
              <Text style={{ fontSize: 40, fontWeight: "bold" }}>
                {item.mediaEstrelas}
              </Text>
            </View>
            <View style={styles.textoAvaliacao}>
              <StarRating rating={item.mediaEstrelas} />
              <Text style={{ marginTop: 1, fontSize: 15 }}>
                {item.avaliacoes.length} avaliações
              </Text>
            </View>
          </View>
          <FlatList
            data={item.avaliacoes}
            keyExtractor={(avaliacao) => avaliacao.id.toString()}
            renderItem={({ item: avaliacao }) => (
              <View style={styles.header}>
                <View>
                  <Image
                    source={{ uri: avaliacao.avatarUrl }}
                    style={styles.imagemAvaliacao}
                  />
                </View>
                <View style={styles.textoContainer}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {avaliacao.clienteNome}{" "}
                    <StarRating rating={avaliacao.quantidadeEstrelas} />
                  </Text>
                  <Text style={{ fontSize: 18 }}>{avaliacao.conteudo}</Text>
                </View>
              </View>
            )}
          />
        </View>
      )}
    />
  </View>
);

export default TabAvaliacoes;
