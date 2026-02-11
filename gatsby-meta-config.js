/**
 * @typedef {Object} Links
 * @prop {string} github Your github repository
 */

/**
 * @typedef {Object} MetaConfig
 * @prop {string} title Your website title
 * @prop {string} description Your website description
 * @prop {string} author Maybe your name
 * @prop {string} siteUrl Your website URL
 * @prop {string} lang Your website Language
 * @prop {string} utterances Github repository to store comments
 * @prop {Links} links
 * @prop {string} favicon Favicon Path
 */

/** @type {MetaConfig} */
const metaConfig = {
  title: "Brandon Geise",
  description: `Brandon's Blog`,
  author: "Brandon Geise",
  siteUrl: "https://bgeise.com",
  lang: "en",
  utterances: "", // Set to a GitHub repo (e.g. "user/repo") to enable comments, or leave empty to disable
  links: {
    github: "https://github.com/bdgeise",
    linkedin: "https://www.linkedin.com/in/bdgeise",
  },
  favicon: "src/images/favicon.png",
}

// eslint-disable-next-line no-undef
module.exports = metaConfig
