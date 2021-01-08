const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const cards = require ('./dbCards.js');

const connection_url='mongodb+srv://admin:pirathi1993@cluster0.4f7kt.mongodb.net/tinderdb?retryWrites=true&w=majority'


// App config
const app=express();
const port=process.env.PORT || 3300

// Middlewares
app.use(express.json());
app.use(cors());

// Db config
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})


// //Api endpoints
app.get('/',(req,res)=> res.status(200).send('Hello Pirathi This is backend tinder-clone'));

app.post('/tinder/cards',(req,res)=>{
    const dbCard=req.body;
    cards.create(dbCard,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })

});

app.get('/tinder/cards',(req,res)=>{

    cards.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
});


//Listener

app.listen(port,()=>console.log(`listening on Local host : ${port}`));
