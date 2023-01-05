import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { MyDocument } from "../components/PdfReceipt";

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
      console.log(response.data.data);
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

      await axios.post(
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
    console.log(detail);
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
        <div className="w-9/12 rounded-md border-2 border-gray-300 text-left py-8 px-12 text-lg tracking-wide mb-14">
          <p className="bg-primary-green p-4 text-white rounded text-xl">
            Package ID: &nbsp;
            <span className="font-semibold">
              {detail.Product.receiptNumber}
            </span>
          </p>
          <div className="bg-active-btn-green w-full h-[10px] -mt-2"></div>
          <div className="flex justify-between mt-4">
            <div className="flex justify-between w-2/5 mr-10">
              <div className="">
                <p className="my-7">Recipient: </p>
                <p className="my-7">Recipient Phone: </p>
                <p className="my-7">Sender: </p>
                <p className="my-7">Sender Phone: </p>
                <p className="my-7">Status: </p>
                <p className="">Total Price: </p>
              </div>
              <div className="font-semibold">
                <p className="my-7">{detail.Product.recipientName}</p>
                <p className="my-7">{detail.Product.recipientPhone}</p>
                <p className="my-7">{detail.Product.senderName}</p>
                <p className="my-7">{detail.Product.senderPhone}</p>
                <p className="my-7">{detail.notes}</p>
                <p className="my-7">Rp. {detail.Product.shipmentPrice}</p>
              </div>
            </div>
            <div className="mt-6 w-3/6">
              <div class="mb-48">
                <div className="flex justify-between">
                  <div className="">
                    <p className="">Package Type: </p>
                    <p className="my-7">Package Weight: </p>
                    <p className="my-7">Destination: </p>
                    <p className="my-7">Service Type: </p>
                    <h1 className="my-7">Package Status</h1>
                    <h1>Store Location</h1>
                  </div>
                  <div className="font-semibold">
                    <p className="">{detail.Product.typeProduct}</p>
                    <p className="my-7">{detail.Product.weightProduct} kg</p>
                    <p className="my-7">{destination?.name}</p>
                    <p className="mt-7 mb-5">{detail.Product.typeService}</p>
                    <select
                      onChange={(e) => setStatus(e.target.value)}
                      value={status}
                      className="mb-5 w-[230px] form-select appearance-none px-3 py-1.5 text-base font-normal text-gray-700 border border-solid border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      aria-label="Default select example"
                    >
                      <option selected value="noStatus" disabled>
                        Open this select menu
                      </option>
                      <option value="transit_dikirim">transit_dikirim</option>
                      <option value="siap_dikirim">siap_dikirim</option>
                    </select>
                    <br />
                    <select
                      onChange={(e) => setStoreDet(e.target.value)}
                      value={storeDet}
                      class="w-[230px] form-select appearance-none px-3 py-1.5 text-base font-normal text-gray-700 border border-solid border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
              </div>
              <div className="text-right flex text-base">
                <PDFDownloadLink
                  document={<MyDocument details={detail.Product} />}
                  fileName={`${detail.Product.receiptNumber}_receipt.pdf`}
                  className="bg-blue-600 h-11 w-5/6 rounded text-white mr-5 tracking-wide font-semibold"
                  style={{ textAlign: "center", paddingTop: "9px" }}
                >
                  Download Package Receipt
                </PDFDownloadLink>
                <button
                  onClick={(e) => addStatus(e)}
                  className="bg-active-btn-green h-11 w-3/6 rounded text-white mr-auto tracking-wide font-semibold"
                >
                  Update Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
