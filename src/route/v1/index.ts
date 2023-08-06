import express, { Router } from "express";
import authRoute from "./auth.route";
import roleRoute from "./role.route";

const router: Router = express.Router();
interface DefaultRoutes {
  path: string;
  route: Router;
}
const defaultRoutes: DefaultRoutes[] = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/role",
    route: roleRoute,
  },
];

defaultRoutes.forEach((route: DefaultRoutes) => {
  router.use(route.path, route.route);
});

export default router;
