/* Magic Mirror
 * Node Helper: MMM-RandomBibleVerse
 *
 * By Arthur Garza
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var request = require('request');
var xpath = require('xpath');
var dom = require('xmldom').DOMParser;

module.exports = NodeHelper.create({
	// Subclass start method.
	start: function() {
		console.log("Started node_helper.js for MMM-RandomBibleVerse.");
	},

	socketNotificationReceived: function(notification, payload) {
		console.log(this.name + " node helper received a socket notification: " + notification + " - Payload: " + payload);
		this.randomverseRequest(payload);
	},

	randomverseRequest: function(version) {
		var self = this;
		var randomverseURL = "https://dailyverses.net/random-bible-verse/" + version

		request({ url: randomverseURL, method: 'GET' }, function(error, response, body) {
			if(!error && response.statusCode == 200){
				var doc = new dom().parseFromString(body);
				var verse = xpath.select("string(//title)",doc);
				console.log(body);
				//// TODO: trim result to relevant part with regx
				self.sendSocketNotification('RANDOM_VERSE_RESULT', result);
			}
		});
	}
});
