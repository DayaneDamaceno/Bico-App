import { useState, useEffect } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { Acordo, Mensagem } from "../api/ApiService";
import { useAuth } from "../contexts/AuthContext";

type UseChatConnectionProps = {
  onNewMessage: (message: Mensagem) => void;
  onReadMessage: (messagesIds: number[]) => void;
  onUpdateAcordo: (acordo: Acordo) => void;
};

export function useChatConnection({
  onNewMessage,
  onReadMessage,
  onUpdateAcordo,
}: UseChatConnectionProps) {
  const { user } = useAuth();
  const [connection, setConnection] = useState<HubConnection | null>(null);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  // const apiUrl = "https://bico-api-hml.azurewebsites.net";

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

      connection.on("ReceiveMessage", (message) => {
        onNewMessage(message);
      });

      connection.on("ReceiveReadingUpdate", (messagesIds) => {
        onReadMessage(messagesIds);
      });

      connection.on("UpdateAcordo", (acordo: Acordo) => {
        onUpdateAcordo(acordo);
      });

      setConnection(connection);
    }

    return () => {
      connection?.stop();
    };
  }, [user?.token]);
}
