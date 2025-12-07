import SignUpForm from "@/components/SignupForm";
import React from "react";
import { View } from "react-native";

const SigupPage = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SignUpForm />
    </View>
  );
};

export default SigupPage;
