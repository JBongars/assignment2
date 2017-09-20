/**
 * Title        :   Products controller
 * Created      :   20/09/2017
 * Updated      :   
 * Author       :   Julien Bongars
 * Description  :   Controller to handle product information
 */

'use strict';

 (function(){
    
    var ProductsCtrl = function($scope){
        productsCtrl = this //vm
    }

    ProductsCtrl.$inject = ['$scope'];
    angular.module('myApp').controller('ProductsCtrl', ProductsCtrl);
    
 })()