import { Link, Outlet } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import supabase from "../utils/supabase";

const Layout = () => {
  const { user } = useAuthStore();
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      {user ? (
        <>
          <header>
            <Link to={"/"}>
              <img src="/logoipsum-289.svg" />
            </Link>
            <div className="naivation-bar-link-wrapper">
              <Link to={"/mypage"} className="px-5 py-2.5 text-black">
                {user.nickname}
              </Link>
              <Link onClick={handleLogout} to={"/"} className="navigation-bar-link">
                로그아웃
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
      )}
    </>
  );
};

export default Layout;
