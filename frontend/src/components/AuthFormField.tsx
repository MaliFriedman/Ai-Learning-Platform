type Props = {
  label: string;
  name: string;
  value: string;
  type?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AuthFormField = ({ label, name, value, onChange, type = 'text', error }: Props) => (
  <div className="flex flex-col mb-4">
    <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={`border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
        error
          ? 'border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:ring-blue-500'
      }`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default AuthFormField;
