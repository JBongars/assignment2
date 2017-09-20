/**
 * Title        :   Server side router
 * Created      :   12/09/2017
 * Updated      :   14/09/2017
 * Author       :   Julien Bongars
 * Description  :   Modularise server side requests
 */

"use strict";

const sql = require("mysql");

//TO DO - change connection to appropriate db
var pool = sql.createPool({
    host: "localhost",
    port: 3306, //Server
    user: "superadmin",
    password: "password",
    database: "sakila",
    connectionLimit: 16
})

const queryConstructor = function (pool) {
    return function (SQLquery) {
        
        //get parameters
        var params = [];
        for (var i in arguments) {
            params.push(arguments[i]);
        }
        params.shift(); //get rid of first argument

        //console.log(">> SQLquery >> ", SQLquery, " >> Params >> ", params);

        //SQL call as promise
        var p = new Promise(function (resolve, reject) {
            pool.getConnection(function (e, conn) {

                if (e) reject(e);
                else {
                    conn.query(SQLquery, params, function (e, result) {
                        if (e) reject(e);
                        else {
                            resolve(result);
                        }
                    });
                }
                conn.release();
            });
        });

        return p;
    }
}

module.exports = {
    makeSQLQuery: queryConstructor(pool)
};
