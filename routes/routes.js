const express = require('express');

const router = express.Router();

const client = require('../db');

client.connect();

router.get('/all',async(req,res)=>{
    

    const users = await client.query('select * from demo');
    console.log(users.rows);
    res.json(users.rows);
    //client.end();
});

router.post('/add', (req,res) => {
    const id = req.body.Id;
    const name = req.body.Name;
    const add = req.body.Address;
    client.query('insert into demo("Id","Name","Address") values ($1,$2,$3)',[id,name,add],(err,res) => {
            if(!err){
                console.log('Record Added Successfully');
                
            }
            else{
                console.log(err);
            }
    });
    res.send('Record Added');
    //client.end();
});

router.delete('/del',(req,res) => {
    const name = req.body.Name;
    client.query('delete from demo where "Name" = $1',[name],(err,res) => {
        if(!err){
            console.log(res.command,' Successfull');
        }
        else{
            console.log(err);
        }
    });
    res.send('Success');
    //client.end();
});

router.put('/update', (req,res) => {
    const name = req.body.Name;
    const add = req.body.Address;

    const id = req.body.Id;
    
    client.query('update demo set "Name" = $1 , "Address" = $2 where "Id" = $3' ,[name,add,id],(err,res) => {
        if(!err){
            console.log(res.command,' SUCCESSFULL');
        }
        else{
            console.log(err);
        }
    });
    res.send('Updated Successfully');
});

router.get('/single',(req,res) => {
    const id = req.body.Id;
    let user;
    client.query('select * from demo where "Id" = $1',[id],(err,res) => {
        if(!err){
            user = res;
            console.log(res.command,'single user successfully');
            
            console.log(user.rows);
        }
        else{
            console.log(err);
        }        
    });
    res.send('Single user record');
});

router.get('/single/:id', async(req,res) => {
    const id = req.params.id;
    const user = await client.query('select * from demo where "Id" = $1',[id]);
    console.log('Name :',user.rows[0].Name);
    console.log('Address :',user.rows[0].Address);
    res.json(user.rows);
});

module.exports = router;