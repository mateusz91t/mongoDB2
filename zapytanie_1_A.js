db.people.aggregate([
{$project:{
    _id:0, weight:1, height:1, sex:1}},
    {$group:{
        _id:"$sex",
        avg_weight:{$avg:"$weight"},
        avg_height:{$avg:"$height"}}}
])