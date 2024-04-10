interface InputProps {
  label: string;
  id: string;
  type: string;
  name: string;
  required: boolean;
  placeholder: string;
  maxLength: number;
}

export default function Input({
  label,
  id,
  type,
  name,
  required,
  placeholder,
  maxLength,
}: InputProps): JSX.Element {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block text-dark-gray text-md font-medium mb-2"
      >
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          className="bg-white border border-light-gray text-gray text-sm rounded-lg focus:ring-light-green focus:border-light-green block w-full p-2.5 h-100"
          rows={4}
          name={name}
          id={id}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
        />
      ) : (
        <input
          className="bg-white border border-light-gray text-gray text-sm rounded-lg focus:ring-light-green focus:border-light-green block w-full p-2.5"
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
        />
      )}
    </div>
  );
}
