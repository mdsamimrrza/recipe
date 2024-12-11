import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import RecipeDetails from "./Component/RecipeDetails.jsx";
import './index.css';

function App() {
    const [ingredients, setIngredients] = useState("");
    const [recipes, setRecipes] = useState([]);

    const handleSearch = async () => {
        if (!ingredients) {
            alert("Please enter some ingredients");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/recipes/search", {
                ingredients: ingredients.split(",").map((item) => item.trim()),
            });
            setRecipes(response.data);
        } catch (error) {
            console.error("Error fetching recipes:", error.message);
            alert("Failed to fetch recipes. Check the console for details.");
        }
    };

    return (
        <Router>
            <div className="min-h-screen bg-gray-50 p-8">
                <Routes>
                    {/* Home Page */}
                    <Route
                        path="/"
                        element={
                            <>
                                <header className="text-center mb-8">
                                    <h1 className="text-4xl font-bold text-gray-800">🍳 AI Recipe Generator</h1>
                                    <p className="text-gray-600 mt-2">Find recipes using the ingredients you have!</p>
                                </header>

                                <div className="max-w-xl mx-auto mb-6">
                                    <input
                                        type="text"
                                        placeholder="Enter ingredients (comma-separated)"
                                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                                        value={ingredients}
                                        onChange={(e) => setIngredients(e.target.value)}
                                    />
                                    <button
                                        onClick={handleSearch}
                                        className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
                                    >
                                        Search Recipes
                                    </button>
                                </div>

                                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {recipes.length > 0 ? (
                                        recipes.map((recipe) => (
                                            <Link
                                                to={`/recipe/${recipe.id}`}
                                                key={recipe.id}
                                                className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition"
                                            >
                                                <h2 className="text-lg font-semibold text-gray-800">
                                                    {recipe.title}
                                                </h2>
                                                {recipe.image && (
                                                    <img
                                                        src={recipe.image}
                                                        alt={recipe.title}
                                                        className="w-full h-40 object-cover rounded-lg mt-4"
                                                    />
                                                )}
                                            </Link>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-center col-span-full">
                                            No recipes found. Try searching for different ingredients!
                                        </p>
                                    )}
                                </div>
                            </>
                        }
                    />

                    {/* Recipe Details Page */}
                    <Route path="/recipe/:id" element={<RecipeDetails />} />
                </Routes>
            </div>
        </Router>//this is routes
    );
}

export default App;
