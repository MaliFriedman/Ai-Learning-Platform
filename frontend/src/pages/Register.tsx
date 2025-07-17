import RegisterForm from "../components/forms/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
