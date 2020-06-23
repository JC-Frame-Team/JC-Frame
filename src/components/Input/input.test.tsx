import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { Input, InputProps } from './input'

const defaultProps: InputProps = {
    onChange: jest.fn(),
    placeholder: 'test-input'
}
describe('test Input comp', () => {
    it('should render the correct default Input', () => {
        const wrapper = render(<Input {...defaultProps}></Input>)
        const tNode = wrapper.getByPlaceholderText('test-input') as HTMLInputElement
        expect(tNode).toBeInTheDocument()
        expect(tNode).toHaveClass('jc-input-inner')
        fireEvent.change(tNode, { target: { value: 'jc' } })
        expect(defaultProps.onChange).toHaveBeenCalled()
        expect(tNode.value).toEqual('jc')
    });
    it('should render the disabled Input on disabled props', () => {
        const dom = render(<Input disabled placeholder="disabled"></Input>)
        const tNode = dom.getByPlaceholderText('disabled') as HTMLInputElement
        expect(tNode.disabled).toBeTruthy
    });
    it('should render different input sizes on size props ', () => {
        const dom = render(<Input placeholder="sizes" size="lg"></Input>)
        const container = dom.container.querySelector('.jc-input-wrapper')
        expect(container).toHaveClass('input-size-lg')
    });
    it('should render prepand and append element on prepand/append property', () => {
        const { queryByText, container } = render(<Input placeholder="pend" prepend="https://" append=".com"></Input>)
        const testcontainer = container.querySelector('.jc-input-wrapper')
        expect(testcontainer).toHaveClass('input-group input-group-append input-group-prepend')
        expect(queryByText('https://')).toBeInTheDocument()
        expect(queryByText('.com')).toBeInTheDocument()
    })
})
