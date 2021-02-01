const express=require('express')
const{ graphqlHTTP} =require('express-graphql')
const schema=require('./schema/schema')
const app=express();
const cors=require('cors')
const mongoose=require('mongoose');
app.use(cors());
const URL='mongodb+srv://Moataz:Moataz0101@cluster0.ke2gb.mongodb.net/graphql?retryWrites=true&w=majority';
mongoose.connect(URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
app.use('/graphql',graphqlHTTP ({
schema,
graphiql:true
}))


app.listen(3000,()=>{console.log('hello from port 3000...!')});