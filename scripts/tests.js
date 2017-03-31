QUnit.test("hello test", function(assert) {
    assert.ok(1 == "1", "Passed!");
});

QUnit.test("DataStore test", function(assert) {
    var ds = new App.DataStore();
    ds.add('m@bond.com', 'tea');
    ds.add('james@bond.com', 'eshpressho');

    assert.deepEqual(ds.getAll(), {
        'm@bond.com': 'tea',
        'james@bond.com': 'eshpressho'
    }, "Values are equal");
    ds.remove('james@bond.com');
    assert.deepEqual(ds.getAll(), {
        'm@bond.com': 'tea'
    }, "Values are equal");
    assert.deepEqual(ds.get('m@bond.com'), 'tea', "Values are equal");
    assert.deepEqual(ds.get('james@bond.com'), undefined, "There is no order associated with james@bond.com");
});


QUnit.test("Truck test", function(assert) {
    myTruck.createOrder({
        emailAddress: 'me@goldfinger.com',
        coffee: 'double mocha'
    });
    myTruck.createOrder({
        emailAddress: 'dr@no.com',
        coffee: 'decaf'
    });
    myTruck.createOrder({
        emailAddress: 'm@bond.com',
        coffee: 'earl grey'
    });

    assert.deepEqual(myTruck.printOrders(), ["me@goldfinger.com", "dr@no.com", "m@bond.com"], "Values are equal");

    myTruck.deliverOrder('dr@no.com');
    myTruck.deliverOrder('m@bond.com');

    assert.deepEqual(myTruck.printOrders(), ["me@goldfinger.com"], "Result after delivering orders of dr@no.com and m@bond.com");
});
