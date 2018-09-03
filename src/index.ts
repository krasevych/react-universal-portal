import * as ReactDOM from "react-dom";

const isServer = () => typeof window !== "object";

export const portals: React.ReactNode[] = [];

export const createUniversalPortal = (
  children: React.ReactNode,
  selector: string
) => {
  if (isServer()) {
    portals.push(children);
    return null;
  }

  return ReactDOM.createPortal(children, document.getElementById(
    selector
  ) as HTMLDivElement);
};

export function flushUniversalPortals(): React.ReactNode[] {
  const copy = portals.slice();
  portals.length = 0;
  return copy;
}

export function removeUniversalPortals() {
  if (!isServer()) {
    Array.prototype.slice
      .call(document.querySelectorAll("[data-universal-porta]"))
      .forEach((node: HTMLDivElement) => node.remove());
  }
}
