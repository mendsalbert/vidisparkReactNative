import React, { useCallback } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  BackHandler,
  ImageBackground,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useUser, useWallet, useLogin } from "@thirdweb-dev/react-native";

const RegisterScreen = ({ navigation }) => {
  const { isLoading, login } = useLogin();

  const backAction = () => {
    navigation.push("Welcome");
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../../assets/images/login-bg-.jpg")}
      >
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={["black", "rgba(0,0.10,0,0.40)", "rgba(0,0,0,0.40)"]}
          style={{ flex: 1, paddingHorizontal: Sizes.fixPadding * 2.0 }}
        >
          {backArrow()}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ paddingBottom: Sizes.fixPadding * 2.0 }}
          >
            {registerText()}
            {userName()}
            {email()}
            {password()}
            {confirmPassword()}
            {continueButton()}
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );

  function registerText() {
    return (
      <>
        <Text
          style={{ ...Fonts.white30Bold, marginTop: Sizes.fixPadding * 2.0 }}
        >
          Register
        </Text>
        <Text style={{ ...Fonts.white16Regular, marginTop: Sizes.fixPadding }}>
          Create account
        </Text>
      </>
    );
  }

  function backArrow() {
    return (
      <Ionicons
        name="arrow-back-sharp"
        size={24}
        color="white"
        style={{
          marginTop: Sizes.fixPadding * 6.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}
        onPress={() => navigation.push("Welcome")}
      />
    );
  }

  function userName() {
    return (
      <View style={styles.infoWrapStyle}>
        <TextInput
          placeholder="UserName"
          style={{ ...Fonts.white16Regular }}
          placeholderTextColor="white"
          cursorColor={Colors.primary}
        />
      </View>
    );
  }

  function password() {
    return (
      <View style={styles.infoWrapStyle}>
        <TextInput
          placeholder="Password"
          style={{ ...Fonts.white16Regular }}
          placeholderTextColor="white"
          secureTextEntry={true}
          cursorColor={Colors.primary}
        />
      </View>
    );
  }

  function email() {
    return (
      <View style={styles.infoWrapStyle}>
        <TextInput
          placeholder="Email"
          style={{ ...Fonts.white16Regular }}
          placeholderTextColor="white"
          cursorColor={Colors.primary}
          keyboardType="email-address"
        />
      </View>
    );
  }

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.99}
        onPress={() => navigation.push("BottomTabScreen")}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={["rgba(68,114,152,0.99)", "rgba(25,118,210,0.5)"]}
          style={styles.continueButtonStyle}
        >
          <Text style={{ ...Fonts.white16Regular }}>Countinue</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function confirmPassword() {
    return (
      <View style={styles.infoWrapStyle}>
        <TextInput
          placeholder="Confirm Password"
          style={{ ...Fonts.white16Regular }}
          placeholderTextColor="white"
          secureTextEntry={true}
          cursorColor={Colors.primary}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  infoWrapStyle: {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 25.0,
    marginTop: Sizes.fixPadding * 5.0,
    paddingVertical: Sizes.fixPadding + 3.0,
    paddingHorizontal: 25.0,
  },
  continueButtonStyle: {
    paddingVertical: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding * 3.0,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 5.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
});

export default RegisterScreen;
