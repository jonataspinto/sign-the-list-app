import { type ReactNode } from "react";
import { createPortal } from "react-dom";

export function LoaderPortal({
  children,
}: {
  children: ReactNode;
  selector?: string;
}) {
  return createPortal(
    children,
    document.querySelector<HTMLElement>("#loader")!,
  );
}
