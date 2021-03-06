//dailybibleverse.js

Module.register("MMM-RandomBibleVerse", {
    // Default module config.
    result: [],
    defaults: {
        // Default Bible version is ESV.
        // Change it to a version that dailyverses.net supports.
        version: 'ESV',
        interval: 60 // minutes
    },

    start: function() {
        Log.info("Starting module: " + this.name);
        var self = this;

        var configuredVersion = this.config.version;
        var minutes = this.config.interval;
        if (typeof minutes === 'number') {
          if (minutes < 0.2 ) {
            console.log('Interval must be a number greater than 0.2; resetting to default 60 minutes');
            minutes = 60;
          }
        } else {
          console.log('interval must be a number. resetting to default 60 minutes');
          minutes = 60;
        }

        //Do this once first
        self.sendSocketNotification('START', configuredVersion);

        //Then every hour
        setInterval(function() {
                self.sendSocketNotification('START', configuredVersion);
        }, minutes*60*1000); //perform every x minutes (in milliseconds)
    },

    getStyles: function () {
        return ["MMM-RandomBibleVerse.css"];
    },

    // Override dom generator.
    getDom: function() {
        Log.log("Updating MMM-RandomBibleVerse DOM.");

        var verse = "";
        var reference = "";

        if(this.verse != null && this.reference != null){
            verse = this.verse;

            // split reference in book and chapter reference, ex. for
            // input "1 Corinthian 13:6,7" => "1 Corinthian", "13:6,7"
            reference = this.reference.trim();
            var lastSpace = reference.lastIndexOf(" ");
            var book = reference.substring(0, lastSpace);
            var chapter = reference.substring(lastSpace+1, reference.length);

            // now we build the reference with translated book title
            reference = " - " + this.translate(book) + " " + chapter;
        }

        var wrapper = document.createElement("div");
        switch (this.config.size) {
            case 'xsmall':
                wrapper.className = "bright xsmall";
                break;
            case 'small':
                wrapper.className = "bright small";
                break;
            case 'medium':
                wrapper.className = "bright medium";
                break;
            case 'large':
                wrapper.className = "bright large";
                break;
            default:
                wrapper.className = "bright medium";
        }
        wrapper.innerHTML = verse + reference;
        return wrapper;
        },

    getScripts: function() {
        return [
            this.file('jquery-3.1.1.min.js'), // this file will be loaded straight from the module folder.
        ]
    },

    getTranslations: function() {
        return {
                de: "translations/de.json",
                en: "translations/en.json",
                es: "translations/es.json",
                nl: "translations/nl.json",
        }
    },

    socketNotificationReceived: function(notification, payload) {
        Log.log("socket received from Node Helper");
        if(notification == "RANDOM_VERSE_RESULT"){
            var json = payload;
            Log.log(payload);
            this.verse = json.v;
            this.reference = json.r;

            this.updateDom();
        }
    }
});
