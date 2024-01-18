const express = require('express')
const app = express()
const path = require('path')
const port = 3000

/*
* Default route for the web app
*/
//app.get('/', (req, res) => res.send('Welcome'))
//app.use('public/images/', express.static('./public/images'));
//app.use('public/css/', express.static('./public/css'));
app.use('/public/', express.static('./public'));
//app.use(express.static(path.join(__dirname, "./public")), {index: false});
/*
* Route to render HTML Page
*/
app.get('/public', (req, res) => {
    res.sendFile('./public/index.html', {
        root: path.join(__dirname, './')
    })
})
app.get('/public/test', (req, res) => {
    res.sendFile('./public/test.html', {
        root: path.join(__dirname, './')
    })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))