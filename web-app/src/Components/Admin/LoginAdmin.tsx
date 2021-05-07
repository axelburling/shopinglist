import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";

interface Props {
  aId: string;
  setAId: any;
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

const AdminLogin: React.FC<Props> = ({ aId, setAId }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

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
      const res = await fetch("http://localhost:8090/api/v1/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log(data);
      if (data.msg == "Admin") {
        setEmail("");
        setPassword("");
        setIsAdmin(true);
        setAId(data.id);
        toast.success("Welcome admin");
      } else {
        toast.error(data);
        setPassword("");
      }
    } else {
      console.log("Something went wrong");
    }
  };

  return (
    <Container>
      {!isAdmin ? (
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
      ) : (
        <div>
          <Redirect from="/admin" push to={`/admin/${aId}`} />
        </div>
      )}
    </Container>
  );
};

export default AdminLogin;
