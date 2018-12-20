module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');
    const user = require('../controllers/UserController.js')

    

    // Create a new Note
    app.post('/post', notes.create);

    // Reut/:ptrieve all Notes
    app.get('/get', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/get/:student_code', notes.findOne);

    // Update a Note with noteId
    app.put('/updateStudent/:student_code', notes.update);

    // Delete a Note with noteId
    app.delete('/delete/:student_code', notes.delete);

    app.get('/find100', notes.find100);

    app.post('/course/:student_code', notes.course);

    app.put('/updateGrade/:student_code', notes.updateGrade);

    app.post('/register', user.register);

    app.post('/login', user.login)
}