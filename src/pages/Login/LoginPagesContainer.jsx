import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "./Login.module.css";

/**
 * Componente Container para as páginas de autenticação (LoginPage, ForgotPasswordPage e NewPassPage).
 * Encapsula a estrutura comum de Container, Row, Col e Card.
 * @param {object} props - Propriedades do componente.
 * @param {string} props.cardTitle - Título a ser exibido no Card.Title.
 * @param {React.ReactNode} props.children - Conteúdo específico da página a ser renderizado dentro do Card.Body.
 */

const LoginPagesContainer = ({ cardTitle, children }) => {
  return (
    <Container
      className="d-flex justify-content-center p-0"
      style={{ height: "calc(100vh - 100px" }}
    >
      <Row className="w-100 justify-content-center align-content-sm-center">
        <Col sm={12} md={8} lg={6} xl={4} className="p-0">
          <Card
            className={`${styles.card} p-0 p-sm-4 ms-1 me-1 shadow bg-transparent`}
          >
            <Card.Body className="p-0">
              <Card.Title className="text-start text-primary mb-4 fs-4 ms-1">
                {cardTitle}
              </Card.Title>
              {children}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPagesContainer;
