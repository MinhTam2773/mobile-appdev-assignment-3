import { Formik } from "formik";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

interface MusicSignUpFormValues {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
  favoriteGenre: string;
  role: "listener" | "artist" | "";
  acceptTerms: boolean;
}

const musicSignUpValidation = Yup.object().shape({
  displayName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(40, "Maximum 40 characters")
    .required("Display name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .min(6, "At least 6 characters")
    .max(20, "Maximum 20 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
  favoriteGenre: Yup.string()
    .min(2, "Please enter a genre")
    .required("Favorite genre is required"),
  role: Yup.string()
    .oneOf(["listener", "artist"], "Please select your role")
    .required("Role is required"),
  acceptTerms: Yup.bool().oneOf(
    [true],
    "You must accept the terms & conditions"
  ),
});

const MusicSignUpPage = () => {
  const handleSignUp = async (values: MusicSignUpFormValues) => {
    try {
      console.log(values);
      alert("Music sign up success! (Check console)");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      {/* Card */}
      <View style={styles.card}>
        {/* Header */}
        <Text style={styles.title}>Create Music Account</Text>
        <Text style={styles.subtitle}>
          Join our music community to build playlists and follow your favourite
          artists.
        </Text>

        {/* Social buttons */}
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-apple" size={20} color="#111827" />
          <Text style={styles.socialButtonText}>Sign up with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-google" size={20} color="#111827" />
          <Text style={styles.socialButtonText}>Sign up with Google</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or create with email</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Formik form */}
        <Formik<MusicSignUpFormValues>
          initialValues={{
            displayName: "",
            email: "",
            password: "",
            confirmPassword: "",
            favoriteGenre: "",
            role: "",
            acceptTerms: false,
          }}
          validationSchema={musicSignUpValidation}
          onSubmit={handleSignUp}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View style={{ width: "100%" }}>
              {/* Display Name */}
              <Text style={styles.label}>Display Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Your name or stage name"
                value={values.displayName}
                onChangeText={handleChange("displayName")}
                onBlur={handleBlur("displayName")}
              />
              {touched.displayName && errors.displayName && (
                <Text style={styles.error}>{errors.displayName}</Text>
              )}

              {/* Email */}
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              {/* Password */}
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              {/* Confirm Password */}
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                secureTextEntry
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
              )}

              {/* Favorite Genre */}
              <Text style={styles.label}>Favorite Genre</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Pop, Rock, Hip-Hop"
                value={values.favoriteGenre}
                onChangeText={handleChange("favoriteGenre")}
                onBlur={handleBlur("favoriteGenre")}
              />
              {touched.favoriteGenre && errors.favoriteGenre && (
                <Text style={styles.error}>{errors.favoriteGenre}</Text>
              )}

              {/* Role selector */}
              <Text style={styles.label}>I am a...</Text>
              <View style={styles.roleRow}>
                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    values.role === "listener" && styles.roleButtonActive,
                  ]}
                  onPress={() => setFieldValue("role", "listener")}
                >
                  <Ionicons
                    name="headset-outline"
                    size={18}
                    color={values.role === "listener" ? "#111827" : "#6b7280"}
                  />
                  <Text
                    style={[
                      styles.roleButtonText,
                      values.role === "listener" && styles.roleButtonTextActive,
                    ]}
                  >
                    Listener
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    values.role === "artist" && styles.roleButtonActive,
                  ]}
                  onPress={() => setFieldValue("role", "artist")}
                >
                  <Ionicons
                    name="mic-outline"
                    size={18}
                    color={values.role === "artist" ? "#111827" : "#6b7280"}
                  />
                  <Text
                    style={[
                      styles.roleButtonText,
                      values.role === "artist" && styles.roleButtonTextActive,
                    ]}
                  >
                    Artist
                  </Text>
                </TouchableOpacity>
              </View>
              {touched.role && errors.role && (
                <Text style={styles.error}>{errors.role}</Text>
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
                    <Ionicons name="checkmark" size={12} color="#ffffff" />
                  )}
                </View>
                <Text style={styles.termsText}>
                  I agree to the Terms of Service and Privacy Policy.
                </Text>
              </TouchableOpacity>
              {errors.acceptTerms && (
                <Text style={styles.error}>{errors.acceptTerms}</Text>
              )}

              {/* Button */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit as any}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>

              {/* Footer link */}
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

export default MusicSignUpPage;

const styles = StyleSheet.create({
  // background
  screen: {
    flexGrow: 1,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  // card
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    width: "100%",
    maxWidth: 420,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
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
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 10,
    backgroundColor: "#ffffff",
  },
  socialButtonText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "500",
    color: "#111827",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  dividerText: {
    marginHorizontal: 8,
    fontSize: 12,
    color: "#9ca3af",
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
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#f9fafb",
    fontSize: 15,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: "#111827",
    paddingVertical: 14,
    borderRadius: 999,
    marginTop: 18,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
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
  // select the role
  roleRow: {
    flexDirection: "row",
    gap: 8,
  },
  roleButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 999,
    paddingVertical: 8,
    marginTop: 4,
    backgroundColor: "#ffffff",
  },
  roleButtonActive: {
    backgroundColor: "#e5e7eb",
    borderColor: "#6b7280",
  },
  roleButtonText: {
    marginLeft: 6,
    fontSize: 13,
    color: "#6b7280",
  },
  roleButtonTextActive: {
    color: "#111827",
    fontWeight: "600",
  },
  // checkbox styles
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
    backgroundColor: "#ffffff",
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
});
