const express = require('express');
const router = express.Router();

router.get('/FeaturedCarterers', (req, res) => {
    const caterers = [
        {
            id: 1,
            name: "DL Lakhani",
            description: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor",
            location: "Mumbai",
            catogery: "Non-Veg"
        },
        {
            id: 2,
            name: "Food Square",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
            location: "Pune",
            catogery: "Veg"
        },
        {
            id: 3,
            name: "Food Square",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
            location: "Pune",
            catogery: "Veg"
        },
        {
            id: 4,
            name: "Food Square",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
            location: "Pune",
            catogery: "Veg"
        },
    ];
    res.json(caterers);
});

router.get('/VendorCards', (req, res) => {
    const vendorCards = [
        {
            id: 1,
            name: "Radisson Blu Hotel",
            location: "Mumbai"
        },
        {
            id: 2,
            name: "Radisson Blu Hotel",
            location: "Mumbai"
        },
        {
            id: 3,
            name: "Radisson Blu Hotel",
            location: "Mumbai"
        },
        {
            id: 4,
            name: "Radisson Blu Hotel",
            location: "Mumbai"
        },
        {
            id: 5,
            name: "Radisson Blu Hotel",
            location: "Mumbai"
        },
        {
            id: 6,
            name: "Radisson Blu Hotel",
            location: "Mumbai"
        },
        {
            id: 7,
            name: "Radisson Blu Hotel",
            location: "Mumbai"
        },
        {
            id: 8,
            name: "Radisson Blu Hotel",
            location: "Mumbai"
        },
        {
            id: 9,
            name: "Radisson Blu Hotel",
            location: "Mumbai"
        },
        {
            id: 10,
            name: "Radisson Blu Hotel",
            location: "Mumbai"
        },
        {
            id: 11,
            name: "Radisson Blu Hotel",
            location: "Mumbai"
        },
        {
            id: 12,
            name: "Radisson Blu Hotel",
            location: "Mumbai"
        },
    ];
    res.json(vendorCards);
});

router.get('/VendorCategory', (req, res) => {
    const categories = [
        { id: 1, name: "Venue" },
        { id: 2, name: "Catering" },
        { id: 3, name: "Decoration" },
        { id: 4, name: "Music" },
        { id: 5, name: "Host" },
        { id: 6, name: "Magician" },
        { id: 7, name: "Make-Up Artist" },
        { id: 8, name: "Mehendi Artist" }
    ];
    res.json(categories);
});

module.exports = router;
