const Student = require('../models/Student.js');


// Luodaan ja tallenetaan uusi oppilas
exports.create = (req, res) => {
    // Vahvistetaan pyyntö
    if(!req.body.student_code, !req.body.name, !req.body.email) {
        return res.status(400).send({
            message: "Student ei voi olla tyhjä!"
        });
    }

    // Luodaan studentti
    const student = new Student({
    
        student_code: req.body.student_code,
        name: req.body.name,
        email: req.body.email,
        study_points: req.body.study_points,
    
        grades: req.body.grades,
    });

    // Tallennetaan student databaseen

    student.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "tulipas errori :)"
        });
    });
};


// Haetaan kaikki opiskelijat
exports.findAll = (req, res) => {
    Student.find()  
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Tuli erroreita :)"
        });
    });
};

// Etitään tietty opiskelija student_coden kautta
exports.findOne = (req, res) => {
    Student.findOne({student_code : req.params.student_code})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Ei löytyny oppilasta " + req.params.student_code
            });            
        }
        res.send(data);

    }).catch(err => {
        if(err.kind === 'student_code') {
            return res.status(404).send({
                message: "Ei löytyny oppilasta " + req.params.student_code
            });                
        }
        return res.status(500).send({
            message: "Tuli errori " + req.params.student_code
        });
    });
};

// Etitään kaikki alle 100 opintopistettä olevat opiskelijat
exports.find100 = (req, res) => {
    Student.find({study_points: { $lt: 100 }})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Ei löytyny " + req.params.student_code
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'student_code') {
            return res.status(404).send({
                message: "Ei löytyny " + req.params.student_code
            });                
        }
        return res.status(500).send({
            message: "Tuli Errori " + req.params.student_code
        });
    });
};


// Etsitään opiskelija student_coden avulla ja muutetaan opintopisteitä
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.study_points) {
        return res.status(400).send({
            message: "Opintopiste ei voi olla tyhjä"
        });
    }

    // Find student and update it with the request body
    Student.update(
        {student_code: req.params.student_code},
         {study_points: req.body.study_points}
         
         )

    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Ei löytyny " + req.params.studentId
            });
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Ei löytyny " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Errori " + req.params.studentId
        });
    });
};

// Poistetaan studentti student_coden mukaan
exports.delete = (req, res) => {
    Student.deleteOne({student_code : req.params.student_code})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Ei löytyny D: " + req.params.studentId
            });
        }
        res.send({message: "Student poistettu onnistuneesti"});
    }).catch(err => {
        if(err.kind === 'student_code' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Ei löytyny " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Ei voida poistaa " + req.params.studentId
        });
    });
};


// Create and Save a new student
exports.course = (req, res) => {
    // Validate request
  Student.update({ student_code: req.params.student_code },
    
        { $push: { grades: { course_code: req.body.course_code, grade: req.body.grade}}}, 
        {new: true})

        .then(student => {
        if(!student) {
            return res.status(404).send();
        }
        res.send(student);

    })
};

// Kurssin muokkaus
exports.updateGrade = (req, res) => {

    
    Student.update({ 'student_code': req.params.student_code, 'grades.course_code': req.body.course_code },
        { $set: { 'grades.$.grade': req.body.grade } })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: 'Ei löytynyt muutettavaa!'
                });
            }
            res.send({ message: 'Kurssin päivitys onnistui!' });
        })
}