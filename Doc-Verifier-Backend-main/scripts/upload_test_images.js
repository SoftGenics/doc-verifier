// "use-strict";
// import "../config/database/mongo.js";

// import path, { dirname} from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import pkg from "lodash";

// const { shuffle } = pkg;
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// import { randomNumber } from "../src/lib/common.js";
// import { uploadFile } from "../src/lib/upload.js";
// import { logger } from "../src/lib/common.js";


// /**
//  *
//  * @param {Name of dir inside the public dir} dir
//  * @param {Number of image links required} reqCount
//  * @param {Abstract Owner of the generated images} entity
//  * @param {Category for the images being uploaded} category
//  * @returns image Links
//  */
// const generateImageLinks = async (dir, reqCount, entity, category) => {
//   let generatedUrls = [];
//   const images = fs.readdirSync(path.join(__dirname, `../public/${dir}`));
//   const dirCount = images.length;
//   for (let i = 0;i < dirCount;i++)
//   {
//     // % 5 because there are only 5 artist images available.
//     const fileContent = fs.readFileSync(path.join(__dirname, `../public/${dir}/${images[i]}`));
//     const document = await uploadFile({
//       originalname: "sample.jpg",
//       buffer: fileContent,
//       mimeType: `image/${images[i % dirCount].split(".")[images[i % dirCount].split(".").length - 1]}`,
//     }, category);
//     logger(`Document Link Generated for ${entity} Profile`);
//     generatedUrls.push(document.downloadLink);
//   }
//   while (generatedUrls.length < reqCount) {
//     generatedUrls.push(generatedUrls[randomNumber() % generatedUrls.length]);
//   }
//   return shuffle(generatedUrls);
// };
