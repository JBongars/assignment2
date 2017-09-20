/**
 * Title        :   Products Services
 * Created      :   14/09/2017
 * Updated      :
 * Author       :   Julien Bongars
 * Description  :   Services pertaining to getting product information
 */

(function () {
    console.log("Controller Started...");

    ProductSvc = function ($http, $q) {
        productSvc = this //vm

        productSvc.getAll = function () {
            var defer = $q.defer();
            $http.get("/products").then(function (result) {
                defer.resolve(result.data)
            }).catch(function (e) {
                defer.reject(e);
            })
            return (defer.promise);
        }

        productSvc.search = function (search, brand, name, order) {
            var defer = $q.defer();
            $http.get("/search/", {
                params: {
                    search: search
                }, query: {
                    brand: brand,
                    name: name,
                    order : order
                }
            }).then(function (result) {
                defer.resolve(result.data)
            }).catch(function (e) {
                defer.reject(e);
            })
            return (defer.promise);
        }

        productSvc.updateProd = function (id, brand, name, upc12) {
            var defer = $q.defer();
            $http.put("/products", {
                params: {
                    id: id
                }, body: {
                    brand: brand,
                    name: name,
                    upc12 : upc12
                }
            }).then(function (result) {
                defer.resolve(result.data)
            }).catch(function (e) {
                defer.reject(e);
            })
            return (defer.promise);
        }

        productSvc.newproductreg = function (brand, name, upc12) {
            var defer = $q.defer();
            $http.post("/new", {
                body: {
                    brand: brand,
                    name: name,
                    upc12 : upc12
                }
            }).then(function (result) {
                defer.resolve(result.data)
            }).catch(function (e) {
                defer.reject(e);
            })
            return (defer.promise);
        }
    }

    ProductSvc.$inject = ['$http', '$q'];

    angular.module("myApp").service("ProductSvc", ProductSvc);

})()