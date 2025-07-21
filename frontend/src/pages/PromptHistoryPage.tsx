import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { usePromptStore } from "../stores/usePromptStore";
import type { Prompt } from "../types/prompt";
import { Trash2, RefreshCw, Pencil } from "lucide-react";

export default function PromptHistoryPage() {
  const { user } = useUserStore();
  const { userId: routeUserId } = useParams();
  const {
    prompts,
    loading,
    error,
    loadPromptsByUserId,
    updatePrompt,
    deletePrompt,
    regeneratePrompt,
  } = usePromptStore();

  const [editPromptId, setEditPromptId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    const idToFetch = routeUserId || user?._id;
    if (idToFetch) {
      loadPromptsByUserId(idToFetch);
    }
  }, [routeUserId, user]);

  const reloadForPrompt = async (userId: string) => {        // ✅ CHANGED
    if (userId) {
      await loadPromptsByUserId(userId);
    }
  };

  const handleRegenerate = async (prompt: Prompt) => {        // ✅ CHANGED
    await regeneratePrompt(prompt._id);
    await reloadForPrompt(prompt.user_id);                   // ✅ CHANGED
  };

  const handleEdit = (prompt: Prompt) => {
    setEditPromptId(prompt._id);
    setEditedText(prompt.prompt);
  };

  const handleSave = async (prompt: Prompt) => {              // ✅ CHANGED
    // await updatePrompt(prompt._id, editedText);
    await updatePrompt(
      prompt._id,
      editedText,
      prompt.sub_category_id,
      prompt.category_id
    );

    setEditPromptId(null);
    await reloadForPrompt(prompt.user_id);                   // ✅ CHANGED
  };

  const handleDelete = async (prompt: Prompt) => {            // ✅ CHANGED
    await deletePrompt(prompt._id);
    await reloadForPrompt(prompt.user_id);                   // ✅ CHANGED
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white px-4 py-10">
      <div className="max-w-4xl mx-auto">
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
                  {editPromptId === prompt._id ? (
                    <>
                      <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 mb-2 text-sm focus:ring-2 focus:ring-blue-400"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSave(prompt)}        // ✅ CHANGED
                          className="px-4 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditPromptId(null)}
                          className="px-4 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}

                  <div className="text-xs text-gray-500 mt-2">
                    Created at: {new Date(prompt.created_at).toLocaleString()}
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4 shrink-0">
                  <button
                    onClick={() => handleRegenerate(prompt)}       // ✅ CHANGED
                    className="p-2 bg-purple-100 text-purple-600 hover:bg-purple-200 rounded"
                    title="Regenerate"
                  >
                    <RefreshCw size={18} />
                  </button>
                  <button
                    onClick={() => handleEdit(prompt)}
                    className="p-2 bg-yellow-100 text-yellow-600 hover:bg-yellow-200 rounded"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(prompt)}           // ✅ CHANGED
                    className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
