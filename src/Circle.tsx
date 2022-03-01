import styled from "styled-components";

const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: ${props=> props.bgColor}
`;

interface ContainerProps {
    bgColor: string;
}

interface CircleProps {
    bgColor: string,
    borderColor?: string,
    
}

const Circle = ({bgColor}:CircleProps) =>{
    return <Container bgColor={bgColor}/>
    
}

export default Circle;