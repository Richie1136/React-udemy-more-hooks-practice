import React from 'react'
import './ErrorModal.css'

const ErrorModal = React.memo = ({ onClose, children }) => {
  return (
    <>
      <div className='backdrop' onClick={onClose} />
      <div className='error-modal'>
        <h2>An Error Occured</h2>
        <p>{children}</p>
        <div className='error-modal__actions'>
          <button type='button' onClick={onClose}>
            Okay
          </button>
        </div>
      </div>
    </>
  )
}

export default ErrorModal
