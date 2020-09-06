import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Font from "expo-font";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Realm from 'realm';

import AppLoading from "./screens/AppLoading";
import ScreenNavigator from "./navigation/ScreenNavigator";
import BluetoothSerial from "react-native-bluetooth-serial";

import Colors from "./constants/colors";
import bluetoothReducer from "./store/reducers/bluetooth";
import {settingsSchema} from './constants/schemas';

const store = createStore(bluetoothReducer);

const fetchAppData = () => {
  return Promise.all([
    Font.loadAsync({//Load fonts
      "jellee-roman": require("./assets/fonts/Jellee-Roman.ttf"),
    }),
    Realm.open({schema: [settingsSchema]}).then((realm) => {
      const settings=realm.objects('Settings');
      if(settings.length === 0){
        realm.write(()=>{
          realm.create('Settings',{delimiter: '\r\n'});
        })
      } 
      else {
        const delimiter = settings[0].delimiter;
        if(delimiter !== '\r\n'){
          BluetoothSerial.withDelimiter(delimiter);
        }
      }
      realm.close();
    })
  ]);
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchAppData}
        onFinish={() => {
          setDataLoaded(true);
        }}
        sc
      />
    );
  }

  return (
    <Provider store={store}>
      <ScreenNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
});
