import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AutoComplete } from './AutoComplete'
interface LakerPlayerProps {
    value: string;
    number: number;
}
interface GithubUserProps {
    login: string;
    url: string;
    avatar_url: string;
}
const simplify = () => {
    const handleFetch = (query: string) => {
        return fetch(`https://api.github.com/search/users?q=${query}`)
            .then(res => res.json())
            .then(({ items }) => {
                console.log(items);
                return items.slice(0, 15).map((item: any) => ({ value: item.login, ...item }))
            })
    }
    return (
        <AutoComplete fechSuggestions={handleFetch} onSelect={action('selected')}>

        </AutoComplete> 
    )
}


storiesOf('AutoComplete Component', module)
  .add('AutoComplete', simplify)
