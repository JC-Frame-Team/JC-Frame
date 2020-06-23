import React,{FC,ButtonHTMLAttributes,AnchorHTMLAttributes} from 'react';
import classNames from 'classnames';
// export enum ButtonSize {
//     Large = 'lg',
//     Small = 'sm'
// }
// export enum ButtonType {
//     Primary = 'primary',
//     Default = 'default',
//     Danger = 'danger',
//     Link = 'link'
// }

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
    className?: string;
    /**设置 Button的禁用 */
    disabled?: boolean;
    /**设置 Button的尺寸 */
    size?: ButtonSize;
    /**设置 Button的类型 */
    btnType?: ButtonType;
    children: React.ReactNode,
    href?: string
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps> // 结合BaseButtonProps又结合了ButtonHTMLAttributes
// 用partial进行修饰了一下，所有都变成可选的
// 必须加一个export

/**
 * jc 组件
 * # Button How to use?
 * ```js
 * import {Button } from 'jc
 * ```
 * 
 */
export const Button: FC<ButtonProps> = (props) => {
    const { btnType, className, disabled, size, children, href, ...restProps } = props
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled
    })
    if (btnType === 'link' && href) {
        return (
            <a href={href} className={classes} {...restProps}>{children}</a>
        )
    } else {
        return (
            <button className={classes} disabled={disabled}  {...restProps}>
                {children}
            </button>
        )
    }
}
Button.defaultProps = {
    disabled: false,
    btnType: 'default'
}
export default Button;