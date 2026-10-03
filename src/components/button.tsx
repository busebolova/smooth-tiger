import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "solid" | "outline" | "icon" };
export function Button({ variant = "solid", className, ...props }: Props) {
  return <button className={cn("button", `button-${variant}`, className)} {...props} />;
}
