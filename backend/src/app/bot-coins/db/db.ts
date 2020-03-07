import {connectToDB} from "../../../shared/db/db-";

export const connectToArbitrorDB = () => {
  // return connectToDB(`${process.env.DB_URI as string}${process.env.DB_NAME_ARBITROR as string}`, process.env.DB_NAME_ARBITROR as string)
  return connectToDB(`mongodb://13.125.222.165:27017/${process.env.DB_NAME_ARBITROR as string}`, process.env.DB_NAME_ARBITROR as string)
};

export const connectToMonitorDB = () => {
  return connectToDB(`${process.env.DB_URI as string}${process.env.DB_NAME_MONITOR}`, process.env.DB_NAME_MONITOR as string)
};
