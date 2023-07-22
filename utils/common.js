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
