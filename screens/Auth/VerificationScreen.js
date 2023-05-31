import React, { useState } from "react";
import { Text, View, SafeAreaView, ImageBackground, StatusBar, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts, Sizes, Colors } from "../../constant/styles";
import { Ionicons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { CircleFade } from 'react-native-animated-spinkit';
import OTPTextView from 'react-native-otp-textinput';

const { width } = Dimensions.get('screen');

const VerificationScreen = ({ navigation }) => {

    const [otpInput, setotpInput] = useState('');
    const [isLoading, setisLoading] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../../assets/images/doctor_bg.jpg')}
            >
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    colors={['black', 'rgba(0,0.10,0,0.80)', 'rgba(0,0,0,0.20)',]}
                    style={{ flex: 1, paddingHorizontal: Sizes.fixPadding * 2.0 }}
                >
                    {backArrow()}
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}>
                        {verificationInfo()}
                        {passwordInfo()}
                        {resendInfo()}
                        {submitButton()}
                    </ScrollView>
                </LinearGradient>
            </ImageBackground>
            {loading()}
        </SafeAreaView>
    )

    function verificationInfo() {
        return (
            <>
                <Text style={{ ...Fonts.white30Bold, marginTop: Sizes.fixPadding * 2.0, }}>
                    Verification
                </Text>
                <Text style={{ ...Fonts.white16Regular, marginTop: Sizes.fixPadding }}>
                    Enter the OTP code from the phone we just sent you.
                </Text>
            </>
        )
    }

    function backArrow() {
        return (
            <Ionicons
                name="arrow-back-sharp"
                size={24}
                color="white"
                style={{ marginTop: Sizes.fixPadding * 6.0, marginBottom: Sizes.fixPadding * 2.0 }}
                onPress={() => navigation.goBack()}
            />
        )
    }

    function passwordInfo() {
        return (
            <OTPTextView
                containerStyle={{ marginTop: Sizes.fixPadding * 5.0, }}
                handleTextChange={(text) => {
                    setotpInput(text)
                    if (otpInput.length == 3) {
                        setisLoading(true)
                        setTimeout(() => {
                            setisLoading(false)
                            navigation.push('Register')
                        }, 2000);
                    }
                }}
                inputCount={4}
                keyboardType="numeric"
                tintColor={Colors.primary}
                offTintColor={'transparent'}
                textInputStyle={{ ...styles.textFieldStyle }}
            />
        )
    }

    function resendInfo() {
        return (
            <View style={styles.resendInfoContainerStyle}>
                <Text style={{ ...Fonts.grayRegular }}>Didn't receive OTP Code!</Text>
                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.white17Bold }}>Resend</Text>
            </View>
        )
    }

    function loading() {
        return (
            <Dialog.Container
                visible={isLoading}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <CircleFade size={48} color="#1976D2" />
                    <Text style={{ ...Fonts.gray16Regular, paddingBottom: Sizes.fixPadding - 5.0, marginTop: Sizes.fixPadding * 2.0 }}>Please Wait...</Text>
                </View>
            </Dialog.Container>
        );
    }

    function submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    setisLoading(true)
                    setTimeout(() => {
                        setisLoading(false)
                        navigation.push('Register')
                    }, 2000);
                }}
            >
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['rgba(68,114,152,0.99)', 'rgba(25,118,210,0.5)',]}
                    style={styles.submitButtonContainerStyle}
                >
                    <Text style={{ ...Fonts.white16Regular }}>
                        Submit
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    textFieldStyle: {
        borderBottomWidth: null,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: "rgba(255,255,255,0.25)",
        borderColor: Colors.primary,
        borderWidth: 1.0,
        ...Fonts.white20Regular,
    },
    resendInfoContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Sizes.fixPadding * 4.0
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0,
    },
    submitButtonContainerStyle: {
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 3.0,
    }
})

export default VerificationScreen;