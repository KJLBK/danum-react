import styled from "styled-components";

const StyledInputEmail = styled.input`
    width: 320px;
    height: 25px;
    position: relative;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    background-image: linear-gradient(#5271ff, #5271ff), linear-gradient(#bfbfbf, #bfbfbf);
    border: 0 none;
    border-radius: 0;
    box-shadow: none;
    float: none;
    background-color: transparent;
    background-position: center bottom, center calc(100% - 1px);
    background-repeat: no-repeat;
    background-size: 0 2px, 100% 1px;
    transition: background 0s ease-out 0s;
    min-height: 35px;
    margin-left: 40px;
    margin-bottom: 20px;

    &:focus {
        background-size: 100% 2px, 100% 1px;
        outline: 0 none;
        transition-duration: 0.3s;
    }
`;

export default function InputEmail() {
    return (
        <>
            <StyledInputEmail type='email' placeholder="example@mail.com"/>
        </>
    );
}