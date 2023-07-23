import { getLicenseData } from "./licenses.js";

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
 * Generates a README markdown questions section
 * @param {Object} contactInfo Contact information
 * @param {string} contactInfo.contact Contact instructions
 * @param {string} contactInfo.github Github address
 * @param {string} contactInfo.email Email address
 * @returns {string} README markdown questions section
 */
const generateQuestionsContent = ({ contact, github, email }) =>
  reduceMarkdownContent(
    [
      { name: "GitHub", value: github },
      { name: email, value: `mailto:${email}` },
    ],
    ({ name, value }) => `- [${name}](${value})`,
    `${contact}\n\n`
  );

/**
 * @callback generateContent Generates markdown content
 * @param {T} content Content object data
 * @returns {string} Markdown content
 */

/**
 *
 * @param {Array<T>} contentArr Array of content data
 * @param {generateContent} generate Generates content
 * @param {string} intialValue Initial markdown value
 * @param {string} separator Separates each piece of content
 * @returns {string} Markdown content
 */
const reduceMarkdownContent = (
  contentArr,
  generate,
  intialValue,
  separator = "\n"
) =>
  contentArr.reduce((prev, curr, index) => {
    let currValue = generate(curr);
    return currValue
      ? prev + currValue + (index !== contentArr.length - 1 ? separator : "")
      : prev;
  }, intialValue);

/**
 * Generates a formatted README markdown section
 * @param {string} title Section title
 * @param {string} content Section content
 * @returns Markdown section title and content
 */
const generateMarkdownSection = ({ title, content }) =>
  !content
    ? null
    : `## ${title}

${content}
`;

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
  installation,
  license,
  sublicense,
  contribution,
  tests,
  github,
  email,
  contact,
}) =>
  reduceMarkdownContent(
    [
      { title: "Description", content: description },
      { title: "Installation", content: installation },
      {
        title: "License",
        content: generateLicenseBadge(getLicenseData(license, sublicense)),
      },
      { title: "Contribution", content: contribution },
      { title: "Tests", content: tests },
      {
        title: "Questions",
        content: generateQuestionsContent({ contact, github, email }),
      },
    ],
    generateMarkdownSection,
    `# ${title}\n\n`
  );

export default generateMarkdown;
