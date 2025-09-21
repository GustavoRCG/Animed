import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import { theme } from "../lib/theme";

type Props = {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
  loading?: boolean;
  disabled?: boolean; 
};

export default function PrimaryButton({
  title,
  onPress,
  style,
  loading,
  disabled, 
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.button, style, disabled && styles.disabledButton]} 
      disabled={disabled || loading} 
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: theme.radii.md,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: theme.typography.body,
  },
  disabledButton: {
    backgroundColor: theme.colors.gray,
    opacity: 0.6,
  },
});