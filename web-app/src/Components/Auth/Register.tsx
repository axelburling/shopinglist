import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import styled from "styled-components";

interface RegisterProps {
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

const Register: React.FC<RegisterProps> = ({ setIsAuth }: RegisterProps) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const nameType = (e: any) => {
    setName(e.target.value);
  };

  const emailType = (e: any) => {
    setEmail(e.target.value);
  };

  const passType = (e: any) => {
    setPassword(e.target.value);
  };

  const isEmpty = () => {
    if (name == "") {
      return false;
    } else if (email == "") {
      return false;
    } else if (password == "") {
      return false;
    } else if (email.length > 255) {
      return false;
    } else if (password.length > 255) {
      return false;
    } else if (password.length < 8) {
      return false;
    }

    return true;
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log(name + " " + email.length + " " + password.length);

    if (isEmpty() == true) {
      const body = { email, name, password };
      const res = await fetch("http://localhost:8090/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log(data);
      if (data.jwtToken) {
        localStorage.setItem("token", data.jwtToken);
        localStorage.setItem("user_email", email);
        console.log("Register success");
        setIsAuth(true);
        setName("");
        setPassword("");
        setEmail("");
        toast.success("Registered");
      } else {
        setIsAuth(false);
        toast.error(data);
      }
    } else {
      console.log("something went wrong");
    }
  };

  return (
    <Container>
      <Wrapper>
        <ReForm className="form" onSubmit={(e) => onSubmit(e)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <input
              type="text"
              value={name}
              placeholder="Enter your name"
              className="form-control"
              onChange={(e) => nameType(e)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <input
              type="email"
              value={email}
              placeholder="Enter email"
              className="form-control"
              onChange={(e) => emailType(e)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <input
              type="password"
              value={password}
              placeholder="Password"
              className="form-control"
              onChange={(e) => passType(e)}
            />
            <Form.Text className="text-muted">
              We'll never share your password with anyone else.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </ReForm>
      </Wrapper>
      <TextFooter>
        <h5>
          Already have an account <a href="/login">Sign In</a>
        </h5>
      </TextFooter>
    </Container>
  );
};

export default Register;
