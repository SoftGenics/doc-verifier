import { v4 } from "uuid";
import { Storage } from "@google-cloud/storage";
import config from "config";

import { generateError } from "./common.js";
import { bucket } from "../../config/database/firebase.js";
import Document from "../models/document.js";

const storage = new Storage();
const DEFAULT_URL_EXPIRY = 10005 * 60 * 1000; // 10005 minutes ~ 7 days

export const uploadFile = async (file, category, currentUser) => {
  if (file === undefined) {
    throw generateError(400, "File not present");
  }

  let fileExt = file.originalname.split(".")[file.originalname.split(".").length - 1];
  console.log(fileExt);
  if (!(fileExt === "pdf" || fileExt === "jpeg" || fileExt === "jpg" || fileExt === "png")) {
    throw generateError(400, "Invalid File Type");
  }

  const fileBuffer = new Uint8Array(file.buffer);
  const bucketPath = `${category}/${file.originalname}-${v4()}.${fileExt}`;
  const uploadedFile = bucket.file(bucketPath);
  await uploadedFile.save(fileBuffer, {
    resumable: false,
    metadata: { contentType: file.mimeType },
  });

  // Generating a random id for case if document is uploaded during registration
  const url = await uploadedFile.getSignedUrl(getOptions());
  const document = new Document({
    name: file.originalname,
    downloadLink: url[0],
    bucketPath: bucketPath,
    urlLastUpdatedAt: new Date(),
    urlExpiry: DEFAULT_URL_EXPIRY,
    ownerId: currentUser?._id,
  });
  await document.save();
  return document;
};

export const generateSignedUrl = async (fileBucketPath) => {
  const document = await Document.findOne({ bucketPath: fileBucketPath });
  if (
    new Date(
      new Date(document.urlLastUpdatedAt).getTime() + document.urlExpiry
    ) <= new Date()
  ) {
    document.downloadLink = await storage
      .bucket(config.get("STORAGE_BUCKET"))
      .file(fileBucketPath)
      .getSignedUrl(getOptions());
    document.urlLastUpdatedAt = new Date();
    await document.save();
  }
  return document.downloadLink;
};

const getOptions = () => {
  return {
    version: "v4",
    action: "read",
    expires: Date.now() + DEFAULT_URL_EXPIRY,
  };
};
