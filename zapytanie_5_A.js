db.people.aggregate([
{
    $match: { sex: "Female", nationality: "Poland" }
},
{ $unwind: "$credit" },
{
    $project: { _id: 0, sex: 1, nationality: 1, credit: { balance: 1, currency:1 }}
},
{
    $group: { _id: "$credit.currency",
//         sex: {$min: "$sex"}, nationality: {$min: "$nationality"},
        avg_balance: { $avg: "$credit.balance"},
        sum_balance: { $sum: "$credit.balance"}}
},
{
    $sort: {_id:1}
}
]).toArray()