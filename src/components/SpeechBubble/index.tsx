import { View, Text } from "react-native";

import { styles } from "./styles";
import { Mensagem } from "../../api/ApiService";
import { formatTime } from "../../api/helpers/DateHelper";
import { Ionicons } from "@expo/vector-icons";

interface SpeechBubbleProps {
  isMy: boolean;
  item: Mensagem;
}

export function SpeechBubble({ item, isMy }: Readonly<SpeechBubbleProps>) {
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
        <Text
          style={[
            styles.textMessage,
            isMy ? styles.myTextMessage : styles.friendTextMessage,
          ]}
        >
          {item.conteudo}
        </Text>
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
