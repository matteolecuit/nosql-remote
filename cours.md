db.users.find({"hobbies.title": "Sports",{ \$gte: { "hobbies.frequency": 2}})

db.users.find({"hobbies.title": "Sports", "hobbies.frequency":{\$gte: 2 }}).pretty()

db.users.find({"hobbies": {$elemMatch: {"title": "Sports", "frequency":{$gte: 3 }}}}, {"hobbies":1}).pretty()

db.users.updateMany({"hobbies": {$elemMatch: {"title": "Sports", "frequency":{$gte: 2 }}}}, { $set: { "hobbies.$.toto": "toto"}})

db.users.updateMany({company: "GYNKO"}, {$push: {hobbies: {$each: [{title: "dev", frequency: 5}, {title: "Cooking", frequency: 2}]}}})
