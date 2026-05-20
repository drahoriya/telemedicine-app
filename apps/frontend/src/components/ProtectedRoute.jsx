import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Center, Spinner } from "@chakra-ui/react";

export default function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, user, isLoading } = useSelector((s) => s.auth);
  const location = useLocation();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
