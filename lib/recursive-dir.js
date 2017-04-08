const recursiveReaddir = require('recursive-readdir-sync')

module.exports = function (src) {
  let files;
  try {
    files = recursiveReaddir(src)
  } catch (e) {
    if (e.errno === 34) {
      throw new Error('Path does not exist')
    } else {
      throw err
    }
  }

  return files
}
