import { createSignal, type Component, type JSX } from "solid-js";
interface Props {
  initialValue?: number;
  children?: JSX.Element;
}
export const Counter: Component<Props> = (props) => {
  const [counter, setCounter] = createSignal(props.initialValue ?? 0);

  return (
    <>
      {props.children}
      <h3>Value Count: {counter()} </h3>

      <button
        class="bg-blue-500 mt-4 p-2 mr-2 rounded"
        onClick={() => setCounter((prev) => ++prev)}
      >
        +1
      </button>
      <button
        class="bg-blue-500 p-2 mr-2 rounded"
        onClick={() => setCounter((prev) => --prev)}
      >
        -1
      </button>
    </>
  );
};
