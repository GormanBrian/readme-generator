export const licenses = [
  {
    name: "MIT",
    link: "",
  },
  {
    name: "Apache 2.0",
    link: "",
  },
  {
    name: "BSD",
    sublicenses: [
      {
        name: "BSD 3-Clause",
        link: "",
      },
      {
        name: "BSD 2-Clause",
        link: "",
      },
    ],
  },
  {
    name: "Creative Commons",
    sublicenses: [
      {
        name: "CC0",
        link: "",
      },
    ],
  },
];

export const getLicense = (str) => licenses.find((l) => l.name === str);
