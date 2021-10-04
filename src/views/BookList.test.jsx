import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import axios from 'axios';
import Routes from '../Routes';

jest.mock('axios');

function TestRouter({ path }) {
  return (
    <MemoryRouter initialEntries={[path]}>
      <Routes />
    </MemoryRouter>
  );
}

const bookResponse = {
  data:
  {
    type: 'books',
    id: '1',
    attributes: {
      title: 'Principito',
      description: 'no pueden',
      userId: '1',
      image: 'hola.png',
      ISBN: '1212',
    },
  },
};

describe('BookList', () => {
  describe('when user gets into the page', () => {
    it('renders the home page with links to register and log in', async () => {
      axios.get.mockImplementationOnce(() => Promise.resolve(bookResponse));
      const tree = renderer.create(<TestRouter path="/books" />);
      await Promise.resolve();
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});