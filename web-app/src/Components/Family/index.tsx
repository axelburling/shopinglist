import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { CardColumns } from 'react-bootstrap';
import styled from 'styled-components';
import { User } from '../../@types/arrayTypes';
import { FAM } from '../../@types/fam';
import Create from './create';
import Family from './Family';

interface Props {
  user: User;
  setName: any;
  name: string;
  setFamId: any;
}

const Footer = styled.div`
  margin-top: 50px;
`;

const Fam: FC<Props> = ({ user, setName, setFamId, name }: Props) => {
  const [ids, setIds] = useState<string[] | null>([] || null);
  const [data, setData] = useState<any[] | null | undefined>(null);

  const getOne = async () => {
    try {
      const D = axios.get(
        `http://localhost:8090/api/v1/family/all/${user.user_id}`,
      );

      console.log((await D).data);

      if (JSON.stringify((await D).data) === '{}') {
        return <Create user={user} setName={setName} name={name} />;
      }

      setData((await D).data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      setIds(user.fam_id);
      if (ids !== undefined || ids !== null) {
        getOne();
        // console.log(data);
      }
    } else {
      setIds(null);
    }
  }, [user]);

  return (
    <div className="container">
      {data !== null && data !== undefined && data.length !== 0 ? (
        <div>
          <CardColumns className="container">
            {data.map((fam: FAM) => {
              console.log(fam);
              return (
                <a key={fam.fam_id} onClick={() => setFamId(fam.fam_id)}>
                  <Family
                    name={fam.fam_name}
                    image={fam.image}
                    id={fam.fam_id}
                  />
                </a>
              );
            })}
          </CardColumns>
          <Footer>
            <Create user={user} setName={setName} name={name} />
          </Footer>
        </div>
      ) : (
        <div>
          <Create user={user} setName={setName} name={name} />
        </div>
      )}
    </div>
  );
};

export default Fam;
