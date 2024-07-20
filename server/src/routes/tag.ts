import express, { Express, Router } from "express";
import isAuthenticated from "../Middleware/isAuthenticated";
import crateTag from "../Controllers/Tag/CreateTag";
import editTag from "../Controllers/Tag/editTag";
import deleteTag from "../Controllers/Tag/deleteTag";
import getAllTags from "../Controllers/Tag/getAllTags";
import getTag from "../Controllers/Tag/getTag";

const app: Express = express();
const router: Router = express.Router();

// url: /api/tag

router.post(
  "/",
  /*
  #swagger.tags = ['Tags']
  #swagger.description = 'User can create a tag for customize the notes'
  #swagger.summary = 'API for creating a new tag'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Tag data',
    required: true,
    schema: {
      title: 'title of the tag',
      color: 'red',
    }
  }
  */
  isAuthenticated,
  crateTag
);

router.get(
  "/",
  /*
  #swagger.tags = ['Tags']
  #swagger.description = 'User can fetch the tags'
  #swagger.summary = 'API for fetching the tags'
  */
  isAuthenticated,
  getAllTags
);
router.get(
  "/:id",
  /*
  #swagger.tags = ['Tags']
  #swagger.description = 'User can fetch the tags'
  #swagger.summary = 'API for fetching the tags'
  */
  isAuthenticated,
  getTag
);

router.put(
  "/",
  /*
  #swagger.tags = ['Tags']
  #swagger.description = 'User can edit a tag using the related data'
  #swagger.summary = 'API for updating a tag'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Tag data',
    required: true,
    schema: {
      title: 'title of the tag',
      color : 'red'
    }
  }
  */
  isAuthenticated,
  editTag
);

router.delete(
  "/",
  /*
  #swagger.tags = ['Tags']
  #swagger.description = 'User can delete the tag'
  #swagger.summary = 'API for deleting the tag'
  #swagger.parameters['body'] = {
    in: 'headers',
    description: 'tagId',
    required: true,
    schema: {
     tagId:"60c72b2f9b1e8e2f78e4a3b1"
  }
  */
  isAuthenticated,
  deleteTag
);

// router.post(
//   "/shareNote",
//   /*
//   #swagger.tags = ['Notes']
//   #swagger.description = 'User can share a note with another user'
//   #swagger.summary = 'API for sharing the note'
//   #swagger.parameters['body'] = {
//     in: 'header',
//     description: 'Sharing data',
//     required: true,
//     schema: {
//       toUserEmail:  example: 'user@example.com'
//       noteId:'60c72b2f9b1e8e2f78e4a3b1'

//     }
//   }
//   */
//   isAuthenticated,
//   shareNote
// );

export default router;
