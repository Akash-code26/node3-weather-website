
//app.com - since we are using an index html it does not serve a purpose
// app.get('', (req, res) => {   // here we are accessing the app page home
//     res.send('<h1>Home</h1>') // it return an html element
   
// })

// app.com/help
// app.get('/help', (req, res) => { // here we are accessing the app.com/help page
    // res.send([{
    //     name:'Akash',
    //     age: 22
    // }, {
    //     name:'Alok',
    //     age:23
    // }])                         //it returns an array of objetcs in JSON to the screen 
// })

//app.com/about
// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>')
// })

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const weatherReport = require('./requests')

const app = express()        // here we set up a server
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public') 
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Akash Das'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me',
        name: 'Akash Das'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Akash Das',
        helpText: 'For further details conatct the creator'
    })
})

//app.com/weather
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'no address was given'
        })
    }
    weatherReport(req.query.address,(error,{location,report} = {}) => {
        if(error){
            res.send({error})
        }else{
            res.send({location,report})
        }
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:'this is goods'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
      title: '404',
      error: 'Help article not found',
      name:'Akash Das'
    })
})

 
app.get('*', (req, res) => {
    res.render('error',{
        title: '404',
        error: 'Page not found',
        name: 'Akash Das'
    })
})


app.listen(port, () => {           // it listen in local port 3000
    console.log('Server is up on port '+ port) // this is only displayed to web server host
})