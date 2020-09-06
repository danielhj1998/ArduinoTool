import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import BluetoothSerial from "react-native-bluetooth-serial";
import Realm from "realm";

import MainButton from "../components/MainButton";
import AppLoading from "../screens/AppLoading";

import DefaultStyles from "../constants/DefaultStyles";
import Colors from "../constants/colors";
import { settingsSchema } from "../constants/schemas";

const SettingsScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const [delimiter, setDelimiter] = useState("");

  if (loading) {
    return (
      <AppLoading
        startAsync={Realm.open({ schema: [settingsSchema] }).then((realm) => {
          const settings = realm.objects("Settings")[0];
          setDelimiter(
            settings.delimiter === "\r\n" ? '' : settings.delimiter
          );
          realm.close();
        })}
        onFinish={setLoading(false)}
      />
    );
  }

  const saveChanges = () => {
    Realm.open({ schema: [settingsSchema] }).then((realm) => {
      //delimiter changes
      const rightDelimiter = delimiter !== "" ? delimiter : '\r\n';
      BluetoothSerial.withDelimiter(rightDelimiter).then(() => {
        //Update delimiter in realm
        const settings = realm.objects("Settings")[0];
        realm.write(() => {
          settings.delimiter = rightDelimiter;
        });
        realm.close();
      });
      props.navigation.goBack();
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.configurationCard}>
        <Text style={styles.configurationName}>{"Data delimiter"}</Text>
        <TextInput
          style={styles.textInput}
          value={delimiter}
          onChangeText={(text) => setDelimiter(text)}
          placeholder="\r\n"
        />
      </View>
      <MainButton textStyle={styles.saveButton} onPress={saveChanges}>
        Save
      </MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: "2%",
    alignItems: "center",
    backgroundColor: Colors.primary,
    justifyContent: "space-between",
  },
  configurationCard: {
    flexDirection: "row",
    width: "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  configurationName: {
    ...DefaultStyles.bodyText,
    ...{
      color: Colors.placeHolder,
    },
  },
  saveButton: {
    textShadowColor: "#ccc",
  },
  textInput: {
    ...DefaultStyles.bodyText,
    ...{
      borderBottomColor: Colors.accent,
      borderBottomWidth: 1.5,
      paddingHorizontal: 5,
      paddingVertical: 0,
      width: "20%",
      color: Colors.placeHolder,
      textAlign: "center",
    },
  },
});

export default SettingsScreen;
