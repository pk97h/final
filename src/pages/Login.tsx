import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // 로그인 폼 값 변경 핸들러
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // 로그인 폼 제출 핸들러
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 유효성 검사
    if (!user.email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (!user.password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    // supabase 로그인
    const { error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });

    if (error?.message.includes("Invalid login credentials")) {
      alert("이메일 또는 비밀번호가 일치하지 않습니다.");
      return;
    }

    if (error) {
      alert(`로그인 실패 : ${error.message}`);
      return;
    }

    alert("로그인 성공");
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-2xl font-bold">로그인</div>
        <form onSubmit={handleLoginSubmit} className="login-form">
          <div className="login-input-wrapper">
            <label htmlFor="email" className="login-label">
              이메일
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="이메일을 입력해주세요."
              value={user.email}
              onChange={handleLoginChange}
              className="login-input"
            />
          </div>
          <div className="login-input-wrapper">
            <label htmlFor="password" className="login-label">
              비밀번호
            </label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              value={user.password}
              onChange={handleLoginChange}
              className="login-input"
            />
          </div>
          <button type="submit" className="login-button">
            로그인
          </button>
          <Link to={"/signup"} className="login-button text-center bg-gray-300">
            회원가입하러 가기
          </Link>
        </form>
      </div>
    </>
  );
};
export default Login;
