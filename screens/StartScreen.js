import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ToastAndroid,
  Dimensions,
  PermissionsAndroid,
  BackHandler
} from "react-native";
import BluetoothSerial from "react-native-bluetooth-serial";

import DefaultStyles from "../constants/DefaultStyles";
import Colors from "../constants/colors";

import MainButton from "../components/MainButton";
import AppLoading from "../screens/AppLoading";

const requestPermissions = async () => {
  locationPermission = false;
  try {
    //location permission
    const locationGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "ArduinoTool",
        message: "ArduinoTool requires location permission to use bluetooth.",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    locationPermission = locationGranted === PermissionsAndroid.RESULTS.GRANTED;

    return locationPermission;
  } catch (err) {
    ToastAndroid.show(
      "Error getting bluetooth permissions",
      ToastAndroid.SHORT
    );
    console.warn(err);
  }
};

const checkPermissions = async () => {
  try {
    const locationPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    return locationPermission;
  } catch (err) {
    console.warn(err);
  }
};

const StartScreen = (props) => {
  const [isBluetoothEnabling, setIsBluetoothEnabling] = useState(false);

  const onStart = () => {
    //if (BluetoothSerial.isEnabled()) {
    checkPermissions().then((granted) => {
      if (granted) {
        //Se activa el bluetooth
        setIsBluetoothEnabling(true);
        enableBluetooth();
      } else {
        setIsBluetoothEnabling(true);
        requestPermissions().then((granted) => {
          if (granted) {
            enableBluetooth();
          } else {
            ToastAndroid.show(
              "Please enable the necessary permissions to use the app",
              ToastAndroid.LONG
            );
            BackHandler.exitApp();
          }
        });
      }
    });
  };

  const enableBluetooth = () => {
    BluetoothSerial.enable()
      .then(() => {
        setIsBluetoothEnabling(false);
        props.navigation.replace("Connect");
      })
      .catch((error) => {
        setIsBluetoothEnabling(false);
        ToastAndroid.show(
          "Error trying to enable bluetooth",
          ToastAndroid.SHORT
        );
      });
  };

  if (isBluetoothEnabling) {
    return <AppLoading />;
  }

  return (
    <View style={styles.screen}>
      <View style={styles.logoContainer}>
        <Text style={DefaultStyles.title}>ARDUINO</Text>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/logo.png")}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <Text style={[DefaultStyles.title, styles.title]}>TOOL</Text>
      </View>
      <MainButton style={styles.button} onPress={onStart}>
        START
      </MainButton>
    </View>
  );
};

StartScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.secondary,
    justifyContent: "space-between",
  },
  logoContainer: {
    marginTop: "30%",
    width: "100%",
    alignItems: "center",
  },
  imageContainer: {
    width: "80%",
    height: Dimensions.get("window").height * 0.14,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  image: {
    width: "100%",
  },
  button: {
    paddingBottom: "20%",
  },
});

export default StartScreen;
