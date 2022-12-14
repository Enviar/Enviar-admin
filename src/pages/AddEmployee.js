import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import DatalistInput from "react-datalist-input";

export default function AddEmployee() {
  const navigate = useNavigate();
  const [store, setStore] = useState([]);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    phoneNumber: "",
    role: "admin",
  });
  const [userStore, setUserStore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const employeeRole = localStorage.getItem("role")
  const getStore = async () => {
    try {
      const response = await axios.get(
        `https://enviar-be.herokuapp.com/store`,
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );

      setStore(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const newInput = {
      ...userData,
    };
    newInput[e.target.name] = e.target.value;

    setUserData(newInput);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`https://enviar-be.herokuapp.com/register`, {
        email: userData.email,
        password: userData.password,
        firstname: userData.firstname,
        lastname: userData.lastname,
        phoneNumber: userData.phoneNumber,
        role: userData.role,
        StoreId: userStore,
      });
      Swal.fire("Success", `Success Register Employee`, "success");
      navigate("/employee");
    } catch (err) {
      Swal.fire("Error", `${err.response.data.error.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStore();
  }, []);

  if (store) {
    if(employeeRole === "super_admin"){
      return (
        <>
          <div className="mt-12 mb-8">
            <h1 className="text-3xl font-semibold text-left my-2">
              Create New Employee
            </h1>
            <p className="text-left font-medium text-xl">
              Insert the required data to create a new employee list.
            </p>
          </div>
          <div className="my-5 text-left py-2 px-7 shadow-lg shadow-gray-300 rounded-lg w-10/12">
            <div className="w-3/4">
              <p className="text-xl font-semibold mt-8 mb-4">
                Employee information
              </p>
              <div className="mt-8 flex px-5 items-center justify-between">
                <p>Firstname</p>
                <input
                  className="border-2 rounded-md px-3 py-1 h-14 w-4/6 focus:border-green-400 outline-none"
                  value={userData.firstname}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Firstname"
                  type="text"
                  name="firstname"
                />
              </div>
              <div className="my-4 flex px-5 items-center justify-between">
                <p>Lastname</p>
                <input
                  className="border-2 rounded-md px-3 py-1 h-14 w-4/6 focus:border-green-400 outline-none"
                  value={userData.lastname}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Lastname"
                  type="text"
                  name="lastname"
                />
              </div>
              <div className="my-4 flex px-5 items-center justify-between">
                <p>Phone Number</p>
                <input
                  className="border-2 rounded-md px-3 py-1 h-14 w-4/6 focus:border-green-400 outline-none"
                  value={userData.phoneNumber}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Phone Number"
                  type="number"
                  name="phoneNumber"
                />
              </div>
            </div>
            <div className="mt-11 w-3/4">
              <p className="text-xl font-semibold mt-8 mb-4">
                Account information
              </p>
              <div className="mt-8 flex px-5 items-center justify-between">
                <p>Email</p>
                <input
                  className="border-2 rounded-md px-3 py-1 h-14 w-4/6 focus:border-green-400 outline-none"
                  value={userData.email}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Email"
                  type="email"
                  name="email"
                />
              </div>
              <div className="my-4 flex px-5 items-center justify-between">
                <p>Password</p>
                <input
                  className="border-2 rounded-md px-3 py-1 h-14 w-4/6 focus:border-green-400 outline-none"
                  value={userData.password}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Password"
                  type="password"
                  name="password"
                />
              </div>
              <div className="my-4 flex px-5 items-center justify-between">
                <p>Role</p>
                <select
                  className="border-2 rounded-md px-3 py-1 h-14 w-4/6 focus:border-green-400 outline-none"
                  name="role"
                  onChange={(e) => handleInputChange(e)}
                  id="typeService"
                >
                  <option value="admin">Admin</option>
                  <option value="courier">Courier</option>
                </select>
              </div>
              <div className="my-4 flex px-5 justify-between items-center">
                <p>Store</p>
                <div className="w-4/6">
                  <DatalistInput
                    className="border-2 rounded-md"
                    placeholder="Employee's Store"
                    name="userStore"
                    onSelect={(e) => setUserStore(e.id)}
                    items={store.map((x) => {
                      return {
                        id: x.id,
                        value: x.name,
                      };
                    })}
                  />
                </div>
              </div>
            </div>
            <div className="mt-36 mb-6 text-right">
              <button
                class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded ml-3"
                disabled={isLoading}
                onClick={(e) => onSubmit(e)}
              >
                {!isLoading ? "Create Employee" : "Loading ..."}
              </button>
            </div>
          </div>
        </>
      );
    } else {
      return(
        <div className="mt-12 mb-8">
        <h1 className="text-3xl font-semibold text-left my-2">
          Only Supervisor that can add new employee
        </h1>
        </div>
      )
   
    }
   
  }
}
