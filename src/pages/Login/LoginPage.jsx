import { useState, useRef } from 'react'
import LoginPagesContainer from './LoginPagesContainer'
import { Form, Button, InputGroup, FloatingLabel } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { loginService } from '../../services/authService'
import { LoginError } from '../../components/Modals/LoginModal'

const LoginPage = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')
  const handleClose = () => setShow(false)
  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')
  const [focusedCpf, setFocusedCpf] = useState(true)
  const [focusedPassword, setFocusedPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const isFormValid = cpf.trim() !== '' && password.trim() !== '' && password.length >= 2
  const cpfRef = useRef(null)
  const passwordRef = useRef(null)

  // Impede interações fora dos campos CPF e senha, evitando ações não intencionais
  document.addEventListener('mousedown', (event) => {
    if (
      cpfRef.current &&
      !cpfRef.current.contains(event.target) &&
      passwordRef.current &&
      !passwordRef.current.contains(event.target)
    ) {
      event.preventDefault()
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('cpf and password: ', cpf, password)
    try {
      const response = await loginService(cpf, password)
      console.log('response na loginPage: ', response)
      navigate('/home')
    } catch (error) {
      setShow(true)
      setMessage(error.response?.data.error || error.message)
    }
  }

  return (
    <>
      <LoginPagesContainer cardTitle='Insira seu dados para Login'>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='cpf'>
            <FloatingLabel
              controlId='floatingInputCpf'
              label='Digite seu cpf'
              className='text-secondary fst-italic mb-3'
            >
              <Form.Control
                style={{
                  border: focusedCpf ? '1.5px solid rgb(76, 166, 218)' : '',
                  boxShadow: 'none',
                }}
                ref={cpfRef}
                type='text'
                placeholder=''
                onChange={(e) => setCpf(e.target.value)}
                onFocus={() => setFocusedCpf(true)}
                onBlur={() => setFocusedCpf(false)}
                maxLength='14'
                autoFocus
                required
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className='mb-3' controlId='passwordLogin'>
            <div className='relative d-flex align-items-center mt-4'>
              <InputGroup>
                <FloatingLabel
                  controlId='floatingInputPassword'
                  label='Digite sua senha'
                  className='text-secondary fst-italic'
                >
                  <Form.Control
                    ref={passwordRef}
                    style={{
                      borderRadius: '.4rem',
                      position: 'relative',
                      width: '100%',
                      border: focusedPassword ? '1.5px solid rgb(76, 166, 218)' : '',
                      boxShadow: 'none',
                    }}
                    type={showPassword ? 'text' : 'password'}
                    placeholder=''
                    minLength={2}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedPassword(true)}
                    onBlur={() => setFocusedPassword(false)}
                    required
                  />
                </FloatingLabel>
                <i
                  className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'} abs`}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#000',
                    cursor: 'pointer',
                    zIndex: 10,
                  }}
                ></i>
              </InputGroup>
            </div>
          </Form.Group>
          <Button className='w-100 text-tertiary mt-4 mb-3' type='submit' disabled={!isFormValid}>
            Entrar
          </Button>
          <Link className='btn text-primary text-center w-100' to='/forgot-password'>
            Esqueci minha senha
          </Link>
        </Form>
      </LoginPagesContainer>
      <LoginError show={show} handleClose={handleClose} message={message} />
    </>
  )
}

export default LoginPage
