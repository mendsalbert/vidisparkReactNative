import React, { useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
  ImageBackground,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";
import { ConnectWallet } from "@thirdweb-dev/react-native";
import WebView from "react-native-webview";

import { Ionicons } from "@expo/vector-icons";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  useAddress,
  useContract,
  useContractRead,
  useUser,
  useWallet,
  useContractWrite,
  Web3Button,
} from "@thirdweb-dev/react-native";
// import { useVideo } from "../services/videos";

const { width } = Dimensions.get("window");

const specialistsList = [
  {
    id: "1",
    name: "Cough & Fever",
    image: require("../../assets/images/icons/patient.png"),
  },
  {
    id: "2",
    name: "Homoeopath",
    image: require("../../assets/images/icons/stethoscope.png"),
  },
  {
    id: "3",
    name: "Gynecologist",
    image: require("../../assets/images/icons/woman.png"),
  },
  {
    id: "4",
    name: "Pediatrician",
    image: require("../../assets/images/icons/pediatrician.png"),
  },
  {
    id: "5",
    name: "Physiotherapist",
    image: require("../../assets/images/icons/physiotherapist.png"),
  },
  {
    id: "6",
    name: "Nutritionist",
    image: require("../../assets/images/icons/nutritionist.png"),
  },
  {
    id: "7",
    name: "Spine and Pain Specialist",
    image: require("../../assets/images/icons/pain.png"),
  },
];

const servicesList = [
  {
    id: "1",
    name: "Save a life",
    image: require("../../assets/images/icons/life.png"),
  },
  {
    id: "2",
    name: "Mental Health",
    image: require("../../assets/images/icons/stethoscope.png"),
  },
  {
    id: "3",
    name: "Emergency Medical Services",
    image: require("../../assets/images/icons/woman.png"),
  },
  {
    id: "4",
    name: "Community Development",
    image: require("../../assets/images/icons/pediatrician.png"),
  },
  {
    id: "5",
    name: "Disaster Relief",
    image: require("../../assets/images/icons/physiotherapist.png"),
  },
  {
    id: "6",
    name: "Sustainable Farming",
    image: require("../../assets/images/icons/nutritionist.png"),
  },
  {
    id: "7",
    name: "Food Security",
    image: require("../../assets/images/icons/pain.png"),
  },
];

const labAndCheckUpList = [
  {
    id: "1",
    labName: "New York City DOHMH Public Health Laboratory",
    labAddress: "455 1st Avenue, New York, NY 10016, United States",
    image: require("../../assets/images/lab/lab_1.jpg"),
  },
  {
    id: "2",
    labName: "Enzo Clinical Labs-Upper East Side (STAT Lab)",
    labAddress: "44 E 67th St, New York, NY 10022, United States",
    image: require("../../assets/images/lab/lab_2.jpg"),
  },
  {
    id: "3",
    labName: "New York Startup Lab LLC",
    labAddress: "244 5th Ave #2575, New York, NY 10001, United States",
    image: require("../../assets/images/lab/lab_3.jpg"),
  },
  {
    id: "4",
    labName: "MEDTRICS LAB LLC",
    labAddress: "138 W 25th St 10th floor, New York, NY 10001, United States",
    image: require("../../assets/images/lab/lab_4.jpg"),
  },
  {
    id: "5",
    labName: "Enzo Clinical Labs",
    labAddress: "15005 21st Ave ,Flushing, NY 11357, United States",
    image: require("../../assets/images/lab/lab_5.jpg"),
  },
  {
    id: "6",
    labName: "Shiel Medical",
    labAddress: "128 Mott St,New York, NY 10013,United States",
    image: require("../../assets/images/lab/lab_6.jpg"),
  },
];

