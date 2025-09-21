import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useReservations } from "../hooks/ReservationsProvider";
import { theme } from "../lib/theme";

// Importações dos ícones
import { FontAwesome5 } from '@expo/vector-icons';

export default function ReservationsScreen() {
  const { reservations, removeReservation } = useReservations();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Minhas Reservas</Text>
        
      
        <View style={styles.titleSeparator} />

        <FlatList
          data={reservations}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.vet}>Consulta - {item.vetName}</Text>
                <Text style={styles.service}>{item.serviceName}</Text>
                
                <View style={styles.infoRow}>
                  <FontAwesome5 name="calendar" size={16} color={theme.colors.primaryDark} />
                  <Text style={styles.date}>{item.dateISO}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <FontAwesome5 name="clock" size={16} color={theme.colors.primaryDark} />
                  <Text style={styles.time}>{item.time}</Text>
                </View>
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
            <Text style={{ color: theme.colors.gray, marginTop: 24, textAlign: 'center' }}>
              Nenhuma reserva
            </Text>
          )}
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
  title: { 
    fontSize: theme.typography.h2, 
    fontWeight: "700", 
    color: theme.colors.primaryDark,
    textAlign: 'center',
  },
  
  titleSeparator: {
    height: 1,
    backgroundColor: theme.colors.border,
    opacity: 0.5,
    marginTop: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: theme.colors.surface,
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  vet: { 
    fontWeight: "700",
    fontSize: theme.typography.h3,
    color: theme.colors.textPrimary
  },
  service: { 
    color: theme.colors.gray, 
    marginBottom: 8 
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  date: { 
    color: theme.colors.gray, 
    marginLeft: 8 
  },
  time: {
    color: theme.colors.gray,
    marginLeft: 8
  },
  cancel: {
    backgroundColor: theme.colors.danger,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cancelText: { 
    color: "white", 
    fontWeight: "700" 
  },
});