import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { getUser } from '../../services/user'

import { NavDashboard } from './NavDashboard'

export default function SubNav() {
  const { currentUser, logout } = useAuth()

  const history = useHistory()

  // console.log('history', history)

  let renderSubMenu
  // console.log('dash aqui', usuario)

  if (currentUser && currentUser.bdUser.type === 'administrator') {
    renderSubMenu = (
      <NavDashboard>
        <Link
          to="/agenda"
          className={history.location.pathname === '/agenda' ? 'active' : ''}
        >
          Agenda
        </Link>
        <Link
          to="/permanentes"
          className={
            history.location.pathname === '/permanentes' ? 'active' : ''
          }
        >
          Permanentes
        </Link>
        <Link
          to="/cadastros"
          className={history.location.pathname === '/cadastros' ? 'active' : ''}
        >
          Cadastros
        </Link>
        <Link
          to="/relatorios"
          className={
            history.location.pathname === '/relatorios' ? 'active' : ''
          }
        >
          Relatórios
        </Link>
      </NavDashboard>
    )
  } else {
    renderSubMenu = (
      <NavDashboard>
        <Link
          to="/agenda"
          className={history.location.pathname === '/agenda' ? 'active' : ''}
        >
          Agenda
        </Link>
        <Link
          to="/cadastros"
          className={history.location.pathname === '/cadastros' ? 'active' : ''}
        >
          Cadastros
        </Link>
      </NavDashboard>
    )
  }

  return <React.Fragment>{renderSubMenu}</React.Fragment>
}
