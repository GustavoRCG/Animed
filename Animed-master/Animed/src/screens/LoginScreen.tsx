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
import { theme } from "../lib/theme";
import PrimaryButton from "../components/PrimaryButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebaseConfig";
import { Logo1 } from "src/convex/_generated/assets";



export default function LoginScreen() {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <View style={styles.container}>
      
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
          placeholderTextColor={theme.colors.gray} 
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        
        <TextInput
          placeholder="Senha"
          placeholderTextColor={theme.colors.gray} 
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />


        <PrimaryButton title="Acessar" onPress={handleLogin} />

        
        <View style={styles.linkContainer}>
          <Text style={styles.textLink}>Não tenho conta.</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.link}> Criar conta agora.</Text>
          </TouchableOpacity>
        </View>
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
    color: theme.colors.primaryDark,
    fontWeight: "800",
  },
  form: { 
    width: "100%", 
    marginTop: 30,
  },
  input: {
    backgroundColor: 'transparent', 
    padding: 12,
    borderBottomColor: theme.colors.accent, 
    borderBottomWidth: 2, 
    marginBottom: 24, 
    color: theme.colors.textPrimary, 
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  textLink: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  link: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
});