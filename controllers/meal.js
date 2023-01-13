import { render } from "ejs"
import { Meal } from "../models/meal.js"

function newMeal(req, res) {
    Meal.find({})
    .then(meals => {
      res.render('meals/new', {
        title: 'Add Meal',
        message: req.query.message,
        meals,
      })
    })
}

function create(req, res) {
  for (const key in req.body) {
    //key can be "title", "releaseYear" ...
    //delete the property if the user doesn't input anything.
    if(req.body[key] === "") delete req.body[key]
  }
  // If meal is already there, don't create.
  Meal.find({name: req.body.name})
  .then(meal => {
    if(meal.length){
      res.redirect('/meals/new/?message=Already%20Exsts!')
    }
    else{
      Meal.create(req.body)
      .then(meal => { 
        res.redirect('/meals/new/?message=Created%20a%20new%20meal!')
      })
      .catch(error => {
        console.log(error)
        res.redirect('/meals/new')
      })
    }
  })
  .catch(error => {
    console.log(error)
    res.redirect('/meals/new')
  })
}

export {
    newMeal as new,
    create
}