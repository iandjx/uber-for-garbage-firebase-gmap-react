import React from 'react'
import {
  Grid,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  drawerPaper: { width: 'inherit' },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  }
}))

const SideBar = ({ drawer, setDrawer }) => {
  const classes = useStyles()

  return (
    <div onClick={() => setDrawer(false)}>
      <Drawer
        style={{ width: '220px' }}
        anchor='left'
        open={drawer}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ onBackdropClick: () => setDrawer(false) }}
      >
        <List>
          <Link to='/request'>
            <ListItem>
              <ListItemText primary='Request Pick Up' />
            </ListItem>
          </Link>
          <Link to='/profile'>
            <ListItem>
              <ListItemText primary='Profile' />
            </ListItem>
          </Link>
          <Link to='/patrol'>
            <ListItem>
              <ListItemText primary='Basura Patrol' />
            </ListItem>
          </Link>
          <Link to='/zero-wayste'>
            <ListItem>
              <ListItemText primary='Zero Wayste' />
            </ListItem>
          </Link>
          <Link to='/depot'>
            <ListItem>
              <ListItemText primary='Wayste Depot' />
            </ListItem>
          </Link>
          <Link to='/about'>
            <ListItem>
              <ListItemText primary='About Us' />
            </ListItem>
          </Link>
          <Link to='/log-out'>
            <ListItem>
              <ListItemText primary='Log Out' />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  )
}

export default SideBar
