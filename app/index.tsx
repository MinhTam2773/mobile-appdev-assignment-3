import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function Index() {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => router.push('/sign-in')} style={styles.button}>Sign In</TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/sign-up')} style={styles.button}>Sign Up</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor:'#FFFFFF',
    borderColor: '#C8C6C6',
    borderWidth: 1,
    width: 80,
    paddingVertical: 5,
    textAlign: 'center',
    margin: 5,
    borderRadius: 10,
    fontWeight: '500'
  }
})
