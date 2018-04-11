const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world!!');
});

// app.get('/api/courses', (req, res) => {
//     res.send([1, 2, 3]);
// });



// api/courses/1
//GET METHOD
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];
app.get('/api/courses/', (req, res) => {
    res.send(courses);
});




app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('the given id was not found');
    res.send(course);

});
// this thing we post something what ever thinsg you wish to enlarge among them.

//POST METHOD
app.post('api/courses', (req, res) => {

    const { error } = validateCourse(req.body); // result.error
    if (error) return res.status(400).send(error.details[0].message);


    // //input validation
    //     if(!req.body.name  || req.body.name.length<3){
    //         // 400 bad req
    //         res.status(400).send('Name is required and should be min of 3 char');
    //         return;
    //     }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

//PUT handler
// for updating resources
app.put('api/courses/:id', (req, res) => {
    //lok up the course
    // if not existing return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('the given id was not found');

    //validate
    // if invalid, return 400 bad request

    const { error } = validateCourse(req.body); // result.error
    if (error) return res.status(400).send(error.details[0].message);

    //update course
    course.name = req.body.name;
    //return the updated course
    res.send(course);
});

//HTTP delete req

app.delete('/api/courses', (req, res) => {
    //look up for course
    //not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('the given id was not found');

    //delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);

});
//PORT for setting the global PORT number > command is set PORT 5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}... `));


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return result = Joi.validate(req.body, schema);

}