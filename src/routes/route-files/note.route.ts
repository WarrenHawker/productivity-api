import express from 'express';
import { checkSession } from '../../middleware/require-auth.middleware';
import createNote from '../../controllers/note-controllers/create-note.controller';
import deleteNote from '../../controllers/note-controllers/delete-note.controller';
import getNotes from '../../controllers/note-controllers/get-notes.controller';
import updateNote from '../../controllers/note-controllers/update-note.controller';

export const router = express.Router();

router.use(checkSession());

router.get('/', getNotes);
router.post('/', createNote);
router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);
