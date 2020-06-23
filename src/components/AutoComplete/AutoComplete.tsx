// 赵昌浩
import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'
interface Data {
    value: string;
}
export type DataType<T = {}> = T & Data
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fechSuggestions: (str: string) => DataType[] | Promise<DataType[]>;
    onSelect?: (item: DataType) => void;
    renderOption?: (item: DataType) => ReactElement;
}
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {
        fechSuggestions,
        value,
        onSelect,
        renderOption,
        ...restProps
    } = props
    const [inputValue, setInputValue] = useState(value as string)
    const [Suggestions, setSuggestions] = useState<DataType[]>([])
    const [Loading, setLoading] = useState(false)
    const [ShowDropdown, setShowDropdown] = useState(false)
    const [HighlightIndex, setHighlightIndex] = useState(-1)
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)
    const debounceValue = useDebounce(inputValue, 300)
    useClickOutside(componentRef, () => { setSuggestions([]) })
    useEffect(() => {
        if (debounceValue && triggerSearch.current) {
            setSuggestions([])
            const results = fechSuggestions(debounceValue)
            if (results instanceof Promise) {
                setLoading(true)
                results.then(data => {
                    setLoading(false)
                    setSuggestions(data)
                    if (data.length > 0) {
                        setShowDropdown(true)
                    }
                })
            } else {
                setSuggestions(results)
                setShowDropdown(true)
                if (results.length > 0) {
                    setShowDropdown(true)
                }
            }
        } else {
            setShowDropdown(false)
        }
        setHighlightIndex(-1)
    }, [debounceValue, fechSuggestions])
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        triggerSearch.current = true
    }
    const renderTemplate = (item: DataType) => {
        return renderOption ? renderOption(item) : item.value
    }
    const highlight = (index: number) => {
        if (index < 0) index = 0
        if (index >= Suggestions.length) {
            index = Suggestions.length - 1
        }
        setHighlightIndex(index)
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case 13:
                if (Suggestions[HighlightIndex]) {
                    handleSelect(Suggestions[HighlightIndex])
                }
                break
            case 38:
                highlight(HighlightIndex - 1)
                break
            case 40:
                highlight(HighlightIndex + 1)
                break
            case 27:
                setShowDropdown(false)
                break
            default:
                break
        }
    }
    const handleSelect = (item: DataType) => {
        setInputValue(item.value)
        setShowDropdown(false)
        if (onSelect) {
            onSelect(item)
        }
        triggerSearch.current = false
    }
    const generateDropdown = () => {
        return (
            <Transition in={ShowDropdown || Loading} animation="zoom-in-top" timeout={300}
                onExited={() => { setSuggestions([]) }}>
                <ul className="jc-suggestion-list">
                    {Loading &&
                        <div className="suggestion-loading-icon">
                            <Icon icon='spinner'></Icon>
                        </div>
                    }
                    {
                        Suggestions.map((item, index) => {
                            const cNames = classNames('suggestion-item', {
                                'is-active': index === HighlightIndex
                            })
                            return (
                                <li key={index} className={cNames} onClick={() => handleSelect(item)}>
                                    {renderTemplate(item)}
                                </li>
                            )
                        })
                    }

                </ul>
            </Transition>
        )
    }
    return (
        <div className="jc-auto-complete" ref={componentRef}>
            <Input value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown} {...restProps}>
            </Input>
            {generateDropdown()}
        </div>
    )
}

export default AutoComplete;