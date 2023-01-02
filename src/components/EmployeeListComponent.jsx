import React from "react";

export default function EmployeeListComponent({ lists, funcId, funcDelete }) {
  // const navigate = useNavigate()
  const employeePage = localStorage.getItem("role");
  const openDetail = (e, id) => {
    e.preventDefault();
    // console.log(id);
    funcId(id);
  };

  const deleteData = (e, id) => {
    e.preventDefault();
    // console.log(id);
    funcDelete(id);
  };
  return lists?.map((emp) => {
    return (
      <div className="text-left mb-4 flex justify-between duration-200">
        <div className="bg-active-btn-green w-24 rounded-l-md">
          <div className="flex justify-center items-center h-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                fill-rule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="flex pl-10 pr-24 justify-between border-2 border-gray-300 rounded-r-md w-full mr-2 hover:bg-green-600 hover:border-0 hover:text-white duration-100">
          <div className="py-6 flex justify-between items-center w-full">
            <div>
              <p>First Name:</p>
              <p className="font-semibold">{emp.firstname}</p>
            </div>
            <div>
              <p>Last Name:</p>
              <p className="font-semibold">{emp.lastname}</p>
            </div>
            <div>
              <p>Email:</p>
              <p className="font-semibold">{emp.email}</p>
            </div>
            <div>
              <p>Phone:</p>
              <p className="font-semibold">{emp.phoneNumber}</p>
            </div>
            <div>
              <p>Type:</p>
              <p className="font-semibold">{emp.role}</p>
            </div>
          </div>
        </div>
        {employeePage === "super_admin" ? (
          <div className="h-[100px] flex font-semibold">
            <button
              className="w-24 rounded-l-md bg-blu text-white hover:bg-blue-800 duration-150"
              onClick={(e) => openDetail(e, emp.id)}
            >
              Edit
            </button>
            <button
              className="w-24 rounded-r-md bg-red-600 text-white hover:bg-red-700 duration-150"
              onClick={(e) => deleteData(e, emp.id)}
              data-testid="delete-btn"
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>
    );
  });
}
