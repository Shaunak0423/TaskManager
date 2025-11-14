import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AppContext } from "../context/AppContext";
import { router, useLocalSearchParams } from "expo-router";

export default function EditTaskScreen() {
  const { id, title } = useLocalSearchParams();
  const { dispatch } = useContext(AppContext);
  const [newTitle, setNewTitle] = useState(title);

  const saveEdit = () => {
    if (newTitle.trim() === "") return;
    dispatch({ type: "EDIT_TASK", payload: { id: Number(id), title: newTitle } });
    router.replace('/task');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Update task title..."
        value={newTitle}
        onChangeText={setNewTitle}
      />
      <TouchableOpacity style={styles.button} onPress={saveEdit}>
        <Text style={styles.buttonText}>Save Changes</Text>
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
