import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";

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

const Reset = () => {
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  const isValid = () => {
    if (pass1 == "") {
      return false;
    } else if (pass2 == "") {
      return false;
    } else if (pass1 !== pass2) {
      return false;
    }

    return true;
  };

  const onClick = async (e: any) => {
    e.preventDefault();
    try {
      if (isValid() == true) {
        console.log("Submitted");
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("forgot", localStorage.getItem("forgotToken"));

        const body = {
          email: localStorage.getItem("email"),
          newPassword: pass2,
        };
        const res = await fetch("http://localhost:8090/api/v1/reset", {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(body),
        });

        const data = await res.json();
        console.log(data);
        if (data.newPassword) {
          setPass1("");
          setPass2("");
          localStorage.removeItem("forgotToken");
          localStorage.removeItem("email");
        }
      } else {
        console.log("Please provide a valid password");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Wrapper>
        <ReForm className="form" action="">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Enter New Password</Form.Label>
            <input
              type="password"
              value={pass1}
              placeholder="Enter new password"
              className="form-control"
              onChange={(e) => setPass1(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Confirm Password</Form.Label>
            <input
              type="password"
              value={pass2}
              placeholder="Confirm password"
              className="form-control"
              onChange={(e) => setPass2(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={(e) => onClick(e)}>
            Submit
          </Button>
        </ReForm>
      </Wrapper>
      <TextFooter>
        <h5>
          <a href="/login">Go back</a>
        </h5>
      </TextFooter>
    </Container>
  );
};

export default Reset;
