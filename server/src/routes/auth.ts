import express, { Express, Router } from "express";
import { check } from "express-validator";
import Register from "../Controllers/auth/Register";
import Login from "../Controllers/auth/Login";
import Logout from "../Controllers/auth/Logout";
import ValidateUser from "../Controllers/auth//ValidateUser"
import isAuthenticated from "../Middleware/isAuthenticated";

const app: Express = express();
const router: Router = express.Router();

// url: /api/auth

router.post(
  /*
   #swagger.tags = ['Authentication']
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
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ).matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
  ],
  Register
);

router.post(
  /*
   #swagger.tags = ['Authentication']
  #swagger.description = 'User can login using email and password'
  #swagger.summary = 'Login API'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'User data.',
    required: true,
    schema: {
        email:'janmesh.kr.2024@gmail.com',
        password:'<A strong Password @ 123>'
    }
  }
  */
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ).matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
  ],
  Login
);
router.post(
  /*
   #swagger.tags = ['Authentication']
  #swagger.description = 'User can logout and destroy the session storage'
  #swagger.summary = 'Logout API'
 
  */
  "/logout",
  Logout
);
router.get(
  /*
   #swagger.tags = ['Authentication']
  #swagger.description = 'User will be validated'
  #swagger.summary = 'Validation API'
 
  */
  "/validate",
  isAuthenticated,
  ValidateUser
);

export default router;
