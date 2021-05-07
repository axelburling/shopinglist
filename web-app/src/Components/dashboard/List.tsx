import React, { useEffect, useState } from 'react';
import { Button, Modal, Spinner, Table } from 'react-bootstrap';
import { BsTrashFill } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Item, User, UserMeme } from '../../@types/arrayTypes';
import Sidebar from '../lib/Sidebar';
import Additem from './AddIttem';
import EditItem from './EditItem';

interface ListProps {
  items: Item[];
  setItems: any;
  setItemsChange: any;
  itemsChange: any;
  setClock: any;
  time: any;
  user: User;
  name: string;
}

const Marg = styled.div`
  width: 80%;
  margin: auto;
  align-items: center;
  position: relative;
`;

const Spin = styled.div`
  margin: auto;
  background-color: white;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px;
`;

const Btn = styled(Button)`
  float: right;
  display: flex;
  position: relative;
  text-align: center;
  justify-content: center;
  height: 40px;
  margin-right: 90px;
`;

const Icon = styled(GiHamburgerMenu)`
  width: 20px;
  height: 20px;
`;

const List: React.FC<ListProps> = ({
  items,
  setItemsChange,
  setItems,
  itemsChange,
  setClock,
  time,
  user,
  name,
}: ListProps) => {
  console.log(items);
  const [pros, setPros] = useState<Item[]>([]);
  const [meme, setMeme] = useState<UserMeme[]>([]);
  const [memeChange, setMemeChange] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const [openPanel, setOpenPanel] = useState(false);
  const [id, setId] = useState('');
  const [fam, setFam] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async (id: string) => {
    console.log(id);
    const res = await fetch(`http://localhost:8090/api/v1/dashboard/${id}`);
    const data = await res.json();
    if (data) {
      console.log(data);
      setPros(data);
      setItems(data);
    }

    const memres = await (
      await fetch(`http://localhost:8090/api/v1/family/members/${id}`)
    ).json();
    if (memres) {
      console.log(memres);
      setMeme(memres);
    }
  };

  const delItem = async (id: string, e: any) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append('token', localStorage.getItem('token'));
      myHeaders.append('Content-Type', 'application/json');
      const body = { user_id: user.user_id };
      const res = await fetch(`http://localhost:8090/api/v1/dashboard/${id}`, {
        method: 'DELETE',
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log(data);

      items.filter(item => item.pro_id !== data);
      setPros(items);
      setItems(items);

      setItemsChange(!itemsChange);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const url = window.location.pathname.split('/').pop();
    setId(url);
    fetchData(url);
    setFam(url);
    console.log('hello');
  }, [itemsChange, memeChange]);

  return (
    <>
      {user ? (
        <div>
          <Btn
            onClick={() => {
              setOpenPanel(!openPanel);
            }}
            variant="primary"
          >
            <Icon />
          </Btn>

          <Sidebar
            open={openPanel}
            setOpen={setOpenPanel}
            users={meme}
            thisUser={user}
            fam={fam}
            setMemeChange={setMemeChange}
            memeChange={memeChange}
          />

          <Marg id="page-wrap">
            <Button
              variant="primary"
              onClick={handleShow}
              // setItemsChange={setItemsChange}
            >
              Add new item
            </Button>
            <Center>
              <Modal show={show}>
                <Additem
                  handleClose={handleClose}
                  setItemsChange={setItemsChange}
                  itemsChange={itemsChange}
                  setClock={setClock}
                  time={time}
                  user={user}
                  id={id}
                />
              </Modal>
            </Center>
            {pros.length !== 0 ? (
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>product</th>
                    <th>requested at</th>
                    <th>requested by</th>
                    <th>edit</th>
                    <th>del</th>
                  </tr>
                </thead>
                <tbody>
                  {pros.map((item: Item) => {
                    return (
                      <tr key={item.pro_id}>
                        <td>{item.product_name}</td>
                        <td>{item.requsted_at}</td>
                        <td>{item.requsted_by}</td>
                        <td>
                          <EditItem
                            item={item}
                            setItemsChange={setItemsChange}
                            itemsChange={itemsChange}
                            user={user}
                            id={id}
                          />
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={e => delItem(item.pro_id, e)}
                          >
                            <BsTrashFill />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <Spin>
                <Spinner animation="border" variant="primary" />
              </Spin>
            )}
          </Marg>
        </div>
      ) : (
        () => {
          localStorage.clear();
          return <Redirect to="/login" />;
        }
      )}
    </>
  );
};

export default List;
