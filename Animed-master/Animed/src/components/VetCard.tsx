import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { theme } from "../lib/theme";

export default function VetCard({
  name,
  specialty,
  avatarUrl,
  onPress,
}: {
  name: string;
  specialty: string;
  avatarUrl: string;
  onPress?: () => void;
}) {


  return (
    <View style={styles.card}>
      <Image
        source={{ uri: avatarUrl }}
        style={styles.avatar}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.specialty}>{specialty}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Serviços</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    padding: 12,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginRight: 12,
  },
  name: {
    fontWeight: "700",
    fontSize: theme.typography.body,
    color: theme.colors.text,
  },
  specialty: {
    color: theme.colors.gray,
    fontSize: theme.typography.small,
    marginTop: 2,
  },
  button: {
    backgroundColor: theme.colors.primaryDark,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
