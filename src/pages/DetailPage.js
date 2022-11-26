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
          <h1 className="text-3xl font-semibold text-left my-2 mt-12">
            Package Detail
          </h1>
          <p className="text-left mb-12 font-normal text-xl">
            Details of Package are shown here
          </p>
        </div>
        <div className="w-9/12 rounded-md shadow-md text-left py-8 px-12 text-lg tracking-wide">
          <p className="bg-primary-green p-4 text-white rounded">
            Package ID: &nbsp;
            <span className="font-semibold">
              {detail.Product.receiptNumber}
            </span>
          </p>
          <div className="bg-active-btn-green w-full h-[10px] -mt-2"></div>
          <div className="flex justify-between">
            <div className="flex justify-between w-4/12">
              <div className="">
                <p className="my-7">Status: </p>
                <p className="my-7">Package Type: </p>
                <p className="">Destination: </p>
              </div>
              <div className="font-semibold">
                <p className="my-7">{detail.notes}</p>
                <p className="my-7">{detail.Product.typeProduct}</p>
                <p className="">{destination.name}</p>
              </div>
            </div>
            <div className="mt-6 w-3/6">
              <div class="mb-48">
                <div className="flex justify-between items-center">
                  <h1>Package Status</h1>
                  <select
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                    class="form-select appearance-none
                    w-4/6
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      border border-solid border-gray-300
      rounded
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

                <div className="flex justify-between items-center mt-5">
                  <h1>Store Location</h1>
                  <select
                    onChange={(e) => setStoreDet(e.target.value)}
                    value={storeDet}
                    class="form-select appearance-none
                    w-4/6
                    
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      border border-solid border-gray-300
      rounded
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
              </div>
              <div className="text-right">
                <button
                  onClick={(e) => addStatus(e)}
                  className="bg-active-btn-green h-11 w-2/3 rounded text-white mr-auto tracking-wide"
                >
                  Update Package Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
