import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomeTableComponent({ lists }) {
  const navigate = useNavigate();
  const openDetail = (e, id) => {
    e.preventDefault();
    navigate(`package/${id}`);
  };

  const colors = [
    "#A1B043",
    "#3B4A99",
    "#C82A2A",
    "#FED049",
    "#344D67",
    "#810CA8",
    "#393E46",
  ];

  const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="mb-14">
      {lists.map((list) => {
        console.log(randomColor());
        return (
          <div className="flex items-center cursor-pointer duration-150 hover:translate-x-4">
            <div
              className="px-8 h-44 flex rounded-l-lg"
              style={{ backgroundColor: randomColor() }}
            >
              <img src="./package.svg" width={48} />
            </div>
            <li
              key={list}
              // className="w-full h-44 pl-16 pr-4 py-8 list-none text-lg bg-body my-3 rounded-lg flex items-center border-2 cursor-pointer duration-150 hover:translate-x-4 hover:bg-active-btn-green"
              className="w-full pl-12 h-44 py-8 list-none text-lg bg-list my-3 rounded-r-lg flex items-center hover:bg-text-field duration-150"
              onClick={(e) => openDetail(e, list[0].id)}
            >
              <div className="text-left border-r-2 border-gray-400 pr-4">
                <p>Recipient Number:</p>
                <p className="font-medium">{list[0].Product.receiptNumber}</p>
              </div>
              <div className="flex justify-between w-5/6 px-8">
                <div>
                  <p>Recipient:</p>
                  <p className="font-medium">{list[0].Product.senderName}</p>
                </div>
                <div>
                  <p>Recipient Address:</p>
                  <p className="font-medium">
                    {list[0].Product.recipientAddress}
                  </p>
                </div>
                <div>
                  <p>Package Type:</p>
                  <p className="font-medium">{list[0].Product.typeProduct}</p>
                </div>
                <div>
                  <p>Service:</p>
                  <p className="font-medium">{list[0].Product.typeService}</p>
                </div>
                <div>
                  <p>Package Status:</p>
                  <p className="font-medium">{list[0].notes}</p>
                </div>
              </div>
            </li>
          </div>
        );
      })}
    </div>
  );
}
