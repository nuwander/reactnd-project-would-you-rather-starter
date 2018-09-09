import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

const optionOne = 'option1'
const optionTwo = 'option2'

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  }

  handleChange = (e, option) => {
    const text = e.target.value

    if (option === optionOne) {
      this.setState(() => ({
        optionOneText: text
      }))
    } else {
      this.setState(() => ({
        optionTwoText: text
      }))
    }    
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOneText, optionTwoText } = this.state
    const { dispatch } = this.props

    dispatch(handleAddQuestion(optionOneText, optionTwoText))

    this.setState(() => ({
      toHome: true,
    }))
  }

  render() {
    const { optionOneText, optionTwoText, toHome } = this.state
    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div className='card'>
        <header className='header'>
            <span>Create New Question</span>
        </header>
        <form className='card-body' onSubmit={this.handleSubmit}>
          <span className='left'>Complete the question:</span>
          <h4 className='left'>Would you rather ...</h4>
          <input
            type='text'
            placeholder='Enter Option One here'
            value={optionOneText}
            onChange={event => this.handleChange(event, optionOne)}
          />
          <h4>OR</h4>
          <input
            type='text'
            placeholder='Enter Option Two here'
            value={optionTwoText}
            onChange={event => this.handleChange(event, optionTwo)}
          />
          <button
            className='btn-submit'
            type='submit'
            disabled={
              optionOneText === '' && 
              optionTwoText === ''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

export default withRouter(connect()(NewQuestion))