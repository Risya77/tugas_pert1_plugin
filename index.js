const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended : false}));
const koneksiDB = mysql.createConnection({
    host:"localhost",
    user : "root",
    password: "",
    database: "pertemuan1"
});

koneksiDB.connect((err)=>{
    if(err){
        console.log("database tidak konek");
    }else{
        console.log("databse konek");
    }
});

app.get("/api/foods", (req, res)=>{
    let sql ="select * from foods";
    koneksiDB.query(sql, (err, result)=>{
        if(err){
            res.send({
                msg: "gagal mendapat data",
                status : 500,
                err,
            })
        }else{
            res.send({
                mdg: "data didapatkan",
                status: 200,
                data: result,
            })
        }
    })
});
app.post("/api/foods", (req, res)=>{
    let{body} = req;
    let sql = "INSERT INTO foods SET?";
    koneksiDB.query(sql, body,(err, results)=>{
        if(err){
            res.send({
                msg : "add data error",
                status : 500,
                err,
            })
        }else{
            let newBody = {
                id: results.insertId,
                ...body,
            };
            res.send({
                msg: "add data success",
                status : 200,
                data : newBody,
            });
        }
    })
});
app.get("/api/foods/:id", (req, res)=>{
    let{id}= req.params;
    let sql = `SELECT *FROM  foods where id=${id}`;
    koneksiDB.query(sql, (err, result)=>{
        if(err){
            res.send({
                msg:"pengembalian data error",
                status : 500,
                err
            })
        }else{
            res.send({
                mdg: "data didapatkan",
                status: 200,
                data: result,
            })
        }

    })
    
})
app.post("/api/foods/:id", (req,res)=>{
    let{id}=req.params;
    let sql =`UPDATE foods SET nama_food ='` +req.body.nama_food+`', harga = '`+req.body.harga+`'where id=${id}`;
    koneksiDB.query(sql, (err, result)=>{
        if(err){
            res.send({
                msg:"pembaharuan data error",
                status : 500,
                err
            })
        }else{
            res.send({
                mdg: "data diperbarui",
                status: 200,
                data: result,
            })
        }

    })
    
})
app.delete("/api/foods/:id",(req,res)=>{
    let{id}=req.params;   
    let sql = `DELETE from foods where id=${id}`; 
    koneksiDB.query(sql, (err, result)=>{
        if(err){
            res.send({
                msg:"penghapusan data error",
                status : 500,
                err
            })
        }else{
            res.send({
                mdg: "data dihapus",
                status: 200,
                data: result,
            })
        }

    })
})
app.listen(port, () =>{
    console.log("server jalan pada port : "+ port);
});
