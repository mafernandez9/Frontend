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

const userResponse = {
  data:
    [
      {
        type: 'users',
        id: '2',
        attributes:
            {
              firstName: 'Jakayla',
              lastName: 'Smitham',
              birthDay: '1994-05-21',
              nickname: 'Elody',
              email: 'Liza30@hotmail.com',
              image: 'https://picsum.photos/200',
              role: 'client',
            },
      },
    ],
};

describe('UserList', () => {
  describe('when user gets into the page', () => {
    it('renders the home page with links to signup and log in', async () => {
      axios.get.mockImplementationOnce(() => Promise.resolve(userResponse));
      const tree = renderer.create(<TestRouter path="/users" />);
      await Promise.resolve();
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});