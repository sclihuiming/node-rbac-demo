# node-rbac-demo

根据本地权限需求设置，使用第三方库完成权限管理验证等。
* 本地数据库表设计的权限表包含了前端的动态菜单，对有权限的菜单项进行了输出，前端根据获取的菜单进行菜单栏的渲染
* 本地权限表管理的时候使用node-acl库作为鉴权的库，使用redis中间件存储了鉴权的依据。

后面打算权限鉴权使用的库换成node-casbin

## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```


### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+
