(function(window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var SERVER_URL = '  http://localhost:3002/coffeeorders';
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;
    var remoteDS = new RemoteDataStore(SERVER_URL);
    var myTruck = new Truck('ncc-1701',remoteDS);
    window.myTruck = myTruck;
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    var formhandler = new FormHandler(FORM_SELECTOR);
    formhandler.addSubmitHandler(function(data) {
        return myTruck.createOrder.call(myTruck, data)
            .then(function() {
                checkList.addRow.call(checkList, data);
            });
    });
    formhandler.addInputHandler(Validation.isCompanyEmail, remoteDS);
    myTruck.printOrders(checkList.addRow.bind(checkList));
    formhandler.addInputCoffeeHandler(Validation.isDecafandGreater);
    formhandler.addInputStrengthHandler(Validation.isDecafandGreater);
    //formhandler.addEmailAlreadyHandler(Validation.isAlreadyPresent,remoteDS);
    console.log(formhandler);
})(window);
