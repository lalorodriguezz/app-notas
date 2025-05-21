import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./components/ui/login";
import RegisterScreen from "./components/ui/registro";
import TodoList from "./components/ui/todolist";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="registro"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="todoList"
          component={TodoList}
          options={{
            title: "Lista de Tareas",
            headerStyle: { backgroundColor: "#3b82f6" },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
