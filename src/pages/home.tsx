import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { removeEvent } from './settings';

const HomeWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const Main = styled.div`
  color: rgba(255, 255, 255, 1);
  text-align: center;
`;

const MenuList = styled.div`
  margin: 0;
  padding: 20 0;
  list-style-type: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  grid-gap: 10px;
`;
const common = `
  border-radius: 10px;
  width: 100%;
  padding: 20px;
  text-align: center;
  height: 100%;
  p {
    font-size: 150%;
    font-weight: bold;
  }
`;
const MenuItems1 = styled.div`
  ${common}
  border: 1px solid;
  color: rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.2);
  grid-row: 2 / 2;
`;
const StyledLink = styled(Link)`
  ${common}
  border: 3px solid;
  text-decoration: none;
  color: rgba(255, 255, 255, 1);
  background-color: rgba(255, 255, 255, 0.5);
  grid-row: 1 / 2;
  grid-column: 1 / 2;
`;
const StyledLink2 = styled(Link)`
  ${common}
  border: 3px solid;
  text-decoration: none;
  color: rgba(255, 255, 255, 1);
  background-color: rgba(255, 255, 255, 0.5);
  grid-row: 1 / 2;
  grid-column: 2 / 2;
`;

export const Home: React.FC = () => {
  useEffect(() => {
    removeEvent();
  }, []);
  return (
    <HomeWrapper>
      <Main>
        <h1>Falling Block Puzzle</h1>
        <p>Select under games!</p>
        <MenuList>
          <StyledLink to={`${process.env.ROOT_PATH}threejs`}>
            <p>START!</p>
            on ThreeJS
          </StyledLink>
          <StyledLink2 to={`${process.env.ROOT_PATH}p5`}>
            <p>START!</p>
            on P5
          </StyledLink2>
          <MenuItems1>
            <p>START!</p>
            on DOM
            <br />
            (under construction)
          </MenuItems1>
        </MenuList>
      </Main>
    </HomeWrapper>
  );
};
