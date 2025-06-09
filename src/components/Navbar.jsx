import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import styles from './Navbar.module.css'
import { logoutService } from '../services/authService'
import { useNavigate } from 'react-router-dom'

function AppNavbar() {
  const navigate = useNavigate()
  const logout = () => {
    logoutService()
    navigate('/')
  }
  return (
    <Navbar fixed='top' collapseOnSelect expand='md' className='bg-body-secondary shadow'>
      <Container>
        <Navbar.Brand className={`${styles.brand} text-danger fw-bold`} href='#'>
          Corpo<em style={{ color: 'blue', fontWeight: '800' }}>Ativo</em>
        </Navbar.Brand>
        <Navbar.Toggle className={styles.toggle} aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className={`${styles.nav} ms-auto`}>
            <Nav.Link href='#'>Vídeos</Nav.Link>
            <NavDropdown className={styles.dropdown} title='Usuários' id='collapsible-nav-dropdown'>
              <NavDropdown.Item href='#'>Cadastrar</NavDropdown.Item>
              <NavDropdown.Item href='#'>Editar</NavDropdown.Item>
              <NavDropdown.Item href='#'>Excluir</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={logout}>Sair</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar
