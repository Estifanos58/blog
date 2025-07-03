import { Navigate } from "react-router-dom";
import useStore from "../store/store";

const ProtectedRoute = ({ children }) => {
  const { user } = useStore();

  if (!user.firstName) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
