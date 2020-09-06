import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert
} from "react-native";
import DialogInput from "react-native-dialog-input";
import { useSelector, useDispatch } from "react-redux";

import { writeCSV, checkOverwriting } from "../components/CVSWriter";
import DefaultStyles from "../constants/DefaultStyles";
import Colors from "../constants/colors";
import BarCard from "../components/BarCard";
import Column from "../components/Column";
import TabularOptions from "../components/TabularOptions";
import DataList from "../components/DataList";
import { clearTabular, setTabularData } from "../store/actions/bluetooth";

const TabularScreen = (props) => {
  const [columns, setColumns] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isInputingFileName, setIsInputingFileName] = useState(false);
  const serialData = useSelector((state) => state.tabularData);

  const dispatch = useDispatch();

  let columnList = (
    <Text style={{ ...DefaultStyles.bodyText, ...styles.text }}>
      Add new columns!
    </Text>
  );

  if (columns.length > 0) {
    columnList = columns.map((name) => (
      <Column
        title={name}
        key={name}
        onClose={(title) => deleteColumnDialog(title)}
      />
    ));
  }

  const saveToCSV = (fileName) => {
    setIsInputingFileName(false);
    checkOverwriting(fileName).then((writingAllowed) => {
      if (writingAllowed) {
        //prepare data
        let cvsData = "";
        if (columns.length > 0) {
          cvsData = cvsData.concat(columns) + "\n";

          for (let i = 0; i < serialData.length / columns.length; i++) {
            cvsData =
              cvsData.concat(
                serialData.slice(i * columns.length, columns.length * (i + 1))
              ) + "\n";
          }
        } else {
          cvsData = cvsData.concat(serialData).replace(/,/g, "\n");
        }
        //write to file
        writeCSV(fileName, cvsData);
      }
    });
  };

  const addColumn = (title) => {
    if (title.length > 0) {
      setColumns([...columns, title]);
      setIsAdding(false);
    }
  };

  const deleteColumnDialog = (title) => {
    let colNum = columns.indexOf(title);
    //Ask for column data deleting
    Alert.alert(
      "Column Deleiting",
      "Delete data as well?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Move data",
          onPress: () =>
            setColumns(columns.filter((name, colIndex) => colNum !== colIndex)),
        },
        {
          text: "Delete data",
          onPress: () => {
            let newSerialData = serialData.filter((value, index) => {
              let valid = true;
              for (let i = 0; i < serialData.length; i++) {
                if (index === columns.length * i + colNum) valid = false;
              }
              return valid;
            });

            dispatch(setTabularData(newSerialData));
            setColumns(columns.filter((name, colIndex) => colNum !== colIndex));
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.screen}>
      <DialogInput
        isDialogVisible={isAdding}
        title={"New Column"}
        message={"Type the column name"}
        hintInput={"My Column"}
        submitInput={(textInput) => addColumn(textInput)}
        closeDialog={() => setIsAdding(false)}
      />
      <DialogInput
        isDialogVisible={isInputingFileName}
        title={"File Name"}
        message={"Type the name of the file"}
        hintInput={"e.g. myData"}
        submitInput={(textInput) => saveToCSV(textInput)}
        closeDialog={() => setIsInputingFileName(false)}
      />
      <BarCard>{columnList}</BarCard>
      <DataList
        data={serialData}
        numColumns={columns.length > 0 ? columns.length : 1}
        autoScroll={true}
      />
      <TabularOptions
        onAdd={() => setIsAdding(true)}
        onClear={() => dispatch(clearTabular())}
        onSave={() => {
          if (serialData.length > 0) setIsInputingFileName(true);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.secondary,
  },
  text: {
    fontSize: 18,
    color: Colors.primary,
  },
});

export default TabularScreen;
