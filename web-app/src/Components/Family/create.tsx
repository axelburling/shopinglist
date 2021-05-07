import React, { FC, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { User } from '../../@types/arrayTypes';
import { ADDFAM } from '../../@types/fam';

interface Props {
  user: User;
  setName: any;
  name: string;
}

const Create: FC<Props> = ({ user, setName, name }: Props) => {
  // tslint:disable-next-line: array-type
  const [data, setData] = useState<ADDFAM>({
    user_id: null,
    name: null,
    user: null,
  });
  const onSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    if (user) {
      const body = { name, user_id: user.user_id };
      const res = await fetch('http://localhost:8090/api/v1/family/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      setData(await res.json());
    }
  };

  return (
    <div>
      {!(data.name === name) ? (
        <Form onSubmit={(e: any) => onSubmit(e)}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Create a new Family/Group</Form.Label>
            <input
              type="text"
              value={name}
              placeholder="Create a family"
              className="form-control"
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>

          <Button variant="outline-primary" type="submit">
            Submit
          </Button>
        </Form>
      ) : (
        <Redirect from="/create" push to={`/dashboard/${name}`} />
      )}
    </div>
  );
};

export default Create;
