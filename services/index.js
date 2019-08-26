import axios from "axios";
import { GCP_KEY } from "react-native-dotenv";
import * as FileSystem from "expo-file-system";

const baseURL =
  "https://vision.googleapis.com/v1/images:annotate?key=" + GCP_KEY;

const reqBody = img => {
  return {
    requests: [
      {
        image: {
          content: img
        },
        features: [
          {
            type: "DOCUMENT_TEXT_DETECTION"
          }
        ]
      }
    ]
  };
};
// const Fetch = async body =>

export const fetchGoogleCloud = async uri => {
  const file = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64
  });

  const visionData = await axios.post(baseURL, reqBody(file));
  const { data } = visionData;

  if (!data.responses) return "No Responses found";

  return data.responses[0].textAnnotations[0];
  // return data.responses[0].textAnnotations[0];

  // data.responses[0].blocks.map(e=>console.log(e);)
};

// const Text = await Fetch(makeReqBody(file));
