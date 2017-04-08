require('shelljs/global')
const loaderUtils = require("loader-utils")
const path = require('path')
const fs = require('fs')
const recursiveDir = require('./recursive-dir')
const _ = require('./util')

module.exports = function (content, outputDir) {
  this.cacheable && this.cacheable()
  const LANG_DIR = path.join(outputDir, '/lang')
  const LANG_FILE = path.join(LANG_DIR, '/lang.json')
  let lang = {}
  let currContent = {}

  let res = _.getComment(content)

  if (res.length) {
    res.forEach((item, index) => {
      lang = Object.assign(lang, item)
    })
  }

  if (fs.existsSync(LANG_FILE)) {
    let res = fs.readFileSync(LANG_FILE, 'UTF-8')
    if (res) {
      try {
        currContent = JSON.parse(res)
      } catch (e) {
        console.log(e)
      }
    }
  }

  // rm('-rf', LANG_DIR)
  // mkdir('-p', LANG_DIR)
  // touch(LANG_FILE)

  let mapLang = _.getLangJSON(lang, currContent)

  if (mapLang) {
    fs.writeFileSync(LANG_FILE, JSON.stringify(mapLang), 'utf-8')
  }

  return content
}
