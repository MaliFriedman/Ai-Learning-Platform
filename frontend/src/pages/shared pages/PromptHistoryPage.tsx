import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import { usePromptStore } from "../../stores/usePromptStore";
import { ArrowLeft } from "lucide-react"; // אם אין לך, תוכל להחליף באייקון אחר או ב־← טקסט

export default function PromptHistoryPage() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { userId: routeUserId } = useParams();
  const {
    prompts,
    loading,
    error,
    loadPromptsByUserId,
  } = usePromptStore();

  useEffect(() => {
    const idToFetch = routeUserId || user?._id;
    if (idToFetch) {
      loadPromptsByUserId(idToFetch);
    }
  }, [routeUserId, user]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {/* כפתור חזרה */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span>Back</span>
        </button>

        <h1 className="text-3xl font-semibold text-blue-700 mb-6 text-center">
          Your Prompt History
        </h1>

        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && prompts.length === 0 && (
          <p className="text-center text-gray-500">No prompts found.</p>
        )}

        <div className="space-y-4">
          {prompts.map((prompt) => (
            <div
              key={prompt._id}
              className="bg-white border rounded-xl shadow-sm p-5"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-gray-800 mb-1">
                    <strong>Prompt:</strong>{" "}
                    {prompt.prompt.length > 200
                      ? prompt.prompt.slice(0, 200) + "..."
                      : prompt.prompt}
                  </p>
                  <p className="text-sm text-green-700">
                    <strong>Response:</strong>{" "}
                    {prompt.response.length > 200
                      ? prompt.response.slice(0, 200) + "..."
                      : prompt.response}
                  </p>
                  <div className="text-xs text-gray-500 mt-2">
                    Created at: {new Date(prompt.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
