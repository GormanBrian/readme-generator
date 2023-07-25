import { getLicenseData } from "./licenses.js";
import { insert } from "./common.js";

/**
 * Generates an unordered markdown list
 * @param  {...string} items List items
 * @returns {string} Markdown list
 */
const generateList = (...items) =>
  reduceContent(items, (item) => (item ? `- ${item}` : ""));

/**
 * Generates a markdown license badge
 * @param {Object} license License data object
 * @param {string} license.slug License name to be displayed on the image
 * @param {string} license.badge Link to the license badge image
 * @param {string} license.link Link to the license
 * @returns {string} Markdown license badge
 */
const generateLicenseBadge = ({ slug, badge, link }) =>
  `[![License${slug ? ": " + slug : ""}](${badge})](${link})`;

/**
 * Generates a markdown link
 * @param {Object} data Link data object
 * @param {string} data.name Link name
 * @param {string} data.link Link address
 * @returns {string} Markdown link
 */
const generateLink = ({ name, link }) => `[${name}](${link})`;

/**
 * Returns callback or undefined
 * @param {boolean} isValid Valid condition
 * @param {Function} callback Callback function
 * @returns {( | undefined)} Callback return or undefined
 */
const validate = (isValid, callback) => (isValid ? callback() : undefined);

/**
 * Generates markdown if license exists
 * @param {string} license License name
 * @param {string} sublicense Sublicense name
 * @param {function} callback Markdown generator function
 * @returns {(string | undefined)} Generated markdown string or undefined
 */
const validateLicense = (license, sublicense, callback) =>
  validate(license !== "none", () =>
    callback(getLicenseData(license, sublicense))
  );

/**
 * Generates a README markdown questions section
 * @param {Object} contactInfo Contact information
 * @param {string} contactInfo.contact Contact instructions
 * @param {string} contactInfo.github Github address
 * @param {string} contactInfo.email Email address
 * @returns {string} README markdown questions section
 */
const generateQuestionsContent = ({ contact, github, email }) =>
  reduceContent(
    [
      { name: "GitHub", value: "https://github.com/" + github },
      { name: email, value: `mailto:${email}` },
    ],
    ({ name, value }) => `- [${name}](${value})`,
    `${contact}\n\n`
  );

/**
 * @typedef {Object} Section Section data
 * @property {string} title Section title
 * @property {number} content Section content
 */

/**
 * Generates a formatted README markdown section
 * @param {Section} section Section data
 * @returns Markdown section title and content
 */
const generateSection = ({ title, content }) =>
  !content
    ? null
    : !title
    ? `${content}\n`
    : `## ${title}

${content}
`;

/**
 * Generates table of contents from a list of titles
 * @param {Array<string>} titles Section titles
 * @returns {Object} Table of Contents section data
 */
const generateTableOfContents = (titles) =>
  reduceContent(
    titles,
    (t) => `- [${t}](#${t.toLowerCase().split(" ").join("-")})`
  );

/**
 * Creates and inserts the table of contents into the sections array
 * @param {Array<Section>} sections Array of section data
 * @param {string} insertAfter Title of the section that will precede the table of contents
 * @returns {Array<Section>} Sections with table of contents inserted
 */
const insertTableOfContents = (sections, insertAfter = "Description") => {
  let sectionTitles = sections.map((s) => s.title);
  let index = sectionTitles.indexOf(insertAfter) + 1;
  return insert(sections, index, {
    title: "Table of Contents",
    content: generateTableOfContents(sectionTitles.splice(index)),
  });
};

/**
 * @callback generateContent Generates markdown content
 * @param {T} content Content object data
 * @returns {string} Markdown content
 */

/**
 * Reduces content array to a single string
 * @param {Array<T>} contentArr Array of content data
 * @param {generateContent} generate Generates content
 * @param {string} intialValue Initial markdown value
 * @param {string} separator Separates each piece of content
 * @returns {string} Markdown content
 */
const reduceContent = (
  contentArr,
  generate,
  intialValue = ``,
  separator = "\n"
) =>
  contentArr.reduce((prev, curr, index) => {
    let currValue = generate(curr);
    return currValue
      ? prev + currValue + (index !== contentArr.length - 1 ? separator : "")
      : prev;
  }, intialValue);

/**
 * Generates README markdown content
 * @param {Object} answers Inquirer answers
 * @param {string} answers.title README title
 * @param {string} answers.description Repository description
 * @param {string} answers.installation Installation instructions
 * @param {string} answers.license License name
 * @param {string} answers.sublicense Sublicense name
 * @param {string} answers.contribution Contribution instructions
 * @param {string} answers.tests Testing instructions
 * @param {string} answers.github GitHub profile link
 * @param {string} answers.email Email address
 * @param {string} answers.contact Contact instructions
 * @returns {string} README markdown content
 */
const generateMarkdown = ({
  title,
  description,
  motivation,
  reason,
  problem,
  lesson,
  installation,
  license,
  sublicense,
  contribution,
  tests,
  github,
  email,
  contact,
}) =>
  reduceContent(
    insert(
      insertTableOfContents(
        [
          {
            title: "Description",
            content: validate(description, () =>
              generateList(motivation, reason, problem, lesson)
            ),
          },
          { title: "Installation", content: installation },
          { title: "Contribution", content: contribution },
          { title: "Tests", content: tests },
          {
            title: "Questions",
            content: generateQuestionsContent({ contact, github, email }),
          },
          {
            title: "License",
            content: validateLicense(license, sublicense, generateLink),
          },
        ].filter(({ _, content }) => content)
      ),
      0,
      {
        content: validateLicense(license, sublicense, generateLicenseBadge),
      }
    ),
    generateSection,
    `# ${title}\n\n`
  );

export default generateMarkdown;
