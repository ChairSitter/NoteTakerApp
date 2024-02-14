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
    const {title, text} = req.body;
    if(title && text) {
        let id = Math.ceil(Math.random()*999999999) + 2;
        const addedNote = {
            title, 
            text,
            "id": id
        }

        fs.readFile('./db/db.json', (error, data) => {
            if(error){
                console.log(error);
            } else {
                const notes = JSON.parse(data);
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