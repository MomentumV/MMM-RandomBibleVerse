/* Magic Mirror
 * Node Helper: MMM-RandomBibleVerse
 *
 * By Arthur Garza
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var request = require('request');
var cheerio = require('cheerio');

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
		request({ url: randomverseURL, method: 'GET' }, function(error, response, html) {
			if(!error && response.statusCode == 200){
				var $ = cheerio.load(html);
				var verse = $('span.v1');
				var ref = verse.parent().children('vr').children('.vc');
				console.log(verse.text());
				console.log(ref.text());
				var result = {
					v: verse.text(),
					r: ref.text()
				};
				self.sendSocketNotification('RANDOM_VERSE_RESULT', result);
			}
		});
	}
});
