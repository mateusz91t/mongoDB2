var mapF = function () {
    this.credit.forEach( function (value) {
        emit(value.currency, value.balance );
    } )
};
var mapR = function (key, value) {
    return value.reduce((a, b) => a + b, 0.0)
};
db.people.mapReduce(mapF, mapR, { out: "map_reduce_example" });
db.map_reduce_example.aggregate([
    {
        $sort: {'value': 1}
    }
    ]).toArray()