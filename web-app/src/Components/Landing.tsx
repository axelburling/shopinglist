import * as React from "react";
import { Button, Image } from "react-bootstrap";
import styled from "styled-components";
import back from "../assets/back.jpg";
import list from "../assets/shopping-list.svg";

const Container = styled.div`
  position: relative;
  text-align: center;
  color: white;
`;

const Img = styled(Image)`
  width: 100vw;
  height: 100vh;
  z-index: -10;
`;

const Icon = styled(Image)`
  position: absolute;
  width: 210px;
  height: 200px;
  top: 40%;
  left: 55%;
  @media only screen and (max-width: 600px) {
    width: 120px;
    height: 100px;
  }
`;

const Text = styled.h1`
  position: absolute;
  top: 38%;
  left: 23%;
  color: #000;
  @media only screen and (max-width: 600px) {
    font-size: 16px;
    width: 80px;
  }
`;

const Btn = styled(Button)`
  border-radius: 13px;
  width: 150px;
  height: 55px;
  display: flex;
  text-align: center;
  justify-content: center;
  position: absolute;
  font-size: 26px;
  top: 55%;
  left: 25%;
  @media only screen and (max-width: 600px) {
    border-radius: 8px;
    width: 50px;
    height: 30px;
    margin-right: 10px;
    font-size: 15px;
  }
`;

const BtnL = styled(Button)`
  border-radius: 13px;
  width: 150px;
  height: 55px;
  display: flex;
  text-align: center;
  justify-content: center;
  position: absolute;
  font-size: 26px;
  top: 55%;
  left: 35%;
  @media only screen and (max-width: 600px) {
    border-radius: 8px;
    width: 50px;
    height: 30px;
    margin-left: 10px;
    font-size: 15px;
  }
`;

const BtnWrapper = styled.div`
  margin: 20px;
`;

const LandingPage = () => {
  return (
    <Container>
      <Img src={back} />
      <Text>
        Sign up <br />
        to make your life easier
      </Text>
      <BtnWrapper>
        <div>
          <Btn variant="primary" href="/register">
            Register
          </Btn>
        </div>
        <div>
          <BtnL variant="primary" href="/login">
            Login
          </BtnL>
        </div>
      </BtnWrapper>
      <div>
        <Icon src={list} />
      </div>
    </Container>
  );
};

export default LandingPage;
