import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
    state = {
        selected: 'unanswered',
    }

    setTab = (selected) => {
        this.setState(() => ({
            selected
          }))
    }

    render() {
        const { unansweredQuestionIds, answeredQuestionIds } = this.props
        const { selected } = this.state
        return (
            <div>
                 <div className='tab'>
                    <button className={(selected === 'unanswered' ? 'active' : '')} onClick={event => this.setTab('unanswered')}>Unanswered Questions</button>
                    <button className={(selected === 'answered' ? 'active' : '')} onClick={event => this.setTab('answered')}>Answered Questions</button>
                </div>
                <div className="tabcontent">
                    { ((selected === 'answered' && answeredQuestionIds.length === 0) ||  
                        (selected === 'unanswered' && unansweredQuestionIds.length === 0)) && (
                        <div className="title">
                            No Questions Found
                        </div>
                    )}
                    { selected === 'unanswered' && unansweredQuestionIds.length !== 0 && (
                        <ul>
                            { unansweredQuestionIds.map(
                                id => (
                                    <li key={id}>
                                        <Question id={id} isAnswer={false}/>
                                    </li>
                            
                        ))}
                        </ul>
                    )} 
                    { selected === 'answered' && answeredQuestionIds.length !== 0 && (
                        <ul>
                            { answeredQuestionIds.map(
                                id => (
                                    <li key={id}>
                                        <Question id={id} isAnswer={false}/>
                                    </li>
                            
                        ))}
                        </ul>
                    )}
                </div>
            </div>
        )
    }
}

function mapStateToProps ({ questions, authedUser }) {
    if (authedUser !== null) {
        return {
            unansweredQuestionIds: Object.keys(questions)
                .filter(id => (
                    !questions[id].optionOne.votes.includes(authedUser) &&
                    !questions[id].optionTwo.votes.includes(authedUser)
                ))
                .sort((a, b) => (
                    questions[b].timestamp - questions[a].timestamp
                )),
            answeredQuestionIds: Object.keys(questions)
                .filter(id => (
                    questions[id].optionOne.votes.includes(authedUser) ||
                    questions[id].optionTwo.votes.includes(authedUser)
                ))
                .sort((a, b) => (
                    questions[b].timestamp - questions[a].timestamp
                ))
        }
    }

    return {
        unansweredQuestionIds: Object.keys(questions)
        .sort((a, b) => (
            questions[b].timestamp - questions[a].timestamp
        )),
        answeredQuestionIds: []
    }
}

export default connect(mapStateToProps)(Dashboard)