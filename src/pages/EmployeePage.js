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
    }

    const deleteEmployee = async (id) => {
        try {
            const response = await axios.delete(`https://enviar-be.herokuapp.com/deleteEmployee/${id}`, {
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
            getEmployee()
        }
        catch (err) {
            Swal.fire(
                'Error',
                `${err.response.data.error.message}`,
                'error'
              )
        }
    }

    const getEmployeeById = async (id) => {
        try {
            const response = await axios.get(`https://enviar-be.herokuapp.com/getEmployeeId/${id}`, {
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
            setEmplo(response.data)
            if (emplo.firstname) {
                setShowModal(true)

            }
        }
        catch (err) {
            Swal.fire(
                'Error',
                `Server down, try again later`,
                'error'
              )
        }
    }

    useEffect(() => {
        getEmployee()
    }, [])
    if (loading) {
        return (
            <div className="mt-25 ml-25">
            <img src={loader} alt="spinner" />
            </div>
        )
    }
    if (!loading) {

        return (
            <>
                <h1>ini employee page</h1>
                <div className="mt-5" >
                    <EmployeeTableComponent lists={employee} funcId={getEmployeeById} funcDelete={deleteEmployee} />
                    <ModalEdit show={showModal} setShow={setShowModal} data={emplo} setData={setEmplo} getAll={getEmployee} />
                </div>
            </>
        )
    }
}