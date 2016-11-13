Module.register("MMM-Globe",{
    // Default module config.
    defaults: {
        text: "Hello World!"
    },

	getStyles: function () {
		return ["MMM-Globe.css"]
	},

    // Override dom generator.
    getDom: function() {
		var wrapper = document.createElement("div");
        var image = document.createElement("img");
        image.src = 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest_hi_res/himawari-8/full_disk_ahi_true_color.jpg';
		image.width = '200';
		image.height = '200';
		image.className = 'MMM-Globe-image';
		wrapper.appendChild(image);
        return wrapper;
    }
});
