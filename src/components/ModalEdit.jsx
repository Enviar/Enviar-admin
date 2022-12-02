import axios from "axios";
import React from "react";

export default function ModalEdit({ show, setShow, data, setData, getAll }) {
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
          <div className="bg-white p-10 rounded-lg z-50 relative w-[600px]">
            <div
              onClick={() => setShow(false)}
              className="absolute top-3 right-3 bg-gray-300 p-2 rounded-full hover:bg-gray-400 transition-all cursor-pointer"
            >
              <img
                alt=""
                src="https://iconape.com/wp-content/png_logo_vector/cross-2.png"
                className="h-3 w-3"
              />
            </div>
            <div className="font-bold text-2xl">Edit Employee Details</div>
            <div className="mt-10 font-medium">
              <div className="flex justify-between items-center">
                <p>First Name:</p>
                <input
                  className="border-2 rounded-md px-3 py-1 h-14 w-4/6 focus:border-green-400 outline-none"
                  value={data.firstname}
                  onChange={handleInputChange}
                  name="firstname"
                />
              </div>
              <br />
              <div className="flex justify-between items-center">
                <p>Last Name:</p>
                <input
                  className="border-2 rounded-md px-3 py-1 h-14 w-4/6 focus:border-green-400 outline-none"
                  value={data.lastname}
                  onChange={handleInputChange}
                  name="lastname"
                />
              </div>
              <br />
              <div className="flex justify-between items-center">
                <p>Phone:</p>
                <input
                  className="border-2 rounded-md px-3 py-1 h-14 w-4/6 focus:border-green-400 outline-none"
                  value={data.phoneNumber}
                  onChange={handleInputChange}
                  name="phoneNumber"
                />
              </div>
            </div>
            <div className="mt-8 text-right">
              <button
                onClick={() => handleSubmit()}
                className="px-5 py-3 bg-primary-green text-white rounded-md hover:bg-green-700 transition-all font-semibold"
              >
                Save Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
