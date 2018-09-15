import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import Question from './Question'
import AnsweredQuestionCard from './AnsweredQuestionCard'

class QuestionPage extends Component {
    render () {
        const { question, isAnswered } = this.props
        
        if (question == null) {
            return <Redirect to='/notfound' />
        }

        return (
            <div>
                { !isAnswered && (
                    <Question id={question.id} isAnswer={true}/>
                )}
                { isAnswered && (
                    <AnsweredQuestionCard id={question.id}/>
                )}
            </div>
        )
    }
}

QuestionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  question: PropTypes.object,
  isAnswered: PropTypes.bool.isRequired
}

function mapStateToProps ({ questions, authedUser }, props) {
    const { id } = props.match.params
    const question = questions[id]
    return {
        question,
        isAnswered: question ? questions[id].optionOne.votes.includes(authedUser) ||
            questions[id].optionTwo.votes.includes(authedUser) : false
    }
}

export default connect(mapStateToProps)(QuestionPage)