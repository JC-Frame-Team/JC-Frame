import React, { createContext, useState, FunctionComponentElement } from 'react';
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'
type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
    /**设置子菜单的默认打开 只在纵向模式下生效 */
    defaultOpenSubMenus?: string[];
}
interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export const MenuContext = createContext<IMenuContext>({ index: "0" })


const Menu: React.FC<MenuProps> = (props) => {
    const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus} = props
    const [currentActive, setActive] = useState(defaultIndex)
    // 子组件currentActive要不要高亮  onselct函数
    const classes = classNames('jc-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    })
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',//联合类型currentActive undifined 和number类型
        onSelect: (index: string) => {
            setActive(index)
            // 假如
            if (onSelect) {
                onSelect(index)
            }
        },
        mode,
        defaultOpenSubMenus
    }
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childE = child as FunctionComponentElement<MenuItemProps>
            const { displayName } = childE.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                // 第二个 想要复制的属性
                return React.cloneElement(childE, { index:index.toString() })
            } else {
                console.error("warning: Menu has child which is not a MenuItem comp");
            }
        })
    }
    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext} >
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
}
export default Menu;