import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../lib/firebaseConfig";
import PrimaryButton from "../components/PrimaryButton";


export default function ProfileScreen() {
  const navigation: any = useNavigation();
  const user = auth.currentUser;
  const [uploading, setUploading] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  // Carregar a foto salva localmente
  useEffect(() => {
    const loadPhoto = async () => {
      try {
        const uri = await AsyncStorage.getItem("@user_photo");
        if (uri) setPhotoUri(uri);
      } catch (e) {
        console.log("Erro ao carregar foto local:", e);
      }
    };
    loadPhoto();
  }, []);

  const handleChoosePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permissão necessária", "Precisamos de acesso à galeria para selecionar uma foto.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      const source = result.assets[0];
      if (source.uri) {
        setUploading(true);
        try {
          await AsyncStorage.setItem("@user_photo", source.uri);
          setPhotoUri(source.uri);
          Alert.alert("Sucesso", "Foto de perfil atualizada localmente!");
        } catch (e) {
          console.log("Erro ao salvar foto local:", e);
          Alert.alert("Erro", "Não foi possível salvar a foto.");
        } finally {
          setUploading(false);
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
      </View>

      <View style={styles.profileSection}>
        <TouchableOpacity style={styles.profileImageContainer} onPress={handleChoosePhoto} disabled={uploading}>
          {uploading ? (
            <ActivityIndicator size="large" color="#4caf50" />
          ) : photoUri ? (
            <Image style={styles.profileImage} source={{ uri: photoUri }} />
          ) : (
            <Ionicons name="person" size={80} color="#4caf50" />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.value}>{user?.displayName || "Nome não disponível"}</Text>
        <View style={styles.separator} />

        <Text style={styles.label}>E-mail</Text>
        <Text style={styles.value}>{user?.email || "E-mail não disponível"}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Sair"
          onPress={async () => {
            await auth.signOut();
            navigation.replace("Login");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { backgroundColor: "#32CD32", paddingTop: 50, paddingBottom: 20, alignItems: "center" },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  profileSection: { backgroundColor: "#32CD32", alignItems: "center", height: 100, position: "relative" },
  profileImageContainer: {
    width: 120, height: 120, borderRadius: 60, backgroundColor: "#d3d3d3",
    justifyContent: "center", alignItems: "center", position: "absolute", bottom: -60, alignSelf: "center",
  },
  profileImage: { width: 116, height: 116, borderRadius: 58, resizeMode: "cover", borderColor: "#fff", borderWidth: 2 },
  infoCard: {
    backgroundColor: "#fff", marginTop: 80, padding: 20, marginHorizontal: 16,
    borderRadius: 8, borderWidth: 1, borderColor: "#e0e0e0",
  },
  label: { fontSize: 14, color: "#888" },
  value: { fontSize: 16, fontWeight: "600", marginTop: 4, marginBottom: 10 },
  separator: { height: 1, backgroundColor: "#e0e0e0", marginVertical: 10 },
  buttonContainer: { paddingHorizontal: 16, marginTop: 30 },
});
