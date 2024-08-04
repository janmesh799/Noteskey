import express, { Express, Router } from "express";

const app: Express = express();
const router: Router = express.Router();

// url: /api/notes

router.post(
  "/",
  /*
  #swagger.tags = ['Notes']
  #swagger.description = 'User can create a new Note using title, content, attachments, priority, deadline, status'
  #swagger.summary = 'API for creating a new Note'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Note data',
    required: true,
    schema: {
      title: 'title of the note',
      content: '<p>Hello world</p>',
      priority: 'low'
    }
  }
  */
//   isAuthenticated,
//   createNote
);

export default router;
