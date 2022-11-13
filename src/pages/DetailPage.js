import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState({});
  const [store, setStore] = useState([]);
  const [destination, setDestination] = useState({});
  const [status, setStatus] = useState("noStatus");
  const [storeDet, setStoreDet] = useState(0);
  const getDetail = async () => {
    try {
      const getStatus = await axios.get(
        `https://enviar-be.herokuapp.com/store`,
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      const response = await axios.get(
        `https://enviar-be.herokuapp.com/status/${id}`,
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );

      setStore(getStatus.data.data);

      setDestination(response.data.destination);
      setDetail(response.data.data);
    } catch (err) {
      Swal.fire("Error", `Server down, try again later`, "error");
    }
  };

  const addStatus = async (e) => {
    e.preventDefault();

    try {
      if (storeDet === 0 || status === `noStatus`) {
        throw new Error(`please fill all the field`);
      }

      const response = await axios.post(
        `https://enviar-be.herokuapp.com/status`,
        {
          ProductId: detail.Product.id,
          CityId: storeDet,
          notes: status,
        },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      Swal.fire("Success", "Success update data", "success");
      navigate("/");
    } catch (err) {
      console.log(err);
      Swal.fire("Error", `${err}`, "error");
    }
  };

  useEffect(() => {
    getDetail();
  }, []);
  if (!detail.id) {
    return <h1>loading</h1>;
  }

  if (detail.id) {
    return (
      <>
        <div className="text-left">
          <h1 className="text-3xl font-semibold text-left my-2 mt-28">
            Package Detail
          </h1>
          <p className="text-left mb-12 font-medium text-xl">
            Detail list of Package {detail.Product.receiptNumber}
          </p>
          <h1>resi: {detail.Product.receiptNumber}</h1>
          <h1>status: {detail.notes}</h1>
          <h1>type product: {detail.Product.typeProduct}</h1>
          <h1>destination: {destination.name}</h1>
          <h1>Package Status</h1>
          <div class="mb-3 xl:w-96">
            <select
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              class="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Default select example"
            >
              <option selected value="noStatus" disabled>
                Open this select menu
              </option>
              <option value="transit_dikirim">transit_dikirim</option>
              <option value="siap_dikirim">siap_dikirim</option>
            </select>
          </div>
          <br />
          <h1>Store Location</h1>
          <div class="mb-3 xl:w-96">
            <select
              onChange={(e) => setStoreDet(e.target.value)}
              value={storeDet}
              class="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Default select example"
            >
              <option selected value="0" disabled>
                Open this select menu
              </option>
              {store.map((el) => {
                return <option value={el.id}>{el.name}</option>;
              })}
            </select>
          </div>
          <button
            onClick={(e) => addStatus(e)}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update
          </button>
        </div>
      </>
    );
  }
}
