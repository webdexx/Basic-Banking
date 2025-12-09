import { Navigate } from "react-router-dom";

export default function StepGuard({ allowed, redirectTo, children }) {
  if (!allowed) {
    return <Navigate to={redirectTo} replace />;
  }
  return children;
}
