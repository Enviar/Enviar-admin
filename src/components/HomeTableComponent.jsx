import { useNavigate } from "react-router-dom";

export default function HomeTableComponent({ lists }) {
  const navigate = useNavigate();
  const openDetail = (e, id) => {
    e.preventDefault();
    navigate(`package/${id}`);
  };

  return (
    <div className="mb-14">
      {lists.map((list) => {
        return (
          <li
            className="w-full h-44 px-16 py-8 list-none text-lg bg-body my-3 rounded-lg flex items-center border-2 cursor-pointer duration-150 hover:translate-x-4 hover:bg-green-100"
            onClick={(e) => openDetail(e, list[0].id)}
          >
            <div className="text-left text-lg border-r-2 border-gray-500 pr-10">
              <p>Recipient Number:</p>
              <p className="font-medium">{list[0].Product.receiptNumber}</p>
            </div>
            <div className="flex justify-between w-1/2 px-12 mx-auto">
              <div>
                <p>Package Type:</p>
                <p className="font-medium">{list[0].Product.typeProduct}</p>
              </div>
              <div>
                <p>Package Status:</p>
                <p className="font-medium">{list[0].notes}</p>
              </div>
            </div>
          </li>
        );
      })}
    </div>
  );
}
