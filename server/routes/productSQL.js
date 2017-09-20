/**
 * Title        :   Product SQL queries
 * Created      :   20/09/2017
 * Updated      :   
 * Author       :   Julien Bongars
 * Description  :   Modularise server side requests
 */

'use strict';

module.exports = function (app, sql) {

    app.get('/products', function(req, res){
        sql.makeSQLQuery("SELECT * FROM grocery_list").then(function(result){
            res.status(200).json(result);
        }).catch(function(e){
            console.log(e);
            res.send("error!");
        })
    })

    app.get('/search/:search/', function(req, res){
        var q = req.query;
        var s = '"%' + req.params.search + '%"';

        var query = "SELECT * FROM grocery_list WHERE ((brand LIKE " + s + " AND " 
                    + (q.brand || true) + ") OR (name LIKE " + s + " AND " + (q.name || true) + 
                    ")) ORDER BY " + (q.order || "name ") + ";"
        
        console.log(query);

        sql.makeSQLQuery(query)
            .then(function(result){
                res.status(200).json(result);
            }).catch(function(e){
                console.log(e);
                res.status(500).send("Error");
            })
    })

    app.post('/new', function(req, res){

        var query = "INSERT INTO grocery_list (upc12, brand, name) VALUES (?, ?, ?)"
        var b = req.body;
        b.upc12 = parseInt(b.upc12);
        
        sql.makeSQLQuery(query, b.upc12, b.brand, b.name).then(function(result){
            return makeSQLQuery("SELECT * FROM grocery_list WHERE id = ?", result.insertId);
        }).then(function(result){
            res.status(200).json(result);
        }).catch(function(e){
            console.log(e);
            res.status(200).json(e);
        })
        
    })

    app.put('/product/:id', function(req, res){
        var b = req.body;
        var id = parseInt(req.params.id);
        b.upc12 = parseInt(b.upc12);
        var query = "UPDATE grocery_list SET upc12=?, brand=?, name=? WHERE id=?;"
        sql.makeSQLQuery(query, b.upc12, b.brand, b.name, id).then(function(result){
            res.status(202).end();
        }).catch(function(e){
            console.log(e);
            res.status(500).json(e);
        })
    })

    console.log("SQL QUERIES LOADED");
};