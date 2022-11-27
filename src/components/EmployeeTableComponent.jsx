import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HomeTableComponent({ lists, funcId, funcDelete }) {
  // const navigate = useNavigate()

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
  return (
    <table class="hover:table-fixed border-separate border border-slate-400">
      <thead>
        <tr>
          <th className="border border-slate-300">Email</th>
          <th className="border border-slate-300">First Name</th>
          <th className="border border-slate-300">Last Name</th>
          <th className="border border-slate-300">Type</th>
          <th className="border border-slate-300">action</th>
        </tr>
      </thead>
      <tbody>
        {lists.map((el) => {
          return (
            <tr>
              <td className="border border-slate-300">{el.email}</td>
              <td className="border border-slate-300">{el.firstname}</td>
              <td className="border border-slate-300">{el.lastname}</td>
              <td className="border border-slate-300">{el.role}</td>
              <td className="border border-slate-300">
                <button
                  onClick={(e) => openDetail(e, el.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => deleteData(e, el.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
