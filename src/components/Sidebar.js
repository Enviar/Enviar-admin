import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ handleTrigger, isOpenState }) {
  const links = [
    {
      key: 1,
      name: "Dashboard",
      href: "/",
      icon: <i class="fa-solid fa-house text-lg"></i>,
    },
    {
      key: 2,
      name: "Create Package",
      href: "/",
      icon: <i class="fa-solid fa-folder-plus text-lg"></i>,
    },
    {
      key: 3,
      name: "Update Status",
      href: "/acceptance",
      icon: <i class="fa-solid fa-pen-to-square text-lg"></i>,
    },
  ];

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
        integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <div
        className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 duration-300 bg-primary-green tracking-wide ${
          isOpenState ? "w-[260px]" : "w-[70px] bg-green-500"
        }`}
      >
        <div className="text-gray-100 text-xl">
          <div
            className={`mt-1 flex items-center justify-between ${
              isOpenState ? "p-2.5" : "py-2.5"
            }`}
          >
            <div className="flex items-center">
              <i
                className={
                  isOpenState
                    ? "bi bi-app-indicator px-2 py-1 rounded-md bg-white text-primary-green"
                    : "hidden"
                }
              ></i>
              <h1
                className={`${
                  isOpenState ? "font-bold text-gray text-lg ml-3" : "hidden"
                }`}
              >
                Enviar Admin
              </h1>
            </div>
            <i
              class={`fa-solid fa-bars text-2xl cursor-pointer ${
                isOpenState ? "" : "mr-[17px]"
              }`}
              onClick={handleTrigger}
            ></i>
            {/* <i className="bi bi-x cursor-pointer ml-28 lg:hidden"></i> */}
          </div>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>
        <div
          className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white"
          onClick={isOpenState ? "" : handleTrigger}
        >
          <i className="bi bi-search text-sm" onClick={handleTrigger}></i>
          <input
            type="text"
            placeholder={isOpenState ? "Search" : ""}
            className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
          />
        </div>
        {links.map((link) => {
          return (
            <Link
              key={link.key}
              to={link.href}
              className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
            >
              {link.icon}
              <span className="text-[15px] ml-4 text-gray-200 font-medium">
                {isOpenState ? link.name : ""}
              </span>
            </Link>
          );
        })}
        <div className="my-4 bg-gray-600 h-[1px]"></div>
        <div
          className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer absolute bottom-4 hover:bg-blue-600 text-white ${
            isOpenState ? "w-[95%]" : "w-[75%]"
          }`}
        >
          <i class="fa-solid fa-right-from-bracket text-lg"></i>
          <Link
            to=""
            className="text-[15px] ml-4 text-gray-200 font-bold"
            onClick={handleTrigger}
          >
            {isOpenState ? "Logout" : ""}
          </Link>
        </div>
      </div>
    </>
  );
}
