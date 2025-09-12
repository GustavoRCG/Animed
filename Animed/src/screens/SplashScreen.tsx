import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../src/lib/theme";

export default function SplashScreen() {
  const navigation: any = useNavigation();
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
    const t = setTimeout(() => navigation.replace("Login"), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <Image
          source={{ uri: "https://placekitten.com/200/200" }}
          style={styles.logo}
        />
        <Text style={styles.title}>Animed</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: theme.colors.surface,
    padding: 28,
    borderRadius: 18,
    alignItems: "center",
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: 8,
    borderRadius: 16,
  },
  title: {
    fontSize:
      typeof theme.typography.h1 === "number" ? theme.typography.h1 : 32,
    color: theme.colors.primaryDark,
    fontWeight: "700",
  },
});
