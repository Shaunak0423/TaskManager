import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { AppContext } from "../context/AppContext";
import { router } from "expo-router";

export default function TaskListScreen() {
  const { state, dispatch } = useContext(AppContext);

  const toggleTask = (id) => dispatch({ type: "TOGGLE_TASK", payload: id });
  const deleteTask = (id) => dispatch({ type: "DELETE_TASK", payload: id });
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>👋 Hi, {state.user}</Text>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      {state.tasks.length === 0 ? (
        <Text style={styles.empty}>No tasks yet. Add one!</Text>
      ) : (
        <FlatList
          data={state.tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.task, item.completed && styles.completed]}>
              <TouchableOpacity onPress={() => toggleTask(item.id)} style={{ flex: 1 }}>
                <Text style={styles.taskTitle}>{item.title}</Text>
              </TouchableOpacity>

              <View style={styles.actions}>
                <TouchableOpacity onPress={() => router.push({ pathname: "/edit-task", params: { id: item.id, title: item.title } })}>
                  <Text style={styles.edit}>✏️</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                  <Text style={styles.delete}>🗑</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => router.push("/add-task")}>
        <Text style={styles.addButtonText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  header: { fontSize: 22, fontWeight: "700", color: "#6c5ce7", marginBottom: 10 },
  logout: { color: "red", fontWeight: "600" },
  empty: { textAlign: "center", color: "#999", marginTop: 20 },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  completed: { backgroundColor: "#dfe6e9" },
  taskTitle: { fontSize: 16, color: "#2d3436" },
  delete: { fontSize: 18, color: "red", marginLeft: 10 },
  edit: { fontSize: 18, color: "#0984e3", marginRight: 10 },
  actions: { flexDirection: "row", alignItems: "center" },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#6c5ce7",
    borderRadius: 50,
    padding: 15,
  },
  addButtonText: { color: "#fff", fontSize: 24, fontWeight: "700" },
});