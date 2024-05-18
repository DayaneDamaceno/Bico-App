import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, FlatList, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import React, { useEffect, useState } from "react";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import { SpeechBubble } from "../../components/SpeechBubble";
import {
  Mensagem,
  enviarMensagem,
  obterMensagemDeUmaConversa,
} from "../../api/ApiService";
import { RootStackParamList } from "../../navigations/ChatStackNavigation";
import { useAuth } from "../../contexts/AuthContext";
import { useQuery } from "react-query";
import { useChatConnection } from "../../hooks/useChatConnection";

type ChatScreenProps = NativeStackScreenProps<RootStackParamList, "Chat">;

export function ChatScreen(props: Readonly<ChatScreenProps>) {
  const { friendId } = props.route.params;
  const { user } = useAuth();
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [message, setMessage] = useState("");
  const [sendIsEnabled, setSendIsEnabled] = useState(false);

  useChatConnection({
    friendId,
    onNewMessage: (messageReceived) => {
      setMensagens((prevState) => [messageReceived, ...prevState]);
    },
  });

  const { isLoading } = useQuery(
    `conversa_${user?.id}_${friendId}`,
    async () => await obterMensagemDeUmaConversa(user?.id ?? 0, friendId),
    {
      onSuccess: (data) => {
        setMensagens(data);
      },
    }
  );

  async function sendMessage() {
    if (message.trim().length > 0) {
      const newMessage: Mensagem = {
        id: Date.now() + Math.random(),
        remetenteId: user!.id,
        destinatarioId: friendId,
        conteudo: message,
        enviadoEm: new Date(Date.now()),
      };

      setMensagens((prevState) => [newMessage, ...prevState]);
      await enviarMensagem(newMessage);
      setMessage("");
      setSendIsEnabled(false);
    }
  }

  function handleMessageTextChange(text: string) {
    setMessage(text);

    if (text.trim().length > 0) {
      setSendIsEnabled(true);
    } else {
      setSendIsEnabled(false);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={mensagens}
        keyExtractor={(item) => item.id.toString()}
        inverted
        renderItem={({ item, index }) => (
          <SpeechBubble
            key={index}
            isMy={item.remetenteId == user?.id}
            item={item}
          />
        )}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.plusButton}>
          <Feather name="plus" size={30} color="#FFF" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          onChangeText={handleMessageTextChange}
          value={message}
        />

        <TouchableOpacity
          style={sendIsEnabled ? styles.hide : styles.btnAction}
        >
          <Ionicons name="camera" size={32} color="#007AF8" />
        </TouchableOpacity>
        <TouchableOpacity
          style={sendIsEnabled ? styles.hide : styles.btnAction}
        >
          <FontAwesome name="microphone" size={32} color="#007AF8" />
        </TouchableOpacity>
        <TouchableOpacity
          style={sendIsEnabled ? styles.send : styles.hide}
          activeOpacity={0.7}
          onPress={sendMessage}
        >
          <Ionicons name="send" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
