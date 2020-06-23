import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

export const defaultMenu = () => (
  <Menu defaultIndex='0' onSelect={(index) => { action(`clicked ${index} item`) }} >
    <MenuItem>
      JC link
    </MenuItem>
    <MenuItem disabled>
      disabled
    </MenuItem>
    <MenuItem>
      JC link 2
    </MenuItem>
  </Menu>
)
export const verticalMenu = () => (
  <Menu defaultIndex='0' onSelect={(index) => { action(`clicked ${index} item`) }} mode="vertical" >
    <MenuItem>
      JC link
    </MenuItem>
    <MenuItem disabled>
      disabled
    </MenuItem>
    <SubMenu title="subMenu">
      <MenuItem>
        JC link
     </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
    </SubMenu>
  </Menu>
)
export const subMenu = () => (
  <Menu defaultIndex='0' onSelect={(index) => { action(`clicked ${index} item`) }}  >
    <MenuItem>
      JC link
    </MenuItem>
    <MenuItem disabled>
      disabled
    </MenuItem>
    <SubMenu title="subMenu">
      <MenuItem>
        JC link
     </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
    </SubMenu>
  </Menu>
)

storiesOf('Menu Component', module)
  .add('Menu', defaultMenu)
  .add('verticalMenu', verticalMenu)
  .add('SubMenu', subMenu)