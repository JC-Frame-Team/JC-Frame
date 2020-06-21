import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('JC page', module)
  .add('JC start', () => {
    return (
      <>
        <h1>欢迎来到 JC 组件库</h1>
        <p>JC 是为了方便极速开发组件库，在开发中常用的REACT组件库</p>
        <h3>安装试试</h3>
        <code>
          npm install jc --save
        </code>
      </>
    )
  }, { info : { disable: true }})