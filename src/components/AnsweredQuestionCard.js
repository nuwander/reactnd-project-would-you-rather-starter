import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import AnsweredQuestion from './AnsweredQuestion'

const AnsweredQuestionCard = ({ question, users, authedUser }) => {
    const {
        author, optionOne, optionTwo
    } = question
    const { name, avatarURL } = users[author]
    const totalVotes = optionOne.votes.length + optionTwo.votes.length

    return (
        <div className='card'>
            <header className='header left'>Asked by {name}</header>
            <div className='card-body row'>
                    <div className='column-small border-right'>
                    <img 
                        src={avatarURL}
                        alt={`Avatar of ${name}`}
                        className='huge-avatar'
                    />
                </div>
                <div className='column-big'>
                    <div className='title left'>Results:</div>
                    <AnsweredQuestion option={optionOne} totalVotes={totalVotes} authedUser={authedUser}/>
                    <AnsweredQuestion option={optionTwo} totalVotes={totalVotes} authedUser={authedUser}/>
                </div>
            </div>         
        </div>
    )
}

AnsweredQuestionCard.propTypes = {
    question: PropTypes.object.isRequired,
    users: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.object
    ]),
    authedUser: PropTypes.string
}

function mapStateToProps ({ questions, users, authedUser }, { id }) {
    return {
        question : questions[id],
        users,
        authedUser
    }
}

export default connect(mapStateToProps)(AnsweredQuestionCard)