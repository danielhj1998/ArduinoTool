import React, { useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";

import Colors from "../constants/colors";
import DefaultStyles from "../constants/DefaultStyles";

const AppLoading = (props) => {
  useEffect(() => {
    const startAsync = async () => {
      await props.startAsync();
      props.onFinish();
    };

    if (props.startAsync !== undefined) {
      startAsync();
    }
  });

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={{ ...DefaultStyles.title, ...styles.text }}>{props.message !== undefined ? props.message : 'Loading...'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    fontSize: Dimensions.get("window").width * 0.12,
  },
  image: {
    width: "40%",
  }
});

export default AppLoading;
