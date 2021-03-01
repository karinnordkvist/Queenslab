import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';

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
      {/* Chip Image */}
      <Chip cvv={cvvStatus} src={process.env.PUBLIC_URL + '/chip.png'} />

      {/* Card Number */}
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

      {/* CVV-number */}
      <CvvWrapper cvv={cvvStatus}>
        <MiniHeader>CVV</MiniHeader>
        <p>{cvv}</p>
      </CvvWrapper>

      <CardInnerWrapper>
        {/* Name */}
        <CardInnerWrapper style={{ flexDirection: 'column' }}>
          <MiniHeader cvv={cvvStatus}>Cardholder</MiniHeader>
          <NameDate cvv={cvvStatus}>{name}</NameDate>
        </CardInnerWrapper>

        {/* Expiration Date */}
        <CardInnerWrapper
          style={{ flexDirection: 'column', alignItems: 'flex-end' }}
        >
          <MiniHeader cvv={cvvStatus}>Expires</MiniHeader>
          <NameDate cvv={cvvStatus}>
            {month}/{year}
          </NameDate>
        </CardInnerWrapper>
      </CardInnerWrapper>
    </CardWrapper>
  );
};

// Styling ---
const Chip = styled.img`
  width: 50px;
  display: ${(props) => (props.cvv ? 'none' : 'block')};

  @media (max-width: 800px) {
    width: 40px;
  }
`;

const MiniHeader = styled.p`
  font-family: 'Helvetica';
  font-weight: 400;
  font-size: 10px;
  letter-spacing: 1px;
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
  width: 40vw;
  max-width: 400px;
  max-height: calc(400px / 1.586);
  height: calc(40vw / 1.586);
  padding: 30px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  font-family: 'Inconsolata';
  font-weight: 600;
  font-size: 24px;
  text-transform: uppercase;
  transform: translateY(100px)
    ${(props) => (props.cvv ? 'rotateY(180deg)' : '')};
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
  color: #fff;
  box-shadow: 2px 10px 15px rgba(237, 232, 249, 1);
  z-index: 1;
  transition: all 0.5s ease-in-out;

  @media (max-width: 800px) {
    width: 70vw;
    height: calc(70vw / 1.586);
    transform: translateY(40px)
      ${(props) => (props.cvv ? 'rotateY(180deg)' : '')};
  }

  ${CvvWrapper} {
    opacity: ${(props) => (props.cvv ? '1' : '0')};
    display: ${(props) => (props.cvv ? 'block' : 'none')};
  }
`;

const CardInnerWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Number = styled.p`
  margin-bottom: 50px;
  text-shadow: 1px 1px 1.5px rgba(0, 0, 0, 0.3);
  transition: display 0.5s ease-in-out;
  display: ${(props) => (props.cvv ? 'none' : 'block')};

  @media (max-width: 800px) {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

const NameDate = styled.p`
  margin: 5px 0;
  font-size: 22px;
  text-shadow: 1px 1px 1.5px rgba(0, 0, 0, 0.3);
  display: ${(props) => (props.cvv ? 'none' : 'block')};

  @media (max-width: 800px) {
    font-size: 16px;
  }
`;
