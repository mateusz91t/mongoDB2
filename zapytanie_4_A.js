db.people.aggregate([
{
    $project: {
        _id:0, nationality:1,
        BMI: { $divide: [ "$weight", { $pow: [ {$divide: ["$height", 100] }, 2 ] } ] },
        weight:1,
        height:1
    }
},
{
    $group: {
        _id: "$nationality",
        BMI_avg: {$avg: "$BMI"},
        BMI_min: {$min: "$BMI"},
        BMI_max: {$max: "$BMI"}
//         , avgWeight: {$avg: "$weight"},
//         minWeight: {$min: "$weight"},
//         maxWeight: {$max: "$weight"},
//         avgHeight: {$avg: "$height"},
//         minHeight: {$min: "$height"},
//         maxHeight: {$max: "$height"}
    }
},
{
    $sort:{_id: 1}
}
]).toArray()