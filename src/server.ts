import * as ReactDOMServer from "react-dom/server";

import { flushUniversalPortals } from ".";

export const appendUniversalPortals = () => {
  const portals = flushUniversalPortals();
  if (!portals.length) {
    return;
  }

  return portals.reduce((acc: string[], children) => {
    const markup = ReactDOMServer.renderToStaticMarkup(children as JSX.Element);
    acc.push(markup);
    return acc;
  }, []);
};
