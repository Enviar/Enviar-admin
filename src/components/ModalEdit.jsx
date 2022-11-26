import React, { Component } from "react";
import axios from "axios";
import { useState } from "react";

export default function ModalEdit({ show, setShow, data, setData, getAll }) {
  const [dataEmployee, setDataEmployee] = useState({
    firstname: data.firstname,
    lastname: data.lastname,
    phoneNumber: data.phoneNumber,
  });

  const handleInputChange = (e) => {
    const newInput = {
      ...data,
    };
    newInput[e.target.name] = e.target.value;
    setData(newInput);
  };

  const handleSubmit = async () => {
    // console.log(data);
    try {
      const response = await axios.put(
        `https://enviar-be.herokuapp.com/editEmployee/${data.id}`,
        {
          firstname: data.firstname,
          lastname: data.lastname,
          phoneNumber: data.phoneNumber,
        },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      console.log(response.data.message);
      getAll();
    } catch (err) {
      console.log(err);
    } finally {
      setShow(false);
    }
  };

  return (
    <div>
      {show && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-40 flex items-center justify-center p-10 bg-black bg-opacity-25">
          <div className="bg-white p-10 rounded-lg max-w-2xl z-50 relative ">
            <div
              onClick={() => setShow(false)}
              className="absolute top-3 right-3 bg-gray-300 p-2 rounded-full hover:bg-gray-400 transition-all cursor-pointer"
            >
              <img
                src="https://iconape.com/wp-content/png_logo_vector/cross-2.png"
                className="h-3 w-3"
              />
            </div>
            <div className="font-bold text-2xl">Edit Employee</div>
            <div className="mt-5 font-medium">
              <input
                className="border border-1"
                value={data.firstname}
                onChange={handleInputChange}
                name="firstname"
              />
              <br />
              <input
                className="border border-1"
                value={data.lastname}
                onChange={handleInputChange}
                name="lastname"
              />
              <br />
              <input
                className="border border-1"
                value={data.phoneNumber}
                onChange={handleInputChange}
                name="phoneNumber"
              />
            </div>
            <div className="mt-3 space-x-3">
              <button
                onClick={() => handleSubmit()}
                className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition-all"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
