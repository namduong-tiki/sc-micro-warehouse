import React from "react";
import { Spin } from "antd";
import { Switch } from "react-router-dom";
import { isEmpty } from "lodash";
import { Route } from "@/routes";
import { UserDetail } from "@/components/UserProvider/interface";
import AuthorizedRoute from "./AuthorizedRoute";

interface RouteListProps {
  routes: Route[];
  data?: UserDetail;
}

const RouteList: React.FC<RouteListProps> = ({ routes, data = {} }) => {
  const { user, loading } = data as UserDetail;

  if (loading || isEmpty(user)) {
    return <Spin spinning />;
  }

  return (
    <Switch>
      {routes.map((route) => {
        return (
          <AuthorizedRoute
            key={route.name}
            permissions={user?.permissions}
            component={route.component}
            path={route.path}
            authority={route.authority}
            messages={route.messages}
          />
        );
      })}
    </Switch>
  );
};

export default RouteList;
