import styled from "styled-components";
import InputEmail from "../component/InputEmail";
import InputPassword from "../component/InputPassword";
import LoginBtn from "../component/LoginBtn";

const StlyedPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StlyedDiv = styled.div`
  width: 400px;
  height: 510px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #FFF;
  mix-blend-mode: darken;
  box-shadow: 0px 0px 12px 5px rgba(0, 0, 0, 0.10);
`;

const StlyedH2 = styled.h2`
  padding-top: 30px;
  padding-left: 40px;
`;

const StlyedLabel = styled.label`
  padding-top: 35px;
  padding-left: 40px;
`;

const StlyedHr = styled.hr`
  margin-top: 15px;
  margin-right: 40px;
  margin-bottom: 15px;
  margin-left: 40px;
`;

const StlyedA = styled.a`
  margin-left: 120px;
`;

export default function LoginPage() {
  return (
    <>
      <StlyedPage>
        <StlyedDiv>
          <StlyedH2>로그인</StlyedH2>
          <StlyedLabel>이메일</StlyedLabel><br/>
          <InputEmail>이메일</InputEmail><br/>
          <StlyedLabel>비밀번호</StlyedLabel><br/>
          <InputPassword>비밀번호</InputPassword>
          <LoginBtn>로그인</LoginBtn>
          <StlyedHr/>
          <LoginBtn type="kakao">카카오로 시작하기</LoginBtn>
          <LoginBtn type="naver">네이버로 시작하기</LoginBtn>
          <StlyedA href="#">계정 찾기 / 회원 가입</StlyedA>
        </StlyedDiv>
      </StlyedPage>
    </>
  )
}