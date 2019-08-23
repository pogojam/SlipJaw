import axios from "axios";
import { GCP_KEY } from "react-native-dotenv";
import * as FileSystem from "expo-file-system";

const baseURL =
  "https://vision.googleapis.com/v1/images:annotate?key=" + GCP_KEY;

const makeReqBody = img => {
  return {
    requests: [
      {
        image: {
          content: img
        },
        features: [
          {
            type: "TEXT_DETECTION",
            maxResults: 1
          }
        ]
      }
    ]
  };
};
const Fetch = async body => await axios.post(baseURL, body);

export const fetchGoogleCloud = async uri => {
  const file = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64
  });

  const Text = await Fetch(makeReqBody(file));

  console.log(baseURL, Text);
};
