import React, { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from 'react';
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'

type InputSize = 'lg' | 'sm'

// InputHTMLAttributes 有了size的属性  如何解决呢？ 给外面的size换一个名称
// partial 所有换成可选项
// omit 忽略掉InputHTMLAttributes的size 可以这么做
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /**是否禁用 Input */
    disabled?: boolean;
    /**设置 input 大小，支持 lg 或者是 sm */
    size?: InputSize;
    /**添加图标，在右侧悬浮添加一个图标，用于提示 */
    icon?: IconProp;
    /**添加前缀 用于配置一些固定组合 */
    prepend?: string | ReactElement;
    /**添加后缀 用于配置一些固定组合 */
    append?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Input 输入框 通过鼠标或键盘输入内容， 是最基础的表单域的包装。
 * 
 * ~~~js
 * // 这样引用
 * import { Input } from 'jc'
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
export const Input: FC<InputProps> = (props) => {
    // storybook 服务的
    // 取出各种属性
    const { disabled, size, icon, prepend, append, style, ...restProps } = props
    // 根据属性计算不同的classNames  
    const cNames = classNames('jc-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-prepend': !!prepend,
        'input-group-append': !!append
    })
    const whenDefaultValueAndValueExistThenDeleteDefaultValue = (value: any) => {
        if (typeof value === 'undefined' || value === null) {
            return ''
        }
        return value
    }
    if ('value' in props) {
        delete restProps.defaultValue
        restProps.value = whenDefaultValueAndValueExistThenDeleteDefaultValue(props.value)
    }
    return (
        // 根据属性判断是否要添加特定的节点
        <div className={cNames} style={style}>
            {prepend && <div className="jc-input-group-prepend">{prepend} </div>}
            {icon && <div className="icon-wrapper" > <Icon icon={icon} title={`title-${icon}`}></Icon>   </div>}
            <input className="jc-input-inner" disabled={disabled} {...restProps} />
            {append && <div className="jc-input-group-append">{append} </div>}
        </div>
    )
}
export default Input;