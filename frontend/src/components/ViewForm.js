import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ViewForm() {
  const { id } = useParams();
  const [formTitle, setFormTitle] = useState("");
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await axios.get(`/form/${id}`);
        setFormTitle(res.data.title);
        setInputs(res.data.inputs);
      } catch (err) {
        console.error("Error fetching form", err);
      }
    };

    if (id) fetchForm();
  }, [id]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{formTitle}</h2>

      <form className="space-y-4">
        {inputs.map((input) => (
          <div key={input.id || input.label} className="flex flex-col">
            <label className="font-semibold mb-1">{input.label}</label>
            <input
              type={input.type}
              placeholder={input.placeholder}
              className="border p-2 rounded"
              readOnly
            />
          </div>
        ))}
      </form>
    </div>
  );
}
