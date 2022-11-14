import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import DatalistInput from "react-datalist-input";

export default function AddPackage(){
    const navigate = useNavigate()
    const [inputFormPackage, setInputFormPackage] = useState({
        senderName: '',
        senderPhone: '',
        recipientName: '',
        recipientPhone: '',
        recipientAddress: '',
        weightProduct: 0,
        typeProduct: '',
        typeService: 'Regular'

    })
    const [recipientCity, setRecipientCity] = useState(0)
    const [city, setCity] = useState([]);
    const getCity = async () => {
        try {
          const response = await axios.get(`https://enviar-be.herokuapp.com/getCity`);
          // console.log(response.data.data);
          setCity(response.data.data);
        } catch (err) {
          console.log(err);
        }
      };
    

    const handleInputChange = (e) => {
        e.preventDefault()
        const newInput = {
            ...inputFormPackage,
        }
          newInput[e.target.name] = e.target.value

        setInputFormPackage(newInput)
        
    }

    const onSubmit = async(e) =>{
       
      try{
        const response = await axios.post(`https://enviar-be.herokuapp.com/product`,{
          senderName: inputFormPackage.senderName,
          senderPhone: inputFormPackage.senderPhone,
          recipientName: inputFormPackage.recipientName,
          recipientPhone: inputFormPackage.recipientPhone,
          recipientAddress: inputFormPackage.recipientAddress,
          recipientCity: recipientCity,
          weightProduct: inputFormPackage.weightProduct,
          typeProduct: inputFormPackage.typeProduct,
          typeService: inputFormPackage.typeService
        },{
          headers:{
            access_token: localStorage.getItem("access_token")
          }
        })
        Swal.fire(
          'Success',
          `Success Create Package`,
          'success'
        )
        navigate("/")
      }
      catch(err){
        Swal.fire(
          'Error',
          `${err.response.data.error.message}`,
          'error'
        )
      }
        
    }

    useEffect(() => {
      getCity()
    }, [])
    
    if(city){
        return(
            <div>
            <h1>Add Package</h1>
            <div className="mt-4">
                    <input
                        className="border"
                        value={inputFormPackage.senderName}
                        onChange={(e) => handleInputChange(e)}
                        placeholder="Sender's Name"
                        type="text"
                        name="senderName"
                    />
                    <input
                        className=" border ml-3"
                        value={inputFormPackage.senderPhone}
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        placeholder="Sender's Phone"
                        name="senderPhone"
                    />
                     <input
                        className="border"
                        value={inputFormPackage.recipientName}
                        onChange={(e) => handleInputChange(e)}
                        placeholder="Recipient's Name"
                        type="text"
                        name="recipientName"
                    />
                    <input
                        className=" border ml-3"
                        value={inputFormPackage.recipientPhone}
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        placeholder="Recipient's Phone"
                        name="recipientPhone"
                    />
                       <input
                        className=" border ml-3"
                        value={inputFormPackage.recipientAddress}
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        placeholder="Recipient's Address"
                        name="recipientAddress"
                    />
                    
                    <DatalistInput
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
            <input
                        className=" border ml-3"
                        value={inputFormPackage.weightProduct}
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        placeholder="Product's Weight"
                        name="weightProduct"
                    />
                          <input
                        className=" border ml-3"
                        value={inputFormPackage.typeProduct}
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        placeholder="Product's Type"
                        name="typeProduct"
                    />
                    <select name="typeService" onChange={(e) => handleInputChange(e)} id="typeService">
                    <option value="regular">Regular</option>
                    <option value="extra">Extra</option>
                    </select>
         
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3" onClick={(e) => onSubmit(e)}>Create Package</button>
                </div>
            </div>
        )
    }
    
   
}