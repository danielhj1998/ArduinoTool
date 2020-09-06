import { ToastAndroid, PermissionsAndroid, Alert } from "react-native";
import RNFS from "react-native-fs";

const directoryPath = RNFS.DownloadDirectoryPath;

export const writeCSV = (fileName, data) => {
  const path = directoryPath + "/" + fileName + ".csv";
  //Grant permissions
  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    {
      title: "Arduino Tool Permission",
      message: "Arduino Tool needs to write on external storage",
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK",
    }
  ).then((value) => {
    if (value === PermissionsAndroid.RESULTS.GRANTED) {
      // write the file
      RNFS.writeFile(path, data, "utf8")
        .then((success) => {
          ToastAndroid.show("File written in " + path, ToastAndroid.SHORT);
        })
        .catch((err) => {
          ToastAndroid.show("Failed trying to create file", ToastAndroid.SHORT);
        });
    }
  });
};

export const checkOverwriting = async (fileName) => {
  return new Promise((resolve, reject) => {
    if (fileName !== "") {
      const path = directoryPath + "/" + fileName + ".csv";
      RNFS.exists(path).then((exists) => {
        if (exists) {
          //Ask for overwriting
          Alert.alert(
            "Existing File",
            "Do you want to overwrite it?",
            [
              {
                text: "No",
                style: "cancel",
                onPress: () => {
                  resolve(false);
                },
              },
              {
                text: "Yes",
                onPress: () => {
                  resolve(true);
                },
              },
            ],
            { cancelable: true }
          );
        } else {
          resolve(true);
        }
      });
    } else {
      resolve(null);
    }
  });
};
