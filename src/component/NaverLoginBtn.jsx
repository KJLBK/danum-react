import styled from "styled-components";

const NaverIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
  <g clipPath="url(#clip0_19_223)">
    <mask id="mask0_19_223" maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
      <path d="M40 0H0V40H40V0Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_19_223)">
      <path d="M36 40H4C1.8 40 0 38.2 0 36V4C0 1.8 1.8 0 4 0H36C38.2 0 40 1.8 40 4V36C40 38.2 38.2 40 36 40Z" fill="#03C75A"/>
      <path d="M22.7 20.5L17 12.3999H12.3V27.6H17.3V19.4999L23 27.6H27.7V12.3999H22.7V20.5Z" fill="white"/>
    </g>
  </g>
</svg>
);

const StyledButton = styled.button`
    width: 320px;
    height: 45px;
    cursor: pointer;
    position: relative;
    display: flex;
    border-radius: 8px;
    font-weight: 500;
    font-style: normal;
    font-size: 14px;
    align-items: center;  /* 수직 가운데 정렬 */
    justify-content: center;  /* 수평 가운데 정렬 */
    
    margin-top: 15px;
    margin-left: 40px;
    margin-bottom: 20px;
    border: 2px solid #03C75A;
    background-color: #03C75A;
    color: #fff;

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

    svg {
        width: 30px;
        height: 30px;
        flex-shrink: 0;
        margin-right: 10px;
    }
`;

export default function NaverLoginBtn() {
    return (
        <StyledButton>
            <NaverIcon /> {/* SVG 아이콘을 버튼 내에 넣음 */}
            네이버로 시작하기
        </StyledButton>
    );
}
