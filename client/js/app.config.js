/**
 * Title        :   Router for Client side Application
 * Created      :   15/09/2017
 * Updated      :   
 * Author       :   Julien Bongars
 * Description  :   Router to switch states for client side application
 */

'use strict';

(function () {

    console.log("configuration loaded...");

    var myAppConfig = function ($stateProvider, $urlRouterProvider) {

        var nav = {templateUrl : "../Partials/nav.html"};

        $stateProvider
            .state("glossary", {
                url: "/glossary",
                views: {
                    nav: nav,
                    main: { templateUrl: "../Partials/glossary.html" }
                }
            })
            .state("product", {
                url: "/product",
                views: {
                    nav: nav,
                    main: { templateUrl: "../Partials/productForm.html" }
                }
            })
            .state("addproduct", {
                url: "/addproduct",
                views: {
                    nav: nav,
                    main: { templateUrl: "../Partials/newProductForm.html" }
                }
            })

        $urlRouterProvider.otherwise("/glossary");
    }

    myAppConfig.$inject = ["$stateProvider", "$urlRouterProvider"];

    angular.module("myApp").config(myAppConfig);

})()