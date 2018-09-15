
import React from 'react'
import { PropTypes } from 'prop-types'
import ProgressBar from './ProgressBar'

const AnsweredQuestion = ({ option, totalVotes, authedUser }) => {     
    const { votes, text } = option
    const isVoted = votes.includes(authedUser);
    const percent = parseInt((votes.length / totalVotes) * 100, 10)

    return (
        <div className={'vote ' + (isVoted ? 'selected-vote' : '')}>
            {isVoted && (<div className='your-vote'>Your Vote</div>)}
            <div>Would you rather {text}?</div>
            <ProgressBar  percentage={percent}/>
            <div className='number-votes'>{votes.length} out of {totalVotes} votes</div>
        </div>
    )
}

AnsweredQuestion.propTypes = {
    totalVotes: PropTypes.number.isRequired,
    authedUser: PropTypes.string.isRequired
}

 export default AnsweredQuestion