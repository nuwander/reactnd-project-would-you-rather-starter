import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { logOut } from '../actions/authedUser'

class Nav extends Component {
  handleLogOut = (e) => {
    e.preventDefault()
    this.props.dispatch(logOut())
  }

  navLinks() {
    const links = [
      ['/', 'Home'],
      ['/add', 'New Question'],
      ['/leaderboard', 'Leaderboard']
    ]
    return links.map(link => (
      <li key={link[0]}>
        <NavLink exact to={link[0]} activeClassName='active'>
          {link[1]}
        </NavLink>
      </li> 
    ))
  }

  render () {
    const { id, name, avatarURL } = this.props
    
    return (
      <nav className='nav'>
        <ul>
          {this.navLinks()}
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