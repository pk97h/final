import { useState } from "react";
import supabase from "../utils/supabase";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  });

  // 회원가입 폼 값 변경 핸들러
  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // // 회원가입 폼 제출 핸들러
  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 유효성 검사
    if (!user.email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(user.email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    if (!user.nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    if (user.password.length < 8) {
      alert("비밀번호는 8자 이상 입력해주세요.");
      return;
    }

    if (user.password != user.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // supabase 회원가입
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email: user.email,
        password: user.password,
        options: {
          data: {
            nickname: user.nickname,
          },
        },
      }
    );

    if (signUpError) {
      alert(`회원가입 실패 : ${signUpError.message}`);
      return;
    }

    // supabase users 테이블에 데이터 추가
    const { error: userInsertError } = await supabase.from("users").insert({
      id: signUpData.user?.id,
      email: user.email,
      nickname: user.nickname,
    });

    if (userInsertError) {
      alert(`유저 추가 실패 : ${userInsertError.message}`);
      return;
    }

    alert("회원가입 성공");
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-2xl font-bold">회원가입</div>
        <form
          onSubmit={handleSignUpSubmit}
          className="sign-up-form"
        >
          <div className="sign-up-input-wrapper">
            <label htmlFor="email" className="sign-up-label">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="이메일을 입력해주세요."
              value={user.email}
              onChange={handleSignUpChange}
              className="sign-up-input"
            />
          </div>
          <div className="sign-up-input-wrapper">
            <label htmlFor="nickname" className="sign-up-label">닉네임</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              placeholder="닉네임을 입력해주세요."
              value={user.nickname}
              onChange={handleSignUpChange}
              className="sign-up-input"
            />
          </div>
          <div className="sign-up-input-wrapper">
            <label htmlFor="password" className="sign-up-label">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              value={user.password}
              onChange={handleSignUpChange}
              className="sign-up-input"
            />
          </div>
          <div className="sign-up-input-wrapper">
            <label htmlFor="passWordConfirm" className="sign-up-label">비밀번호 확인</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              placeholder="비밀번호를 한 번 더 입력해주세요."
              value={user.passwordConfirm}
              onChange={handleSignUpChange}
              className="sign-up-input"
            />
          </div>
          <button
            type="submit"
            className="sign-up-button"
          >
            회원가입
          </button>
          <Link
            to={"/login"}
            className="sign-up-button text-center bg-gray-300"
          >
            로그인하러 가기
          </Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
