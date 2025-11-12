import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AppContext } from "../context/AppContext";
import { router } from "expo-router";

export default function LoginScreen() {
  const { dispatch } = useContext(AppContext);
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (!username.trim()) return;
    dispatch({ type: "LOGIN", payload: username });
    router.replace("/task");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Task Manager</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name..."
        value={username}
        onChangeText={setUsername}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "700", color: "#6c5ce7", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 10, padding: 14, marginBottom: 10 },
  button: { backgroundColor: "#6c5ce7", padding: 14, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});