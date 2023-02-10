import  express  from "express";
const app = express();
const PORT = undefined;

app.get('/',(req,res)=>{
     res.send('Hello YSYYAAY');
})
app.listen(PORT!,()=>{
console.log("server running at port " + PORT)
})