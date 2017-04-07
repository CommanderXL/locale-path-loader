## 功能说明

文件编译阶段完成字符串替换, 在业务代码当中无需再编写过多用以加载不同语言包文件的判断语句

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

## How to

### webpack 1.x

```javascript
  module.exports = {
    ....
    loaders: [
      {
        test: /\.vue$/,
        loaders: [
          'vue',
          'locale-path?local=en'
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
        use: [{
          loader: 'vue-loader',
          ...
        }, {
          loader: 'locale-path-loader',
          options: {
            locale: 'en'
          }
        }]
      }]
    }
    ....
  }
```


