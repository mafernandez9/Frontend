import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Routes from '../Routes';

function TestRouter({ path }) {
  return (
    <MemoryRouter initialEntries={[path]}>
      <Routes />
    </MemoryRouter>
  );
}

describe('Login', () => {
  it('shows login form when user is not logged in', () => {
    const tree = renderer.create(<TestRouter path="/signup" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});