import { ButtonHTMLAttributes } from "react";
import "./styles.css";

export const Button = ({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button type="button" {...props} />
);
