import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import ServiceCard from "../components/ServiceCard.tsx";
import { theme } from "../../src/lib/theme.ts";

const SERVICES = [
  { id: "s1", name: "Consulta", price: "R$ 300,00" },
  { id: "s2", name: "Drenagem Linf�tica", price: "R$ 450,00" },
  { id: "s3", name: "Lipoaspira��o", price: "R$ 3.000,00" },
  { id: "s4", name: "Mamoplastia", price: "R$ 270,00" },
];

export default function ServicesScreen() {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const vet = route.params?.vet ?? {
    name: "Dra. Nise da Silveira",
    profession: "Medicina veterin�ria",
    avatar: null,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ fontSize: 20 }}>{"�"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Servi�os</Text>
      </View>

      <View style={styles.heroCard}>
        <View style={styles.avatarWrap}>
          <Image
            source={{
              uri:
                vet.avatar ||
                "https://api.a0.dev/assets/image?text=avatar&aspect=1:1",
            }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.vetName}>{vet.name}</Text>
        <Text style={styles.vetProf}>{vet.profession}</Text>
      </View>

      <View style={styles.servicesList}>
        <FlatList
          data={SERVICES}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <ServiceCard
              name={item.name}
              price={item.price}
              onPress={() =>
                navigation.navigate("Schedule", { vet, service: item })
              }
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: {
    height: 60,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  back: { position: "absolute", left: 12, top: 14, padding: 8 },
  headerTitle: {
    color: "white",
    fontWeight: "800",
    fontSize: theme.typography.h2,
  },
  heroCard: {
    backgroundColor: theme.colors.primary,
    paddingTop: 18,
    paddingBottom: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#0f6f0f",
  },
  avatarWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  avatar: { width: 64, height: 64, borderRadius: 32 },
  vetName: { color: "white", fontWeight: "800" },
  vetProf: { color: "white", marginTop: 4, opacity: 0.95 },
  servicesList: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    marginTop: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
  },
});
