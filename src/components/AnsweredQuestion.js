import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ProgressBar from './ProgressBar'

class AnsweredQuestion extends Component {
    computePercentage = (value, total) => {
        return parseInt((value / total) * 100, 10)
    }

    render() {
        const { question, users, authedUser } = this.props
        const {
            author,
            optionOne,
            optionTwo,
        } = question
        const authorUser = users[author]
        const isVotedOptionOne = optionOne.votes.includes(authedUser)
        const isVotedOptionTwo = optionTwo.votes.includes(authedUser)
        const votes = optionOne.votes.length + optionTwo.votes.length
        const optionOnePercent = this.computePercentage(optionOne.votes.length, votes)
        const optionTwoPercent = this.computePercentage(optionTwo.votes.length, votes)

        
        return (
            <div className='card'>
                <header className='header left'>Asked by {authorUser.name}</header>
                <div className='card-body row'>
                    <div className='column-small border-right'>
                        <img 
                            src={authorUser.avatarURL}
                            alt={`Avatar of ${authorUser.name}`}
                            className='huge-avatar'
                        />
                    </div>
                    <div className='column-big'>
                        <div className='title left'>Results:</div>
                        <div className={'vote ' + (isVotedOptionOne ? 'selected-vote' : '')}>
                            {isVotedOptionOne && (<div className='your-vote'>Your Vote</div>)}
                            <div>Would you rather {optionOne.text}?</div>
                            <ProgressBar  percentage={optionOnePercent}/>
                            <div className='number-votes'>{optionOne.votes.length} out of {votes} votes</div>
                        </div>
                        <div className={'vote ' + (isVotedOptionTwo ? 'selected-vote' : '')}>
                            {isVotedOptionTwo && (<div className='your-vote'>Your Vote</div>)}
                            <div>Would you rather {optionTwo.text}?</div>
                            <ProgressBar percentage={optionTwoPercent}/>
                            <div className='number-votes'>{optionTwo.votes.length} out of {votes} votes</div>
                        </div>
                    </div>
                </div>          
            </div>
        )
    }
}

AnsweredQuestion.propTypes = {
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

export default connect(mapStateToProps)(AnsweredQuestion)