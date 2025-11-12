import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function TaskDetailsScreen() {
  const { task } = useLocalSearchParams();
  const parsedTask = JSON.parse(task);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{parsedTask.title}</Text>
      <Text style={styles.desc}>Status: {parsedTask.completed ? "Completed ✅" : "Pending ⏳"}</Text>
      <TouchableOpacity  onPress={()=> router.replace('/task')}>
        <Text style={styles.button}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "700", color: "#6c5ce7", marginBottom: 10 },
  desc: { fontSize: 18, color: "#333" , marginBottom: 10},
  button: {width: 120, backgroundColor:"#6c5ce7", borderRadius:8, color:'#fff', padding:10,textAlign:'center'}
});