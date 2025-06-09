import { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LoginPagesContainer from './LoginPagesContainer.jsx'
import { resetPasswordAPI } from '../../services/authAPI.js'
import { Form, Button, InputGroup, FloatingLabel } from 'react-bootstrap'

const ResetPasswordPage = () => {
  const { token } = useParams()
  const navigate = useNavigate()

  const [isValidToken, setIsValidToken] = useState(true)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [focusedNewPassword, setFocusedNewPassword] = useState(true)
  const [focusedConfirmPassword, setFocusedConfirmPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [newPasswordOk, setNewPasswordOk] = useState(false)
  const [samePassword, setSamePassword] = useState(false)
  const [differentPassword, setDifferentPassword] = useState(false)

  const [hasNumber, setHasNumber] = useState(false)
  const [hasCapitalLetter, setHasCapitalLetter] = useState(false)
  const [hasLowercaseLetter, setHasLowercaseLetter] = useState(false)
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false)

  const canSave = newPasswordOk && samePassword

  const newPasswordRef = useRef(null)
  const confirmPasswordRef = useRef(null)

  // Impede interações fora dos campos de senha, evitando ações não intencionais
  document.addEventListener(
    'mousedown',
    (event) => {
      if (
        newPasswordRef.current &&
        !newPasswordRef.current.contains(event.target) &&
        confirmPasswordRef.current &&
        !confirmPasswordRef.current.contains(event.target)
      ) {
        event.preventDefault()
      }
    },
    true
  )

  // Permite validar senha com menos de 6 caracteres
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      setNewPasswordOk(
        newPassword.length >= 6 &&
          hasNumber &&
          hasCapitalLetter &&
          hasLowercaseLetter &&
          hasSpecialCharacter
      )
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setSamePassword('As senhas não coincidem')
      return
    }
    try {
      const response = await resetPasswordAPI(token, newPassword)
      if (response.status === 200) {
        navigate('/')
      } else {
        setIsValidToken(false)
      }
    } catch (error) {
      setSamePassword('Erro ao redefinir a senha')
      console.error(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'newPassword') {
      setHasNumber(/\d/.test(value))
      setHasCapitalLetter(/[A-Z]/.test(value))
      setHasLowercaseLetter(/[a-z]/.test(value))
      setHasSpecialCharacter(/[!@#$%^&*(),.?":{}|<>]/.test(value))
      setNewPasswordOk(
        value.length >= 10 &&
          hasNumber &&
          hasCapitalLetter &&
          hasLowercaseLetter &&
          hasSpecialCharacter
      )
      setNewPassword(value)
      setSamePassword(value === confirmPassword)
    } else {
      console.log('confirmPassword: ', value, ' ', value.length)
      console.log('newPassword: ', newPassword.charAt(value.length - 1))

      setDifferentPassword(value.charAt(value.length - 1) !== newPassword.charAt(value.length - 1))

      setConfirmPassword(value)
      setSamePassword(newPassword === value)
    }
  }

  return isValidToken ? (
    <LoginPagesContainer cardTitle='Redefinir Senha'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='newPassword'>
          <InputGroup>
            <FloatingLabel
              controlId='floatingInputNewPassword'
              label='Digite sua nova senha'
              className='text-secondary fst-italic'
            >
              <Form.Control
                ref={newPasswordRef}
                className='mb-3'
                style={{
                  borderRadius: '.4rem',
                  position: 'relative',
                  width: '100%',
                  border: focusedNewPassword ? '1.5px solid rgb(76, 166, 218)' : '',
                  boxShadow: 'none',
                }}
                name='newPassword'
                value={newPassword}
                type={showNewPassword ? 'text' : 'password'}
                placeholder=''
                minLength={6}
                maxLength={10}
                autoFocus
                onChange={handleChange}
                onFocus={() => setFocusedNewPassword(true)}
                onBlur={() => setFocusedNewPassword(false)}
                required
              />
            </FloatingLabel>
            <i
              className={`bi ${showNewPassword ? 'bi-eye' : 'bi-eye-slash'} abs`}
              onClick={() => setShowNewPassword(!showNewPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#000',
                cursor: 'pointer',
                zIndex: 10,
              }}
            ></i>
          </InputGroup>
        </Form.Group>
        {newPasswordOk && (
          <Form.Group className='mb-0' controlId='confirmPassword'>
            <InputGroup>
              <FloatingLabel
                controlId='floatingInputConfirmPassword'
                label='Confime a senha'
                className='text-secondary fst-italic'
              >
                <Form.Control
                  ref={confirmPasswordRef}
                  style={{
                    borderRadius: '.4rem',
                    position: 'relative',
                    width: '100%',
                    border: focusedConfirmPassword ? '1.5px solid rgb(76, 166, 218)' : '',
                    boxShadow: 'none',
                    color: samePassword ? '#0c6b26' : '#dc3545',
                    marginBottom: differentPassword ? '0px' : '10px',
                  }}
                  name='confirmPassword'
                  value={confirmPassword}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder=''
                  minLength={6}
                  maxLength={10}
                  autoFocus
                  onChange={handleChange}
                  onFocus={() => setFocusedConfirmPassword(true)}
                  onBlur={() => setFocusedConfirmPassword(false)}
                  required
                />
              </FloatingLabel>

              <i
                className={`bi ${showConfirmPassword ? 'bi-eye' : 'bi-eye-slash'} abs`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  pointerEvents: !newPasswordOk ? 'none' : 'auto',
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: !newPasswordOk ? '#a1a0a0' : '#000',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              ></i>
            </InputGroup>
          </Form.Group>
        )}
        {differentPassword && (
          <p className='text-start ms-2 mb-3 fst-italic text-danger'>As senhas devem ser iguais!</p>
        )}
        {!newPasswordOk && (
          <div className='ms-1'>
            <p className='text-start text-primary fw-bold ms-2 mb-2 fst-italic'>
              A senha deve conter:
            </p>
            <p
              className='text-start ms-4 mb-0 fst-italic'
              style={{
                color: newPassword.length >= 6 ? '#0c6b26' : '#dc3545',
              }}
            >
              Entre 6 e 10 caracteres
            </p>
            <p
              className='text-start ms-4 mb-0 fst-italic'
              style={{ color: hasNumber ? '#0c6b26' : '#dc3545' }}
            >
              Um número
            </p>
            <p
              className='text-start ms-4 mb-0 fst-italic'
              style={{
                color: hasCapitalLetter ? '#0c6b26' : '#dc3545',
              }}
            >
              Uma letra maiúscula
            </p>
            <p
              className='text-start ms-4 mb-0 fst-italic'
              style={{
                color: hasLowercaseLetter ? '#0c6b26' : '#dc3545',
              }}
            >
              Uma letra minúscula
            </p>
            <p
              className='text-start ms-4 fst-italic'
              style={{
                color: hasSpecialCharacter ? '#0c6b26' : '#dc3545',
              }}
            >
              Um caractere especial
            </p>
          </div>
        )}

        <Button className='w-100 text-tertiary mt-4 mb-3' type='submit' disabled={!canSave}>
          Salvar nova senha
        </Button>
      </Form>
    </LoginPagesContainer>
  ) : null
}

export default ResetPasswordPage
