
import { showLoading, hideLoading } from 'react-redux-loading'
import { getUsers } from '../utils/api'

export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'

export function logIn (id) {
    return {
        type: LOG_IN,
        id,
    }
}

export function logOut () {
    return { 
        type: LOG_OUT
    }
}

export function handleLogIn (id) {
    return (dispatch) => {
        dispatch(showLoading())
        
        return getUsers()
        .then((users) => {
            const authedUser = Object.keys(users)
                .find(user => user === id)
                
            authedUser.length === 0 ?
              dispatch(logIn(null)) :
              dispatch(logIn(id))
          })
        .then(() => dispatch(hideLoading()))
    }
}