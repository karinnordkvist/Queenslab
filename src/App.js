import React from 'react';
import styled from 'styled-components/macro';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { Card } from './components/card';
import { Form } from './components/form';

import { details } from './reducers/details';

const reducer = combineReducers({
  details: details.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <Wrapper>
        <Card />
        <Form />
      </Wrapper>
    </Provider>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateY(-50px);

  @media (max-width: 800px) {
    transform: translateY(0);
  }
`;
