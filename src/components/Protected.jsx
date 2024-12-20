import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Protect = ({ role }) => {
  const navigate = useNavigate();
  const { user, signIn } = useSelector((state) => state.user);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user?.peran !== role || !user) {
        navigate("/");
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [user, navigate]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!signIn) {
        navigate("/");
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [signIn]);
};

export default Protect;
