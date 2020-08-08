import { Button, Grid } from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import routes from './routes'
import { useRouteMatch } from 'react-router-dom'

const Header = ({ drawer, setDrawer }) => {
  const { path, url } = useRouteMatch()

  const isCurrentPath = route => route.path === window.location.pathname
  const currentPath = routes.find(isCurrentPath)

  return (
    <Grid container justify='center' alignItems='center'>
      <Grid item xs={3}>
        <MenuIcon
          onClick={() => {
            setDrawer(!drawer)
          }}
        />
      </Grid>
      <Grid item xs={9}>
        Wayste
      </Grid>
      <Grid item xs={12}>
        {currentPath && currentPath.name}
      </Grid>
    </Grid>
  )
}

export default Header
