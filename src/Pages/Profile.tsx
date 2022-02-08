import { useAuthContext } from "../contexts/AuthContext";

export const Profile = () => {
  const { user } = useAuthContext();

  return (
    <div className="page-container">
      <h1>Profile</h1>
    </div>
  );
};
