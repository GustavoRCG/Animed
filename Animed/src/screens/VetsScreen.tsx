import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import VetCard from "../components/VetCard";
import { theme } from "../../src/lib/theme.ts";

const VETS = [
  { id: "1", name: "Dr. Gustavo", specialty: "Cirurgia de Pequenos Animais" },
  { id: "2", name: "Dra. Ana Beatriz", specialty: "Cardiologia Veterin�ria" },
  { id: "3", name: "Dr. Ant�nio", specialty: "Dermatologia Veterin�ria" },
];

export default function VetsScreen() {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Agende suas consultas para seus Pets</Text>
      <FlatList
        data={VETS}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <VetCard
            name={item.name}
            specialty={item.specialty}
            onPress={() => navigation.navigate("Services", { vet: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: theme.colors.background },
  header: {
    fontSize: theme.typography.h2,
    fontWeight: "700",
    marginBottom: 12,
    color: theme.colors.text,
  },
});
