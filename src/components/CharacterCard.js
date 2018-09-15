import React from 'react'
import { PropTypes } from 'prop-types'

const CharacterCard = ({ user: { avatarURL, name, answeredQuestions, createdQuestions, score}}) => { 
    return (
        <div className='card'>
            <div className='row'>
                <div className='column-smallest border-right'>
                    <img 
                        src={avatarURL}
                        alt={`${name} avatar`}
                        className='huge-avatar'
                    />
                </div>
                <div className='column-big border-right left'>
                    <div className='title'>{name}</div>
                    <div className='border-bottom'>
                        Answered Questions
                        <span className='right'>{answeredQuestions}</span>
                    </div>
                    <div>
                        Created Questions
                        <span className='right'>{createdQuestions}</span>
                    </div>
                </div>
                <div className='column-smallest'>
                    <div className='score'>
                        <div className='header'>Score</div>
                            <div className='number'>{score}</div>
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