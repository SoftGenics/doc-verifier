import chalk from "chalk";
import zlib from "zlib";
import strftime from "strftime";
// import fs from "fs";
// import path, {dirname} from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);


export const logger = (message) => {
  console.log(`[${new Date().toString()}] ${message}`);
};


export const errorLog = (message) => {
  console.log(chalk.red(message));
};


export const successLog = (message) => {
  console.log(chalk.bgGreen.black(message));
};


export const generateError = (status, message) => {
  let err = new Error (message);
  err.status = status;
  return err;
};


export const errorResponse = (message) => {
  return {
    message: message,
  };
};


export const dateInMmDdyyyy = (ndate) => {
  const date = new Date(ndate);
  return `${
    date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  }/${
    date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
  }/${date.getFullYear()}`;
};


export const randomNumber = (limit = 1000) => {
  return Math.floor((Math.random() * limit) + 1);
};


export const RESPONSE_CODES = {
  BAD_REQUEST_CODE: 400,
  INTERNAL_SERVER_ERROR_CODE: 500,
  UNAUTHORIZED_ERROR_CODE: 401,
  SUCCESS_CODE: 200,
  CREATED_CODE: 201,
  ACCESS_ERROR_CODE: 405,
  UNPROCESSABLE_ERROR_CODE: 422,
  NOT_FOUND_ERROR_CODE: 404,
  FORBIDDEN_ERROR_CODE: 403,
};


export const dateInMmDdyyyyV1 = (date) => {
  return strftime("%d/%m/%Y", date);
};


export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];


export const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


export const monthCodes = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC"
];


export const compressText = (text) => {
  return zlib.deflateSync(text).toString("base64");
};


export const decompressText = (compressedText) => {
  return zlib.inflateSync(Buffer.from(compressedText, "base64")).toString();
};
