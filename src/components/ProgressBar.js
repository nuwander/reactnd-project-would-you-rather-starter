import React from 'react'
import PropTypes from 'prop-types'

const ProgressBar = (props) => {
    const { percentage } = props
    return (
        <div className='progress-bar'>
            <div className='filler' style={{ width: `${percentage}%`}}>
                { percentage !== 0 && <div className='filler-text'>{ percentage }%</div>}
            </div>
        </div>
    )
}

ProgressBar.propTypes = {
    percentage: PropTypes.number.isRequired
}

export default ProgressBar