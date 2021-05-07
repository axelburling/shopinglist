import * as React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { RiShoppingBag2Fill } from 'react-icons/ri';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

interface NavProps {
  clock: string;
  // user: User;
}

const mobileWidth = window.innerWidth;

const Wrapper = styled.div`
  padding-bottom: 40px;
  width: 100%;

  @media only screen and (max-width: 960) {
    width: ${mobileWidth.toString()};
  }
`;

const NavB = styled(Navbar)`
  @media only screen and (max-width: 960) {
    width: ${mobileWidth.toString()};
  }
`;

const Icon = styled(RiShoppingBag2Fill)`
  width: 60px;
  height: 60px;
`;

const USer = styled.h2`
  padding-right: 40px;
`;

const Right = styled.div`
  margin-left: auto;
  margin-right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const logout = () => {
  localStorage.clear();
};

const NavBar: React.FC<NavProps> = ({ clock }: NavProps) => {
  // console.log(user);
  return (
    <Wrapper>
      <NavB bg="primary" expand="lg">
        <Navbar.Brand href="/">
          <Icon />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <div className="d-flex justify-content-center">
          <h1 className="mr-auto">{clock}</h1>
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Right>
            {/* <USer>{user.user_name}</USer> */}
            <Button variant="danger" onClick={logout}>
              <a href="/login">Logout</a>
            </Button>
          </Right>
          <ToastContainer />
        </Navbar.Collapse>
      </NavB>
    </Wrapper>
  );
};

export default NavBar;
