import React, { useContext, useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AppContext } from "../context/AppContext";
import { router } from "expo-router";

export default function AddTaskScreen() {
  const { dispatch } = useContext(AppContext);
  const [title, setTitle] = useState("");

  const addTask = () => {
    if (title.trim() === "") return;
    dispatch({ type: "ADD_TASK", payload: { title, completed: false } });
    router.replace("/task");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Task title..."
        value={title}
        onChangeText={setTitle}
      />
      <TouchableOpacity style={styles.button} onPress={addTask}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  header: { fontSize: 24, fontWeight: "700", color: "#6c5ce7", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 10, padding: 14, marginBottom: 10 },
  button: { backgroundColor: "#6c5ce7", padding: 14, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
