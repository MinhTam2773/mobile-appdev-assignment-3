import SigninForm from "@/components/SignupForm";
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
      <SigninForm />
    </View>
  );
};

export default SigupPage;
