import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { handleAddQuestionAnswer } from '../actions/questions'
import { formatDate } from '../utils/helpers'

class Question extends Component {
    state = {
        answer: '',
    }

    handleChange = (e) => {
        const value = e.target.value

        this.setState(() => ({
            answer: value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { answer } = this.state
        const { dispatch, id } = this.props
        dispatch(handleAddQuestionAnswer(id, answer))
    }

    render() {
        const { question, users, isAnswer } = this.props
        const {
            id,
            author,
            optionOne,
            optionTwo,
            timestamp
        } = question
        const authorUser = users[author]
        
        return (
            <div className='card'>
                <header className='header left'>{authorUser.name} asks:</header>
                <div className='card-body row'>
                    <div className='column-small border-right'>
                        <img 
                            src={authorUser.avatarURL}
                            alt={`Avatar of ${authorUser.name}`}
                            className='huge-avatar'
                        />
                    </div>
                    <div className='column-big'>
                        <div className='title'>Would you rather ...</div>
                        { !isAnswer && (
                            <div>
                                <div>{optionOne.text}</div>
                                <div className='title'>OR</div>
                                <div>{optionTwo.text}</div>
                                <Link to={`/questions/${id}`}>
                                    <button className='btn' type='btn'>
                                        View Poll
                                    </button>
                                </Link>
                            </div>)}
                        { isAnswer && (
                        <div>
                            <div>
                                <input  
                                    type='radio'
                                    value='optionOne' 
                                    checked={this.state.answer === 'optionOne'}
                                    onChange={this.handleChange}/>
                                        {optionOne.text}
                            </div>
                            <div>
                                <input 
                                    className='left' 
                                    type='radio' 
                                    value='optionTwo'
                                    checked={this.state.answer === 'optionTwo'}
                                    onChange={this.handleChange}/>
                                        {optionTwo.text}
                            </div>
                            <button 
                                className='btn-submit'
                                onClick={this.handleSubmit}> 
                                    Submit
                            </button>
                        </div>)}
                        <span className='time'>{formatDate(timestamp)}</span>
                    </div>
                </div>          
            </div>
        )
    }
}

Question.propTypes = {
    question: PropTypes.object.isRequired,
    users: PropTypes.oneOfType([
                PropTypes.arrayOf(PropTypes.object),
                PropTypes.object
            ]),
    id: PropTypes.string,
    isAnswer: PropTypes.bool,
    authedUser: PropTypes.string
}

function mapStateToProps ({ questions, users, authedUser }, { id, isAnswer }) {
    return {
        question : questions[id],
        id,
        users,
        authedUser,
        isAnswer
    }
}

export default withRouter(connect(mapStateToProps)(Question))