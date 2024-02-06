import styled, { css } from 'styled-components';

interface Props {
  type?: string;
}

//We use as in order to change the semantic tag in HTML so this will be render
// like: <h1> <h1/> depending on the value that has the prop 'as'.

const Heading = styled.h1<Props>`
  ${(props) =>
    props.as === 'h1' &&
    css`
      font-size: 3rem;
    `}

  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: 2rem;
    `}

  ${(props) =>
    props.as=== 'h3' &&
    css`
      font-size: 1rem;
    `}

  ${(props) =>
  props.as === "h4" &&
  css`
    font-size: 3rem;
    font-weight: 600;
    text-align: center;
  `}

  font-weight:600;
`;

export default Heading;
