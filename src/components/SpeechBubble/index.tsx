import { View, Text, TouchableOpacity } from "react-native";

import { styles } from "./styles";
import { Mensagem, responderAcordo } from "../../api/ApiService";
import { formatTime } from "../../api/helpers/DateHelper";
import { Ionicons } from "@expo/vector-icons";
import { formatCurrency } from "../../api/helpers/CurrencyHelper";
import { FontAwesome5, FontAwesome6, Feather } from "@expo/vector-icons";

interface SpeechBubbleProps {
  isMy: boolean;
  item: Mensagem;
}

export function SpeechBubble({ item, isMy }: Readonly<SpeechBubbleProps>) {
  const handleRespostaAcordo = async (aceito: boolean) => {
    if (item.acordo?.id) {
      await responderAcordo(item.acordo?.id, aceito);
    }
  };
  return (
    <View
      key={item.id}
      style={isMy ? styles.myBubbleContainer : styles.friendBubbleContainer}
    >
      <View
        style={[styles.bubble, isMy ? styles.myBubble : styles.friendBubble]}
      >
        <View
          style={[
            styles.triangle,
            isMy ? styles.myTriangle : styles.friendTriangle,
          ]}
        />
        {item.acordo && (
          <Text style={[styles.title, isMy && styles.myTitle]}>Acordo</Text>
        )}

        <Text
          style={[
            styles.textMessage,
            isMy ? styles.myTextMessage : styles.friendTextMessage,
          ]}
        >
          {item.conteudo}
        </Text>
        {item.acordo?.valor && (
          <Text style={[styles.price, isMy && styles.myPrice]}>
            Valor: {formatCurrency(item.acordo?.valor)}
          </Text>
        )}

        {item.acordo && !isMy && item.acordo?.resposta == null && (
          <View style={styles.optionsAcordo}>
            <TouchableOpacity
              style={styles.aceitar}
              onPress={() => handleRespostaAcordo(true)}
            >
              <FontAwesome5 name="check-circle" size={18} color="#FFF" />
              <Text style={styles.btnText}>Aceitar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.recusar}
              onPress={() => handleRespostaAcordo(false)}
            >
              <FontAwesome6 name="circle-xmark" size={18} color="#FFF" />
              <Text style={styles.btnText}>Recusar</Text>
            </TouchableOpacity>
          </View>
        )}

        {item.acordo && isMy && item.acordo?.resposta == null && (
          <View style={styles.optionsAcordo}>
            <Feather name="clock" size={16} color="#FFF" />
            <Text style={styles.myTitle}>Aguardando resposta</Text>
          </View>
        )}
      </View>
      <View
        style={[styles.footer, isMy ? styles.myFooter : styles.friendFooter]}
      >
        {item.mensagemLida && isMy && (
          <Ionicons name="checkmark-done" size={14} color="#007AF8" />
        )}
        <Text style={[styles.hour, isMy ? styles.myHour : styles.friendHour]}>
          {formatTime(item.enviadoEm)}
        </Text>
      </View>
    </View>
  );
}
