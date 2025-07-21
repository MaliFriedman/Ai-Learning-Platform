import { useEffect, useState } from "react";
import { usePromptStore } from "../../stores/usePromptStore";
import { Trash2, RefreshCw } from "lucide-react";

export default function PromptManager() {
  const { prompts, loadPrompts, deletePrompt, regeneratePrompt } = usePromptStore();

  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);
  const [selectedPromptText, setSelectedPromptText] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadPrompts();
  }, []);

  const handleDeleteClick = (id: string, promptText: string) => {
    setSelectedPromptId(id);
    setSelectedPromptText(promptText);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (selectedPromptId) {
      await deletePrompt(selectedPromptId);
      setShowModal(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Prompts</h2>

      {prompts.length === 0 ? (
        <p className="text-gray-500">No prompts found.</p>
      ) : (
        <ul className="space-y-4">
          {prompts.map((prompt) => (
            <li key={prompt._id} className="border p-4 rounded shadow bg-gray-50">
              <p>
                <strong>Prompt:</strong> {prompt.prompt}
              </p>
              <p className="mt-2 text-green-700">
                <strong>Response:</strong> {prompt.response.slice(0, 200)}...
              </p>
              <p className="mt-1 text-sm text-blue-600">
                <strong>User ID:</strong> {prompt.user_id}
              </p>
              <div className="mt-2 text-sm text-gray-500">
                Created: {new Date(prompt.created_at).toLocaleString()}
              </div>
              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => regeneratePrompt(prompt._id)}
                  className="p-2 bg-purple-100 text-purple-600 hover:bg-purple-200 rounded"
                  title="Regenerate"
                >
                  <RefreshCw size={18} />
                </button>
                <button
                  onClick={() => handleDeleteClick(prompt._id, prompt.prompt)}
                  className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete:{" "}
              <span className="font-medium text-red-600">"{selectedPromptText}"</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
