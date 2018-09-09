import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { logOut } from '../actions/authedUser'

class Nav extends Component {
  handleLogOut = (e) => {
    e.preventDefault()
    this.props.dispatch(logOut())
  }

  render () {
    const { id, name, avatarURL } = this.props

    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
          <li className='user'>
            { id && (
              <span >
                <span className='current-user'>
                  Hello, {name}    
                  <img src={avatarURL} className='avatar' alt='avatar'/> 
                </span>
                <Link to='/' onClick={this.handleLogOut}>
                  Log Out
                </Link>
              </span>
            )}
            { !id && (
              <NavLink to='/login' activeClassName='active'>
                 Log In
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    )
  }
} 

function mapStateToProps({ users, authedUser }) {
  if (authedUser !== null) {
    const user = users[authedUser]
    return {
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
    }
  }

  return {
    id: '',
    avatarURL: '',
    name: '',
  }
}

export default withRouter(connect(mapStateToProps)(Nav))