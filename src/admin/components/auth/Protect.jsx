import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Protect = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user?.role !== "admin") {
        navigate("/");
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [user, navigate]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoggedIn) {
        navigate("/");
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isLoggedIn]);
};

export default Protect;
