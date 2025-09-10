import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useReservations } from "../hooks/ReservationsProvider";
import { theme } from "../../src/lib/theme.ts";

export default function ReservationsScreen() {
  const { reservations, removeReservation } = useReservations();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Reservas</Text>
      <FlatList
        data={reservations}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.vet}>{item.vetName}</Text>
              <Text style={styles.service}>{item.serviceName}</Text>
              <Text style={styles.date}>
                {item.dateISO} � {item.time}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.cancel}
              onPress={() => removeReservation(item.id)}
            >
              <Text style={styles.cancelText}>Cancelar Reserva</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={{ color: theme.colors.gray, marginTop: 24 }}>
            Nenhuma reserva
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: theme.colors.background },
  title: { fontSize: theme.typography.h2, fontWeight: "700" },
  card: {
    backgroundColor: theme.colors.surface,
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  vet: { fontWeight: "700" },
  service: { color: theme.colors.gray },
  date: { color: theme.colors.gray, marginTop: 6 },
  cancel: {
    backgroundColor: theme.colors.danger,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cancelText: { color: "white", fontWeight: "700" },
});
