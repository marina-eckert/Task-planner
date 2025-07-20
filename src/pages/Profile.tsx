import MainLayout from "../layouts/MainLayout";
import avatar from "../assets/images/arthur.svg";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = {
    name: "Azhar I.",
    email: "azhar@example.com",
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto text-center mt-10">
        <h2 className="text-3xl font-medium mb-6">Profile</h2>
        <img
          src={avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full mx-auto mb-6"
        />
        <h3 className="text-xl font-semibold">{user.name}</h3>
        <p className="text-gray-600">{user.email}</p>
        <button className="mt-6 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition">
          <Link to="/settings">Edit Profile</Link>
        </button>
      </div>
    </MainLayout>
  );
};

export default Profile;
