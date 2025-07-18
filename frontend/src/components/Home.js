
import { useNavigate } from "react-router-dom";
import Allforms from "./AllForms";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-[100%] min-h-screen flex flex-col bg-gray-600 px-4 py-8">
      <div className="flex-grow flex flex-col items-center justify-start bg-white shadow-xl rounded-2xl p-6 sm:p-10 w-[100%] mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">
          Welcome to FormBuilder App
        </h1>

        <button
          onClick={() => navigate("/form")}
          className="mb-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Create Form
        </button>

        <div className="w-full flex-grow ">
          <Allforms />
        </div>
      </div>
    </div>
  );
}
