import React from 'react';
import styled from 'styled-components';

interface Props {
  to?: string;
  text: string;
  image: any;
  alt?: string;
  onClick?: () => void;
}

const Wrapper = styled.div`
  width: 10px;
`;

const Img = styled.img`
  height: 300px;
`;

const Card: React.FC<Props> = ({
  to = '#',
  text,
  image,
  alt = 'Placeholder',
  onClick,
}: Props) => {
  return (
    <a href={to} onClick={onClick}>
      <Wrapper className="card">
        <Img className="card-img-top" src={image} alt={alt} />
        <div className="card-body">
          <h5 className="card-title">{text}</h5>
        </div>
      </Wrapper>
    </a>
  );
};

export default Card;
