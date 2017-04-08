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

  let res = _.getComment(content)

  if (res.length) {
    res.forEach((item, index) => {
      lang = Object.assign(lang, item)
    })
  }
  
  rm('-rf', LANG_DIR)
  mkdir('-p', LANG_DIR)
  touch(LANG_FILE)

  let mapLang = _.getLangJSON(lang, {})

  fs.writeFile(LANG_FILE, JSON.stringify(mapLang), (err, res) => {
    if (err) throw err
    console.log('Lang Map has been writed in')
  })

  console.log(mapLang)

  return content
}
