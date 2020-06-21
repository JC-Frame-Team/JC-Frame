import React, { useContext, FunctionComponentElement, useState } from 'react';
import classNames from 'classnames'
// import { CSSTransition } from 'react-transition-group';
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string
}
const SubMenu: React.FC<SubMenuProps> = ({ index, title, children, className }) => {
    const context = useContext(MenuContext)
    const openedSubMenus = context.defaultOpenSubMenus as Array<string> || []

    const isOpend = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
    const [menuOpen, setOpen] = useState(isOpend)
    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    })
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setOpen(!menuOpen)
    }
    let timer: any
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        // 异步操作， 断言不会等300s的
        timer = setTimeout(() => {
            setOpen(toggle)
        }, 300);
    }
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {}// 横向的时候不做处理
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
    } : {}// 横向做hover处理
    const renderChildren = () => {
        const subMenuClasses = classNames('jc-submenu', {
            'menu-opened': menuOpen
        })
        const childrenComp = React.Children.map(children, (child, i) => {
            const childE = child as FunctionComponentElement<MenuItemProps>
            if (childE.type.displayName === 'MenuItem') {
                return React.cloneElement(childE, {
                    index: `${index}-${i}`
                })
            } else {
                console.error('warning subMenu has a child which is not a MenuItem')
            }
        })
        return (
            <Transition in={menuOpen} timeout={300} animation="zoom-in-top"
            >
                <ul className={subMenuClasses}>
                    {childrenComp}
                </ul>
            </Transition>
        )
    }
    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className='submenu-title' {...clickEvents}>
                {title}
                <Icon icon="angle-down" className="arrow-icon"></Icon>
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu