
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const inputTypes = ["text", "email", "password", "number", "date"];

export default function CreateForm() {
  const [formTitle, setFormTitle] = useState("");
  const [inputs, setInputs] = useState([]);
  const [newInput, setNewInput] = useState({ type: "text", label: "", placeholder: "" });
  const [dragIndex, setDragIndex] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchForm = async () => {
        try {
          const res = await axios.get(`/form/${id}`);
          setFormTitle(res.data.title);
          const inputsWithId = res.data.inputs.map((inp) => ({
            ...inp,
            id: inp.id || Date.now() + Math.random(),
          }));
          setInputs(inputsWithId);
        } catch (err) {
          console.error("Failed to fetch form", err);
        }
      };
      fetchForm();
    }
  }, [id]);

  const addInput = () => {
    if (inputs.length >= 20) return alert("Maximum 20 inputs allowed");
    if (!newInput.label.trim()) return alert("Input label is required");
    setInputs([...inputs, { ...newInput, id: Date.now() }]);
    setNewInput({ type: "text", label: "", placeholder: "" });
  };

  const removeInput = (inputId) => {
    setInputs(inputs.filter((inp) => inp.id !== inputId));
  };

  const updateInput = (inputId, key, value) => {
    setInputs((prev) =>
      prev.map((inp) => (inp.id === inputId ? { ...inp, [key]: value } : inp))
    );
  };

  const saveForm = async () => {
    if (!formTitle.trim()) return alert("Form title is required");
    const formData = { title: formTitle, inputs };
    try {
      if (id) {
        await axios.put(`/form/edit/${id}`, formData);
        alert("Form updated successfully");
        navigate('/');
      } else {
        await axios.post("/form/create", formData);
        alert("Form saved successfully");
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDrop = (index) => {
    if (dragIndex === null || dragIndex === index) return;
    const reordered = [...inputs];
    const [dragged] = reordered.splice(dragIndex, 1);
    reordered.splice(index, 0, dragged);
    setInputs(reordered);
    setDragIndex(null);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto min-h-screen bg-gray-100">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit Form" : "Create New Form"}</h2>

      <div className="mb-4">
        <label className="block font-semibold">Form Title:</label>
        <input
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Enter form title"
        />
      </div>

      <div className="border p-4 rounded mb-4 bg-white shadow">
        <h3 className="font-semibold mb-2">Add Input</h3>
        <div className="grid grid-cols-2 gap-4">
          <select
            value={newInput.type}
            onChange={(e) => setNewInput({ ...newInput, type: e.target.value })}
            className="border p-2 rounded bg-gray-200"
          >
            {inputTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Input Label"
            value={newInput.label}
            onChange={(e) => setNewInput({ ...newInput, label: e.target.value })}
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Placeholder"
            value={newInput.placeholder}
            onChange={(e) => setNewInput({ ...newInput, placeholder: e.target.value })}
            className="border p-2 rounded col-span-2"
          />
        </div>
        <button
          onClick={addInput}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Input
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {inputs.map((input, index) => (
          <div
            key={input.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
            className="border p-3 rounded bg-white shadow-sm relative space-y-2 cursor-move"
          >
            <span className="text-xs text-gray-400 absolute top-1 left-2">Drag</span>

            {id ? (
              <>
                <input
                  type="text"
                  value={input.label}
                  onChange={(e) => updateInput(input.id, "label", e.target.value)}
                  className="border p-2 w-full rounded"
                  placeholder="Label"
                />
                <select
                  value={input.type}
                  onChange={(e) => updateInput(input.id, "type", e.target.value)}
                  className="border p-2 w-full rounded"
                >
                  {inputTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={input.placeholder}
                  onChange={(e) => updateInput(input.id, "placeholder", e.target.value)}
                  className="border p-2 w-full rounded"
                  placeholder="Placeholder"
                />
              </>
            ) : (
              <>
                <label className="block font-semibold">{input.label}</label>
                <input
                  type={input.type}
                  placeholder={input.placeholder}
                  readOnly
                  className="border p-2 w-full rounded bg-white"
                />
              </>
            )}

            <button
              onClick={() => removeInput(input.id)}
              className="absolute top-2 right-2 text-red-500 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={saveForm}
        className="px-6 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
      >
        {id ? "Update Form" : "Save Form"}
      </button>
    </div>
  );
}



