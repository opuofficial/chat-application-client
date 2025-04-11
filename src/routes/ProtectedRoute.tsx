import { ReactNode, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../store/authSlice";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkedAuth, setCheckedAuth] = useState(false);

  const isAuthenticated = useSelector(
    (state: { auth: { isAuthenticated: boolean } }) =>
      state.auth.isAuthenticated
  );

  useEffect(() => {
    let authInfo = localStorage.getItem("Chat-Application");

    if (authInfo) {
      authInfo = JSON.parse(authInfo);
      dispatch(userLogin(authInfo as any));
    }

    setCheckedAuth(true);
  }, [dispatch]);

  useEffect(() => {
    if (checkedAuth && !isAuthenticated) {
      navigate("/auth/signin");
    }
  }, [isAuthenticated, checkedAuth, navigate]);

  return checkedAuth && isAuthenticated ? <>{children}</> : null;
}

export default ProtectedRoute;
