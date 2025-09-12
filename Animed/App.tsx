import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Toaster } from "sonner-native";
import { LucideHome, LucideCalendar, LucideUser } from "lucide-react-native";

// Screens
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import VetsScreen from "./src/screens/VetsScreen";
import ServicesScreen from "./src/screens/ServicesScreen";
import ScheduleScreen from "./src/screens/ScheduleScreen";
import ReservationsScreen from "./src/screens/ReservationsScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

// Lib e Hooks
import { theme } from "./src/lib/theme";
import { ReservationsProvider } from "./src/hooks/ReservationsProvider";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.surface,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray,
        tabBarIcon: ({ color }) => {
          if (route.name === "Home")
            return <LucideHome color={color} size={20} />;
          if (route.name === "Calendar")
            return <LucideCalendar color={color} size={20} />;
          if (route.name === "Profile")
            return <LucideUser color={color} size={20} />;
          return <View />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={VetsScreen}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="Calendar"
        component={ReservationsScreen}
        options={{ title: "Minhas Reservas" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Perfil" }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Toaster />
      <ReservationsProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="Services" component={ServicesScreen} />
            <Stack.Screen name="Schedule" component={ScheduleScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ReservationsProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
