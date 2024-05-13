import { View, Text } from "react-native";

import { styles } from "./styles";
import { Mensagem } from "../../api/ApiService";
import { formatTime } from "../../api/helpers/DateHelper";
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
      <Text style={(styles.hour, isMy ? styles.myHour : styles.friendHour)}>
        {formatTime(item.enviadoEm)}
      </Text>
    </View>
  );
}
