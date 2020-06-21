import React from 'react';
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
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children: React.ReactNode,
    href?: string
}
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps> // 结合BaseButtonProps又结合了ButtonHTMLAttributes
// 用partial进行修饰了一下，所有都变成可选的
const Button: React.FC<ButtonProps> = (props) => {
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