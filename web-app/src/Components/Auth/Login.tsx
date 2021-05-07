import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import styled from "styled-components";

interface LoginProps {
  setIsAuth: any;
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.div`
  margin-top: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReForm = styled.form`
  height: 60%;
  width: 70%;
`;

const TextFooter = styled.footer`
  font-weight: bolder;
  display: flex;
  text-align: center;
  justify-content: center;
  margin-top: 70px;
`;

const Login: React.FC<LoginProps> = ({ setIsAuth }: LoginProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const isEmpty = () => {
    if (email == "") {
      return false;
    } else if (password == "") {
      return false;
    }

    return true;
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log();
    if (isEmpty() == true) {
      const body = { email, password };
      const res = await fetch("http://localhost:8090/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log(data);
      if (data.jwtToken) {
        localStorage.setItem("token", data.jwtToken);
        localStorage.setItem("user_email", email);
        setEmail("");
        setPassword("");
        setIsAuth(true);
        console.log("Welcome");
        toast.success("Logged In");
      } else {
        setIsAuth(false);
        toast.error(data);
      }
    } else {
      console.log("Something went wrong");
    }
  };

  return (
    <Container>
      <Wrapper>
        <ReForm
          className="form"
          action="/dashboard"
          onSubmit={(e: any) => onSubmit(e)}
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <input
              type="email"
              value={email}
              placeholder="Enter email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <input
              type="password"
              value={password}
              placeholder="Password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your password with anyone else. <br />
              <a href="/forgot">forgot password</a>?
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </ReForm>
      </Wrapper>

      <TextFooter>
        <h5>
          Don't have an account <a href="/register">Register</a> today
        </h5>
      </TextFooter>
    </Container>
  );
};

export default Login;
