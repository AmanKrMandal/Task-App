import { useContext, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import Taskdone from "../Animation/Taskdone";
import { UserAuthContextApi } from "../Context/UserAuthContext";
function Login() {
  const { setUser } = useContext(UserAuthContextApi);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [user, setUser] = useState({})
  const navigate = useNavigate();

  const submitsHandle = async (e) => {
    e.preventDefault();
    const data = { email, password };
    let result = await fetch("https://aman-task-apps.onrender.com/login", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    // result.regis.role ="admin"
    setUser(result);
    localStorage.setItem("user", JSON.stringify(result));
    // console.log("result", result.regis.name);
    if (result.regis.role === "user") {
      navigate("/");
    }
    if (result.regis.role === "admin") {
      navigate("/admin");
    }
  };

  // console.log("User", user)
  return (
    <Container>
      <Row>
        <Col sm={4}></Col>
        <Col sm={4}>
          <div style={{ marginRight: "60px", marginTop: "-50px" }}>
            <Taskdone />
          </div>
          <Card className="mb-5">
            <Card.Header as="h5" className="text-muted">
              Task App
            </Card.Header>
            <Card.Body>
              <Form onSubmit={submitsHandle}>
                <Form.Group className="mb-3" controlId="formBasicEmail3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                  <Link
                    to="/signup"
                    className="text-center mt-4"
                    style={{ textDecoration: "none" }}
                  >
                    Create New Account
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}></Col>
      </Row>
    </Container>
  );
}

export default Login;
