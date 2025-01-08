import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Protected = ({ role }) => {
  const navigate = useNavigate();
  const { user, signIn } = useSelector((state) => state.user);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (
        !user ||
        (user?.peran !== "admin" && user?.peran !== "user") ||
        !signIn
      ) {
        navigate("/");
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [user, signIn, navigate]);
};

export default Protected;
