import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  BackHandler,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Fonts, Sizes } from "../../constant/styles";
import IntlPhoneInput from "react-native-intl-phone-input";
import { useFocusEffect } from "@react-navigation/native";

const WelcomeScreen = ({ navigation }) => {
  const backAction = () => {
    backClickCount == 1 ? BackHandler.exitApp() : _spring();
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  }

  const [backClickCount, setBackClickCount] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../../assets/images/doctor_bg.jpg")}
      >
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={["black", "rgba(0,0.10,0,0.80)", "rgba(0,0,0,0.20)"]}
          style={{ flex: 1, paddingHorizontal: Sizes.fixPadding * 2.0 }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
          >
            <Text style={{ ...Fonts.white30Bold, marginTop: 100.0 }}>
              Welcome back
            </Text>
            <Text
              style={{ ...Fonts.white16Regular, marginTop: Sizes.fixPadding }}
            >
              Login in your account
            </Text>
            {phoneNumberInput()}
            {continueButton()}
            {otpText()}
            {facebookButton()}
            {googleButton()}
          </ScrollView>
        </LinearGradient>
        {exitInfo()}
      </ImageBackground>
    </View>
  );

  function exitInfo() {
    return backClickCount == 1 ? (
      <View style={styles.exitWrapStyle}>
        <Text style={{ ...Fonts.white13Regular }}>
          Press back once again to exit
        </Text>
      </View>
    ) : null;
  }

  function phoneNumberInput() {
    return (
      <IntlPhoneInput
        onChangeText={({ phoneNumber }) => setPhoneNumber(phoneNumber)}
        defaultCountry="US"
        containerStyle={styles.phoneNumberContainerStyle}
        placeholder="Phone Number"
        dialCodeTextStyle={{ ...Fonts.white16Regular }}
        phoneInputStyle={{
          flex: 1,
          marginLeft: Sizes.fixPadding + 20.0,
          ...Fonts.white16Regular,
        }}
      />
    );
  }

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("Verification")}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={["rgba(68,114,152,0.99)", "rgba(25,118,210,0.5)"]}
          style={{
            paddingVertical: Sizes.fixPadding + 5.0,
            borderRadius: Sizes.fixPadding * 3.0,
            alignItems: "center",
            justifyContent: "center",
            marginTop: Sizes.fixPadding * 5.0,
          }}
        >
          <Text style={{ ...Fonts.white16Regular }}>Countinue</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function otpText() {
    return (
      <Text
        style={{
          ...Fonts.white16Regular,
          textAlign: "center",
          marginTop: Sizes.fixPadding * 2.0,
        }}
      >
        We'll send OTP for Verification
      </Text>
    );
  }

  function facebookButton() {
    return (
      <View style={styles.faceBookButtonContainerStyle}>
        <Image
          source={require("../../assets/images/facebook.png")}
          style={{ height: 30.0, width: 30.0 }}
          resizeMode="contain"
        />
        <Text style={{ ...Fonts.white16Regular, marginLeft: Sizes.fixPadding }}>
          Log in with Facebook
        </Text>
      </View>
    );
  }

  function googleButton() {
    return (
      <View style={styles.googleButtonContainerStyle}>
        <Image
          source={require("../../assets/images/google.png")}
          style={{ height: 30.0, width: 30.0 }}
          resizeMode="contain"
        />
        <Text style={{ ...Fonts.black16Regular, marginLeft: Sizes.fixPadding }}>
          Log in with Google
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  phoneNumberContainerStyle: {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: Sizes.fixPadding + 15.0,
    marginTop: Sizes.fixPadding * 9.0,
  },
  faceBookButtonContainerStyle: {
    paddingVertical: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding * 3.0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 5.0,
    backgroundColor: "#3B5998",
  },
  googleButtonContainerStyle: {
    paddingVertical: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding * 3.0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 4.0,
    backgroundColor: "white",
  },
  exitWrapStyle: {
    backgroundColor: "#333333",
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WelcomeScreen;
