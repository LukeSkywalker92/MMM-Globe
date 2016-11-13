Module.register("MMM-Globe",{
    // Default module config.
    defaults: {
        style: 'geoColor',
		imageSize: 600,
		ownImagePath:'',
		updateInterval: 10*60*1000
    },

	start: function () {
		self = this;
		this.url = '';
		this.imageUrls = {
			'natColor': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/full_disk_ahi_natural_color.jpg',
			'geoColor': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/full_disk_ahi_true_color.jpg',
			'airMass': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/full_disk_ahi_rgb_airmass.jpg',
			'fullBand': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/himawari-8_band_03_sector_02.gif'
		}
		this.hiResImageUrls = {
			'natColor': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest_hi_res/himawari-8/full_disk_ahi_natural_color.jpg',
			'geoColor': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest_hi_res/himawari-8/full_disk_ahi_true_color.jpg',
			'airMass': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest_hi_res/himawari-8/full_disk_ahi_rgb_airmass.jpg',
			'fullBand': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/himawari-8_band_03_sector_02.gif'
		}
		console.log(this.imageUrls[this.config.style]);
		if (this.config.ownImagePath != '') {
			this.url = this.config.ownImagePath;
		} else {
			if (this.config.imageSize > 800) {
				this.url = this.hiResImageUrls[this.config.style];
			} else {
				this.url = this.imageUrls[this.config.style];
			}
			setInterval(function(){ self.updateDom(1000); console.log('update')}, this.config.updateInterval);
		}
	},

	getStyles: function () {
		return ["MMM-Globe.css"]
	},

    // Override dom generator.
    getDom: function() {
		var wrapper = document.createElement("div");
        var image = document.createElement("img");
        image.src = this.url+'?'+new Date().getTime();
		image.width = this.config.imageSize.toString();
		image.height = this.config.imageSize.toString();
		image.className = 'MMM-Globe-image';
		wrapper.appendChild(image);
        return wrapper;
    }
});
