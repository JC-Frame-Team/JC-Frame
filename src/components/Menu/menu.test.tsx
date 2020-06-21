import React from 'react';
import { render, RenderResult, fireEvent, cleanup, wait } from '@testing-library/react'
import Menu, {
    MenuProps
} from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'
const testProps: MenuProps = {
    defaultIndex: '0',
    className: 'test',
    onSelect: jest.fn()
}
const testVerProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical'
}
const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem >
                active
            </MenuItem>
            <MenuItem disabled >
                disabled
            </MenuItem>
            <MenuItem >
                xsj
            </MenuItem>
            <SubMenu title='dropdown'>
                <MenuItem >
                    drop1
                 </MenuItem>
            </SubMenu>
        </Menu>
    )
}
const createStyleFile = () => {
    const cssFile: string = `
        .jc-submenu{
            display:none;
        }
        .jc-submenu .menu-opened{
            display:block;
        }
    `
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = cssFile
    return style
}
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('test menu and menuitem component', () => {
    // 小妙招
    beforeEach(() => {
        wrapper = render(generateMenu(testProps))
        wrapper.container.append(createStyleFile())
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })
    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('jc-menu test')
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    })
    it('click items should change active and call the right callback', () => {
        const tItem = wrapper.getByText('xsj')
        fireEvent.click(tItem)
        expect(tItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })
    it('should render vertical mode when mode is set to vertical', () => {
        cleanup()
        const wrapper = render(generateMenu(testVerProps))
        const menuE = wrapper.getByTestId('test-menu')
        expect(menuE).toHaveClass('menu-vertical')
    })
    it('should show dropdown items when hover on subMenu', async () => {
        expect(wrapper.queryByText('drop1')).not.toBeVisible()
        const dropdownE = wrapper.getByText('dropdown')
        fireEvent.mouseEnter(dropdownE)
        // 这里有异步操作
        // 这里怎么回事
        await wait(() => {
            expect(wrapper.queryByText('drop1')).not.toBeVisible()
        })
        fireEvent.click(wrapper.getByText('drop1'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
        fireEvent.mouseLeave(dropdownE)
        await wait(()=>{
            expect(wrapper.queryByText('drop1')).not.toBeVisible()
        })
    });
})