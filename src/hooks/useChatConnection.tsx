import { useState, useEffect } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { Mensagem } from "../api/ApiService";
import { useAuth } from "../contexts/AuthContext";

type UseChatConnectionProps = {
  onNewMessage: (message: Mensagem) => void;
  onReadMessage: (messageId: number) => void;
};

export function useChatConnection({
  onNewMessage,
  onReadMessage,
}: UseChatConnectionProps) {
  const { user } = useAuth();
  const [connection, setConnection] = useState<HubConnection | null>(null);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    if (user?.token) {
      const connection = new HubConnectionBuilder()
        .withUrl(`${apiUrl}/hub/chat`, {
          accessTokenFactory: () => user.token,
        })
        .configureLogging(LogLevel.Information)
        .build();

      connection
        .start()
        .then(() => console.log("Connected!"))
        .catch((err) => console.error("Connection failed: ", err));

      connection.on("ReceiveMessage", (message: Mensagem) => {
        console.log("Received message: ", message);
        onNewMessage({
          ...message,
          id: Date.now() + Math.random(),
          enviadoEm: new Date(message.enviadoEm),
        });
      });

      connection.on("ReceiveReadingUpdate", (messageId) => {
        console.log(
          `Message with ID ${messageId} send by ${user.id} has been read.`
        );
        onReadMessage(messageId);
      });

      setConnection(connection);
    }

    return () => {
      connection?.stop();
    };
  }, [user?.token]);
}
