import React, { useContext, createContext, useState } from "react";

const UserContext = createContext(); // Create the context outside the component

const UserInfoProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [userDetail, setUserDetail] = useState([]);
  const [admin, setAdmin] = useState(true);
  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        profilePic,
        setProfilePic,
        userDetail,
        setUserDetail,
        admin,
        setAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export default UserInfoProvider;
