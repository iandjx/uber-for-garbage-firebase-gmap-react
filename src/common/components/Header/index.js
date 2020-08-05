import React from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemIcon,
  Container,
  Typography
} from '@material-ui/core'

const Header = ({ drawer, setDrawer }) => {
  return (
    <Button
      onClick={() => {
        setDrawer(!drawer)
      }}
    >
      Open
    </Button>
  )
}

export default Header
