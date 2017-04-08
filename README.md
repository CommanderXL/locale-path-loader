## 功能说明

* 文件编译阶段完成字符串替换, 在业务代码当中无需再编写过多用以加载不同语言包文件的判断语句
* 提供自动维护语言`map`表功能。就近原则，在需要进行翻译的地方，编写好`map`，`loader`会遍历所有的文件去维护最终的`map`表。也可以不启用这个功能，还是单独在语言包文件进行手动的维护

## 路径替换

```javascript
图片路径
  模板文件中
  <img src="/static/images/${locale}/loader.png"/>

  编译后 --->>>
  <img src="/static/images/en/loader.png"/>

css文件中图片路径
  .box {
    background: url('/static/images/${locale}/loader.png')
  }

  编译后 --->>>
  .box {
    background: url('/static/images/en/loader.png')
  }

class属性:
  <p class="box ${locale}">

  编译后 --->>>
  <p class="box en">
```

## Map表

使用`JSON`格式编写
```javascript
  模板文件中:

  <!--
    <i18n>
      {
        "我爱你": {
          "en": "I love you ",
          "zh": "我爱你"
        }
      }
    <i18n>
  -->


  js文件中:

  /*<i18n>
  {
    "你好": {
      "zh": "你好",
      "en": "Hello"
    }
  }
<i18n>*/
```

`preloader`会遍历文件并根据配置路径生成最终的语言包`lang.json`

```javascript
{
  "en": {
    "我爱你": "I love you ",
    "你好": "Hello"
  },
  "zh": {
    "我爱你": "我爱你",
    "你好": "你好"
  }
}
```


## How to

### 参数说明

* inline: Boolean   是否启用内联模式，即使用就近原则，`map`表分散在各文件中，由`loader`去遍历生成最终的`map`表
* locale: String  语言环境配置, 默认为`zh`
* outputDir: String 最终`lang.json`语言映射表生成的路径配置(如果开启了`inline`模式需要对此参数进行配置)

### webpack 1.x

```javascript
  module.exports = {
    ....
    preLoaders: [
      {
        test: /\.vue$/,
        loaders: [
          'eslint',
          'locale-path??outputDir=./src/common&locale=en&inline=true'
        ]
      } 
    ]
    ....
  }
```

### webpack 2


```javascript
  module.exports = {
    ....
    module: {
      rules: [{
        test: /\.vue$/,
        enforce: 'pre',
        use: [{
          loader: 'eslint-loader',
          ...
        }, {
          loader: 'locale-path-loader',
          options: {
            locale: 'en',
            outputDir: './src/common',
            inline: true
          }
        }]
      }]
    }
    ....
  }
```


