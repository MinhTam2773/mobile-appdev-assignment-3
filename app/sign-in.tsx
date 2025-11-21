import { Formik } from "formik";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

interface SignInFormValues {
  email: string;
  password: string;
}
const signInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password is at least 6 characters")
    .max(20, "Password must not pass 20 characters")
    .required(),
});

const SignInPage = () => {
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  const handleLogin = async (values: SignInFormValues) => {
    try {
      console.log(values);
    } catch (error: any) {
      setFirebaseError(error.message || "Login failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <Formik<SignInFormValues>
        initialValues={{ email: "", password: "" }}
        validationSchema={signInSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              secureTextEntry
              autoCapitalize="none"
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            {firebaseError && <Text style={styles.error}>{firebaseError}</Text>}

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignInPage

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#ffffff",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 14,
    marginTop: 12,
    backgroundColor: "#f9fafb",
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 13,
    marginTop: 4,
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },
});