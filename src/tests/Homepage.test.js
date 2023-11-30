import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LocationProvider } from 'lib/location';
import HomePage from 'page/Homepage';
import { BrowserRouter } from 'react-router-dom';

const setup = () => {
  render(
    <BrowserRouter>
    <LocationProvider>
      <HomePage />
    </LocationProvider>
    </BrowserRouter>
  );
  const title = screen.getByRole('heading', {level: 1});
  const button = screen.getByText('Search');
  const input = screen.getByPlaceholderText('Enter your Postcode');
  return {button,input,title}
}

test('Renders title', () => {
  const {title} = setup();
  expect(title).toHaveTextContent('Gourmet')
});

test('Renders button', () => {
  const {button} = setup();
  expect(button).toHaveClass('opacity-0')
});

test('Invalid Postcode does not make button visible', async ()=>{
  const{button, input} = setup();
  fireEvent.change(input, {target: {value: 'not a valid postcode'}});
  await waitFor(()=>{
    expect(input).toHaveValue('not a valid postcode')
    expect(button).toHaveClass('opacity-0');
  })
});

test('Valid Postcode makes button visible', async ()=>{
  const{button, input} = setup();
  fireEvent.change(input, {target: {value: 'FY3 9RQ'}});
  await waitFor(()=>{
    expect(input).toHaveValue('FY3 9RQ')
    expect(button).toHaveClass('opacity-100');
  })
});



