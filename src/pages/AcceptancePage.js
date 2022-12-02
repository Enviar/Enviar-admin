import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function AcceptancePage() {
  const navigate = useNavigate();
  const [total, setTotal] = useState([{ receipt: "" }]);
  const addTotal = (e) => {
    e.preventDefault();
    setTotal([...total, { receipt: "" }]);
  };

  const addDb = async () => {
    try {
      await axios.post(
        `https://enviar-be.herokuapp.com/acceptance`,
        {
          receiptNumber: total,
        },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      Swal.fire("Success", `Success Update Data`, "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error", `${err.response.data.error.message}`, "error");
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    addDb();
  };

  const handleDelete = (e, index) => {
    const list = [...total];
    list.splice(index, 1);
    setTotal(list);
    console.log(index);
  };

  const handleInputChange = (e, index) => {
    const { value, name } = e.target;
    const list = [...total];
    list[index][name] = value;
    setTotal(list);
  };
  return (
    <>
      <div className="mt-12 mb-8">
        <h1 className="text-3xl font-semibold text-left my-2">
          Update Pacakge
        </h1>
        <p className="text-left font-medium text-xl">
          Update the package status accepted by your store
        </p>
      </div>
      <div className="w-3/4 px-12 py-5 shadow-lg shadow-gray-200 rounded-lg">
        <h1 className="text-2xl font-semibold text-left mt-4 mb-5">
          Input Recipient Number
        </h1>
        {total.map((el, number) => {
          return (
            <>
              <div className="flex items-center my-2">
                <input
                  onChange={(e) => handleInputChange(e, number)}
                  name="receipt"
                  className="border-2 rounded-md px-5 py-1 h-14 w-full focus:border-green-400 outline-none"
                  placeholder="Receipt Number"
                />
                {total.length > 1 ? (
                  <button
                    className="py-4 px-4 ml-2 bg-red-600 hover:-translate-y-1 duration-100 rounded-md"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => handleDelete(e, number)}
                  >
                    <i class="fa-solid fa-trash text-white"></i>
                  </button>
                ) : null}
                <br />
              </div>
            </>
          );
        })}
        <div className="text-right mt-12">
          <button
            onClick={(e) => addTotal(e)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold tracking-wide py-2 px-4 rounded-md mx-2"
          >
            Add field
          </button>
          <button
            onClick={(e) => handleAdd(e)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold tracking-wide py-2 px-4 rounded-md"
          >
            Update {total.length > 1 ? `(${total.length}) packages` : "package"}
          </button>
        </div>
      </div>
    </>
  );
}
