import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LoginPage() {
  const navigate = useNavigate();
  const [inputFormUser, setInputFormUser] = useState({
    email: "ravi1@gmail.com",
    password: "123456",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    e.preventDefault();
    const newInput = {
      ...inputFormUser,
    };
    newInput[e.target.name] = e.target.value;
    setInputFormUser(newInput);
  };

  const handleLogin = async (e) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://enviar-be.herokuapp.com/login`,
        {
          email: inputFormUser.email,
          password: inputFormUser.password,
        }
      );
      // console.log(response.data);
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("role", response.data.role);
      navigate("/");
    } catch (err) {
      Swal.fire("Error", `${err.response.data.error.message}`, "error");
    } finally {
      setInputFormUser({
        email: "",
        password: "",
      });
      setIsLoading(false);
    }
  };

  return (
    <section className="h-screen">
      <div className="px-4 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-2/12 lg:w-2/12 md:w-3/12 mb-12 md:mb-0">
            <img
              src={require("../assets/image/splash_envi.png")}
              style={{
                width: "100px",
                // height:"200px"
              }}
              className="w-full"
              alt="enviar logo"
            />
          </div>
          <div className="xl:ml-20 xl:w-4/12 lg:w-4/12 md:w-6/12 mb-12 md:mb-0">
            <form>
              <div className="mb-6">
                <p className="text-xl subpixel-antialiased font-semibold mb-2">
                  Welcome, Admin
                </p>
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Email address"
                  value={inputFormUser.email}
                  onChange={(e) => handleInputChange(e)}
                  name="email"
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Password"
                  value={inputFormUser.password}
                  onChange={(e) => handleInputChange(e)}
                  name="password"
                />
              </div>

              <div className="text-center lg:text-left">
                <button
                  disabled={isLoading}
                  type="button"
                  className="inline-block px-7 py-3 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-white-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={(e) => handleLogin(e)}
                >
                  {!isLoading ? "Masuk" : "Loading ..."}
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Don't have an account?
                  <a
                    href="#!"
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >
                    {" "}
                    Call your Supervisor
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
