import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants/API";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/category/get`).then((response) => {
      setCategories(response.data);
    });
  }, []);

  const addCategory = () => {
    axios.post(`${API_URL}/category/add-category`, { Category_Name: newCategory }).then(() => {
      setCategories([...categories, { Category_Name: newCategory }]);
      setNewCategory("");
    });
  };

  const deleteCategory = (CategoryID) => {
    axios.delete(`${API_URL}/category/delete-category/${CategoryID}`).then(() => {
      setCategories(categories.filter((category) => category.CategoryID !== CategoryID));
    });
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md items-center space-x-4 flex-col">
      <h1>Category</h1>
      <div className="flex-shrink-0">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="rounded-lg p-2 border border-gray-300"
        />
        <button onClick={addCategory} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
          Add Category
        </button>
      </div>
      <div>
        {categories.map((category) => (
          <div key={category.CategoryID} className="mt-2 flex items-center justify-between w-full border border-gray-300 rounded-lg p-2">
            <div>{category.Category_Name}</div>
            <button onClick={() => deleteCategory(category.CategoryID)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
          </div>

        ))}
      </div>
    </div>
  );
}