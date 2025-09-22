import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebaseConfig";
import { Logo1 } from "src/convex/_generated/assets";

import { useTheme } from "../components/ThemeContext";
import { theme } from "../lib/theme";
import PrimaryButton from "../components/PrimaryButton";


export default function LoginScreen() {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme: appTheme } = useTheme();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuário logado:", userCredential.user);
      navigation.replace("Main");
    } catch (error: any) {
      console.log("Erro no login:", error.message);
      alert("Erro: " + error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors[appTheme].background }]}>
      
      <View style={styles.logoContainer}>
      
        <Image
          source={Logo1}
          style={styles.logo}
          resizeMode="contain"
        />
        
      </View>

      <View style={styles.form}>
      
        <TextInput
          placeholder="E-mail"
          placeholderTextColor={theme.colors[appTheme].gray} 
          value={email}
          onChangeText={setEmail}
          style={[styles.input, { 
            color: theme.colors[appTheme].textPrimary, 
            borderBottomColor: theme.colors[appTheme].accent 
          }]}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        
        <TextInput
          placeholder="Senha"
          placeholderTextColor={theme.colors[appTheme].gray} 
          value={password}
          onChangeText={setPassword}
          style={[styles.input, { 
            color: theme.colors[appTheme].textPrimary, 
            borderBottomColor: theme.colors[appTheme].accent 
          }]}
          secureTextEntry
        />


        <PrimaryButton title="Acessar" onPress={handleLogin} />

        
        <View style={styles.linkContainer}>
          <Text style={[styles.textLink, { color: theme.colors[appTheme].textSecondary }]}>
            Não tenho conta.
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={[styles.link, { color: theme.colors[appTheme].primary }]}> 
              Criar conta agora.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  logoTitle: {
    fontSize: 28,
    // Este estilo só será visível se você tiver um <Text> com este estilo
    // A cor agora é dinâmica, baseada no tema
    color: 'black', 
    fontWeight: "800",
  },
  form: { 
    width: "100%", 
    marginTop: 30,
  },
  input: {
    backgroundColor: 'transparent', 
    padding: 12,
    borderBottomWidth: 2, 
    marginBottom: 24, 
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  textLink: {
    fontSize: 14,
  },
  link: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});