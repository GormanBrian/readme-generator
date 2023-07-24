import fs from "fs";

/**
 * Loads a JSON object from a file
 * @param {string} path JSON file relative path
 * @returns {Object} Loaded JSON object
 */
export const loadJSON = (path) =>
  JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

/**
 * Extracts the name properties from an array of objects
 * @param {Array<Object>} arr Array of objects with a name property
 * @param {string} arr[].name Name property to be extracted
 * @returns {Array<string>} Array of name strings
 */
export const mapNames = (arr) => arr.map((i) => i.name);

/**
 * Writes data to a file
 * @param {string} fileName Name of the file
 * @param {string} data Data to be written
 */
export const writeToFile = (fileName, data) =>
  fs.writeFile(fileName, data, (err) => {
    if (err) console.error(err);
  });

/**
 * Inserts an item into an array at a given index
 * @param {Array<any>} arr Original array
 * @param {number} index Index to insert item
 * @param {any} newItem Item to be inserted
 * @returns {Array<any>} Original array with new item inserted
 */
export const insert = (arr, index, newItem) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
];
