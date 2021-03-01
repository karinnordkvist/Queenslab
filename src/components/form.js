import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import { details } from '../reducers/details';

import { months, years } from './assets';

export const Form = () => {
  const dispatch = useDispatch();
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [disabled, setDisabled] = useState(true);

  // Validators
  // - Decided to make them myself to make sure all were correct
  useEffect(() => {
    if (number !== '' && number.length === 16) {
      if (name !== '' && name.length > 5) {
        if (month !== '' && year !== '') {
          if (cvv !== '' && cvv.length === 3) {
            return setDisabled(false);
          }
        }
      }
    }
  }, [number, name, cvv, month, year]);

  // Form handlers --------------------------------
  const onNumberChangeHandler = (value) => {
    setNumber(value);
    return dispatch(details.actions.setNumbers(value));
  };

  const onNameChangeHandler = (value) => {
    setName(value);
    return dispatch(details.actions.setName(value));
  };

  const onMonthChangeHandler = (value) => {
    setMonth(value);
    return dispatch(details.actions.setMonth(value));
  };

  const onYearChangeHandler = (value) => {
    setYear(value);
    return dispatch(details.actions.setYear(value));
  };

  const changeCvvStatus = (toggle) => {
    return dispatch(details.actions.setCvvStatus(toggle));
  };

  const onCvvChangeHandler = (value) => {
    setCvv(value);
    return dispatch(details.actions.setCvv(value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      CardNumber: number,
      CardName: name,
      CardExpiration: `${month}/${year}`,
      Cvv: cvv,
    });
    setNumber('');
    setName('');
    setMonth('');
    setYear('');
    setCvv('');
    setDisabled(true);
  };
  // ----------------------------------------------

  return (
    <FormWrapper>
      <form>
        {/* Number */}
        <label htmlFor="number">Card Number</label>
        <TextInput
          id="number"
          type="text"
          value={number}
          onChange={(event) => onNumberChangeHandler(event.target.value)}
          maxLength="16"
          placeholder="0000 0000 0000 0000"
          number={number.length}
        />

        {/* Name */}
        <label htmlFor="name">Card Name</label>
        <NameInput
          id="name"
          type="text"
          value={name}
          onChange={(event) => onNameChangeHandler(event.target.value)}
          placeholder="Anna Andersson"
          maxLength="28"
          name={name.length}
        />

        {/* Expiration date */}
        <FormInnerWrapper style={{ flexDirection: 'row' }}>
          <FormInnerWrapper style={{ flexDirection: 'column', width: '70%' }}>
            <label>Expiration Date</label>
            <FormInnerWrapper>
              <select
                style={{ width: '40%', marginRight: '10px' }}
                onChange={(event) => onMonthChangeHandler(event.target.value)}
              >
                {months.map((month) => {
                  return (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  );
                })}
              </select>
              <select
                style={{ width: '40%' }}
                onChange={(event) => onYearChangeHandler(event.target.value)}
              >
                {years.map((year) => {
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </FormInnerWrapper>
          </FormInnerWrapper>

          {/* CVV */}
          <FormInnerWrapper style={{ flexDirection: 'column', width: '30%' }}>
            <label htmlFor="cvv">CVV</label>
            <CvvInput
              id="cvv"
              type="text"
              maxLength="3"
              onFocus={() => changeCvvStatus(true)}
              onBlur={() => changeCvvStatus(false)}
              onChange={(event) => onCvvChangeHandler(event.target.value)}
              cvv={cvv.length}
            />
          </FormInnerWrapper>
        </FormInnerWrapper>

        {/* Submit button */}
        <SubmitButton
          onClick={(event) => handleSubmit(event)}
          type="submit"
          disabled={disabled}
        >
          Submit
        </SubmitButton>
      </form>
    </FormWrapper>
  );
};

// Styling ---
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 150px 100px 80px;

  form {
    display: flex;
    flex-direction: column;
    max-width: 460px;
    width: 80vw;
  }

  label {
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 1px;
  }

  select {
    padding: 9px 5px;
    border: 1px solid #000;
    margin-top: 5px;
    font-size: 18px;
    border-radius: 5px;

    &:hover {
      border-color: #e0c3fc;
      cursor: pointer;
    }
  }
`;

const FormInnerWrapper = styled.div`
  display: flex;
`;

const TextInput = styled.input`
  padding: 10px 8px 6px;
  border: ${(props) =>
    props.number < 16 && props.number > 0
      ? '3px dotted red'
      : '1px solid #000'};
  background: none;
  margin: 5px 0 20px;
  font-size: 18px;
  border-radius: 5px;

  &:hover {
    border-color: #e0c3fc;
  }
`;

const NameInput = styled(TextInput)`
  border: ${(props) =>
    props.name < 3 && props.name > 0 ? '3px dotted red' : '1px solid #000'};
`;

const CvvInput = styled(TextInput)`
  border: ${(props) =>
    props.cvv < 3 && props.cvv > 0 ? '3px dotted red' : '1px solid #000'};
`;

const SubmitButton = styled.button`
  padding: 14px 8px;
  font-size: 18px;
  margin-top: 20px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  background: ${(props) => (props.disabled ? '#F8F0FF' : '#8EC5FC')};
  background-image: ${(props) =>
    props.disabled ? '' : 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)'};
  color: ${(props) => (props.disabled ? '#000' : '#fff')};
  border: none;
  border-radius: 5px;

  &:hover {
    background: ${(props) => (props.disabled ? '' : '#e0c3fc')};
  }
`;
