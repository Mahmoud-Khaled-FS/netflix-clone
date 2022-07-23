import { Router } from 'express';
import * as usersControllers from '../controllers/users.controller';

const router = Router();

// Get All users in account
router.get('/users', usersControllers.getUsers);
// Create New User In Database
router.post('/create-new-users', usersControllers.createUsers);
// Add move to user list

// user List = [ Like  | Love | Dislike ]
// add movies id To User Array in database
router.post('/list/:listName', usersControllers.addToList);

// remove movies id from User Array in database
router.delete('/list/:listName', usersControllers.deleteList);

// return array has the user list
router.get('/list/:listName', usersControllers.getList);

export default router;
