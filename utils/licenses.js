import { mapNames } from "./common.js";

/**
 * List of popular open source and open data licenses with badge data
 * Source: https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba
 */
const licenses = [
  {
    name: "MIT",
    badge: "https://img.shields.io/badge/License-MIT-yellow.svg",
    link: "https://opensource.org/licenses/MIT",
  },
  {
    name: "Apache 2.0",
    badge: "https://img.shields.io/badge/License-Apache_2.0-blue.svg",
    link: "https://opensource.org/licenses/Apache-2.0",
  },
  {
    name: "BSD",
    sublicenses: [
      {
        name: "BSD 3-Clause",
        badge: "https://img.shields.io/badge/License-BSD_3--Clause-blue.svg",
        link: "https://opensource.org/licenses/BSD-3-Clause",
      },
      {
        name: "BSD 2-Clause",
        badge: "https://img.shields.io/badge/License-BSD_2--Clause-orange.svg",
        link: "https://opensource.org/licenses/BSD-2-Clause",
      },
    ],
  },
  {
    name: "Creative Commons",
    sublicenses: [
      {
        name: "CC0",
        slug: "CC0-1.0",
        badge: "https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg",
        link: "http://creativecommons.org/publicdomain/zero/1.0/",
      },
      {
        name: "Attribution 4.0 International",
        slug: "CC BY 4.0",
        badge: "https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg",
        link: "https://creativecommons.org/licenses/by/4.0/",
      },
      {
        name: "Attribution-ShareAlike 4.0 International",
        slug: "CC BY-SA 4.0",
        badge:
          "https://img.shields.io/badge/License-CC_BY--SA_4.0-lightgrey.svg",
        link: "https://creativecommons.org/licenses/by-sa/4.0/",
      },
      {
        name: "Attribution-NonCommercial 4.0 International",
        slug: "CC BY-NC 4.0",
        badge:
          "https://img.shields.io/badge/License-CC_BY--NC_4.0-lightgrey.svg",
        link: "https://creativecommons.org/licenses/by-nc/4.0/",
      },
      {
        name: "Attribution-NoDerivates 4.0 International",
        slug: "CC BY-ND 4.0",
        badge:
          "https://img.shields.io/badge/License-CC_BY--ND_4.0-lightgrey.svg",
        link: "https://creativecommons.org/licenses/by-nd/4.0/",
      },
      {
        name: "Attribution-NonCommmercial-ShareAlike 4.0 International",
        slug: "CC BY-NC-SA 4.0",
        badge:
          "https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-lightgrey.svg",
        link: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
      },
      {
        name: "Attribution-NonCommercial-NoDerivatives 4.0 International",
        slug: "CC BY-NC-ND 4.0",
        badge:
          "https://img.shields.io/badge/License-CC_BY--NC--ND_4.0-lightgrey.svg",
        link: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
      },
    ],
  },
  {
    name: "Mozilla Public License 2.0",
    slug: "MPL 2.0",
    badge: "https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg",
    link: "https://opensource.org/licenses/MPL-2.0",
  },
  {
    name: "GNU",
    sublicenses: [
      {
        name: "GNU GPL v3",
        slug: "GPL v3",
        badge: "https://img.shields.io/badge/License-GPLv3-blue.svg",
        link: "https://www.gnu.org/licenses/gpl-3.0",
      },
      {
        name: "GNU GPL v2",
        slug: "GPL v2",
        badge: "https://img.shields.io/badge/License-GPL_v2-blue.svg",
        link: "https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html",
      },
      {
        name: "GNU AGPL v3",
        slug: "AGPL v3",
        badge: "https://img.shields.io/badge/License-AGPL_v3-blue.svg",
        link: "https://www.gnu.org/licenses/agpl-3.0",
      },
      {
        name: "GNU LGPL v3",
        slug: "LGPL v3",
        badge: "https://img.shields.io/badge/License-LGPL_v3-blue.svg",
        link: "https://www.gnu.org/licenses/lgpl-3.0",
      },
      {
        name: "GNU FDL v1.3",
        slug: "FDL 1.3",
        badge: "https://img.shields.io/badge/License-FDL_v1.3-blue.svg",
        link: "https://www.gnu.org/licenses/fdl-1.3",
      },
    ],
  },
  {
    name: "Open Data Commons",
    sublicenses: [
      {
        name: "Attribution License (BY)",
        slug: "Open Data Commons Attribution",
        badge: "https://img.shields.io/badge/License-ODC_BY-brightgreen.svg",
        link: "https://opendatacommons.org/licenses/by/",
      },
      {
        name: "Open Database License (ODbL)",
        slug: "ODbL",
        badge: "https://img.shields.io/badge/License-ODbL-brightgreen.svg",
        link: "https://opendatacommons.org/licenses/odbl/",
      },
      {
        name: "Public Domain Dedication and License (PDDL)",
        slug: "PDDL",
        badge: "https://img.shields.io/badge/License-PDDL-brightgreen.svg",
        link: "https://opendatacommons.org/licenses/pddl/",
      },
    ],
  },
];

/**
 * Gets the names of all license groups and flat licenses
 * @param {string} licenseName Name of the license
 * @returns {Array<string>} Array of license names
 */
export const getLicenseNames = () => mapNames(licenses);

/**
 * Gets the names of all sublicences in a license group
 * @param {string} licenseName Name of the license group
 * @returns {Array<string>} Array of sublicense names
 */
export const getSublicenseNames = (licenseName) =>
  mapNames(getLicenseByName(licenseName).sublicenses);

/**
 * Gets license data by name
 * @param {string} licenseName Name of the license
 * @returns {(Object | undefined)} License data object if it exists
 */
export const getLicenseByName = (licenseName) =>
  licenses.find((l) => l.name === licenseName);

/**
 *  Gets sublicense data by name
 * @param {string} licenseName Name of the license
 * @param {string} sublicenseName Name of the sublicense
 * @returns {(Object | undefined)} Sublicense data object if it exists
 */
export const getSublicenseByName = (licenseName, sublicenseName) =>
  licenses
    .find((l) => l.name === licenseName)
    .sublicenses.find((s) => s.name === sublicenseName);

/**
 * Creates a markdown license badge
 * @param {Object} license License data object
 * @param {string} license.slug License name to be displayed on the image
 * @param {string} license.badge Link to the license badge image
 * @param {string} license.link Link to the license
 * @returns {string} Markdown license badge
 */
export const createLicenseBadge = ({ slug, badge, link }) =>
  `[![License${slug ? ": " + slug : ""}](${badge})](${link})`;
