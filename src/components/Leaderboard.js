import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import CharacterCard from './CharacterCard'

class Leaderboard extends Component {
    render() {
        const { users } = this.props

        return (
            <div>
                { users.map(
                    user => (
                        <li key={user.id}>
                            <CharacterCard user={user}/>
                        </li>
                ))}
            </div>
        )
    }
}

Leaderboard.propTypes = {
    users: PropTypes.array.isRequired
}

function mapStateToProps ({ users }) {
    return {
        users: Object.keys(users)
        .map((id) => {
            const answered = Object.keys(users[id].answers).length
            const created = users[id].questions.length
            return {
                id: id,
                name: users[id].name,
                avatarURL: users[id].avatarURL,
                answeredQuestions: answered,
                createdQuestions: created,
                score: answered + created
            }
        }).sort((a, b) => (
            b.score - a.score
        ))
    }
}

export default connect(mapStateToProps)(Leaderboard)