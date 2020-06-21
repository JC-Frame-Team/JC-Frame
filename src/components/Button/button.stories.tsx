import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from './button'

const defaultButton = () => (
    <Button onClick={action('clicked')}>JC Button</Button>
)
const buttonWithSize = () => (
    <>
        <Button size="lg">large Button</Button>
        <Button size="sm">small Button</Button>
    </>
)
const buttonWithType = () => (
    <>
        <Button btnType="primary">primary Button</Button>
        <Button btnType="link">link Button</Button>
        <Button btnType="danger">danger Button</Button>
        <Button btnType="default">default Button</Button>
    </>
)
storiesOf('Button Component', module)
    .add('Default Button', defaultButton)
    .add('Size Button',buttonWithSize)
    .add('btnType Button',buttonWithType)