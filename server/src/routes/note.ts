import express, { Express, Router } from "express";
import createNote from "../Controllers/Notes/CreateNote";
import getNotes from "../Controllers/Notes/getNotes";
import editNote from "../Controllers/Notes/editNote";
import isAuthenticated from "../Middleware/isAuthenticated";
import deleteNotes from "../Controllers/Notes/deleteNotes";
import getNoteById from "../Controllers/Notes/getNoteById";
import shareNote from "../Controllers/Notes/shareNote";

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
  isAuthenticated,
  createNote
);

router.get(
  "/",
  /*
  #swagger.tags = ['Notes']
  #swagger.description = 'User can fetch the notes filtered with priority, status or deadline'
  #swagger.summary = 'API for fetching the notes'
  #swagger.parameters['query'] = {
    in: 'query',
    description: 'Filtering data',
    required: false,
    schema: {
      priority: { type: 'string', example: 'low' },
      deadline: { type: 'string', example: '2024-07-01T10:56:25.322+00:00' },
      status: { type: 'string', example: 'not_started' }
    }
  }
  */
  isAuthenticated,
  getNotes
);

router.get(
  "/:id",
  /*
  #swagger.tags = ['Notes']
  #swagger.description = 'User can fetch a note by its ID'
  #swagger.summary = 'API for fetching a note by ID'
  #swagger.parameters['path'] = {
    in: 'path',
    description: 'Note ID',
    required: true,
    schema: {
      type: 'string',
      example: '60c72b2f9b1e8e2f78e4a3b1'
    }
  }
  */
  isAuthenticated,
  getNoteById
);

router.put(
  "/",
  /*
  #swagger.tags = ['Notes']
  #swagger.description = 'User can edit a note using the related data'
  #swagger.summary = 'API for updating a note'
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
  isAuthenticated,
  editNote
);

router.post(
  "/deleteNotes",
  /*
  #swagger.tags = ['Notes']
  #swagger.description = 'User can bulk delete the notes'
  #swagger.summary = 'API for deleting the notes'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Notes data',
    required: true,
    schema: {
      notesData: {
        type: 'array',
        items: {
          type: 'string',
          example: '60c72b2f9b1e8e2f78e4a3b1'
        }
      },
      allNotes: {
        type: 'boolean',
        example: false
      }
    }
  }
  */
  isAuthenticated,
  deleteNotes
);

router.post(
  "/shareNote",
  /*
  #swagger.tags = ['Notes']
  #swagger.description = 'User can share a note with another user'
  #swagger.summary = 'API for sharing the note'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Sharing data',
    required: true,
    schema: {
      userId: {
        type: 'string',
        example: '60c72b2f9b1e8e2f78e4a3b1'
      },
      toUserEmail: {
        type: 'string',
        example: 'user@example.com'
      },
      noteId: {
        type: 'string',
        example: '60c72b2f9b1e8e2f78e4a3b1'
      }
    }
  }
  */
  isAuthenticated,
  shareNote
);

export default router;
