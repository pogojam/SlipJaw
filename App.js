import React, { useState, useEffect, useRef } from "react";
import { Text, Image, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { fetchGoogleCloud } from "./services/index";

const CameraIOS = () => {
  const [permission, setPermission] = useState(null);
  const [imgURI, setURI] = useState(null);
  const cameraRef = useRef(null);

  const handlePress = async data => {
    const { current: camera } = cameraRef;
    const photo = await camera.takePictureAsync();
    const { uri } = photo;
    setURI(uri);

    const ticket = await fetchGoogleCloud(uri);
    // ticket.responses[0].textAnnotations[0]
    console.log(ticket.responses[0].textAnnotations[0]);
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
          <View style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Button
              onPress={handlePress}
              color="coral"
              backgroundColor="black"
              style={{ backgroundColor: "#1E6738", alignSelf: "flex-end" }}
              title="Snap"
            />
          </View>
        </Camera>
      )}
      {imgURI && (
        <Image style={{ height: 50, width: 50 }} source={{ uri: imgURI }} />
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
