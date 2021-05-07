import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Item, User } from "../../@types/arrayTypes";

const BigBtn = styled(Button)`
  width: 60px;
  height: 60px;
`;

const BigIcon = styled(BsTrashFill)`
  width: 25px;
  height: 25px;
`;

const UsersT = styled.td`
  font-size: 26px;
  font-weight: bolder;
`;

const ItemT = styled.td`
  font-weight: 500;
  font-size: 16px;
  margin-left: 20px;
`;

const AdminDash = () => {
  const [update, setUpdate] = useState<boolean>(false);
  // const [open, setOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");
  const [users, setUsers] = useState<Array<User>>([]);
  const [items, setItems] = useState<Array<Item>>([]);

  const fetchData = async () => {
    const res = await fetch("http://localhost:8090/api/v1/admin");
    const data = await res.json();
    console.log(data);

    setUsers(data.users);
    setItems(data.items);
  };

  const delUser = async (username: string, e: Event) => {
    e.preventDefault();
    try {
      const body = { username };
      const res = await fetch("http://localhost:8090/api/v1/admin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log(data);
      if (data == "Account is gone") {
        setUpdate(!update);
        toast.success("Account is gone");
      } else {
        toast.error(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const delItem = async (id: string, e: Event) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8090/api/v1/admin/item/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log(data);
      if (data == "Deleted item") {
        setUpdate(!update);
        toast.success("Item deleted");
      } else {
        toast.error(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [update]);

  return (
    <div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>name</th>
            <th>email</th>
            <th>Del</th>
          </tr>
        </thead>
        <tbody>
          {users.length !== 0 ? (
            users.map(
              (user) => {
                return (
                  <>
                    <tr
                      key={user.user_id}
                      onClick={() => {
                        setOpen(!open);

                        setSelected(user.user_id);
                        // s(user.user_id);
                        console.log(open);
                      }}
                    >
                      <UsersT>{user.user_name}</UsersT>
                      <UsersT>{user.user_email}</UsersT>
                      <td>
                        <BigBtn
                          variant="danger"
                          onClick={(e: any) =>
                            delUser(user.user_name, e as any)
                          }
                        >
                          <BigIcon />
                        </BigBtn>
                      </td>
                    </tr>

                    {open ? (
                      items.map((item) => {
                        if (selected == item.user_id) {
                          if (user.user_id == item.user_id) {
                            return (
                              <tr key={item.pro_id}>
                                <ItemT>{item.product_name}</ItemT>
                                <ItemT>{item.requsted_at}</ItemT>
                                <td>
                                  <Button
                                    variant="danger"
                                    onClick={(e) =>
                                      delItem(item.pro_id, e as any)
                                    }
                                  >
                                    <BsTrashFill />
                                  </Button>
                                </td>
                              </tr>
                            );
                          }
                        } else {
                          return <></>;
                        }
                      })
                    ) : (
                      <></>
                    )}
                  </>
                );

                // {items.map((item) => {
                //   if (item.user_id == user.user_id) {
                //     console.log(item)
                //   }
                // })}
              }
              // items.map((item) => {
              //   if (item.user_id == user.user_id) {
              //     console.log(item)
              //   }
              // })
            )
          ) : (
            <Spinner animation="border" variant="primary" />
          )}
        </tbody>
      </Table>
      <a href="/admin">Go back</a>
    </div>
  );
};

export default AdminDash;
