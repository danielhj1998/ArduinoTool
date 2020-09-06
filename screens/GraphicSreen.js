import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import DialogInput from "react-native-dialog-input";

import Graphic from "../components/Graphic";
import Colors from "../constants/colors";
import Fonts from "../constants/Fonts";
import OptionSwitchCard from "../components/OptionSwitchCard";
import GraphicOptions from "../components/GraphicOptions";
import { clearGraphic } from "../store/actions/bluetooth";
import { writeCSV, checkOverwriting } from "../components/CVSWriter";

const GraphicScreen = (props) => {
  const sampleData = useSelector((state) => state.graphicData);
  const dispatch = useDispatch();

  const [visualData, setVisualData] = useState(sampleData);

  const [isInputingFileName, setIsInputingFileName] = useState(false);

  const [hasDataPointsLimit, setHasDataPointsLimit] = useState(true);
  const [dataPoints, setDataPoints] = useState(10);

  const [hasTicks, setHasTicks] = useState(true);
  const [numberOfTicks, setNumberOfTicks] = useState(10);

  const updateVisualData = useCallback(() => {
    if (sampleData.length > dataPoints && hasDataPointsLimit)
      setVisualData(
        sampleData.slice(
          sampleData.length - dataPoints - 1,
          sampleData.length - 1
        )
      );
    else setVisualData(sampleData);
  }, [sampleData, hasDataPointsLimit, dataPoints]);

  useEffect(() => {
    updateVisualData();
  }, [sampleData, hasDataPointsLimit, dataPoints]);

  const saveToCSV = (fileName) => {
    setIsInputingFileName(false);
    checkOverwriting(fileName).then((writingAllowed) => {
      if (writingAllowed) {
        //prepare data
        let cvsData = ''.concat(sampleData).replace(/,/g, "\n");
        
        //write to file
        writeCSV(fileName, cvsData);
      }
    });
  };

  let graphic = <Text style={styles.text}>Send some numbers!</Text>;

  if (visualData.length > 0)
    graphic = (
      <Graphic
        data={visualData}
        numberOfTicks={numberOfTicks}
        hasTicks={hasTicks}
      />
    );

  return (
    <View style={styles.screen}>
      <DialogInput
        isDialogVisible={isInputingFileName}
        title={"File Name"}
        message={"Type the name of the file"}
        hintInput={"e.g. myData"}
        submitInput={(textInput) => saveToCSV(textInput)}
        closeDialog={() => setIsInputingFileName(false)}
      />
      {graphic}
      <View style={styles.optionsContainer}>
        <OptionSwitchCard
          title="Data Points"
          initialState={hasDataPointsLimit}
          placeholder="10"
          maxLength={4}
          inputStyle={{ width: 70 }}
          onToggle={(value) => {
            setHasDataPointsLimit(value);
          }}
          onValueChange={(text) => setDataPoints(parseInt(text, 10))}
        />
        <OptionSwitchCard
          title="Ticks"
          initialState={hasTicks}
          placeholder="10"
          maxLength={4}
          inputStyle={{ width: 70 }}
          onToggle={(value) => {
            setHasTicks(value);
          }}
          onValueChange={(text) => setNumberOfTicks(parseInt(text, 10))}
        />
      </View>
      <GraphicOptions
        onClear={() => dispatch(clearGraphic())}
        onSave={() => setIsInputingFileName(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 30,
    alignItems: "center",
    backgroundColor: Colors.secondary,
  },
  optionsContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.accent,
  },
  text: {
    fontFamily: Fonts.fancy,
    fontSize: 20,
    color: Colors.primary,
  },
});

export default GraphicScreen;
