var WEAK_COFFEE_CLASS = 'weak';
var REGULAR_COFFEE_CLASS = 'regular';
var STRONG_COFFEE_CLASS = 'strong';
var EMAIL_ADDRESS = '';
(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var coffee;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler to form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();
            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);
            fn(data).
            then(function() {
                this.reset();
                this.elements[0].focus();
            }.bind(this));
        });
    };

    FormHandler.prototype.addInputHandler = function(fn, remoteDS) {
        console.log('Setting input handler for form.');
        this.$formElement.on('change', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var message = '';
            var result = fn(emailAddress, remoteDS);
            if (!result) {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            } else if (result == "yes") {
                event.target.setCustomValidity('');
                message = emailAddress + ' is already present on the server!';
                event.target.setCustomValidity(message);
            } else {
                event.target.setCustomValidity('');
            }
        });
    }

    // FormHandler.prototype.addEmailAlreadyHandler = function(fn,remoteDS){
    //   this.$formElement.on('change','[name="emailAddress"]', function(event){
    //     var emailAddress = event.target.value;
    //     var message='';
    //     if(fn(emailAddress,remoteDS)){
    //       message = emailAddress + ' is already present!';
    //       event.target.setCustomValidity(message);
    //     }
    //     else {
    //       event.target.setCustomValidity('');
    //     }
    //   });
    // }

    FormHandler.prototype.addInputCoffeeHandler = function(fn) {
        this.$formElement.on('input', '[name="coffee"]', function(event) {
            var coffeeOrder = $('#coffeeOrder').val();
            var strengthLevel = $('#strengthValue').val();
            var message = '';
            coffee = event.target;
            event.target.setCustomValidity('');
            if (!(fn(coffeeOrder, strengthLevel))) {
                message = coffeeOrder + ' is no a valid order.';
                event.target.setCustomValidity(message);
            }
        });
    }

    FormHandler.prototype.addInputStrengthHandler = function(fn) {
        this.$formElement.on('input', '[name="strength"]', function(event) {
            var strengthLevel = $('#strengthValue').val();
            var coffeeOrder = $('#coffeeOrder').val();
            var message = '';
            event.target.setCustomValidity('');
            coffee.setCustomValidity('');
            if (!(fn(coffeeOrder, strengthLevel))) {
                message = strengthLevel + ' is high';
                event.target.setCustomValidity(message);
            }
        });
    }

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
