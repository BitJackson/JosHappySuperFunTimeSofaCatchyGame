var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('scoreboarddb', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'JosHappySuperFunTimeSofaCatchyGame' database");

        //Check for collection and initiate populateDB if non-existant
        db.collection('scoreboard', {strict:false}, function(err, collection) {
            if (err) {
                console.log("The 'JosHappySuperFunTimeSofaCatchyGame' collection doesn't exist. Sample data turned OFF...");
                //populateDB();
            }
        });
    }
});
 
exports.findAll = function(req, res) {
    db.collection('scoreboard', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.set({
                'Access-Control-Allow-Origin': '*'
            });
            res.send(items);
        });
    });
};
 
exports.addScore = function(req, res) {
    console.log(req.body);
    var score = req.body;

    db.collection('scoreboard', function(err, collection) {
        collection.insert(score, {safe:false}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                try {
                    JSON.stringify(result[0]);
                    res.send(result[0]);
                } catch (ex) {
                    res.send({'error':'NOT JSON'});
                }
            }
        });
    });
}