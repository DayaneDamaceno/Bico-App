import { useState, useEffect } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { Mensagem } from "../api/ApiService";
import { useAuth } from "../contexts/AuthContext";

type UseChatConnectionProps = {
  friendId: number;
  onNewMessage: (message: Mensagem) => void;
};

export function useChatConnection({
  friendId,
  onNewMessage,
}: UseChatConnectionProps) {
  const { user } = useAuth();
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    if (user?.token) {
      const newConnection = new HubConnectionBuilder()
        .withUrl(`http://192.168.0.8:5283/hub/chat`, {
          accessTokenFactory: () => user.token,
        })
        .configureLogging(LogLevel.Information)
        .build();

      newConnection
        .start()
        .then(() => console.log("Connected!"))
        .catch((err) => console.error("Connection failed: ", err));

      newConnection.on("ReceiveMessage", (message: Mensagem) => {
        console.log("Received message: ", message);
        onNewMessage({
          ...message,
          id: Date.now() + Math.random(),
          enviadoEm: new Date(message.enviadoEm),
        });
      });

      setConnection(newConnection);
    }

    return () => {
      connection?.stop();
    };
  }, [user?.token]);
}
