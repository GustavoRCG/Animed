import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../src/lib/theme.ts";
import PrimaryButton from "../components/PrimaryButton";

export default function LoginScreen() {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Animed</Text>
      <View style={styles.form}>
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
          title="Acessar"
          onPress={() => navigation.replace("Main")}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Signup")}
          style={{ marginTop: 12 }}
        >
          <Text style={styles.link}>N�o tenho conta. Criar conta agora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    padding: 24,
  },
  logo: {
    fontSize: 28,
    color: theme.colors.primaryDark,
    fontWeight: "800",
    marginTop: 40,
  },
  form: { width: "100%", marginTop: 30 },
  input: {
    backgroundColor: theme.colors.surface,
    padding: 12,
    borderRadius: theme.radii.sm,
    marginBottom: 12,
  },
  link: { color: theme.colors.primaryDark, textAlign: "center" },
});
