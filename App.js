import React, { useState, useEffect, useRef } from "react";
import { Text, Button, View, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { fetchGoogleCloud } from "./services/index";

const CameraIOS = () => {
  const [permission, setPermission] = useState(null);
  const cameraRef = useRef(null);

  const handlePress = async data => {
    const { current: camera } = cameraRef;

    const photo = await camera.takePictureAsync();
    const { uri } = photo;

    fetchGoogleCloud(uri);
    console.log(photo);
  };

  const getStatus = async () => {
    const stat = await Permissions.askAsync(Permissions.CAMERA);
    return stat === "granted";
  };

  useEffect(() => {
    const status = getStatus();
    setPermission(status);
  }, [permission]);

  return (
    <View style={{ backgroundColor: "red", flex: 1 }}>
      {permission && (
        <Camera ref={cameraRef} style={{ flex: 1 }}>
          <Button
            onPress={handlePress}
            color="coral"
            style={{ backgroundColor: "white", alignContent: "flex-end" }}
            title="Snap"
          />
        </Camera>
      )}
    </View>
  );
};

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <CameraIOS />
    </View>
  );
};

export default App;
