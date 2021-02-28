import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { details } from '../reducers/details';

export const Card = () => {
  const number = useSelector((store) => store.details.numbers);
  const name = useSelector((store) => store.details.name);
  const month = useSelector((store) => store.details.date[0]);
  const year = useSelector((store) => store.details.date[1]);
  const cvv = useSelector((store) => store.details.cvv);
  const cvvStatus = useSelector((store) => store.details.cvvDisplay);
  const formattedNumber = number.split('');

  return (
    <CardWrapper cvv={cvvStatus}>
      <Number cvv={cvvStatus}>
        <span>{formattedNumber.filter((number, index) => index < 4)}</span>
        <span style={{ marginLeft: '10px' }}>
          {formattedNumber.filter((number, index) => index > 3 && index < 8)}
        </span>
        <span style={{ marginLeft: '10px' }}>
          {formattedNumber.filter((number, index) => index > 7 && index < 12)}
        </span>
        <span style={{ marginLeft: '10px' }}>
          {formattedNumber.filter((number, index) => index > 11 && index < 17)}
        </span>
      </Number>
      <CvvWrapper cvv={cvvStatus}>
        <MiniHeader>CVV</MiniHeader>
        <p>{cvv}</p>
      </CvvWrapper>
      <CardInnerWrapper>
        <MiniHeader cvv={cvvStatus}>Cardholder</MiniHeader>
        <MiniHeader cvv={cvvStatus}>Expires</MiniHeader>
      </CardInnerWrapper>
      <CardInnerWrapper>
        <NameDate cvv={cvvStatus}>{name}</NameDate>
        <NameDate cvv={cvvStatus}>
          {month}/{year}
        </NameDate>
      </CardInnerWrapper>
    </CardWrapper>
  );
};

const MiniHeader = styled.p`
  font-family: 'Helvetica';
  font-weight: 400;
  font-size: 10px;
  margin: 0;
  display: ${(props) => (props.cvv ? 'none' : 'block')};
`;

const CvvWrapper = styled.div`
  transform: rotateY(180deg);
  width: 100%;
  margin-bottom: 50px;
  text-align: right;
  font-size: 18px;
  font-style: italic;
  transition: opacity 1s ease-in-out;

  p {
    background: #fff;
    padding: 5px 15px;
    color: #000;
    margin: 5px;
  }

  ${MiniHeader} {
    background: none;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  width: 400px;
  height: 250px;
  border-radius: 30px;
  box-shadow: 2px 10px 15px rgba(237, 232, 249, 1);
  padding: 30px;
  font-family: 'Inconsolata';
  font-weight: 600;
  font-size: 24px;
  text-transform: uppercase;
  transform: translateY(150px)
    ${(props) => (props.cvv ? 'rotateY(180deg)' : '')};
  z-index: 50000;
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
  color: #fff;
  transition: all 0.5s ease-in-out;

  ${CvvWrapper} {
    display: ${(props) => (props.cvv ? 'block' : 'none')};
    opacity: ${(props) => (props.cvv ? '1' : '0')};
  }
`;

const CardInnerWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Number = styled.p`
  margin-bottom: 50px;
  text-shadow: 1px 1px 1.5px rgba(0, 0, 0, 0.3);
  transition: display 0.5s ease-in-out;
  display: ${(props) => (props.cvv ? 'none' : 'block')};
`;

const NameDate = styled.p`
  margin: 5px 0;
  font-size: 22px;
  text-shadow: 1px 1px 1.5px rgba(0, 0, 0, 0.3);
  display: ${(props) => (props.cvv ? 'none' : 'block')};
`;
