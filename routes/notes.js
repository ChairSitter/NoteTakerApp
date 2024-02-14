const notesRouter = require('express').Router();
const fs = require('fs');

notesRouter.get('/', (req, res) => {
    fs.readFile('./db/db.json', (error, data) => {
        if(error){
            console.log(error);
        } else {
            const note = JSON.parse(data);
            res.json(note);
        }
    })
});

notesRouter.post('/', (req, res) => {
    const {title, content} = req.body;
    if(title && content){
        const addedNote = {
            title, 
            content
        }

        fs.readFile('./db/db.json', (error, content) => {
            if(error){
                console.log(error);
            } else {
                const notes = JSON.parse(content);
                notes.push(addedNote);
                const stringifiedNotes = JSON.stringify(notes);
                fs.writeFile('./db/db.json', stringifiedNotes, (error) => {
                    if(error){
                        console.log(error);
                    }
                })
            }
        })

        const response = {
            status: 'Note created successfully',
            body: addedNote
        }

        res.status(201).json(response);
    } else {
        res.status(500).json("There was an error saving the new note. Please try again.")
    }
});

module.exports = notesRouter;