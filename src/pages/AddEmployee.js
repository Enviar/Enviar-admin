import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import DatalistInput from "react-datalist-input";

export default function AddEmployee(){
    const navigate = useNavigate();
    const [store, setStore] = useState([])
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        phoneNumber: '',
        role: 'admin',
    })
    const [userStore, setUserStore] = useState(0)
    const getStore = async () =>{
        try{
            const response = await axios.get(`https://enviar-be.herokuapp.com/store`,{
                headers:{
                    access_token: localStorage.getItem("access_token")
                }
            })
     
            setStore(response.data.data)
        }
        catch(err){
            console.log(err);
        }
    }

    const handleInputChange = (e) => {
        e.preventDefault()
        const newInput = {
            ...userData,
        }
          newInput[e.target.name] = e.target.value

          setUserData(newInput)
        
    }

    const onSubmit = async (e) =>{
        e.preventDefault()
        try{
            const response = await axios.post(`https://enviar-be.herokuapp.com/register`,{
                email: userData.email,
                password: userData.password,
                firstname: userData.firstname,
                lastname: userData.lastname,
                phoneNumber: userData.phoneNumber,
                role: userData.role,
                StoreId: userStore,
            })
            Swal.fire(
                'Success',
                `Success Register Employee`,
                'success'
              )
              navigate("/employee")

        } catch(err){
            Swal.fire(
                'Error',
                `${err.response.data.error.message}`,
                'error'
              )
        }
    }

    useEffect(()=>{
        getStore()
    },[])

    if(store){
        return(
            <div>
                <h1>Register Employee</h1>
                <div className="mt-4">
                    <input
                      className="border"
                      value={userData.email}
                      onChange={(e) => handleInputChange(e)}
                      placeholder="Email"
                      type="email"
                      name="email"
                    />
                     <input
                      className="border"
                      value={userData.password}
                      onChange={(e) => handleInputChange(e)}
                      placeholder="Password"
                      type="password"
                      name="password"
                    />
                     <input
                      className="border"
                      value={userData.firstname}
                      onChange={(e) => handleInputChange(e)}
                      placeholder="Firstname"
                      type="text"
                      name="firstname"
                    />
                    <input
                      className="border"
                      value={userData.lastname}
                      onChange={(e) => handleInputChange(e)}
                      placeholder="Lastname"
                      type="text"
                      name="lastname"
                    />
                     <input
                      className="border"
                      value={userData.phoneNumber}
                      onChange={(e) => handleInputChange(e)}
                      placeholder="Phone Number"
                      type="text"
                      name="phoneNumber"
                    />
                      <select name="role" onChange={(e) => handleInputChange(e)} id="typeService">
                    <option value="admin">Admin</option>
                    <option value="courier">Courier</option>
                    </select>
                    <DatalistInput
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

<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3" onClick={(e) => onSubmit(e)}>Create Employee</button>
                </div>
            </div>
                )
    }

}