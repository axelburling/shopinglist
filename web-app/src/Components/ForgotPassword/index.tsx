import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  id: string;
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

const Forgot: React.FC<Props> = ({ id }: Props) => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState<string>('');

  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log(email);

    const body = { email };
    const res = await fetch('http://localhost:8090/api/v1/forgot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log(data);
    if (data.forgotToken) {
      localStorage.setItem('forgotToken', data.forgotToken);
      localStorage.setItem('email', email);
      setEmail('');
      setToken(data.forgotToken);
      if (token.length !== 0) {
        return <Redirect from="/forgot" push to={`/${id}`} />;
      }
    }
  };

  return (
    <Container>
      <Wrapper>
        {token.length === 0 ? (
          <ReForm className="form" action="" onSubmit={(e: any) => onSubmit(e)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Confirm Email</Form.Label>
              <input
                type="email"
                value={email}
                placeholder="Enter email"
                className="form-control"
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </ReForm>
        ) : (
          <Redirect to={`/${id}`} />
        )}
      </Wrapper>
    </Container>
  );
};

export default Forgot;
