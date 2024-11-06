import React, { createContext, useContext, useState } from 'react';

const WebSocketContext = createContext();

export function WebSocketProvider({ children }) {
  const [webSockets] = useState({});

  const createWebSocket = (url) => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      console.log('Received message:', event.data);
      // Handle WebSocket messages here
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      // You can handle cleanup or reconnection logic here
    };

    ws.onerror = (error) => {
        console.log('Error:', error);
    }

    return ws;
  };

  const getWebSocket = (url) => {
    if (!webSockets[url]) {
      webSockets[url] = createWebSocket(url);
    }
    return webSockets[url];
  };

  return (
    <WebSocketContext.Provider value={{ getWebSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket(url) {
  const { getWebSocket } = useContext(WebSocketContext);
  return getWebSocket(url);
}
