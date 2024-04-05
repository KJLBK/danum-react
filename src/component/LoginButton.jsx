import styled from "styled-components";

const StyledButton = styled.button`
    width: 320px;
    height: 45px;
    margin-left: 40px;
    border: 2px solid #5271ff;
    border-radius: 8px;
    font-weight: 500;
    font-size: 14px;
    background-color: #5271ff;
    cursor: pointer;
    color: #fff;
    position: relative;

    &:hover {
        box-shadow:
            -3px -3px 10px 0px #fff9,
            -2px -2px 2px 0px #fff9,
            3px 3px 10px 0px #0002,
            2px 2px 2px 0px #0001,
            3px -3px 10px 0px #fff9,
            2px -2px 2px 0px #fff9,
            -3px 3px 10px 0px #0002,
            -2px 2px 2px 0px #0001;
    }
`;

export default function LoginButton() {
    return (
        <StyledButton>로그인</StyledButton>
    );
}
