import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import VetCard from "../components/VetCard";
import { theme } from "../lib/theme";
import { getVets } from "../data/api"; // sua função real da API
import { Logo3 } from "src/convex/_generated/assets";


export type RootStackParamList = {
  Vets: undefined;
  Services: { vet: any };
};

type VetsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Vets"
>;

const vetsMockData = [
  { id: 1, nome: "Dra. Ana Silva", especialidade: "Clínica Geral", avatar: "https://i.pravatar.cc/150?img=1", services: [{ id: "s1", name: "Consulta", price: "R$ 300,00" }, { id: "s5", name: "Exame de Sangue", price: "R$ 150,00" }] },
  { id: 2, nome: "Dr. Carlos Souza", especialidade: "Cirurgia de Pequenos Animais", avatar: "https://i.pravatar.cc/150?img=2", services: [{ id: "s1", name: "Consulta", price: "R$ 300,00" }, { id: "s6", name: "Cirurgia de Castração", price: "R$ 800,00" }, { id: "s7", name: "Remoção de Tumores", price: "R$ 2.500,00" }] },
  { id: 3, nome: "Dra. Marina Oliveira", especialidade: "Dermatologia Veterinária", avatar: "https://i.pravatar.cc/150?img=3", services: [{ id: "s1", name: "Consulta", price: "R$ 300,00" }, { id: "s8", name: "Tratamento de Alergias", price: "R$ 250,00" }, { id: "s9", name: "Biopsia de Pele", price: "R$ 400,00" }] },
  { id: 4, nome: "Dr. Bruno Lima", especialidade: "Cardiologia Veterinária", avatar: "https://i.pravatar.cc/150?img=4", services: [{ id: "s1", name: "Consulta", price: "R$ 300,00" }, { id: "s10", name: "Ecocardiograma", price: "R$ 600,00" }] },
  { id: 5, nome: "Dra. Letícia Santos", especialidade: "Oftalmologia Veterinária", avatar: "https://i.pravatar.cc/150?img=5", services: [{ id: "s1", name: "Consulta", price: "R$ 300,00" }, { id: "s11", name: "Exame de Retina", price: "R$ 350,00" }] },
  { id: 6, nome: "Dr. Rafael Costa", especialidade: "Neurologia Veterinária", avatar: "https://i.pravatar.cc/150?img=6", services: [{ id: "s1", name: "Consulta", price: "R$ 300,00" }, { id: "s12", name: "Ressonância Magnética", price: "R$ 1.500,00" }] },
  { id: 7, nome: "Dra. Juliana Pereira", especialidade: "Odontologia Veterinária", avatar: "https://i.pravatar.cc/150?img=7", services: [{ id: "s1", name: "Consulta", price: "R$ 300,00" }, { id: "s13", name: "Limpeza de Tártaro", price: "R$ 450,00" }] },
  { id: 8, nome: "Dr. Gustavo Fernandes", especialidade: "Endocrinologia Veterinária", avatar: "https://i.pravatar.cc/150?img=8", services: [{ id: "s1", name: "Consulta", price: "R$ 300,00" }, { id: "s14", name: "Controle Hormonal", price: "R$ 200,00" }] },
  { id: 9, nome: "Dra. Camila Rocha", especialidade: "Reprodução Animal", avatar: "https://i.pravatar.cc/150?img=9", services: [{ id: "s1", name: "Consulta", price: "R$ 300,00" }, { id: "s15", name: "Inseminação Artificial", price: "R$ 700,00" }] },
  { id: 10, nome: "Dr. Felipe Martins", especialidade: "Oncologia Veterinária", avatar: "https://i.pravatar.cc/150?img=10", services: [{ id: "s1", name: "Consulta", price: "R$ 300,00" }, { id: "s16", name: "Quimioterapia", price: "R$ 900,00" }] },
  { id: 11, nome: "Dra. Patrícia Ramos", especialidade: "Radiologia Veterinária", avatar: "https://i.pravatar.cc/150?img=11", services: [{ id: "s1", name: "Consulta", price: "R$ 300,00" }, { id: "s17", name: "Raio-X", price: "R$ 180,00" }] },
  { id: 12, nome: "Dr. Leonardo Alves", especialidade: "Medicina Interna", avatar: "https://i.pravatar.cc/150?img=12", services: [{ id: "s1", name: "Consulta", price: "R$ 300,00" }, { id: "s18", name: "Ultrassonografia", price: "R$ 250,00" }] },
];


export default function VetsScreen() {
  const navigation = useNavigation<VetsScreenNavigationProp>();
  const [vets, setVets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
     
      const data = await getVets();
      setVets(data);
      setError(null);
    } catch (err: any) {
      console.warn("[getVets] Falha ao buscar veterinários da API, usando mocks", err);
      
      setVets(vetsMockData);
      setError("Não foi possível carregar da API, exibindo dados de teste.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading && vets.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color={theme.colors.primaryDark} />
        <Text style={{ textAlign: "center", marginTop: 8 }}>
          Carregando veterinários...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.appHeader}>
          <Image source={Logo3} style={styles.logo} />
        </View>

        <Text style={styles.headerTitle}>
          Agende as consultas para o seu Pet
        </Text>

        {error && (
          <Text style={{ color: "red", textAlign: "center", marginBottom: 12 }}>
            {error}
          </Text>
        )}

        <FlatList
          data={vets}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <VetCard
              name={item.nome}
              specialty={item.especialidade}
              avatarUrl={item.avatar}
              onPress={() => navigation.navigate("Services", { vet: item })}
            />
          )}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchData} />
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  appHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  logo: {
    width: 130,
    height: 60,
    resizeMode: "contain",
  },
  headerTitle: {
    fontSize: theme.typography.h2,
    fontWeight: "700",
    color: theme.colors.primaryDark,
    textAlign: "center",
    marginBottom: 10,
  },
  flatListContent: {
    paddingBottom: 20,
  },
});