import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { User } from '../../@types/arrayTypes';

interface Props {
  setItemsChange: any;
  itemsChange: any;
  handleClose: () => void;
  setClock: any;
  time: any;
  user: User;
  id: any;
}

const Additem: React.FC<Props> = ({
  handleClose,
  setItemsChange,
  itemsChange,
  setClock,
  time,
  user,
  id,
}: Props) => {
  const [name, setName] = useState('');

  const onType1 = (e: any) => {
    setName(e.target.value);
  };

  const isEmpty = () => {
    if (name == '') {
      return false;
    }

    return true;
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const idk = isEmpty();

      if (idk == true) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('token', localStorage.getItem('token'));

        const body = {
          name: name.trim(),
          timestamp: time,
          user: user.user_name,
          user_id: user.user_id,
          fam_id: id,
        };
        console.log(body);
        const res = await fetch('http://localhost:8090/api/v1/dashboard', {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(body),
        });
        const data = await res.json();
        console.log(data);
        if (data === 'OK') {
          setItemsChange(!itemsChange);
        }
      } else {
        toast.warning('Must provide a item');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const hadel = () => {
    const idk = isEmpty();

    if (idk == true) {
      handleClose();
    } else {
      console.log('Still open');
    }
  };

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Add new item</Modal.Title>
      </Modal.Header>
      <form className="form" action="" onSubmit={e => onSubmit(e)}>
        <Modal.Body>
          <input
            className="form-control mt-3"
            type="text"
            name="name"
            placeholder="Enter Product"
            value={name}
            onChange={e => onType1(e)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={hadel}>
            Save
          </Button>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default Additem;
