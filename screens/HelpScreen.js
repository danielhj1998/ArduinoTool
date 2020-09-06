import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";

import Colors from "../constants/colors";
import DefalutStyles from "../constants/DefaultStyles";

const HelpCard = (props) => {
  return (
    <View style={styles.helpCard}>
      <View style={styles.titleCard}>
        <Text style={DefalutStyles.title}>{props.title}</Text>
      </View>
      <View style={styles.bodyCard}>
        <Text style={styles.bodyText}>
          {props.body}
        </Text>
      </View>
    </View>
  );
};

const AboutScreen = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
      <HelpCard title="Terminal" body={'Serves to send and display data from the serial.\n\nData is sent as string, but showed between ">" and a linebreak \\n:\n\n -Typed: "Send this"\n-Sent: "Send this"\n-Showed: ">Send this\n                      "\n\nReceived data is showed like it comes.'}/>
      <HelpCard title="Tabular" body={'Serves to display and organize data from the serial.\n\nData is read when finding a delimiter (Settings -> Data delimeter). The default is a windows-like linebreak \\r\\n. Arduino function "println()" sends data that way.'}/>
      <HelpCard title="Graphic" body={'Serves to display and graphically show numbers received from the serial.\n\nNumbers are read when finding a delimiter (Settings -> Data delimeter). The default is a windows-like linebreak \\r\\n. Arduino function "println()" sends data that way.'}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  helpCard: {
    width: "100%",
    alignItems: "flex-start",
    paddingLeft: 15,
    paddingTop: 15
  },
  titleCard: {
    backgroundColor: Colors.accent,
    padding: 10,
    width: '100%',
    alignItems: "flex-start"
  },
  bodyCard:{
      padding: 15
  },
  bodyText:{
    ...DefalutStyles.bodyText,...{
      color: Colors.placeHolder
    }
  }
});

export default AboutScreen;
