db.people.aggregate([
{ $unwind: "$credit" },
{
    $project: { _id: 0, credit: { balance: 1, currency:1 }}
},
{
    $group: { _id: "$credit.currency", sum_balance: { $sum: "$credit.balance"}}
},
{
    $sort: {sum_balance:1}
}
]).toArray()