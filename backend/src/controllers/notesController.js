import Note from "../models/Note.js";

export const getAllNote = async (req, res) => {
try {
        const notes = await Note.find().sort({createdAt:-1})// -1 will sort in desc. order ( newest first)
        res.status(200).json(notes)
} catch (error) {
  console.error("Error in getAllNotes controller ", error );
  res.status(500).json({message:"Internal Server Error"}) 
}
 
};
export const getNOteById = async (req, res) => {
try {
        const note = await Note.findById(req.params.id)
        if(!note) return res.status(404).json({message:"Note not found"})
        res.status(200).json(note)
} catch (error) {
  console.error("Error in getNoteById controller ", error );
  res.status(500).json({message:"Internal Server Error"}) 
}
 
};


// creating notes 
export const createNote = async (req, res) => {
try {
      const {title, content } = req.body
      const note = new Note({title , content })// {title:title , content:content } if the key and the value is the same thing then we can use the shorten version too 

     const savedNote = await note.save();
      res.status(201).json(savedNote )
    } catch (error) {
   console.error("Error in createNote controller ", error );
  res.status(500).json({message:"Internal Server Error"}) 
}

};

export const updateNote = async (req, res) => {

  try {
    const {title , content} = req.body; 
    const updatedNote =  await Note.findByIdAndUpdate(req.params.id,{title,content},{
      new:true
    })

    if(!updatedNote) return res.status(404).json({message:"Note not found"});
    res.status(200).json(updatedNote)
  } catch (error) {
     console.error("Error in updateNote controller ", error );
  res.status(500).json({message:"Internal Server Error"}) 
  }


};

export const deleteNote = async (req, res) => {
try {
  const {title , content} = req.body ; 
  const deletedNote = await Note.findByIdAndDelete(req.params.id);
  if (!deletedNote) return res.status(404).json({message:"Note not found "})
  res.status(200).json({message:"Note deleted successfully "})

} catch (error) {
   console.error("Error in deletedNote controller ", error );
  res.status(500).json({message:"Internal Server Error"}) 
  }
}



