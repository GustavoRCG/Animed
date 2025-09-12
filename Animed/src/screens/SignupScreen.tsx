import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../src/lib/theme.ts";
import PrimaryButton from "../components/PrimaryButton";

export default function SignupScreen() {
  const navigation: any = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <View style={{ width: "100%", marginTop: 16 }}>
        <TextInput
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        <PrimaryButton
          title="Criar Conta"
          onPress={() => navigation.replace("Login")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: theme.colors.background },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: theme.colors.primaryDark,
    marginTop: 40,
  },
  input: {
    backgroundColor: theme.colors.surface,
    padding: 12,
    borderRadius: theme.radii.sm,
    marginBottom: 12,
  },
});
