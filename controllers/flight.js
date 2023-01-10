import { render } from "ejs"
import { Flight } from "../models/flight.js"

function index(req, res) {
    Flight.find({})
    .then(flights => {
        res.render("flights/index", {
            title: 'All Flights',
            flights: flights,
        })
    })
    .catch(error => {
        console.log(error)
        res.redirect('/')
    })
}

function newFlight(req, res) {
    const newFlight = new Flight();
    const defaultDeparts = newFlight.departs;
    console.log(defaultDeparts.toISOString().slice(0, 10))

    res.render('flights/new', {
        title: "New Flight",
        defaultDeparts: defaultDeparts.toISOString().slice(0, 10),
    })
}

function create(req, res) {

    for (const key in req.body) {
        //delete the property if the user doesn't input anything.
        if(req.body[key] === "") delete req.body[key]
    }
    Flight.create(req.body)
    .then(flight => {
        res.redirect('/flights')
    })
    .catch(err => {
        console.log(err)
        res.redirect('/flights')
    })
}

function deleteFlight(req, res) {
    Flight.findByIdAndDelete(req.params.id)
    .then(flight => {
        res.redirect('/flights')
    })
    .catch(error => {
        console.log(error)
        res.redirect('/flights')
    })
}

function show(req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
        res.render('flights/show', {
            title: "Flight Detail",
            flight: flight,
        })
    })
    .catch(error => {
        console.log(error)
        res.redirect('/flights')
    })
}

function update(req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
        console.log(flight.departs.toJSON().slice(0, 10))
        res.render('flights/update', {
            title: "Update Flight",
            flight: flight,
        })
    })
    .catch(error => {
        console.log(error)
        res.redirect('/flights/req.params.id')
    })
}

function modify(req, res) {
    Flight.findByIdAndUpdate(req.params.id, req.body)
    .then(flight => {
        res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {
        console.log(error)
        res.redirect(`/flights/${flight._id}`)
    })
}

export {
    index,
    newFlight as new,
    create,
    deleteFlight as delete,
    show,
    update,
    modify,
}