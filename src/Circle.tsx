import styled from "styled-components";
import { useState } from "react";

const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: ${props=> props.bgColor};
    border: 2px solid ${props=> props.borderColor}
`;

interface ContainerProps {
    bgColor: string;
    borderColor: string,
}

interface CircleProps {
    bgColor: string,
    borderColor ? : string,
    
}

const Circle = ({bgColor, borderColor}:CircleProps) =>{
    const [counter, setCounter] = useState(0)
    
    
    return <Container bgColor={bgColor} borderColor={borderColor ?? "green"}/>
    
}

export default Circle;