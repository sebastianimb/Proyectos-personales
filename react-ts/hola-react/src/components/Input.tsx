import { ChangeEventHandler } from "react";

interface InputProps {
  placeholder: string;
  name: string;
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}
export default function Input({
  placeholder,
  handleChange,
  name,
  value,
}: InputProps) {
  return (
    <input
      name={name}
      value={value}
      type="text"
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
}
