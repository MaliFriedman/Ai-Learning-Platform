import { useState } from "react";

const LoginForm = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call login API
    console.log({ phone, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        className="w-full bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
