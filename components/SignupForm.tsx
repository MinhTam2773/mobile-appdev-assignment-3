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

interface EmployeeFormValues {
  employeeName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  employeeId: string;
  acceptTerms: boolean;
}

const employeeValidation = Yup.object().shape({
  employeeName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Employee name is required"),

  email: Yup.string().email("Invalid Email").required("Email is required"),

  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Enter a valid phone number")
    .required("Phone number is required"),

  department: Yup.string()
    .min(2, "Please enter a department")
    .required("Department is required"),

  position: Yup.string()
    .min(2, "Please enter a job position")
    .required("Position is required"),

  employeeId: Yup.string()
    .min(3, "Employee ID must be at least 3 characters")
    .required("Employee ID is required"),

  acceptTerms: Yup.bool().oneOf([true], "You must accept the company policies"),
});

const EmployeeFormPage = () => {
  const handleSubmitForm = async (values: EmployeeFormValues) => {
    try {
      console.log(values);
      alert("Employee information submitted. (See console)");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Employee Information</Text>
        <Text style={styles.subtitle}>Fill in the employee details below.</Text>

        <Formik<EmployeeFormValues>
          initialValues={{
            employeeName: "",
            email: "",
            phone: "",
            department: "",
            position: "",
            employeeId: "",
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
              <Text style={styles.label}>Employee Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter full name"
                value={values.employeeName}
                onChangeText={handleChange("employeeName")}
                onBlur={handleBlur("employeeName")}
              />
              {touched.employeeName && errors.employeeName && (
                <Text style={styles.error}>{errors.employeeName}</Text>
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

              {/* Department */}
              <Text style={styles.label}>Department</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. HR, IT, Finance"
                value={values.department}
                onChangeText={handleChange("department")}
                onBlur={handleBlur("department")}
              />
              {touched.department && errors.department && (
                <Text style={styles.error}>{errors.department}</Text>
              )}

              {/* Position */}
              <Text style={styles.label}>Position</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Manager, Developer"
                value={values.position}
                onChangeText={handleChange("position")}
                onBlur={handleBlur("position")}
              />
              {touched.position && errors.position && (
                <Text style={styles.error}>{errors.position}</Text>
              )}

              {/* Employee ID */}
              <Text style={styles.label}>Employee ID</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. EMP001"
                value={values.employeeId}
                onChangeText={handleChange("employeeId")}
                onBlur={handleBlur("employeeId")}
              />
              {touched.employeeId && errors.employeeId && (
                <Text style={styles.error}>{errors.employeeId}</Text>
              )}

              {/* Terms */}
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
                  I confirm the above employee information is accurate.
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
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>

              {/* Footer */}
              <View style={styles.footerRow}>
                <Text style={styles.footerText}>Go back to </Text>
                <Link href={"/"} style={styles.link}>
                  Home
                </Link>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default EmployeeFormPage;

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
