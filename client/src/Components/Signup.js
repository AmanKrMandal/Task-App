import { Col, Container, Form, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import Taskdone from "../Animation/Taskdone";
import { useState } from "react";
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const sumbitHandler = async (e) => {
    e.preventDefault();
    // console.log(name, email, password, date);
    const data = { name, email, password, date};
    let result = await fetch(
      "https://aman-task-apps.onrender.com/register",
      {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    // console.log(result);
    //home page ---- me in login
    if (result) {
      localStorage.setItem("register", JSON.stringify(result));
      navigate("/login");
    }
  };

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
              <Form onSubmit={sumbitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail1">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName1">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword1">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword2">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" type="submit">
                    Signup
                  </button>
                  <Link
                    to="/login"
                    className="text-center mt-4"
                    style={{ textDecoration: "none" }}
                  >
                    Login
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

export default Signup;
