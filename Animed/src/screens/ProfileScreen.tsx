import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../src/lib/theme.ts";
import PrimaryButton from "../components/PrimaryButton";

export default function ProfileScreen() {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.value}>Adrian Henrique</Text>
        <Text style={[styles.label, { marginTop: 12 }]}>E-mail</Text>
        <Text style={styles.value}>heben99@coders.com.br</Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <PrimaryButton
          title="Sair"
          onPress={() => navigation.replace("Login")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: theme.colors.background },
  title: { fontSize: theme.typography.h2, fontWeight: "800" },
  card: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  label: { color: theme.colors.gray, fontSize: 12 },
  value: { fontWeight: "700", marginTop: 6 },
});
