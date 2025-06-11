import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'

export const PasswordReset = ({ show, handleClose, message, buttonText }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop='static'>
      <Modal.Body>
        <p className='text-center fs-4 mb-0'>{message}</p>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-around'>
        <Link to={buttonText} onClick={handleClose} className='btn btn-primary'>
          Fechar
        </Link>
      </Modal.Footer>
    </Modal>
  )
}
