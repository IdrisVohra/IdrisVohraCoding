const express = require('express');
const fs = require('fs'); // read write file
const app = express();

app.use(express.json()); // Used to get body data from Post Method from Server

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
app.get('/api/v1/tours',(req,res)=>
{
    res.status(200).json({
        status:"Success",
        results:tours.length,
        data:{
            tours
        }
    })
});

app.get('/api/v1/tours/:id',(req,res)=>
    {
        const tours = tours.find(el=> el.id === req.params)
        console.log(req.params);
        res.status(200).json({
            status:"Success",
        })
    });

app.post('/api/v1/tours',(req,res)=>{

    const newId = tours.length+1;
    
    const newTour = Object.assign(
        {id: newId},req.body
    );

    tours.push(newTour);
    
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        res.status(201).json({
            status:'success',
            data:{
                tour : newTour
            }
        });
    });
});

const port = '8000';
app.listen(port, () => {
  console.log(`Running on Port:-  ${port}`);
});
 