import axios from "axios";
import { useState, useEffect } from "react";
import NavbarComponent from "../components/NavbarComponent";
import HomeTableComponent from "../components/HomeTableComponent";
import Swal from "sweetalert2";
export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [listPackage, setListPackage] = useState([]);
  const [fakeList, setListFake] = useState([]);
  const [search, setSearch] = useState("");
  const [find, setFind] = useState(true);
  const getListPackage = async () => {
    try {
      const response = await axios.get(
        `https://enviar-be.herokuapp.com/listStoreStatus`,
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      // console.log(response.data);
      setListPackage(response.data);
      setListFake(response.data);
      setLoading(false);
    } catch (err) {
      Swal.fire("Error", `Server down, try again later`, "error");
    }
  };

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
    getListPackage();
  }, []);
  if (loading) {
    return <h3>loading</h3>;
  }
  if (!loading) {
    return (
      <>
        <div className="mt-14 mr-auto text-right pr-8">
          <input
            placeholder="Recipient Number Search"
            className="h-field w-field bg-text-field rounded-lg px-4 placeholder:text-dark-grey font-medium mx-5 outline-none"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => handleFilter()}>Search</button>
        </div>
        <h1 className="text-3xl font-semibold text-left my-2">
          Package Order List
        </h1>
        <p className="text-left mb-12 font-medium text-xl">
          List of on delivery packages are shown here
        </p>
        {!find ? <p>The Package are not found</p> : null}
        <HomeTableComponent lists={fakeList} />
      </>
    );
  }
}
