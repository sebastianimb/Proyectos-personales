import React from "react";

type ButtonProps = {
  OnClick: () => void;
};

export function Button({ OnClick }: ButtonProps) {
  return <button onClick={OnClick}>Search Fact</button>;
}
