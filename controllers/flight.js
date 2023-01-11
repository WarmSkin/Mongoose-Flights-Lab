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
            title: "Flight Details",
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

function createTickets(req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
        flight.tickets.push(req.body)
        flight.save()
        .then(() => {
            res.redirect(`/flights/${req.params.id}`)
        })
        .catch(error => {
            console.log(error)
            res.redirect(`/flights/${req.params.id}`)
        })
    })
    .catch(error => {
        console.log(error)
        res.redirect(`/flights/${req.params.id}`)
    })
}

function deleteTicket(req, res) {
    console.log(req.params.id + " " + req.params.tIndex)
    Flight.findById(req.params.id)
    .then(flight => {
        flight.tickets[+(req.params.tIndex)].remove()
        flight.save()
        .then(flight => {
            res.redirect(`/flights/${req.params.id}`)
        })
        .catch(error => {
            console.log(error)
            res.redirect(`/flights/${req.params.id}`)
        })
    })
    .catch(error => {
        console.log(error)
        res.redirect(`/flights/${req.params.id}`)
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
    createTickets,
    deleteTicket,
}