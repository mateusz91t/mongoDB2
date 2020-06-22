var mapF = function () {
    var key = this.nationality;
    var value = {
        BMI_avg: this.weight / Math.pow(this.height / 100, 2),
        BMI_min: this.weight / Math.pow(this.height / 100, 2),
        BMI_max: this.weight / Math.pow(this.height / 100, 2),
        count: 1
    };
    emit(key, value);
};

var reduceF = function (key, values) {
    var returnedVal = { BMI_avg: 0.0, BMI_min: 1000.0, BMI_max: 0.0, count: 0 };
    values.forEach(function (value) {
        returnedVal.BMI_avg += value.BMI_avg;
        returnedVal.BMI_min = (returnedVal.BMI_min > value.BMI_min) ? value.BMI_min : returnedVal.BMI_min;
        returnedVal.BMI_max = (returnedVal.BMI_max < value.BMI_max) ? value.BMI_max : returnedVal.BMI_max;
        returnedVal.count += value.count;
    });

    return returnedVal;
};

var finalizeF = function (key, values) {
    var returnedVal = {
        BMI_avg: values.BMI_avg / values.count,
        BMI_min: values.BMI_min,
        BMI_max: values.BMI_max
    }
    return returnedVal;
};

db.people.mapReduce(
    mapF,
    reduceF,
    {
        out: "map_reduce_example",
        finalize: finalizeF
    }
)
db.map_reduce_example.find().toArray()