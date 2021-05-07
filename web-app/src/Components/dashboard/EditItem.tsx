import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Item, User } from '../../@types/arrayTypes';

interface EditProps {
  setItemsChange: any;
  itemsChange: any;
  item: Item;
  user: User;
  id: string;
}

const EditItem: React.FC<EditProps> = ({
  item,
  setItemsChange,
  itemsChange,
  user,
  id,
}: EditProps) => {
  const [editShow, setEditShow] = useState<boolean>(false);
  const [pro, setPro] = useState<string>(item.product_name);

  const handleEditClose = () => {
    setEditShow(false);
  };
  const handleEditShow = () => {
    setEditShow(true);
  };

  const onType = (e: any) => {
    setPro(e.target.value);
  };

  const isEmpty = () => {
    if (pro.trim() === '') {
      return false;
    }

    return true;
  };

  const onSubmit = async (id: any, e: any) => {
    e.preventDefault();
    try {
      const idk = isEmpty();

      if (idk === true) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('token', localStorage.getItem('token'));
        const body = { product_name: pro.trim(), user_id: user.user_id };
        console.log(body);
        const res = await fetch(
          `http://localhost:8090/api/v1/dashboard/${id}`,
          {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(body),
          },
        );
        const data = await res.json();
        console.log(data);
        if (data == 'OK') {
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

    if (idk === true) {
      handleEditClose();
    }

    return;
  };

  return (
    <>
      <Button
        variant="warning"
        onClick={handleEditShow}
        // setItemsChange={setItemsChange}
      >
        Edit Item
      </Button>

      <Modal show={editShow}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <form
          className="form"
          action=""
          onSubmit={e => onSubmit(item.pro_id, e)}
        >
          <Modal.Body>
            <input
              className="form-control mt-3"
              type="text"
              name="name"
              placeholder="Enter Product"
              value={pro}
              onChange={e => onType(e)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleEditClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={hadel}>
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditItem;
