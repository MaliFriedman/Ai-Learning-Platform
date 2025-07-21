import { useEffect, useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { FaTrash, FaPlus, FaEdit, FaEye } from "react-icons/fa";
import axiosInstance from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

type User = {
    _id: string;
    name: string;
    phone: string;
    role?: "admin" | "user";
    isAdmin?: boolean;
};

export default function UserManager() {
    const { user: currentUser, isAdmin } = useUserStore();
    const [users, setUsers] = useState<User[]>([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [formUser, setFormUser] = useState<Partial<User>>({ name: "", phone: "" });

    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axiosInstance.get("/users");
            setUsers(res.data);
        } catch (error) {
            console.error("❌ Failed to fetch users:", error);
        }
    };

    const handleDelete = async () => {
        if (!userToDelete) return;
        try {
            await axiosInstance.delete(`/users/${userToDelete._id}`);
            setUsers((prev) => prev.filter((u) => u._id !== userToDelete._id));
            setShowConfirm(false);
            setUserToDelete(null);
        } catch (error) {
            console.error("❌ Failed to delete user:", error);
        }
    };

    const handleFormSubmit = async () => {
        try {
            if (formUser._id) {
                const res = await axiosInstance.put(`/users/${formUser._id}`, formUser);
                setUsers((prev) =>
                    prev.map((u) => (u._id === formUser._id ? res.data : u))
                );
            } else {
                const res = await axiosInstance.post("/users", formUser);
                setUsers((prev) => [...prev, res.data]);
            }
            setShowForm(false);
            setFormUser({ name: "", phone: "" });
        } catch (error) {
            console.error("❌ Failed to save user:", error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Manage Users</h2>
                {isAdmin && (
                    <button
                        onClick={() => {
                            setFormUser({ name: "", phone: "" });
                            setShowForm(true);
                        }}
                        className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                        <FaPlus /> Add User
                    </button>
                )}
            </div>

            {users.map((user) => (
                <div
                    key={user._id}
                    className="p-4 border rounded shadow bg-gray-50 relative mb-3"
                >
                    <p className="font-semibold text-blue-700">
                        {user.name} ({user.phone})
                    </p>

                    <p className="text-sm text-gray-500">

                        {/* Admin rights: {user.isAdmin ? "Yes" : "No"} */}
                    </p>

                    {isAdmin && (
                        <>
                            <button
                                onClick={() => {
                                    navigate(`/history/${user._id}`);
                                }}
                                className="absolute top-2 right-20 text-gray-600 hover:text-gray-800"
                                title="View Prompts"
                            >
                                <FaEye size={18} />
                            </button>

                            <button
                                onClick={() => {
                                    setFormUser(user);
                                    setShowForm(true);
                                }}
                                className="absolute top-2 right-10 text-blue-600 hover:text-blue-800"
                                title="Edit user"
                            >
                                <FaEdit size={18} />
                            </button>

                            {user._id !== currentUser?._id && (
                                <button
                                    onClick={() => {
                                        setUserToDelete(user);
                                        setShowConfirm(true);
                                    }}
                                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                                    title="Delete user"
                                >
                                    <FaTrash size={18} />
                                </button>
                            )}
                        </>
                    )}
                </div>
            ))}

            {showConfirm && userToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-80 text-center">
                        <h3 className="text-lg font-semibold mb-4">
                            Are you sure you want to delete "{userToDelete.name}"?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => {
                                    setShowConfirm(false);
                                    setUserToDelete(null);
                                }}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-96">
                        <h3 className="text-lg font-semibold mb-4">
                            {formUser._id ? "Edit User" : "Add User"}
                        </h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                value={formUser.name || ""}
                                onChange={(e) =>
                                    setFormUser((prev) => ({ ...prev, name: e.target.value }))
                                }
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Phone</label>
                            <input
                                type="text"
                                value={formUser.phone || ""}
                                onChange={(e) =>
                                    setFormUser((prev) => ({ ...prev, phone: e.target.value }))
                                }
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowForm(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleFormSubmit}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                {formUser._id ? "Update" : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
