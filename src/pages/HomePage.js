import axios from "axios"
import { useState, useEffect } from "react"
import NavbarComponent from "../components/NavbarComponent"
import HomeTableComponent from "../components/HomeTableComponent"
import Swal from "sweetalert2"
export default function HomePage() {
    const [loading, setLoading] = useState(true)
    const [listPackage, setListPackage] = useState([])
    const [fakeList, setListFake] = useState([])
    const [search, setSearch] = useState("")
    const [find, setFind] = useState(true)
    const getListPackage = async () => {
        try {
            const response = await axios.get(`https://enviar-be.herokuapp.com/listStoreStatus`, {
                headers: {
                    'access_token': localStorage.getItem('access_token')
                }
            })
            // console.log(response.data);
            setListPackage(response.data)
            setListFake(response.data)
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

    const handleFilter = () => {
        const newFilter = listPackage.filter(x => x[0].Product.receiptNumber.startsWith(search))
        console.log(newFilter);
        if (!search) {
            setListFake(listPackage)
            setFind(true)
        }
        if (newFilter.length < 1) {
            if (!search) {
                setFind(true)
            } else {
                setFind(false)
            }

        } else {
            setListFake(newFilter)
        }
    }

    useEffect(() => {
        getListPackage()
    }, [])
    if (loading) {
        return (
            <h3>loading</h3>
        )
    }
    if (!loading) {
        return (
            <>
                <NavbarComponent />
                <h1>home page</h1>
                {!find ? <p>Not Found Package</p> : null}
                <div className="mt-3">
                    <input className="border border-1" type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <button onClick={() => handleFilter()}>Search</button>
                </div>
                <HomeTableComponent lists={fakeList} />
            </>
        )

    }
}