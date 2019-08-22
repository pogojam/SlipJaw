import React, { useState, useEffect, useRef } from "react";
import { Text, Button, View, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

const CameraIOS = () => {
  const [permission, setPermission] = useState(null);

  const getStatus = async () => {
    const stat = await Permissions.askAsync(Permissions.CAMERA);
    return stat === "granted";
  };

  useEffect(() => {
    const status = getStatus();
    setPermission(status);
  }, [permission]);

  return (
    <View>
      {permission && (
        <Camera>
          <Button title="Snap" />
        </Camera>
      )}
    </View>
  );
};

const App = () => {
  return (
    <View>
      <CameraIOS />
    </View>
  );
};

export default App;
