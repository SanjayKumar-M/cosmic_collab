"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const Socketclient = (props) => {
  const { children } = props;
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const connection = io();
    console.log("socket connection", connection);
    setSocket(connection);
  }, []);

  useEffect(() => {
    socket?.on('connect_error', async (err) => {
      console.log("Error establishing socket", err);
      await fetch('/api/socket');
    });

    return () => {
      // Disconnect the socket when the component unmounts
      socket?.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
