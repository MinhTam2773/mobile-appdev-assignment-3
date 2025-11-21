/*
Mobile Dev: Forms assignment
Authors: Mikael Ly, Minh Tam Nguyen, Xiaomei He

Summary:
This application will show the use of creating multiple forms using the 'Formik' library, 
and 'Yup' for validation within an Expo project.
Both Formik and Yup must be installed through the Node Package Manager.

Commands:
npm install formik
npm install yup

Requirements:
1. Employee Information Form
  - Develop a form for employee info with 5 fields.
  - Validate this form using 'Yup'.
  - Employee
      - Full Name
      - Username
      - Email
      - Phone Number
      - Password
      
2. Authentication Forms
  - Create two additional forms:
      - Sign-in
      - Sign-up
  - Validate both by using 'Yup'.

*/
"use client"

import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {

  return (
    <View
      style={styles.mainContainer}
    >
      {/* Header */}
      <Text style={styles.headerText}>Welcome to FORMS</Text>

      {/* Sign In + Sign Up buttons */}
      <View style={styles.authContainer}>
        <TouchableOpacity onPress={() => router.push('/sign-in')} style={styles.button}>
          <Text>Sign In</Text>
          </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/sign-up')} style={styles.button}>
          <Text>Sign Up</Text>
          </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    backgroundColor: '#ffffff'

  },
  headerText: {
    fontSize: 35,
    fontWeight: 'bold'
  },
  authContainer: {
    flex: 3,
    padding: 20,
    width: '100%',
    alignContent: 'center',
    maxWidth: '75%',
    maxHeight: '25%'
  },
  button: {
    flex: 1,
    backgroundColor:'#FFFFFF',
    borderColor: '#C8C6C6',
    borderWidth: 1,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 5,
    borderRadius: 10,
    fontWeight: '500',
    fontSize: 20,
  }
})