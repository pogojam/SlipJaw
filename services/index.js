import axios from "axios";
import { GCP_KEY } from "react-native-dotenv";
import * as FileSystem from "expo-file-system";

const baseURL = process.env.GCP_KEY;
// const Fetch = axios.create({});

export const fetchGoogleCloud = async uri => {
  const file = await FileSystem.readAsStringAsync(uri);
  console.log(file);
};
