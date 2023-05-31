import {
  ConnectWallet,
  localWallet,
  metamaskWallet,
  rainbowWallet,
  ThirdwebProvider,
} from "@thirdweb-dev/react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { LogBox } from "react-native";
import LoadingScreen from "./components/LoadingScreen";
import BottomTabScreen from "./components/BottomTab";
import NotificationScreen from "./screens/Notifications/NotificationScreen";
import SearchScreen from "./screens/Search/SearchScreen";
import ViewAllScreen from "./screens/ViewAll/ViewAllScreen";
import SpecialistScreen from "./screens/Specialist/SpecialistScreen";
import TimeSlotScreen from "./screens/TimeSlots/TimeSlotsScreen";
import ConsultaionScreen from "./screens/ConsultationDetail/ConsultationDetailScreen";
import PaymentMethodScreen from "./screens/PaymentMethod/PaymentMethodScreen";
import DoctorProfileScreen from "./screens/DoctorProfile/DoctorProfileScreen";
import ReviewScreen from "./screens/Review/ReviewScreen";
import LabTestAndHealthCheckUpScreen from "./screens/LabAndTestCheckup/LabTestAndHealthCheckUpScreen";
import MessageScreen from "./screens/Message/MessageScreen";
import EditProfileScreen from "./screens/EditProfile/EditProfileScreen";
import PatientDirectoryScreen from "./screens/PatientDirectory/PatientDirectoryScreen";
import AboutUsScreen from "./screens/AboutUs/AboutUsScreen";
import WelcomeScreen from "./screens/Auth/WelcomeScreen";
import RegisterScreen from "./screens/Auth/RegisterScreen";
import VerificationScreen from "./screens/Auth/VerificationScreen";
import SplashScreen from "./screens/SplashScreen";
import { AuthProvider } from "./screens/authContext";
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThirdwebProvider
      dAppMeta={{
        name: "Example App",
        description: "This is an example app",
        isDarkMode: false,
        logoUrl: "https://example.com/logo.png",
        url: "https://example.com",
      }}
      sdkOptions={{
        gasSettings: { maxPriceInGwei: 500, speed: "fast" },
        readonlySettings: {
          chainId: 365, // Chain ID of the network
          rpcUrl: "https://eth-rpc-api-testnet.thetatoken.org/rpc",
        },
        gasless: {
          openzeppelin: {
            relayerUrl: "your-relayer-url",
          },
        },
      }}
      activeChain={{
        // === Required information for connecting to the network === \\
        chainId: 365, // Chain ID of the network
        // Array of RPC URLs to use
        rpc: ["https://eth-rpc-api-testnet.thetatoken.org/rpc"],

        // === Information for adding the network to your wallet (how it will appear for first time users) === \\
        // Information about the chains native currency (i.e. the currency that is used to pay for gas)
        nativeCurrency: {
          decimals: 18,
          name: "Theta Testnet",
          symbol: "TFUEL",
        },
        shortName: "TFUEL", // Display value shown in the wallet UI
        slug: "TFUEL", // Display value shown in the wallet UI
        testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
        chain: "Theta Testnet", // Name of the network
        name: "Theta Testnet", // Name of the network
      }}
      supportedWallets={[metamaskWallet(), rainbowWallet(), localWallet()]}
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ ...TransitionPresets.DefaultTransition }}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ ...TransitionPresets.DefaultTransition }}
          />
          <Stack.Screen name="Verification" component={VerificationScreen} />
          <Stack.Screen
            name="BottomTabScreen"
            component={BottomTabScreen}
            options={{ ...TransitionPresets.DefaultTransition }}
          />
          <Stack.Screen name="Notification" component={NotificationScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="ViewAll" component={ViewAllScreen} />
          <Stack.Screen name="Specialist" component={SpecialistScreen} />
          <Stack.Screen name="TimeSlots" component={TimeSlotScreen} />
          <Stack.Screen name="Consultation" component={ConsultaionScreen} />
          <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
          <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} />
          <Stack.Screen name="Review" component={ReviewScreen} />
          <Stack.Screen
            name="LabTestAndCheckUp"
            component={LabTestAndHealthCheckUpScreen}
          />
          <Stack.Screen name="Message" component={MessageScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen
            name="PatientDirectory"
            component={PatientDirectoryScreen}
          />
          <Stack.Screen name="AboutUs" component={AboutUsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThirdwebProvider>
  );
};

export default App;
