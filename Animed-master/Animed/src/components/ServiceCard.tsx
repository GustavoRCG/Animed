import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../lib/theme";

export default function ServiceCard({
  name,
  price,
  onPress,
}: {
  name: string;
  price: string;
  onPress?: () => void;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Agendar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: theme.colors.surface,
    paddingVertical: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    
    // Estilos para dar o efeito de card
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    
    // Sombra para Android
    elevation: 5,
  },
  left: { flex: 1 },
  name: {
    fontWeight: "700",
    fontSize: theme.typography.body,
    color: theme.colors.text,
  },
  price: { color: theme.colors.primaryDark, marginTop: 6, fontSize: 13 },
  button: {
    backgroundColor: theme.colors.primaryDark,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { color: "white", fontWeight: "700" },
});