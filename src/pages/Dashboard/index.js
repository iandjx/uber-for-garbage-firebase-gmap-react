import React, { useState } from 'react'

import { Grid } from '@material-ui/core'
import Header from '../../common/components/Header'
import { Outlet } from 'react-router-dom'
import SideBar from '../../common/components/SideBar'

const Dashboard = () => {
  const [drawer, setDrawer] = useState(false)
  return (
    <>
      <Grid container justify='center' alignItems='center'>
        <SideBar drawer={drawer} setDrawer={setDrawer} />
        <Grid item xs={12}>
          <Header setDrawer={setDrawer} drawer={drawer} />
        </Grid>
        <Grid item xs={12}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard
