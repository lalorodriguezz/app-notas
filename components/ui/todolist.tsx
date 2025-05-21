import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const TodoList = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Create a React project 👋",
      completed: false,
      time: "5:23 AM, 01/06/2022",
    },
    {
      id: 2,
      text: "Learn React ❤️",
      completed: false,
      time: "5:22 AM, 01/06/2022",
    },
    {
      id: 3,
      text: "Create a Todo App 📋",
      completed: true,
      time: "5:21 AM, 01/06/2022",
    },
  ]);
  const [filter, setFilter] = useState("All");
  const [addingTask, setAddingTask] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, time: new Date().toLocaleString() }
          : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const saveNewTask = () => {
    if (!newTaskText.trim()) return;
    const newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      text: newTaskText.trim(),
      completed: false,
      time: new Date().toLocaleString(),
    };
    setTasks([...tasks, newTask]);
    setNewTaskText("");
    setAddingTask(false);
  };

  const startEditTask = (taskId: number, currentText: string) => {
    setEditingTaskId(taskId);
    setEditingText(currentText);
  };

  const saveEditedTask = () => {
    if (editingTaskId === null || !editingText.trim()) return;
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId
          ? { ...task, text: editingText.trim(), time: new Date().toLocaleString() }
          : task
      )
    );
    setEditingTaskId(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditingText("");
  };

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) => (filter === "Completed" ? task.completed : !task.completed));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TODO LIST</Text>

      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setAddingTask((prev) => !prev)}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>+ Add Task</Text>
          </TouchableOpacity>

          {addingTask && (
            <View style={styles.addTaskMiniContainer}>
              <TextInput
                style={styles.input}
                placeholder="Write new task..."
                value={newTaskText}
                onChangeText={setNewTaskText}
                autoFocus
                onSubmitEditing={saveNewTask}
                returnKeyType="done"
              />
              <View style={styles.miniButtons}>
                <TouchableOpacity style={styles.saveButton} onPress={saveNewTask}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setAddingTask(false);
                    setNewTaskText("");
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <View style={styles.rightHeader}>
          <Text style={styles.filterLabel}>Filter:</Text>
          <Picker
            selectedValue={filter}
            onValueChange={(itemValue) => setFilter(itemValue)}
            style={styles.picker}
            dropdownIconColor="#3b82f6"
          >
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Completed" value="Completed" />
            <Picker.Item label="Pending" value="Pending" />
          </Picker>
        </View>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[styles.taskContainer, item.completed && styles.taskCompleted]}
          >
            <View style={styles.taskInfo}>
              <Switch
                value={item.completed}
                onValueChange={() => toggleTaskCompletion(item.id)}
                style={styles.checkbox}
              />

              {editingTaskId === item.id ? (
                <TextInput
                  style={[styles.taskTextInput, styles.input]}
                  value={editingText}
                  onChangeText={setEditingText}
                  autoFocus
                  onSubmitEditing={saveEditedTask}
                  returnKeyType="done"
                />
              ) : (
                <View>
                  <Text
                    style={[styles.taskText, item.completed && styles.taskTextCompleted]}
                  >
                    {item.text}
                  </Text>
                  <Text style={styles.taskTime}>Last updated: {item.time}</Text>
                </View>
              )}
            </View>

            <View style={styles.taskActions}>
              {editingTaskId === item.id ? (
                <>
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={saveEditedTask}
                  >
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={cancelEdit}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => startEditTask(item.id, item.text)}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => deleteTask(item.id)}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default function App() {
  return <TodoList />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
    color: "#111827",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  leftHeader: {
    flex: 1,
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 140,
  },
  addButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  addTaskMiniContainer: {
    marginTop: 6,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    width: 260,
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#d1d5db",
    marginBottom: 8,
  },
  miniButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  saveButton: {
    backgroundColor: "#10b981",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  cancelButton: {
    marginLeft: 8,
    backgroundColor: "#ef4444",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  filterLabel: {
    marginRight: 8,
    fontSize: 14,
    color: "#374151",
  },
  picker: {
    height: 36,
    width: 140,
    color: "#111827",
  },
  taskContainer: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    minHeight: 100, 
  },
  taskCompleted: {
    backgroundColor: "#dbeafe",
  },
  taskInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  checkbox: {
    marginRight: 12,
  },
  taskText: {
    fontSize: 15,
    color: "#111827",
    flex: 1, 
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "#9ca3af",
  },
  taskTime: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 6,
    
  },
  taskTextInput: {
    fontSize: 15,
    color: "#111827",
    borderWidth: 1,
    borderColor: "#3b82f6",
  },
  taskActions: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    justifyContent: "flex-end",
    marginTop: 10,
  },
  editButton: {
    marginRight: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#fbbf24",
    borderRadius: 6,
  },
  editButtonText: {
    fontWeight: "700",
    color: "#92400e",
    fontSize: 14,
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#ef4444",
    borderRadius: 6,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});
