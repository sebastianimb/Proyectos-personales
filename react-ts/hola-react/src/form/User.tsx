import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
export type useFormState = {
  name: string;
  username: string;
};
const initialValue: useFormState = {
  name: "",
  username: "",
};
interface UserFormProps {
  handleSumbit: (user: useFormState) => void;
}
export default function UserForm({ handleSumbit }: UserFormProps) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    handleSumbit(form);
    setForm(initialValue);
  };

  const handleChangue: ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.name as keyof useFormState;
    setForm({ ...form, [name]: e.target.value });
  };

  const [form, setForm] = useState(initialValue);

  return (
    <>
      <Input
        value={form.name}
        name="name"
        placeholder="Name"
        handleChange={handleChangue}
      />
      <Input
        value={form.username}
        name="username"
        placeholder="Usuario"
        handleChange={handleChangue}
      />
      <Button handleClick={handleClick}>Enviar</Button>
    </>
  );
}
