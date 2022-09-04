import { Route } from "@/routes";
import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Spin } from "antd";
import RouteGuard from "./RouteGuard";
import UserProvider from "@/components/UserProvider";
import RouteList from "./RouteList";
import { BASENAME } from "@/constants";

interface RouteProviderProps {
  routes: Route[];
}

const RouteProvider: React.FC<RouteProviderProps> = ({ routes }) => {
  return (
    <BrowserRouter basename={BASENAME}>
      <Suspense fallback={<Spin spinning />}>
        <RouteGuard>
          <UserProvider>
            <RouteList routes={routes} />
          </UserProvider>
        </RouteGuard>
      </Suspense>
    </BrowserRouter>
  );
};

export default RouteProvider;
