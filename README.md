# vue-cli-mock

#### 安装

```
npm install vue-cli-mock -S
```

#### 使用

vue.config.js
```
const mock = require('vue-cli-mock')

module.exports = {
  devServer: {
    before (app) {
      mock(app)
    }
  }
}
```

根目录下 mock/user.js

```
module.exports = {
  'GET /user/login': (req, res) => {
    res.json({ custom: '1111' })
  },
  '/user/1': (req, res) => {
    res.json({ custom: 'response' })
  },
  '/dicts': {
    status: [1, 2, 3]
  }
}
```