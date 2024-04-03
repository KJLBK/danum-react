import styled from "styled-components";

const StyledButton = styled.button`
    width: 320px;
    height: 55px;
    padding: 10px 25px;
    border: 2px solid #000;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    transition: all 0.3s ease;
    overflow: hidden;

    &:after {
        position: absolute;
        content: " ";
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        transition: all 0.3s ease;
        -webkit-transform: scale(.1);
        transform: scale(.1);
    }

    &:hover {
        color: #fff;
    }

    &:hover:after {
        background: #000;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
`;

export default function LoginButton() {
    return (
        <StyledButton>로그인</StyledButton>
    );
}
