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
        recipientCity: '',
        weightProduct: '',
        typeProduct: '',
        typeService: ''

    })
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
              onChange={(e) => handleInputChange(e)}
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
                    <select name="typeService"   onChange={(e) => handleInputChange(e)} id="typeService">
                    <option value="regular">Regular</option>
                    <option value="Extra">Extra</option>
                    </select>
         
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3" onClick={(e) => (e)}>Create Package</button>
                </div>
            </div>
        )
    }
    
   
}