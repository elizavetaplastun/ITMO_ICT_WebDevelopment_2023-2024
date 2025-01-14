import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { Form, Button, Row, Col } from "react-bootstrap";

function Login() {
  const navigate = useNavigate();
  const { setToken } = useUser();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (event) => {
    event.preventDefault();

    fetch("http://127.0.0.1:8000/api/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to login");
        }
        return response.json();
      })
      .then((result) => {
        setToken(result.token);
        navigate("/");
        console.log("Token:", result.token);
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="container mt-4">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="username">
              <Form.Label>Имя:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Пароль:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="button-and-link">
              <Button variant="primary" type="submit">
                Войти
              </Button>
              <Link to="/registration">Создать аккаунт</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
