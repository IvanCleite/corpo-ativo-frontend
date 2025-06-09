import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Navbar from './components/Navbar'
import { Container } from 'react-bootstrap'
import Routes from './Routes.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Container fluid className='pages p-0 mb-0'>
        <Routes />
      </Container>
    </>
  )
}

export default App
