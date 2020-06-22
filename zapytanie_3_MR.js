var mapF = function () {
    emit(this.job,null);
};
var reduceF = function (key, value){
    return ;
};
db.people.mapReduce(
mapF,
reduceF,
{out: "map_reduce_example"}
);
db.map_reduce_example.find().toArray();