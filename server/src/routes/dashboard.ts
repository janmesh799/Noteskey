import express, { Express, Router } from "express";
import getDashboard from "../Controllers/Dashboard/getDashboard";
import isAuthenticated from "../Middleware/isAuthenticated";
const app: Express = express();
const router: Router = express.Router();

// url: /api/auth

router.get(
  /*
   #swagger.tags = ['Dashboard']
  #swagger.description = 'User can register using name, email and password'
  #swagger.summary = 'API for creating a new user'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'User data.',
    required: true,
    schema: {
        name:'Janmesh Kumar',
        email:'janmesh.kr.2024@gmail.com',
        password:'<A strong Password @ 123>'
    }
  }
  */
  "/",
  isAuthenticated,
  getDashboard
);

export default router;
