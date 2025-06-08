import { useState, useRef } from "react";
import LoginPagesContainer from "./LoginPagesContainer";
import { Form, Button, InputGroup, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [focusedEmail, setFocusedEmail] = useState(true);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isFormValid =
    email.trim() !== "" && password.trim() !== "" && password.length >= 2;
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  document.addEventListener("mousedown", (event) => {
    if (
      emailRef.current &&
      !emailRef.current.contains(event.target) &&
      passwordRef.current &&
      !passwordRef.current.contains(event.target)
    ) {
      event.preventDefault();
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <LoginPagesContainer cardTitle="Insira seu dados para Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <FloatingLabel
            controlId="floatingInputEmail"
            label="Digite seu e-mail"
            className="text-secondary fst-italic mb-3"
          >
            <Form.Control
              style={{
                border: focusedEmail ? "1.5px solid rgb(76, 166, 218)" : "",
                boxShadow: "none",
              }}
              ref={emailRef}
              type="email"
              placeholder=""
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedEmail(true)}
              onBlur={() => setFocusedEmail(false)}
              autoFocus
              required
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordLogin">
          <div className="relative d-flex align-items-center mt-4">
            <InputGroup>
              <FloatingLabel
                controlId="floatingInputPassword"
                label="Digite sua senha"
                className="text-secondary fst-italic"
              >
                <Form.Control
                  ref={passwordRef}
                  style={{
                    borderRadius: ".4rem",
                    position: "relative",
                    width: "100%",
                    border: focusedPassword
                      ? "1.5px solid rgb(76, 166, 218)"
                      : "",
                    boxShadow: "none",
                  }}
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  minLength={2}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedPassword(true)}
                  onBlur={() => setFocusedPassword(false)}
                  required
                />
              </FloatingLabel>
              <i
                className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"} abs`}
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#000",
                  cursor: "pointer",
                  zIndex: 10,
                }}
              ></i>
            </InputGroup>
          </div>
        </Form.Group>
        <Button
          className="w-100 text-tertiary mt-4 mb-3"
          type="submit"
          disabled={!isFormValid}
        >
          Entrar
        </Button>
        <Link
          className="btn text-primary text-center w-100"
          to="/forgot-password"
        >
          Esqueci minha senha
        </Link>
      </Form>
    </LoginPagesContainer>
  );
};

export default LoginPage;
