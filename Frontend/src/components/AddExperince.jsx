import React, { useState, useEffect } from "react";
import axios from "axios";
import baseurl from "./BaseUrl";

const AddExperience = ({ onSave, editingExp, clearEdit }) => {
  const [showForm, setShowForm] = useState(false); // ✅ toggle form visibility
  const [experience, setExperience] = useState({
    title: "",
    company_name: "",
    icon: "",
    iconBg: "#000000",
    startDate: "",
    endDate: "",
    isPresent: false,
    link: "",
    points: [""],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExperience({
      ...experience,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(() => {
  if (editingExp) {
    setExperience({
      ...editingExp,
      startDate: editingExp.date?.split(" - ")[0] || "",
      endDate: editingExp.date?.includes("Present") ? "" : editingExp.date?.split(" - ")[1] || "",
      isPresent: editingExp.date?.includes("Present") || false,
      points: editingExp.points || [""],
    });
    setShowForm(true); // automatically open form when editing
  }
}, [editingExp]);

  const handlePointChange = (index, value) => {
    const newPoints = [...experience.points];
    newPoints[index] = value;
    setExperience({ ...experience, points: newPoints });
  };

  const addPoint = () => {
    setExperience({ ...experience, points: [...experience.points, ""] });
  };

  const removePoint = (index) => {
    const newPoints = experience.points.filter((_, i) => i !== index);
    setExperience({ ...experience, points: newPoints });
  };


  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("title", experience.title);
    formData.append("company_name", experience.company_name);
    formData.append("iconBg", experience.iconBg || "#000000");
    formData.append(
      "date",
      experience.isPresent
        ? `${experience.startDate} - Present`
        : `${experience.startDate} - ${experience.endDate}`
    );
    formData.append("link", experience.link);
    formData.append(
      "points",
      JSON.stringify(experience.points.filter((p) => p.trim() !== ""))
    );

    if (experience.icon) {
      formData.append("icon", experience.icon);
    }

    let res;
    if (editingExp) {
      // ✅ Update existing experience
      res = await axios.put(
        `${baseurl}experience/updateex/${editingExp._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    } else {
      // ✅ Add new experience
      res = await axios.post(
        `${baseurl}experience/saveexperience`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    }

    if (res.status === 200 || res.status === 201) {
      alert(editingExp ? "Experience updated successfully!" : "Experience saved successfully!");
      onSave && onSave();

      // reset form
      setExperience({
        title: "",
        company_name: "",
        icon: "",
        iconBg: "#000000",
        startDate: "",
        endDate: "",
        isPresent: false,
        link: "",
        points: [""],
      });
      setShowForm(false);
      clearEdit && clearEdit();
    }
  } catch (err) {
    console.error("Save error:", err.response?.data || err.message);
    alert("Error saving experience!");
  }
};


  const isAdmin = localStorage.getItem("adminLoggedIn") === "true";

  if (!isAdmin) return null; 



  return (
    <div className="mb-5">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 px-4 py-2 rounded text-white font-bold relative z-50"
        >
          + Add Experience
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="relative z-50 p-4 bg-gray-900 rounded-xl text-white"
        >
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={experience.title}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-800"
            required
          />
          <input
            type="text"
            name="company_name"
            placeholder="Company Name"
            value={experience.company_name}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-800"
            required
          />

          <input
            type="file"
            name="icon"
            accept="image/*"
            onChange={(e) =>
              setExperience({ ...experience, icon: e.target.files[0] })
            }
            className="w-full p-2 mb-2 rounded bg-gray-800"
          />

          <input
            type="color"
            name="iconBg"
            value={experience.iconBg}
            onChange={handleChange}
            className="w-16 h-10 mb-2"
          />

          <div className="flex gap-2 mb-2">
            <input
              type="month"
              name="startDate"
              value={experience.startDate}
              onChange={handleChange}
              className="p-2 rounded bg-gray-800"
              required
            />
            {!experience.isPresent && (
              <input
                type="month"
                name="endDate"
                value={experience.endDate}
                onChange={handleChange}
                className="p-2 rounded bg-gray-800"
              />
            )}
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                name="isPresent"
                checked={experience.isPresent}
                onChange={handleChange}
                className="mr-2"
              />
              Present
            </label>
          </div>

          <input
            type="text"
            name="link"
            placeholder="Project / Reference Link"
            value={experience.link}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-800"
          />

          {/* ✅ Responsibilities with delete button */}
          <div className="mb-2">
            <p className="text-sm mb-1">Responsibilities / Points:</p>
            {experience.points.map((point, index) => (
              <div key={index} className="flex items-center mb-1">
                <input
                  type="text"
                  value={point}
                  onChange={(e) => handlePointChange(index, e.target.value)}
                  placeholder={`Point ${index + 1}`}
                  className="w-full p-2 rounded bg-gray-800"
                />
                <button
                  type="button"
                  onClick={() => removePoint(index)}
                  className="ml-2 bg-red-600 px-2 py-1 rounded"
                >
                  ❌
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addPoint}
              className="bg-blue-600 px-3 py-1 rounded text-sm mt-2"
            >
              + Add Point
            </button>
          </div>

          <div className="flex gap-2 mt-3">
           

            <button
  type="submit"
  className="bg-green-600 flex-1 py-2 rounded font-bold"
>
  {editingExp ? "Update Experience" : "Save Experience"}
</button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-600 flex-1 py-2 rounded font-bold"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddExperience;
