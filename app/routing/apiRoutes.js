

var friendsData = require('../data/friends.js');

// Export API routes
module.exports = function(app) {
	// console.log('___ENTER apiRoutes.js___');

	// Total list of friend entries
	app.get('/api/friends', function(req, res) {
		res.json(friendsData);
	});

	// Add new friend entry
	app.post('/api/friends', function(req, res) {
		
		var userInput = req.body;

		var userScore = userInput.score;
		// console.log('userResponses = ' + userResponses);

		// Compute best friend match
		var matchName = '';
		var matchImage = '';
		var totalDifference = 10000; // Make the initial value big for comparison

		// Examine all existing friends in the list
		for (var i = 0; i < friendsData.length; i++) {
			 console.log('friend = ' + JSON.stringify(friendsData[i]));

			// Compute differenes for each question
			var diff = 0;
			for (var j = 0; j < userScore.length; j++) {
				diff += Math.abs(friendsData[i].score[j] - userScore[j]);
			}
			// console.log('diff = ' + diff);

			// If lowest difference, record the friend match
			if (diff < totalDifference) {
				// console.log('Closest match found = ' + diff);
				// console.log('Friend name = ' + friends[i].name);
				// console.log('Friend image = ' + friends[i].photo);

				totalDifference = diff;
				matchName = friendsData[i].name;
				matchImage = friendsData[i].photo;
			}
		}


		
		friendsData.push(userInput);

		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
		console.log(userInput)

	});
};