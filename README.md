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
  
```