/**
 * Title        :   Product-calls Service 
 * Created      :   20/09/2017
 * Updated      :   
 * Author       :   Julien Bongars
 * Description  :   Service to retrieve product information
 */

'use strict';

 (function(){
    
    var ProductCalls = function($http){
        var productCalls = this; //vm
    }

    ProductCalls.$inject = ['$http'];
    angular.module('myApp').service('ProductCalls', ProductCalls);

 })()