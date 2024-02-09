const notesRouter = require('express').Router();

notesRouter.get('/', (req, res) => {
    console.log("hi guys or something")
});

//Daunting task of writing the logic to make the routes work
notesRouter.post('/', (req, res) => {
    console.log(req.body);
});

module.exports = notesRouter;