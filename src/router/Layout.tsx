import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  const user = true;

  return (
    <>
      {user ? (
        <>
          <header>
            <Link to={"/"}>
              <img src="public/logoipsum-289.svg" />
            </Link>
            <div className="naivation-bar-link-wrapper">
              <Link to={"/login"} className="navigation-bar-link">
                로그인
              </Link>
              <Link to={"/signup"} className="navigation-bar-link">
                회원가입
              </Link>
            </div>
          </header>
          <Outlet />
        </>
      ) : (
        <>
          <header>
            <Link to={"/"}>
              <img src="public/logoipsum-289.svg" />
            </Link>
            <div className="naivation-bar-link-wrapper">
              <Link to={"/mypage"} className="navigation-bar-link">
                마이 페이지
              </Link>
              <Link to={"/"} className="navigation-bar-link">
                로그아웃
              </Link>
            </div>
          </header>
          <Outlet />
        </>
      )}
    </>
  );
};

export default Layout;
