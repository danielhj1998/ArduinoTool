import React from "react";
import { StyleSheet } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import StartScreen from "../screens/StartScreen";
import ConnectScreen from "../screens/ConnectScreen";
import ModeTabNavigator from "./ModeTabNavigator";
import AboutScreen from "../screens/HelpScreen";
import SettingsScreen from "../screens/SettingsScreen";
import Colors from "../constants/colors";
import DefaultStyles from '../constants/DefaultStyles';

import MainButton from "../components/MainButton";

const ScreenNavigator = createStackNavigator(
  {
    Start: StartScreen,
    Connect: ConnectScreen,
    Main: ModeTabNavigator,
    Help: AboutScreen,
    Settings: SettingsScreen,
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        headerLeft: () => (
          <MainButton
            textStyle={styles.headerIcon}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="md-arrow-round-back" size={42} />
          </MainButton>
        ),
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTitleStyle: {...DefaultStyles.bodyText,...{color: Colors.accent}}
      };
    },
  }
);

const styles = StyleSheet.create({
  headerIcon: {
    textAlign: "center",
    color: Colors.accent,
    textShadowColor: "#ccc",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 5,
    padding: 15,
    fontSize: 37,
  },
});

export default createAppContainer(ScreenNavigator);
