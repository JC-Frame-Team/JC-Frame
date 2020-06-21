import React from 'react'
import { render, fireEvent } from "@testing-library/react"
import Button, { ButtonProps } from './button'
// 捕获函数是否被调用
const defaultProps = {
    onClick: jest.fn()
}
const testProps: ButtonProps = {
    btnType: 'primary',
    size: 'lg',
    className: 'jclass'
}
const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}
describe('test button component', () => {
    it('should render the correct default button', () => {
        const wrapper = render(<Button {...defaultProps}>Nice</Button>)
        const e = wrapper.getByText('Nice') as HTMLButtonElement//fanhui zhi
        expect(e).toBeInTheDocument()
        expect(e.tagName).toEqual('BUTTON')
        expect(e).toHaveClass('btn btn-default')
        expect(e.disabled).toBeFalsy()
        // testing-library
        fireEvent.click(e)
        expect(defaultProps.onClick).toHaveBeenCalled()
    })
    it('should render the correct component based on different props', () => {
        const wrapper = render(<Button {...testProps}>Nice</Button>)
        const e = wrapper.getByText('Nice')//fanhui zhi
        expect(e).toBeInTheDocument()
        expect(e).toHaveClass('btn-primary btn-lg jclass')
    })
    it('should render a link when btnType equals link and href is provided', () => {
        const wrapper = render(<Button btnType={'link'} href="http://www.baidu.com">Link</Button>)
        const e = wrapper.getByText('Link')//fanhui zhi
        expect(e).toBeInTheDocument()
        expect(e.tagName).toEqual('A')
        expect(e).toHaveClass('btn btn-link')
    })
    it('should render disabled button when diabled set to true', () => {
        const wrapper = render(<Button {...disabledProps}>diabled</Button>)
        const e = wrapper.getByText('diabled') as HTMLButtonElement//fanhui zhi
        expect(e).toBeInTheDocument()
        expect(e.disabled).toBeTruthy()
        fireEvent.click(e)
        expect(disabledProps.onClick).not.toHaveBeenCalled()
    })
})