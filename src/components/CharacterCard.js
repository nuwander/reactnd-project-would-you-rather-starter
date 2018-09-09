import React from 'react'
import { PropTypes } from 'prop-types'

const CharacterCard = (props) => { 
    const { user } = props

    return (
        <div className='card'>
            <div className='row'>
                <div className='column-smallest border-right'>
                    <img 
                        src={user.avatarURL}
                        alt={`${user.name} avatar`}
                        className='huge-avatar'
                    />
                </div>
                <div className='column-big border-right left'>
                    <div className='title'>{user.name}</div>
                    <div className='border-bottom'>
                        Answered Questions
                        <span className='right'>{user.answeredQuestions}</span>
                    </div>
                    <div>
                        Created Questions
                        <span className='right'>{user.createdQuestions}</span>
                    </div>
                </div>
                <div className='column-smallest'>
                    <div className='score'>
                        <div className='header'>Score</div>
                            <div className='number'>{user.score}</div>
                    </div>
                </div>
            </div>          
        </div>
    )
}

CharacterCard.propTypes = {
    user: PropTypes.object.isRequired
}

export default CharacterCard