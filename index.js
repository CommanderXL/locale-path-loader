const loaderUtils = require('loader-utils')
const lang = require('./lib/lang')
module.exports = function (source) {
  this.cacheable && this.cacheable()
  let I18N_PATTERN = /\$\{locale\}/g
  let query = loaderUtils.getOptions(this) || {}
  // 多语言环境配置
  source = source.replace(I18N_PATTERN, query.locale || 'zh')

  // 生成语言map表
  if (query.inline && query.outputDir) {
    lang(source, query.outputDir)
  }

  return source
}