const HomeScreen = ({ navigation }) => {
  // const { videoResults } = useVideo();
  // console.log(v);
  const CONTRACT_ADDR = "0x7E2e3f0c33ebaC151C946395c6f888b014319d42";
  const ABI = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "initialSupply",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "success",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "success",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "success",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const { user, isLoggedIn } = useUser();
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDR, ABI);
  const { mutateAsync, isLoading_, error_ } = useContractWrite(
    contract,
    "transfer"
  );
  const { data, isLoading, error } = useContractRead(contract, "balanceOf", [
    address,
  ]);

  function convertToWei(amount) {
    const decimals = 18; // Number of decimal places for Ethereum

    // Convert the amount to a whole number by multiplying it by 10^decimals
    const wholeAmount = Math.floor(parseFloat(amount) * 10 ** decimals);

    // Check if the resulting wholeAmount is a valid integer
    if (!Number.isInteger(wholeAmount)) {
      throw new Error("Invalid amount. Please provide a whole number.");
    }

    return wholeAmount.toString();
  }

  console.log(address);
  console.log(data);
  console.log(error);
  console.log(isLoading);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("LabTestAndCheckUp", {
          image: item.image,
          name: item.labName,
          address: item.labAddress,
        })
      }
      style={styles.labAndCheckUpContainer}
    >
      <Image
        source={item.image}
        style={styles.labAndChackUpImageStyle}
        resizeMode="cover"
      />
      <View style={styles.labInformationContainer}>
        <Text numberOfLines={2} style={{ ...Fonts.black16Bold }}>
          {item.labName}
        </Text>
        <Text
          numberOfLines={2}
          style={{ ...Fonts.grayBold, marginTop: Sizes.fixPadding - 5.0 }}
        >
          {item.labAddress}
        </Text>
        <View style={styles.callNowButtonStyle}>
          <Text style={{ ...Fonts.primaryColorBold }}>Call Now</Text>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginRight: Sizes.fixPadding + 10.0,
        }}
      >
        <Ionicons name="chevron-forward" size={25} color="black" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <WebView source={{ uri: "https://www.google.com" }} /> */}
      <WebView source={{ uri: "https://vidisparkmob.vercel.app" }} />
    </SafeAreaView>

    // <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
    //   <StatusBar translucent={false} backgroundColor={Colors.primary} />
    //   <FlatList
    //     ListHeaderComponent={
    //       <>
    //         <ConnectWallet />
    //         <Web3Button
    //           contractAddress={CONTRACT_ADDR}
    //           // Calls the "setName" function on your smart contract with "My Name" as the first argument
    //           action={() =>
    //             mutateAsync({ args: [address, convertToWei(0.002)] })
    //           }
    //         >
    //           Send Transaction
    //         </Web3Button>
    //         {header()}
    //         {search()}
    //         {/* {newlyLanched()} */}
    //         {title({ title: "Recents Videos" })}
    //         {services()}
    //         {title({ title: "Top Creators" })}
    //         {specialists()}
    //         {viewAll()}
    //       </>
    //     }
    //     data={labAndCheckUpList}
    //     keyExtractor={(item) => `${item.id}`}
    //     renderItem={renderItem}
    //     showsVerticalScrollIndicator={false}
    //   />
    // </SafeAreaView>
  );

  function search() {
    return (
      <TouchableOpacity
        activeOpacity={0.99}
        onPress={() => {
          navigation.navigate("Search");
        }}
      >
        <View style={styles.searchStyle}>
          <Ionicons name="search" size={24} color="gray" />
          <Text
            style={{ ...Fonts.gray17Regular, marginLeft: Sizes.fixPadding }}
          >
            Enter your search here?
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  function newlyLanched() {
    return (
      <ImageBackground
        source={require("../../assets/images/banner.jpg")}
        resizeMode="stretch"
        style={{
          height: 100.0,
          marginTop: Sizes.fixPadding + 5.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
        borderRadius={5}
      ></ImageBackground>
    );
  }

  function title({ title }) {
    return (
      <Text
        style={{
          ...Fonts.black18Bold,
          marginVertical: Sizes.fixPadding,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        {title}
      </Text>
    );
  }

  function specialists() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate("Specialist", { name: item.name })}
      >
        <View style={styles.specialistInfoContainer}>
          <Image
            source={item.image}
            resizeMode="contain"
            style={{ height: 80.0, width: 80.0 }}
          />
          <Text numberOfLines={1} style={styles.specialistTextStyle}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={specialistsList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding }}
      />
    );
  }

  function services() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate("Specialist", { name: item.name })}
      >
        <View style={styles.specialistInfoContainer}>
          <Image
            source={item.image}
            resizeMode="contain"
            style={{ height: 80.0, width: 80.0 }}
          />
          <Text numberOfLines={1} style={styles.specialistTextStyle}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={servicesList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding }}
      />
    );
  }

  function viewAll() {
    return (
      <TouchableOpacity
        activeOpacity={0.99}
        onPress={() => navigation.navigate("ViewAll")}
      >
        <View style={styles.viewAllStyle}>
          <Text
            style={{
              ...Fonts.primaryColor17Bold,
              marginRight: Sizes.fixPadding - 5.0,
            }}
          >
            View All
          </Text>
          <Ionicons name="chevron-forward" size={23} color="#4CB2A0" />
        </View>
      </TouchableOpacity>
    );
  }

  function header() {
    const refRBSheet = useRef();
    const [city, setCity] = useState("Ghana");
    const cityList = ["Ghana", "Central Park", "Nerobi"];

    return (
      <View style={styles.headerStyle}>
        <TouchableOpacity
          activeOpacity={0.99}
          onPress={() => refRBSheet.current.open()}
        >
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            height={200}
            openDuration={250}
            customStyles={{
              container: {
                paddingHorizontal: Sizes.fixPadding * 2.0,
              },
            }}
          >
            <View>
              <Text style={{ ...Fonts.black20Bold, alignSelf: "center" }}>
                Choose City
              </Text>
              {cityList.map((city) => (
                <TouchableOpacity
                  activeOpacity={0.99}
                  key={city}
                  onPress={() => {
                    setCity(city);
                    refRBSheet.current.close();
                  }}
                >
                  <Text
                    style={{
                      ...Fonts.black16Regular,
                      marginVertical: Sizes.fixPadding,
                    }}
                  >
                    {city}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </RBSheet>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="location-sharp"
              size={24}
              style={{ color: "#616161" }}
            />
            <Text
              style={{
                ...Fonts.black18Regular,
                marginLeft: 5.0,
                color: "#616161",
              }}
            >
              {city}
            </Text>
          </View>
        </TouchableOpacity>
        <Ionicons
          name="notifications"
          size={24}
          color="#616161"
          onPress={() => navigation.navigate("Notification")}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  searchStyle: {
    height: 60.0,
    backgroundColor: "white",
    borderWidth: 1.0,
    borderColor: Colors.lightGray,
    alignItems: "center",
    borderRadius: 30,
    flexDirection: "row",
    paddingLeft: Sizes.fixPadding + 10.0,
    marginTop: 20.0,
    marginHorizontal: 20.0,
  },
  viewAllStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
  },
  callNowButtonStyle: {
    width: 80.0,
    height: 40.0,
    borderColor: Colors.primary,
    borderRadius: Sizes.fixPadding,
    borderWidth: 1.0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 10.0,
  },
  labAndCheckUpContainer: {
    flexDirection: "row",
    height: 175,
    width: width - 40,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding + 5.0,
    backgroundColor: "white",
    borderColor: Colors.lightGray,
    borderWidth: 1.0,
    elevation: 1.5,
    marginBottom: 20.0,
    overflow: "hidden",
  },
  labInformationContainer: {
    marginLeft: Sizes.fixPadding,
    marginRight: Sizes.fixPadding,
    width: width - 220,
    marginTop: Sizes.fixPadding + 5.0,
  },
  specialistInfoContainer: {
    height: 160.0,
    width: 200.0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: Colors.lightGray,
    borderWidth: 1.0,
    marginHorizontal: 10.0,
    marginVertical: 10.0,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5.0,
  },
  labAndChackUpImageStyle: {
    height: 175.0,
    width: width - 230.0,
    borderTopLeftRadius: Sizes.fixPadding + 5.0,
    borderBottomLeftRadius: Sizes.fixPadding + 5.0,
    overflow: "hidden",
  },
  specialistTextStyle: {
    ...Fonts.black15Bold,
    marginTop: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding,
    textAlign: "center",
  },
});

export default HomeScreen;
