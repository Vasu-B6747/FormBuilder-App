
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from '../baseUrl'

export default function AllForms() {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await axios.get("/forms");
        setForms(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchForms();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/form/${id}`);
      setForms(forms.filter((form) => form._id !== id));
      alert("Form deleted successfully");
    } catch (err) {
      alert("Error while deleting the form");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white rounded-xl py-10 px-6">
      <div className="max-w-7xl min-h-screen mx-auto bg-gray-300 shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">All Forms</h1>

        {forms.length === 0 ? (
          <p className="text-gray-600 text-center">No forms available.</p>
        ) : (
          <ul className="space-y-4">
            {forms.map((ele) => (
              <li
                key={ele._id}
                className="flex justify-between items-center p-5 bg-gray-50 border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition"
              >
                <span className="font-semibold text-gray-700">{ele.title}</span>

                <div className="space-x-2">
                  <button
                    className="px-4 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    onClick={() => navigate(`/edit/${ele._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-1.5 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition"
                    onClick={() => navigate(`/view/${ele._id}`)}
                  >
                    View
                  </button>
                  <button
                    className="px-4 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                    onClick={() => handleDelete(ele._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

