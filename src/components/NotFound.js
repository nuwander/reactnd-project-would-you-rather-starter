import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <div  className='error'>
    <div>404 NOT FOUND!</div>
    <Link to='/'>
        <button className='btn' type='btn'>
            Back to Home
        </button>
    </Link>
  </div>
)

export default NotFound
