import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/recipes/${id}`);
                setRecipe(response.data);
            } catch (error) {
                console.error("Error fetching recipe details:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-600 text-lg">Loading recipe details...</p>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500 text-lg">Recipe not found!</p>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
            {recipe.image && (
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-200 h-200 rounded-lg shadow-md mb-6"
                />
            )}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Instructions</h2>
                {/* Render instructions as a list */}
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    {recipe.instructions.split("<li>").slice(1).map((step, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: step.replace("</li>", "") }} />
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default RecipeDetails;
