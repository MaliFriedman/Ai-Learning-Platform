import { useEffect, useState } from "react";
import { useCategoryStore } from "../stores/categoryStore";
import { useSubCategoryStore } from "../stores/subCategoryStore";
import { usePromptStore } from "../stores/usePromptStore";
import { useUserStore } from "../stores/useUserStore";

export default function PromptPage() {
  const { categories, loadCategories } = useCategoryStore();
  


  const {
    subCategories,
    loadSubCategoriesByCategory,
  } = useSubCategoryStore();
  const { addPrompt } = usePromptStore();
  const { user } = useUserStore();

  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");
  const [promptText, setPromptText] = useState("");

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCategoryChange = async (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedSubCategoryId("");
    await loadSubCategoriesByCategory(categoryId);
  };

  const handleSubmit = async () => {
    if (!promptText || !selectedSubCategoryId || !selectedCategoryId) {
      setError("Please fill all fields.");
      return;
    }

    if (!user?._id) {
      setError("User not authenticated.");
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const createdPrompt = await addPrompt(
        promptText,
        selectedSubCategoryId,
        selectedCategoryId
      );
      setResponse(createdPrompt?.response || "Prompt submitted successfully.");
    } catch (err) {
      console.error("Failed to create prompt", err);
      setError("Failed to generate response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white p-10 rounded-2xl shadow-2xl space-y-6">
        <h1 className="text-3xl font-extrabold text-blue-700 text-center">
          Prompt Generator 💡
        </h1>

        {/* Category Select */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Category:</label>
          <select
            value={selectedCategoryId}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* SubCategory Select */}
        {selectedCategoryId && (
          <div>
            <label className="block mb-2 font-medium text-gray-700">Sub Category:</label>
            <select
              value={selectedSubCategoryId}
              onChange={(e) => setSelectedSubCategoryId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Sub Category --</option>
              {subCategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Prompt Input */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Your Prompt:</label>
          <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 h-36 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-lg transition duration-300"
        >
          {loading ? "Generating..." : "Generate Prompt"}
        </button>

        {/* Error */}
        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}

        {/* Response */}
        {response && (
          <div className="mt-6 border border-gray-300 bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold text-gray-800 mb-2">AI Response:</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}