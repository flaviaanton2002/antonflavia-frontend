import { ScaleLoader } from "react-spinners";
import styled from "styled-components";

const Wrapper = styled.div`
  ${(props) =>
    props.fullWidth
      ? ` 
        display: block;
        display: flex;
        justify-content: center;    
    `
      : `
        border: 5px solid blue;
    `}
`;

export default function Spinner({ fullWidth }) {
  return (
    <Wrapper fullWidth={fullWidth}>
      <ScaleLoader speedMultiplier={2} color={"#ff8e3c"} />
    </Wrapper>
  );
}
