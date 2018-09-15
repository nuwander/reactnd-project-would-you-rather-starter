import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'

import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Leaderboard from './Leaderboard'
import LogIn from './LogIn'
import Nav from './Nav'
import NewQuestion from './NewQuestion'
import NotFound from './NotFound'
import PrivateRoute from './PrivateRoute'
import QuestionPage from './QuestionPage'

class App extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    this.props.getData()
      .then(() => {
        this.setState({
          loading: false,
        })
      })
  }

  render() {
    const { loading } = this.state

    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            {loading === true
              ? null
              : <Switch>
                  <PrivateRoute path='/' exact component={Dashboard} />
                  <PrivateRoute path='/add' exact component={NewQuestion} />
                  <PrivateRoute path='/questions/:id' exact component={QuestionPage} />
                  <PrivateRoute path='/leaderboard' component={Leaderboard} />
                  <Route path='/login' exact component={LogIn}/>
                  <Route component={NotFound}/>
                </Switch>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getData: () => dispatch(handleInitialData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
