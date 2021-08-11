import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../Dashboard'
import Profile from '../profile/Profile'
import Login from './../auth/Login'
import Signup from './../auth/Signup'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from '../profile/ForgotPassword'
import UpdateProfile from '../profile/UpdateProfile'
import Schedule from '../schedule/Schedule'

const Routes = () => (
  <Switch>
    <PrivateRoute exact path="/" component={Dashboard} />
    <PrivateRoute exact path="/profile" component={Profile} />
    <PrivateRoute path="/update-profile" component={UpdateProfile} />
    <PrivateRoute path="/agenda" component={Schedule} />
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
    <Route path="/forgot-password" component={ForgotPassword} />
  </Switch>
)

export default Routes
