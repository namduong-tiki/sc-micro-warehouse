import { Route } from "@/routes";
import React from "react";

const Empty = React.lazy(() => import("./Empty"));

const routeConfig: Route = {
  path: "*",
  name: "empty",
  component: Empty,
  authority: [],
};

export default routeConfig;
