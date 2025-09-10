import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { theme } from "../../src/lib/theme.ts";
import PrimaryButton from "../components/PrimaryButton";
import { useReservations } from "../hooks/ReservationsProvider";

const MOCK_DAYS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25,
];
const MOCK_TIMES = ["09:00", "10:00", "11:00", "14:00", "15:00"];

export default function ScheduleScreen() {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const { addReservation } = useReservations();
  const vet = route.params?.vet ?? { name: "Dra. Nise da Silveira" };
  const service = route.params?.service ?? { name: "Consulta" };

  const [selectedDay, setSelectedDay] = useState<number>(22);
  const [time, setTime] = useState<string | null>(null);

  function confirm() {
    const dateISO = `2025-02-${String(selectedDay).padStart(2, "0")}`;
    addReservation({
      vetName: vet.name,
      serviceName: service.name,
      dateISO,
      time: time || MOCK_TIMES[0],
    });
    navigation.navigate("Main", { screen: "Calendar" });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ fontSize: 20 }}>{"�"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fazer uma reserva</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.vetTitle}>{vet.name}</Text>
        <View style={styles.calendarCard}>
          <Text style={styles.month}>FEVEREIRO</Text>
          <View style={styles.grid}>
            {MOCK_DAYS.map((d) => (
              <TouchableOpacity
                key={d}
                onPress={() => setSelectedDay(d)}
                style={[
                  styles.day,
                  selectedDay === d ? styles.dayActive : null,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    selectedDay === d ? styles.dayTextActive : null,
                  ]}
                >
                  {d}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.sectionLabel}>Hor�rio</Text>
        <View style={styles.timesRow}>
          {MOCK_TIMES.map((t) => (
            <TouchableOpacity
              key={t}
              style={[
                styles.timePill,
                time === t ? styles.timePillActive : null,
              ]}
              onPress={() => setTime(t)}
            >
              <Text
                style={[
                  styles.timeText,
                  time === t ? styles.timeTextActive : null,
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton title="Confirmar reserva" onPress={confirm} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "transparent",
  },
  back: { position: "absolute", left: 12, top: 14, padding: 8 },
  headerTitle: {
    color: theme.colors.primaryDark,
    fontWeight: "800",
    fontSize: theme.typography.h2,
  },
  content: { flex: 1, padding: 16 },
  vetTitle: { fontWeight: "700", color: theme.colors.text, marginBottom: 12 },
  calendarCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  month: { color: theme.colors.gray, fontWeight: "700", marginBottom: 12 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  day: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 6,
  },
  dayActive: {
    backgroundColor: theme.colors.primary,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    elevation: 3,
  },
  dayText: { color: theme.colors.text },
  dayTextActive: { color: "white", fontWeight: "700" },
  sectionLabel: {
    marginTop: 18,
    marginBottom: 8,
    color: theme.colors.gray,
    fontWeight: "700",
  },
  timesRow: { flexDirection: "row", flexWrap: "wrap" },
  timePill: {
    backgroundColor: theme.colors.surface,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  timePillActive: { backgroundColor: theme.colors.primaryDark },
  timeText: { color: theme.colors.text },
  timeTextActive: { color: "white", fontWeight: "700" },
  footer: { padding: 16, backgroundColor: "transparent" },
});
