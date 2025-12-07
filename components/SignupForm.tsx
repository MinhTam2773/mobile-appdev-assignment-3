import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
import { auth, db } from "../lib/firebase";


interface SignUpFormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const employeeValidation = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Employee name is required"),

  email: Yup.string().email("Invalid Email").required("Email is required"),

  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Enter a valid phone number")
    .required("Phone number is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not be longer than 20 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),

  acceptTerms: Yup.bool().oneOf([true], "You must accept the company policies"),
});

const SignUpForm = () => {
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmitForm = async (values: SignUpFormValues) => {
    try {
      setFirebaseError(null);

      // 1) Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      
      // 2) Save employee profile in Firestore (do NOT store password)
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: values.name,
        email: values.email,
        phone: values.phone,
        createdAt: serverTimestamp(),
      });
      
      if (user) router.push('/home');
    } catch (error: any) {
      console.log("Sign up error:", error);
      setFirebaseError(error.message || "Sign up failed.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>
          Create an account with your details.
        </Text>

        <Formik<SignUpFormValues>
          initialValues={{
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false,
          }}
          validationSchema={employeeValidation}
          onSubmit={handleSubmitForm}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View style={{ width: "100%" }}>
              {/* Employee Name */}
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter full name"
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
              />
              {touched.name && errors.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}

              {/* Email */}
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email address"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              {/* Phone */}
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                value={values.phone}
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                keyboardType="number-pad"
              />
              {touched.phone && errors.phone && (
                <Text style={styles.error}>{errors.phone}</Text>
              )}

              {/* Password */}
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                secureTextEntry
                autoCapitalize="none"
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              {/* Confirm Password */}
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                secureTextEntry
                autoCapitalize="none"
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
              )}

              {/* Firebase error */}
              {firebaseError && (
                <Text style={styles.error}>{firebaseError}</Text>
              )}

              {/* Accept terms */}
              <TouchableOpacity
                style={styles.termsRow}
                onPress={() =>
                  setFieldValue("acceptTerms", !values.acceptTerms)
                }
              >
                <View
                  style={[
                    styles.checkbox,
                    values.acceptTerms && styles.checkboxChecked,
                  ]}
                >
                  {values.acceptTerms && (
                    <Ionicons name="checkmark" size={12} color="#fff" />
                  )}
                </View>
                <Text style={styles.termsText}>
                  I confirm the above employee information is accurate and I
                  accept the company policies.
                </Text>
              </TouchableOpacity>
              {errors.acceptTerms && (
                <Text style={styles.error}>{errors.acceptTerms}</Text>
              )}

              {/* Submit Button */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit as any}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>

              {/* Footer */}
              <View style={styles.footerRow}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <Link href={"/sign-in"} style={styles.link}>
                  Login
                </Link>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    width: "100%",
    maxWidth: 420,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
    color: "#111827",
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
    marginBottom: 4,
    color: "#111827",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#f9fafb",
    fontSize: 15,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#d1d5db",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },
  termsText: {
    flex: 1,
    fontSize: 12,
    color: "#4b5563",
  },
  button: {
    backgroundColor: "#111827",
    paddingVertical: 14,
    borderRadius: 999,
    marginTop: 18,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  footerText: {
    fontSize: 13,
    color: "#4b5563",
  },
  link: {
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});
