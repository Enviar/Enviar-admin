import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import EmployeeListComponent from "../components/EmployeeListComponent";
import ModalEdit from "../components/ModalEdit";
export default function EmployeePage() {
  const [employee, setEmployee] = useState([]);
  const [emplo, setEmplo] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const getEmployee = async () => {
    try {
      const response = await axios.get(
        `https://enviar-be.herokuapp.com/getEmployee`,
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      setEmployee(response.data.data);
      setLoading(false);
    } catch (err) {
      Swal.fire("Error", `Server down, try again later`, "error");
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(
        `https://enviar-be.herokuapp.com/deleteEmployee/${id}`,
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      getEmployee();
    } catch (err) {
      Swal.fire("Error", `${err.response.data.error.message}`, "error");
    }
  };

  const getEmployeeById = async (id) => {
    try {
      const response = await axios.get(
        `https://enviar-be.herokuapp.com/getEmployeeId/${id}`,
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      setEmplo(response.data);
      if (emplo.firstname) {
        setShowModal(true);
      }
    } catch (err) {
      Swal.fire("Error", `Server down, try again later`, "error");
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);
  if (loading) {
    return <h1>loading</h1>;
  }
  if (!loading) {
    return (
      <div className="pr-10">
        <div className="mt-12 mb-8">
          <h1 className="text-3xl font-semibold text-left my-2">
            Employee List
          </h1>
          <p className="text-left font-medium text-xl">
            List of Enviar's employee will be shown in this page
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center w-3/6">
            <input
              placeholder="Employee Name Search"
              className="h-field w-full border-2 focus:border-green-400 rounded-l-lg px-4 placeholder:text-dark-grey font-medium outline-none"
              type="text"
            />
            <button className="bg-text-field h-field px-4 rounded-r-lg text-white font-medium">
              <i class="fa-solid fa-magnifying-glass text-dark-grey"></i>
            </button>
          </div>
          <div className="">
            <Link
              to={"/addEmployee"}
              className="px-5 py-[15.5px] rounded-lg bg-active-btn-green hover:bg-green-hover text-white font-semibold duration-150"
            >
              <i class="fa-solid fa-plus mr-2"></i>
              Create New Employee
            </Link>
          </div>
        </div>
        <div className="mt-5">
          <EmployeeListComponent
            lists={employee}
            funcId={getEmployeeById}
            funcDelete={deleteEmployee}
          />
          <ModalEdit
            show={showModal}
            setShow={setShowModal}
            data={emplo}
            setData={setEmplo}
            getAll={getEmployee}
          />
        </div>
      </div>
    );
  }
}
