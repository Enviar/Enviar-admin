import axios from "axios";
import React, { useEffect, useState } from "react";
import DatalistInput from "react-datalist-input";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddPackage() {
  const navigate = useNavigate();
  const [inputFormPackage, setInputFormPackage] = useState({
    senderName: "",
    senderPhone: "",
    recipientName: "",
    recipientPhone: "",
    recipientAddress: "",
    weightProduct: 0,
    typeProduct: "",
    typeService: "Regular",
  });
  const [recipientCity, setRecipientCity] = useState(0);
  const [city, setCity] = useState([]);
  const getCity = async () => {
    try {
      const response = await axios.get(
        `https://enviar-be.herokuapp.com/getCity`
      );
      // console.log(response.data.data);
      setCity(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const newInput = {
      ...inputFormPackage,
    };
    newInput[e.target.name] = e.target.value;

    setInputFormPackage(newInput);
  };

  const onSubmit = async (e) => {
    try {
      await axios.post(
        `https://enviar-be.herokuapp.com/product`,
        {
          senderName: inputFormPackage.senderName,
          senderPhone: inputFormPackage.senderPhone,
          recipientName: inputFormPackage.recipientName,
          recipientPhone: inputFormPackage.recipientPhone,
          recipientAddress: inputFormPackage.recipientAddress,
          recipientCity: recipientCity,
          weightProduct: inputFormPackage.weightProduct,
          typeProduct: inputFormPackage.typeProduct,
          typeService: inputFormPackage.typeService,
        },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      Swal.fire("Success", `Success Create Package`, "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error", `${err.response.data.error.message}`, "error");
    }
  };

  const packageType = [
    {
      name: "Electronics",
      value: "Electronics",
    },
    {
      name: "Food & Beverage",
      value: "Food & Beverage",
    },
    {
      name: "Medicine",
      value: "Medicine",
    },
    {
      name: "Clothes",
      value: "Clothes",
    },
    {
      name: "Toys",
      value: "Toys",
    },
    {
      name: "Stationery",
      value: "Stationery",
    },
    {
      name: "Cosmetics",
      value: "Cosmetics",
    },
    {
      name: "Otomotive",
      value: "Otomotive",
    },
  ];

  useEffect(() => {
    getCity();
  }, []);

  if (city) {
    return (
      <div>
        <div className="mt-12 mb-8">
          <h1 className="text-3xl font-semibold text-left my-2">
            Create New Order
          </h1>
          <p className="text-left font-medium text-xl">
            Add new package order by filling multiple fields of information
          </p>
        </div>
        <div className="my-5 text-left py-2 px-7 shadow-lg shadow-gray-300 rounded-lg w-10/12">
          <div className="w-3/4">
            <p className="text-xl font-semibold mt-8 mb-4">
              Sender information
            </p>
            <div className="mt-8 flex px-5 items-center justify-between">
              <p className="font-medium">Name</p>
              <input
                className="border-2 rounded-md px-3 py-1 h-14 w-4/6 focus:border-green-400 outline-none"
                value={inputFormPackage.senderName}
                onChange={(e) => handleInputChange(e)}
                placeholder="Sender's Name"
                type="text"
                name="senderName"
              />
            </div>
            <div className="my-4 flex px-5 items-center justify-between">
              <p className="font-medium">Phone</p>
              <input
                className="border-2 rounded-md px-3 py-1 h-14 w-4/6 focus:border-green-400 outline-none"
                value={inputFormPackage.senderPhone}
                onChange={(e) => handleInputChange(e)}
                type="text"
                placeholder="Sender's Phone"
                name="senderPhone"
              />
            </div>
          </div>
          <div className="mt-11 w-3/4">
            <p className="text-xl font-semibold my-4">Recipient information</p>
            <div className="mt-8 flex px-5 items-center justify-between">
              <p className="font-medium">Name</p>
              <input
                className="border-2 rounded-md px-3 py-1 h-14 w-4/6 focus:border-green-400 outline-none"
                value={inputFormPackage.recipientName}
                onChange={(e) => handleInputChange(e)}
                placeholder="Recipient's Name"
                type="text"
                name="recipientName"
              />
            </div>
            <div className="mt-4 flex px-5 items-center justify-between">
              <p className="font-medium">Phone</p>
              <input
                className="border-2 rounded-md px-3 py-1 h-14 w-4/6 focus:border-green-400 outline-none"
                value={inputFormPackage.recipientPhone}
                onChange={(e) => handleInputChange(e)}
                type="text"
                placeholder="Recipient's Phone"
                name="recipientPhone"
              />
            </div>
            <div className="mt-4 flex px-5 items-center justify-between">
              <p className="font-medium">Address</p>
              <input
                className="border-2 rounded-md px-3 py-1 h-14 w-4/6 focus:border-green-400 outline-none"
                value={inputFormPackage.recipientAddress}
                onChange={(e) => handleInputChange(e)}
                type="text"
                placeholder="Recipient's Address"
                name="recipientAddress"
              />
            </div>
            <div className="mt-4 flex px-5 items-center justify-between">
              <p className="font-medium">City</p>
              <DatalistInput
                className="border-2 rounded-md w-4/6"
                placeholder="Recipient's City"
                name="recipientCity"
                onSelect={(e) => setRecipientCity(e.id)}
                items={city.map((x) => {
                  return {
                    id: x.id,
                    value: x.name,
                  };
                })}
              />
            </div>
          </div>
          <div className="mt-11 w-3/4">
            <p className="text-xl font-semibold my-4">Package information</p>
            <div className="mt-8 flex px-5 items-center justify-between">
              <p className="font-medium">Weight (kg)</p>
              <input
                className="border-2 rounded-md px-3 py-1 h-14 w-4/6 focus:border-green-400 outline-none"
                value={inputFormPackage.weightProduct}
                onChange={(e) => handleInputChange(e)}
                type="text"
                placeholder="Product's Weight"
                name="weightProduct"
              />
            </div>
            <div className="mt-4 flex px-5 items-center justify-between">
              <p className="font-medium">Package Type</p>
              {/* <input
                className="border-2 rounded-md px-3 py-1 h-14 w-4/6 focus:border-green-400 outline-none"
                value={inputFormPackage.typeProduct}
                onChange={(e) => handleInputChange(e)}
                type="text"
                placeholder="Package Type"
                name="typeProduct"
              /> */}
              <select
                className="border-2 rounded-md px-30 py-1 h-14 w-4/6 focus:border-green-400 outline-none"
                name="typeProduct"
                onChange={(e) => handleInputChange(e)}
              >
                {packageType.map((type) => {
                  return <option value={type.value}>{type.name}</option>;
                })}
              </select>
            </div>
            <div className="mt-4 flex px-5 items-center justify-between">
              <p className="font-medium">Service Type</p>
              <select
                className="border-2 rounded-md px-30 py-1 h-14 w-4/6 focus:border-green-400 outline-none"
                name="typeService"
                onChange={(e) => handleInputChange(e)}
                id="typeService"
              >
                <option value="regular">Regular</option>
                <option value="extra">Extra</option>
              </select>
            </div>
          </div>
          <div className="mt-36 mb-6 text-right">
            <button
              class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded ml-3"
              onClick={(e) => onSubmit(e)}
            >
              Create New Package
            </button>
          </div>
        </div>
      </div>
    );
  }
}
