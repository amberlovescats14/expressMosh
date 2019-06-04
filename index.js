const express = require('express');
const Joi = require('joi');

const app = express()

//!middleware
app.use(express.json())

//app.get()
//app.post()
//app.put()
//app.delete

const courses = [
  {
    id: 1, name: "Node"
  },
  {
    id: 2, name: "Javascript"
  },
  {
    id: 3, name: "React"
  }
]

app.get('/', (req, res)=> {
  res.send('Hello World!!!')
})

//!define new route using app.get
app.get('/api/courses', (req, res) => {
  res.send(courses)
})

//! we can have multiple params like this, ('api/posts/:year/:month', (req, res))
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) res.status(404).send('The course with this id, was not found');
  res.send(course)
  //res.send(req.params.id)
  //req.params.year
  //req.params.month
  // or... req.query
})

app.post('/api/courses', (req, res) => {
  // if(!req.body.name || req.body.name.length < 3) {
  //   res.status(400).send('Name is required and should be minimum 3 char.')
  //   return;
  // }
  //! using JOI
  const schema = {
    name: Joi.string().min(3).required()
  }
  const result = Joi.validate(req.body, schema)
  if(result.error){
    return res.status(400).send(result.error.details[0].message)
  }
  const course = {
    id: courses.length +1,
    name: req.body.name
  }
  courses.push(course);
  res.send(course)

})

app.put('/api/courses/:id', (req, res)=> {
  // look up the course.
  const course = courses.find(c => c.id === parseInt(req.params.id));

  //create a constant for the validate function with schema
  const { error } = validateCoarse(req.body)
  

  // if not existing return 404. Resourse not found
  if(error) res.status(404).send('The course with this id, was not found');

  // If coarse does not exist. Bad request. return 400
  const schema = {
    name: Joi.string().min(3).required()
  }
  const result = Joi.validate(req.body, schema);
  if(result.error){
    return res.status(400).send(result.error.details[0].message)
  }

  // Validate to make sure the info is good.  return updated info
  ConstantSourceNode.name = req.body.name;
  res.send(coarse)
})

const validateCoarse = (course) => {
  const schema = {
    name: Joi.string().min(3).required()
  }
  return Joi.validate(course, schema);
}



//! enviroment variable PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})

//? to set a port on your own file, use 
//? export PORT=5000      or whatever number local host that we prefer