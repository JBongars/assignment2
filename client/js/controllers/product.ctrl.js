/**
 * Title        :   Products Controller
 * Created      :   20/09/2017
 * Updated      :
 * Author       :   Julien Bongars
 * Description  :   Controller for product information
 */

(function () {
    console.log("Product Controller Started...");

    ProductCtrl = function (ProductSvc, PagerService, $scope) {
        self = this //self

        self.user = {
            upc12: 0,
            name: "",
            brand: ""
        }

        self.setPage = function (page) {
            if (page < 1 || page > self.pager.totalPages) {
                return;
            }
            // get pager object from service
            self.pager = PagerService.pagination(self.data.length, page);
            // get current page of items
            self.items = self.data.slice(self.pager.startIndex, self.pager.endIndex + 1);
        }

        self.initController = function () {
            ProductSvc.getAll().then(function (result) {
                self.data = result;
                console.log(self.data);
                self.setPage(1);
                console.log(self.items)
                
            }).catch(function (e) {
                console.error(e)
            })
        }

        self.newProductObj = {
            name: "",
            brand: "",
            upc12: ""
        };

        self.newproduct = function(){
            console.log(self.newProduct);
            ProductSvc.newproductreg(
                self.newProductObj.name,
                self.newProductObj.brand,
                self.newProductObj.upc12
            ).then(function (result) {
                console.log(result);
                self.showty = 1;     
            }).catch(function (e) {
                console.error(e)
            })
        }

        self.updateProduct = function(){
            ProductSvc.update(
                self.updateProductObj.id,
                self.updateProductObj.name,
                self.updateProductObj.brand,
                self.updateProductObj.upc12
            ).then(function (result) {
                console.log(result);
                self.showty = 1;     
            }).catch(function (e) {
                console.error(e)
            })
        }

        self.updateProductObj = {}

        self.pager = {};
        self.initController();
    }

    ProductCtrl.$inject = ['ProductSvc', 'PagerService', '$scope'];
    angular.module("myApp").controller("ProductCtrl", ProductCtrl);

})()