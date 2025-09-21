import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../lib/theme";
import PrimaryButton from "../components/PrimaryButton";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../lib/firebaseConfig";

export default function SignupScreen() {
  const navigation: any = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }
    if (!termsAccepted) {
      alert("Você deve aceitar os Termos de Serviço e Políticas de Privacidade.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (name) {
        await updateProfile(userCredential.user, { displayName: name });
      }
      console.log("Usuário criado:", userCredential.user);
      navigation.replace("Login");
    } catch (error: any) {
      console.log("Erro ao criar conta:", error.message);
      alert("Erro: " + error.message);
    }
  };

  const handleLinkPress = async () => {
    
    const url = 'https://drive.google.com/file/d/1VMKdHuyyylPJCreyKtB_aTXY3M8KWFGK/view?usp=drive_link';

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log(`Não é possível abrir o link: ${url}`);
        alert("Não foi possível abrir o documento. Verifique sua conexão ou tente novamente mais tarde.");
      }
    } catch (error) {
      console.error("Erro ao abrir o link:", error);
      alert("Ocorreu um erro ao tentar abrir o documento.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../img/Logo1.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoTitle}>Criar Conta</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder="Nome"
          placeholderTextColor={theme.colors.gray}
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
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
        <PrimaryButton title="Criar Conta" onPress={handleSignup} />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setTermsAccepted(!termsAccepted)}
          >
            {termsAccepted && <View style={styles.checkboxInner} />}
          </TouchableOpacity>
          <Text style={styles.termsText}>
            Eu aceito os{" "}
            <Text
              style={styles.linkText}
              onPress={handleLinkPress}
            >
              Termos de serviço
            </Text>{" "}
            e{"\n"}
            <Text
              style={styles.linkText}
              onPress={handleLinkPress}
            >
              Políticas de privacidade
            </Text>
          </Text>
        </View>

        <View style={styles.linkContainer}>
          <Text style={styles.alreadyHaveAccountText}>Já tenho conta.</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLink}> Fazer login.</Text>
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
    justifyContent: "space-between",
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
    backgroundColor: "transparent",
    padding: 12,
    borderBottomColor: theme.colors.accent,
    borderBottomWidth: 2,
    marginBottom: 24,
    color: theme.colors.textPrimary,
  },
  bottomContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: theme.colors.primary,
  },
  termsText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  linkText: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  alreadyHaveAccountText: {
    color: theme.colors.gray,
    fontSize: 14,
  },
  loginLink: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: 14,
  },
});