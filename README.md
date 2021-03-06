## JC 组件库   高级组件开发     火速上手  直接开发
## 使用 React+typescript JC-Frame 高级爆速开发框架

#  开发组件库的高级框架  JC-Frame
##  爆速开发吧
## 自动生成文档 按照ReactDocGen的规则来写注释即可自动生成注释 文档等

### 使用
~~~javascript
npm install jc --save
~~~
~~~javascript
// 加载样式
import 'jc/dist/index.css'
// 引入组件
import { Button } from 'jc'
~~~


* 🔥爆速开发组件库框架

组件开发步骤



遵循规范：

1.*import* React,{FC,ButtonHTMLAttributes,AnchorHTMLAttributes} *from* 'react';



由于使用的是第三方loader，所以

这里必须遵循第三方loader的ast语法解析器

不能使用React.FC 必须导出的形式

2. 组件必须export name

   export* const Input: FC<ButtonProps> = (props) => {

3. *export* *default* Button;

### 一些本地开发命令

~~~bash
//启动本地环境
yarn stroybook

//跑单元测试
npm test

//build可发布静态文件
npm run build

//发布到 npm
npm run publish
~~~


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
