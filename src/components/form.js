import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { details } from '../reducers/details';

export const Form = () => {
  const dispatch = useDispatch();
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cvv, setCvv] = useState('');

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
    // event.preventDefault();
    console.log('Submitted!');
  };

  const months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];
  const years = [21, 22, 23, 24, 25];

  return (
    <FormWrapper>
      <form>
        <label>Card Number</label>
        <TextInput
          type="text"
          value={number}
          onChange={(event) => onNumberChangeHandler(event.target.value)}
          minlength="16"
          maxlength="16"
          placeholder="0000 0000 0000 0000"
          number={number.length}
        />

        <label>Card Name</label>
        <NameInput
          type="text"
          value={name}
          onChange={(event) => onNameChangeHandler(event.target.value)}
          placeholder="Anna Andersson"
          minLength="5"
          maxLength="28"
          name={name.length}
        />

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
          <FormInnerWrapper style={{ flexDirection: 'column', width: '30%' }}>
            <label>CVV</label>
            <CvvInput
              type="text"
              maxLength="3"
              onFocus={() => changeCvvStatus(true)}
              onBlur={() => changeCvvStatus(false)}
              onChange={(event) => onCvvChangeHandler(event.target.value)}
              cvv={cvv.length}
            />
          </FormInnerWrapper>
        </FormInnerWrapper>
        <SubmitButton onClick={(event) => handleSubmit(event)}>
          Submit
        </SubmitButton>
      </form>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 0 100px;
  background: #fff;
  padding: 150px 100px 80px;

  form {
    display: flex;
    flex-direction: column;
    width: 460px;
  }

  label {
    text-transform: uppercase;
    font-size: 11px;
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
  padding: 10px 8px;
  font-size: 18px;
  margin-top: 20px;
  cursor: pointer;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 5px;

  &:hover {
    background: #e0c3fc;
    cursor: pointer;
  }
`;
