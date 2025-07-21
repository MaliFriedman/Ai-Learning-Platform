import { useEffect, useState } from "react";
import { useCategoryStore } from "../../stores/categoryStore";
import { useSubCategoryStore } from "../../stores/subCategoryStore";
import { Pencil, Trash2, Eye } from "lucide-react";

export default function CategoryManager() {
  const {
    categories,
    loadCategories,
    addCategory,
    deleteCategory,
    updateCategory,
  } = useCategoryStore();

  const {
    subCategories,
    loadSubCategoriesByCategory,
    addSubCategory,
    deleteSubCategory,
    updateSubCategory,
  } = useSubCategoryStore();

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSubCategory, setNewSubCategory] = useState({ name: "", categoryId: "" });
  const [confirmData, setConfirmData] = useState<null | {
    type: "category" | "subCategory";
    id: string;
    name: string;
    categoryId?: string;
  }>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCategoryClick = async (categoryId: string) => {
    await loadSubCategoriesByCategory(categoryId);
    setNewSubCategory((prev) => ({ ...prev, categoryId }));
  };

  const handleConfirmDelete = async () => {
    if (!confirmData) return;
    const { type, id, categoryId } = confirmData;
    if (type === "category") {
      await deleteCategory(id);
    } else {
      await deleteSubCategory(id);
      if (categoryId) await loadSubCategoriesByCategory(categoryId);
    }
    setConfirmData(null);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Categories & SubCategories</h2>

      {/* Confirm Delete Modal */}
      {confirmData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete "{confirmData.name}"?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmData(null)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Category */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Add New Category</h3>
        <div className="flex gap-2">
          <input
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="border rounded px-3 py-1"
            placeholder="Category name"
          />
          <button
            onClick={() => {
              addCategory(newCategoryName);
              setNewCategoryName("");
            }}
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Add
          </button>
        </div>
      </div>

      {/* Category List */}
      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat._id} className="border p-4 rounded-md bg-gray-50 shadow">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-blue-700">{cat.name}</h4>
              <div className="flex gap-3 text-xl text-gray-700">
                <button
                  onClick={() => {
                    const newName = prompt("Enter new name:", cat.name);
                    if (newName) updateCategory(cat._id, newName);
                  }}
                >
                  <Pencil className="hover:text-yellow-600" size={20} />
                </button>
                <button
                  onClick={() => setConfirmData({ type: "category", id: cat._id, name: cat.name })}
                >
                  <Trash2 className="hover:text-red-600" size={20} />
                </button>
                <button onClick={() => handleCategoryClick(cat._id)}>
                  <Eye className="hover:text-green-600" size={20} />
                </button>
              </div>
            </div>

            {newSubCategory.categoryId === cat._id && (
              <div className="mt-3 space-y-2">
                <div className="flex gap-2">
                  <input
                    value={newSubCategory.name}
                    onChange={(e) =>
                      setNewSubCategory({ ...newSubCategory, name: e.target.value })
                    }
                    className="border rounded px-2 py-1"
                    placeholder="Subcategory name"
                  />
                  <button
                    onClick={() => {
                      if (!newSubCategory.name.trim()) return;
                      addSubCategory(newSubCategory.name, cat._id);
                      setNewSubCategory({ name: "", categoryId: cat._id });
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Add Sub
                  </button>
                </div>

                {subCategories.length > 0 ? (
                  <ul className="list-disc ml-6">
                    {subCategories.map((sub) => (
                      <li key={sub._id} className="flex justify-between items-center">
                        <span>{sub.name}</span>
                        <div className="flex gap-2 text-lg text-gray-600">
                          <button
                            onClick={() => {
                              const newName = prompt("New name:", sub.name);
                              if (newName) updateSubCategory(sub._id, newName, cat._id);
                            }}
                          >
                            <Pencil className="hover:text-yellow-600" size={18} />
                          </button>
                          <button
                            onClick={() =>
                              setConfirmData({
                                type: "subCategory",
                                id: sub._id,
                                name: sub.name,
                                categoryId: cat._id,
                              })
                            }
                          >
                            <Trash2 className="hover:text-red-600" size={18} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 ml-2">No subcategories yet.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
