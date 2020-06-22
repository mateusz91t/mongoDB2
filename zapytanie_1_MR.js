var mapFunction = function () {

    var key = this.sex;

    var value = { height: this.height, weight: this.weight, count: 1, };

    emit(key, value);

};
var reduceFunction = function (keySex, valuesHW) {
    var reducedValRF = { height: 0.0, weight: 0.0, count: 0 };

    valuesHW.forEach(function (value) {

        reducedValRF.height += value.height;

        reducedValRF.weight += value.weight;

        reducedValRF.count += value.count;

    });

    return reducedValRF
};
var finalizeFunction = function (key, reducedValFF) {

    var returnedValue = {

        avg_weight: reducedValFF.weight / reducedValFF.count,

        avg_height: reducedValFF.height / reducedValFF.count,

        count: reducedValFF.count

    }
    return returnedValue;
};

db.people.mapReduce(
    mapFunction,
    reduceFunction,

    {

        out: "map_reduce_example",

        finalize: finalizeFunction

    }
)
db.getCollection('map_reduce_example').find()