import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Text,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import { SpeechBubble } from "../../components/SpeechBubble";
import {
  Mensagem,
  enviarMensagem,
  marcarMensagensComoLida,
  obterMensagemDeUmaConversa,
} from "../../api/ApiService";
import { RootStackParamList } from "../../navigations/ChatStackNavigation";
import { useAuth } from "../../contexts/AuthContext";
import { useQuery } from "react-query";
import { useChatConnection } from "../../hooks/useChatConnection";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useHideTabBar } from "../../hooks/useHideTabBar";
import { useKeyboardOffset } from "../../hooks/useKeyboardOffset";

type ChatScreenProps = NativeStackScreenProps<RootStackParamList, "Chat">;

export function ChatScreen(props: Readonly<ChatScreenProps>) {
  const { friendId } = props.route.params;
  const { user } = useAuth();
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [message, setMessage] = useState("");
  const [sendIsEnabled, setSendIsEnabled] = useState(false);
  const [actionIsVisible, setActionIsVisible] = useState(false);
  const { keyboardIsVisible } = useKeyboardOffset();
  const isFocused = useIsFocused();
  const wasFocused = useRef(false);
  useHideTabBar(props.navigation);

  useEffect(() => {
    const unreadMessages = mensagens
      .filter((x) => !x.mensagemLida && x.remetenteId != user?.id)
      .map((x) => x.id);
    if (isFocused && unreadMessages.length > 0) {
      console.log("unread", unreadMessages);
      marcarMensagensComoLida(unreadMessages);
      setMensagens((prevMessages) =>
        prevMessages.map((message) =>
          unreadMessages.includes(message.id)
            ? { ...message, mensagemLida: true }
            : message
        )
      );
    }
    if (isFocused) {
      refetch();
      setActionIsVisible(false);
    }
  }, [isFocused, mensagens]);

  useEffect(() => {
    if (isFocused) {
      refetch();
      setActionIsVisible(false);
    }
  }, [isFocused]);

  useChatConnection({
    onNewMessage: (messageReceived) => {
      setMensagens((prevState) => [messageReceived, ...prevState]);
    },
    onReadMessage: (messagesIds) => {
      setMensagens((prevMessages) =>
        prevMessages.map((message) =>
          messagesIds.includes(message.id)
            ? { ...message, mensagemLida: true }
            : message
        )
      );
    },
    onUpdateAcordo: (acordo) => {
      setMensagens((prevMessages) =>
        prevMessages.map((message) =>
          acordo.mensagemId == message.id ? { ...message, acordo } : message
        )
      );
    },
  });

  const { isLoading, refetch } = useQuery(
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
        id: mensagens[0].id + 1,
        remetenteId: user!.id,
        destinatarioId: friendId,
        conteudo: message,
        enviadoEm: new Date(Date.now()),
        mensagemLida: false,
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
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
      {isLoading && <ActivityIndicator />}

      <View
        style={[
          styles.footer,
          {
            marginBottom: keyboardIsVisible ? 86 : 0,
            paddingBottom: Platform.OS === "ios" ? 28 : 0,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => setActionIsVisible((prev) => !prev)}
        >
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
      {actionIsVisible && (
        <View
          style={[
            styles.actions,
            { paddingBottom: Platform.OS === "ios" ? 28 : 0 },
          ]}
        >
          <TouchableOpacity
            style={styles.action}
            onPress={() => props.navigation.navigate("Acordo", { friendId })}
          >
            <FontAwesome name="handshake-o" size={24} color="#007AF8" />
            <Text style={styles.actionText}>Acordo</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
