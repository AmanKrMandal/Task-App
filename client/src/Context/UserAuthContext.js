import { createContext, useState } from "react";

export const UserAuthContextApi = createContext();

const UserAuthContextProvider = ({ children }) => {
  const getDataBook = () => {
    const data = localStorage.getItem("user");
    if (data) {
      return JSON.parse(data);
    } else {
      return {};
    }
  };

  const [user, setUser] = useState(getDataBook());

  return (
    <>
      <UserAuthContextApi.Provider value={{ user, setUser }}>
        {children}
      </UserAuthContextApi.Provider>
    </>
  );
};
export default UserAuthContextProvider;
