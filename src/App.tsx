import AuthProvider from "./providers/AuthProvider";
import Router from "./router/Router";

function App() {
  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
}

export default App;
