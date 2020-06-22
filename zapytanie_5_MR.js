var mapF = function () {
    this.credit.forEach(function (value) {
        emit(value.currency, { balance: value.balance, count: 1 });
    })
};
var reduceF = function (key, values) {
    var returnedVal = {
        balance: 0.0,
        count: 0
    };
    values.forEach(function (value) {
        returnedVal.balance += value.balance;
        returnedVal.count += value.count;
    });
    return returnedVal;
};
var finalizeF = function (key, value) {
    var returnedVal = {
        avg_balance: value.balance / value.count,
        sum_balance: value.balance,
        count: value.count
    };
    return returnedVal;
}
db.people.mapReduce(
    mapF,
    reduceF,
    {
        out: "map_reduce_example",
        query: { sex: "Female", nationality: "Poland" },
        finalize: finalizeF
    }
)
db.map_reduce_example.find().toArray()