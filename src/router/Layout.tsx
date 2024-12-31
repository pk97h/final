import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="flex space-x-4">
        <Link to={"/"}>메인</Link>
        <Link to={"/feeds/:id"}>상세</Link>
        <Link to={"/feeds/create"}>추가</Link>
        <Link to={"/feeds/update/:id"}>수정</Link>
        <Link to={"/mypage"}>마이</Link>
        <Link to={"/signup"}>회원가입</Link>
        <Link to={"/login"}>로그인</Link>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
