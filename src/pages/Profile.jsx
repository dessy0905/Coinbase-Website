import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
      return;
    }

    // Fetch user profile data
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data);
        } else {
          // Token might be invalid
          localStorage.removeItem("token");
          navigate("/signin");
        }
      } catch (err) {
        setError("Failed to load profile data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B0D] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0B0D] flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0B0D] flex flex-col pt-24 font-sans text-white px-6">
      {/* Top Left Floating Logo */}
      <div className="absolute top-6 left-6 md:left-10">
        <Link to="/">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <span className="font-bold text-[24px] text-[#0A0B0D]">C</span>
          </div>
        </Link>
      </div>

      <div className="max-w-[800px] w-full mx-auto">
        <h1 className="text-[32px] font-bold mb-8">User Profile</h1>

        <div className="bg-[#1A1B1F] border border-[#2B2B2B] rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-[#3b82f6] rounded-full flex items-center justify-center text-3xl font-bold uppercase">
              {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
            </div>
            <div>
              <h2 className="text-[24px] font-bold mb-1">
                {user?.name || "Anonymous User"}
              </h2>
              <p className="text-[#89909E] text-[16px]">
                {user?.email || "No email provided"}
              </p>
            </div>
          </div>

          <div className="border-t border-[#2B2B2B] pt-6 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <p className="text-[14px] text-[#89909E]">
                Joined{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "recently"}
              </p>
              {user?._id && (
                <p className="text-[12px] text-[#5B616E]">
                  Account ID: {user._id}
                </p>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2.5 bg-[#FF0000] hover:bg-[#CC0000] text-white rounded-full font-bold text-[15px] transition-colors"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;