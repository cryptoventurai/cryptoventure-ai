/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [blog_list, setBlogList] = useState([]);

  const url = "https://crypto-venture-backend.onrender.com";

  const fetchBlogList = async () => {
    const response = await axios.get(url + "/api/blog/list");
    setBlogList(response.data.data);
  };

  useEffect(() => {
    async function loadData() {
      await fetchBlogList();
    }

    loadData();
  }, []);

  const contextValue = {
    blog_list,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
