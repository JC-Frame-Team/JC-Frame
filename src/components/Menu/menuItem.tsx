import React, { useContext } from 'react';
import classNames from 'classnames'
import { MenuContext } from './menu'
export interface MenuItemProps {
    index?: string;
    disabled?: Boolean;
    className?: String;
    style?: React.CSSProperties;
}
const MenuItem: React.FC<MenuItemProps> = (props) => {
    const { disabled, index, className, style, children } = props
    // value onselect
    const context = useContext(MenuContext)
    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    })
    const handleClick = () => {
        // 隐藏问题
        if (context.onSelect && !disabled && (typeof index ==='string')) {
            context.onSelect(index)
        }
    }
    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}
MenuItem.displayName='MenuItem'
export default MenuItem