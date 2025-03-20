import { router } from "expo-router";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

import { useSession } from "../utils/ctx";
import { StatusBar } from "expo-status-bar";

export default function SignIn() {
  const { signIn } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const success = await signIn(email, password);
    if (success) {
      router.replace("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="gray" />
      <View style={styles.form}>
        <Text>Sign In</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={(value) => setPassword(value)}
        />
        <TouchableOpacity onPress={handleLogin}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  form: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  input: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  button: {
    width: "auto",
    margin: 10,
    padding: 10,
    backgroundColor: "#0EA5E9",
    color: "white",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
