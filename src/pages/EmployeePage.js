
import React,{ useState, useEffect } from "react"
import axios from 'axios'
import EmployeeTableComponent from "../components/EmployeeTableComponent"
import ModalEdit from "../components/ModalEdit"
import Swal from "sweetalert2";
import loader from "../assets/image/loading.gif"
export default function EmployeePage() {
    const [employee, setEmployee] = useState([])
    const [emplo, setEmplo] = useState({})
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    
    const getEmployee = async () => {
        try {
            const response = await axios.get(`https://enviar-be.herokuapp.com/getEmployee`, {
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
            setEmployee(response.data.data)
            setLoading(false)
        }
        catch (err) {
            Swal.fire(
                'Error',
                `Server down, try again later`,
                'error'
              )
        }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(
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
        <div className="flex items-center justify-end">
          <input
            placeholder="Employee Name Search"
            className="h-field w-field border-2 focus:border-green-400 rounded-lg px-4 placeholder:text-dark-grey font-medium mx-2 outline-none"
            type="text"
          />
          <button className="bg-active-btn-green h-field px-4 rounded-lg text-white font-medium">
            Search
          </button>
        </div>
        <div className="mt-5">
          <div className="text-lg border-2 border-border rounded-md w-full pl-10 text-left mb-4">
            <div className="flex justify-between items-center">
              <div className="py-6 flex justify-between w-2/4">
                <p className="font-semibold">Ardi Ivan</p>
                <div>
                  <p>Email:</p>
                  <span className="font-semibold">ardii@mail.com</span>
                </div>
              </div>
              <div className="h-[120px] flex font-semibold">
                <button className="w-24 rounded-l-md bg-blue-500 text-white hover:bg-blue-600">
                  Edit
                </button>
                <button className="w-24 rounded-r-md bg-red-500 text-white hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <EmployeeTableComponent
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
