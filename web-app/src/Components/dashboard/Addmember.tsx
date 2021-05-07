import { List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { SearchUser, User } from '../../@types/arrayTypes';

interface Props {
  user: User;
  show: boolean;
  setShow: any;
  fam: string;
  memeChange: boolean;
  setMemeChange: any;
}

const Addmember: React.FC<Props> = ({
  user,
  show,
  setShow,
  fam,
  memeChange,
  setMemeChange,
}: Props) => {
  const [name, setName] = React.useState('');
  const [users, setUsers] = React.useState<SearchUser[]>([]);
  const add = async (user_id: string) => {
    const body = { user_id };
    const add = await fetch(
      `http://localhost:8090/api/v1/family/adduser/${fam}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    );
    setMemeChange(!memeChange);
  };

  const search = async () => {
    if (name === '') {
      return;
    }
    const search = await (
      await fetch(`http://localhost:8090/api/v1/family/search/${name}`)
    ).json();
    const validation = search.filter(
      (val: SearchUser) => val.user_id !== user.user_id,
    );
    console.log(validation);
    setUsers(validation);
  };

  React.useEffect(() => {
    search();
  }, [name]);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add Members</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          placeholder="Enter email"
          className="form-control"
          onChange={e => setName(e.target.value)}
        />
        <List>
          {users.map(user => (
            <ListItem
              button
              key={user.user_id}
              onClick={() => {
                add(user.user_id);
                setShow(false);
              }}
            >
              <ListItemText>{user.user_name}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={() => setShow(false)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </>
  );
};

export default Addmember;
