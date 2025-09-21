import { Platform } from "react-native";

const PORT = 3333;

/**
 * Se estiver usando celular físico, coloque o IP local do PC na mesma rede Wi-Fi.
 * Ex.: "192.168.18.11"
 * Deixe vazio para Web/Emulador
 */
const FORCE_LAN_IP = "192.168.18.11"; 

const isWeb = Platform.OS === "web";
const isAndroid = Platform.OS === "android";
const isIOS = Platform.OS === "ios";

function resolveHost() {
  if (FORCE_LAN_IP) return FORCE_LAN_IP;        // celular físico
  if (isWeb) return "localhost";                // Web
  if (isAndroid) return "10.0.2.2";             // Android Emulator
  if (isIOS) return "localhost";                // iOS Simulator
  return "localhost";                            // fallback
}

export const API_URL = `http://${resolveHost()}:${PORT}`;
console.log("[API_URL]", API_URL);

export const APP_NAME = "Animed";
export const APP_VERSION = "0.0.1";
