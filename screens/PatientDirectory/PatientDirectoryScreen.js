import React from "react";
import { Text, View, StatusBar, FlatList, Image, StyleSheet } from "react-native";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const patientList = [
    {
        id: '1',
        name: 'Allison Perry',
        image: require('../../assets/images/user/user_3.jpg')
    },
    {
        id: '2',
        name: 'John Smith',
        image: null,
    }
];

const PatientDirectoryScreen = ({ navigation }) => {

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar translucent={false} backgroundColor={Colors.primary} />
            {header()}
            {patients()}
            {addButton()}
        </View>
    )

    function patients() {
        const renderItem = ({ item }) => {
            return (
                <View style={{ flexDirection: "row", alignItems: 'center', marginBottom: Sizes.fixPadding - 5.0 }}>
                    <View style={styles.patientImageContainer}>
                        {
                            item.image === null ? <Ionicons name="person" size={24} color="gray" /> : <Image
                                source={item.image}
                                resizeMode="contain"
                                style={{
                                    height: 80.0, width: 80.0, borderRadius: Sizes.fixPadding * 4.0,
                                }}
                            />
                        }
                    </View>
                    <Text style={{ ...Fonts.black16Bold, marginLeft: Sizes.fixPadding, marginBottom: Sizes.fixPadding }}>
                        {item.name}
                    </Text>
                </View>
            )
        }
        return (
            <View>
                <FlatList
                    data={patientList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 2.0, paddingVertical: Sizes.fixPadding * 2.0, }}
                />


            </View>

        );
    }

    function addButton() {
        return (
            <View style={styles.addButtonStyle}>
                <MaterialIcons name="add" size={30} color="white" />
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    color={'black'}
                    size={22}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ ...Fonts.black20Bold, marginLeft: Sizes.fixPadding + 5.0, }}>
                    Patient Directory
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2.0,
        marginBottom: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
    patientImageContainer: {
        height: 80.0,
        width: 80.0,
        borderRadius: Sizes.fixPadding * 4.0,
        backgroundColor: '#F5F5F5',
        borderColor: Colors.lightGray,
        borderWidth: 1.0,
        marginRight: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Sizes.fixPadding + 3.0,
        shadowColor: Colors.lightGray,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: Sizes.fixPadding,
        elevation: 2.0,
        overflow: 'hidden',
    },
    addButtonStyle: {
        backgroundColor: '#2196F3',
        width: 60.0,
        height: 60.0,
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: Sizes.fixPadding * 2.0,
        right: Sizes.fixPadding * 2.0,
        elevation: 10.0
    }
})

export default PatientDirectoryScreen;