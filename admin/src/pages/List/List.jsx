/* eslint-disable react/prop-types */
// import React from 'react'
import "./List.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const List = ({ url = "https://crypto-venture-backend.onrender.com" }) => {
  const [list, setList] = useState([]);

  // const url = "http://localhost:4000";

  const fetchList = async () => {
    const response = await axios(`${url}/api/blog/list`);
    console.log(response);

    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeBlog = async (blogId) => {
    const response = await axios.post(`${url}/api/blog/remove`, { id: blogId });

    await fetchList();

    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Title</b>
          <b>Category</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p className="text-black">{item.title}</p>
              <p className="text-black">{item.category}</p>
              {/* <p>$ {item.price}</p> */}
              <p
                onClick={() => removeBlog(item._id)}
                className="cursor-pointer text-black"
              >
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
