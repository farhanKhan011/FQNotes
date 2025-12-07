import express from "express";
import {createNote,deleteNote,getAllNote,getNOteById,updateNote,} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNote);
router.get("/:id", getNOteById);
router.post("/",createNote);
router.put("/:id", updateNote
);
router.delete("/:id", deleteNote); 

export default router;
