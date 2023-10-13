import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";

const Protected = ({ children }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("user", user);
    // if (!user) {
    //   navigate("/login");
    // }
  }, []);

  return <>{children}</>;
};

Protected.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Protected;
