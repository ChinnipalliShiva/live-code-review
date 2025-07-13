import React from "react";
import { useSelector } from "react-redux";

// Dashboard component
const Dashboard: React.FC = () => {
  // You can access the Redux store state here if needed
  const user = useSelector((state: any) => state.auth.user);
  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
    </div>
  );
};

export default Dashboard;
