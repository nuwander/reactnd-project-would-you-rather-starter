import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { handleLogIn } from '../actions/authedUser'

class LogIn extends Component {
    state = {
        id: 'select',
        redirectToReferrer: false
    }

    handleChange = (e) => {
        const id = e.target.value

        this.setState(() => ({
            id
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { id } = this.state

        if (id !== 'select') {
            const { dispatch } = this.props
            dispatch(handleLogIn(id))
            .then(() => {
                 this.setState(() => ({
                    redirectToReferrer: true
                }))
            })
        }
    }

    render () {
        const { id, redirectToReferrer  } = this.state
        const { users, location } = this.props    
        const { from } = location.state || { from: { pathname: '/' } }
    
        if (redirectToReferrer === true) {
            return <Redirect to={from} />
        }      

        return (
            <div className='card'>
                <header className='header'>
                    <span className='title'>Welcome to the Would You Rather App!</span>
                    <span className='subtitle'>Please Sign In to Continue</span>
                </header>
                <form className='card-body' onSubmit={this.handleSubmit}>
                    <img src='images/logo.svg' className='login-logo' alt='logo'/>
                    <span className='sign-in'>Sign In</span>
                    <select className='select' value={id} onChange={this.handleChange}>
                        <option disabled hidden value='select'>Select User</option>
                        { users.map( 
                            user => (
                            <option 
                                key={user.id} 
                                value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                    <button
                        className='btn-submit'
                        type='submit'>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

LogIn.propTypes = {
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
}

function mapStateToProps ({ users }) {
    return {
        users: Object.keys(users).map((user) => {
            return {
                id: users[user].id,
                name: users[user].name,
                avatarURL: users[user].avatarURL,
            }
        })
    }   
}

export default connect(mapStateToProps)(LogIn)