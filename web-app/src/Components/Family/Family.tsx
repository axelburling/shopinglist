import * as React from 'react';
import Card from '../lib/Card';

// tslint:disable-next-line: no-var-requires

interface Props {
  name: string;
  image: any;
  id: string;
}

const Family: React.FC<Props> = ({ name, image, id }: Props) => {
  return <Card text={name} image={image} to={`dashboard/${id}`} />;
};

export default Family;
