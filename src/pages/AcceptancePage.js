import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
      const response = await axios.post(
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
      <h1 className="text-3xl font-semibold text-left my-2 mt-28">
        Update Order Status
      </h1>
      <p className="text-left mb-12 font-medium text-xl">
        Insert the received package number to update the info
      </p>
      <div className="mt-5">
        {total.map((el, number) => {
          return (
            <>
              <input
                onChange={(e) => handleInputChange(e, number)}
                name="receipt"
                className="border border-1"
                placeholder="Receipt Number"
              />
              {total.length > 1 ? (
                <p
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handleDelete(e, number)}
                >
                  delete
                </p>
              ) : null}
              <br />
            </>
          );
        })}

        <br />

        <button
          onClick={(e) => addTotal(e)}
          className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          More field
        </button>
        <button
          onClick={(e) => handleAdd(e)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add
        </button>
      </div>
    </>
  );
}
