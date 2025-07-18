type Props = {
    label: string;
    name: string;
    value: string;
    type?: string; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  
  const AuthFormField = ({ label, name, value, onChange, type = 'text' }: Props) => (
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
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
  
  export default AuthFormField;
  