// 配上query参数
const loaderUtils = require('loader-utils')
module.exports = function (source) {
  this.cacheable && this.cacheable()
  let I18N_PATTERN = /\$\{locale\}/g
  let query = loaderUtils.getOptions(this) || {}
  // 多语言环境配置
  source = source.replace(I18N_PATTERN, query.locale || 'zh')
  return source
}
