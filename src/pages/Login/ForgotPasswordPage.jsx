import { useState, useEffect, useRef } from 'react'
import LoginPagesContainer from './LoginPagesContainer'
import { Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { forgotPasswordAPI } from '../../services/authAPI'
import { EmailSent } from '../../components/Modals/EmailSent'

const ForgotPasswordPage = () => {
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')
  const handleClose = () => setShow(false)
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(false)
  const emailRef = useRef(null)

  document.addEventListener('mousedown', (event) => {
    if (emailRef.current && !emailRef.current.contains(event.target)) {
      event.preventDefault()
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await forgotPasswordAPI(email)
      setShow(true)
      setMessage('Acesse o link no e-mail que enviamos e redefina sua senha')
    } catch (error) {
      console.error('Erro! ', error.response?.data.error || error.message)
      setShow(true)
      setMessage(error.response?.data.error || error.message)
    }
  }

  useEffect(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setIsValid(regex.test(email))
  }, [email])

  return (
    <>
      <LoginPagesContainer cardTitle='Recuperar Senha'>
        <h6 className='text-start mb-3 fw-light ms-1'>
          Enviaremos um e-mail com um link para você redefinir sua senha
        </h6>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3 mt-2' controlId='email'>
            <FloatingLabel
              controlId='floatingInputEmail'
              label='Digite seu e-mail'
              className='text-secondary fst-italic'
            >
              <Form.Control
                style={{
                  border: '1.5px solid rgb(76, 166, 218)',
                  boxShadow: 'none',
                }}
                ref={emailRef}
                className='mb-4'
                type='email'
                placeholder=''
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
          <Row>
            <Col xs={12} sm={6} className='mb-3'>
              <Button
                type='submit'
                disabled={!isValid}
                variant='primary'
                className='w-100 text-tertiary'
              >
                Enviar link
              </Button>
            </Col>
            <Col>
              <Link to='/' className='d-block text-center btn btn-primary'>
                Voltar para login
              </Link>
            </Col>
          </Row>
        </Form>
      </LoginPagesContainer>
      <EmailSent show={show} handleClose={handleClose} message={message} />
    </>
  )
}

export default ForgotPasswordPage
