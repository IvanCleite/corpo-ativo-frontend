import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'

export const LoginError = ({ show, handleClose, message }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop='static' centered>
      <Modal.Body>
        <p className='text-center fs-3'>{message}</p>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-around'>
        <Link to='/' onClick={handleClose}>
          Tentar novamente
        </Link>
      </Modal.Footer>
    </Modal>
  )
}
