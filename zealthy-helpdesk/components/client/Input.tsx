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
}: InputProps):JSX.Element {

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          id={id}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
        />
      ) : (
        <input
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
