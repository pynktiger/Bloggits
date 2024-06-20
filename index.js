import express from 'express'
import bodyParser from 'body-parser'
import e from 'express';

const app = express()
const port = 3000;
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

let blogs = [];

app.get('/', (req,res)=>{
    res.render('index.ejs', {blogs})
})

app.get('/submit', (req,res)=>{
    res.render('submit.ejs')
})

app.get('/new-blog', (req,res)=>{
    res.render('new-blog.ejs')
})

app.get('/blog/:id', (req,res)=>{ //taken from unique url
    const blog = blogs[req.params.id]//gets list from blogs using id
    if(blog){
        res.render('blog', {blog}) //renders page and gives variables
    }else{
        res.status(404).send('Blog not found');
    }

})

app.post('/new-blog', (req, res)=>{
    let title = req.body.title;
    let comment = req.body.comment;

    const id = blogs.length;//unique length for unique id
    const url = `/blog/${id}`//creates unique route

    blogs.push({title, comment, id, url}); //adding attributes to make 2d array
    res.redirect('/')
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });