import { useState } from "react";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call register API
    console.log({ name, phone, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-xl"
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-xl"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-xl"
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded-xl hover:bg-green-700 transition"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
