import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders h1 and h2 header', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/Вопросы по автомобилям/i)).toBeInTheDocument();
  expect(getByText(/Задать вопрос/i)).toBeInTheDocument();
});
