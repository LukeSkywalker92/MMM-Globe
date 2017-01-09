/* global Module */

/* Magic Mirror
 * Module: MMM-Globe
 *
 * By Luke Scheffler https://github.com/LukeSkywalker92
 * MIT Licensed.
 */

Module.register("MMM-Globe", {
	// Default module config.
	defaults: {
		style: 'geoColor',
		imageSize: 600,
		ownImagePath: '',
		updateInterval: 10 * 60 * 1000
	},

	start: function () {
		self = this;
		this.url = '';
		this.imageUrls = {
			'natColor': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/full_disk_ahi_natural_color.jpg',
			'geoColor': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/full_disk_ahi_true_color.jpg',
			'airMass': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/full_disk_ahi_rgb_airmass.jpg',
			'fullBand': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/himawari-8_band_03_sector_02.gif',
			'europeDiscNat': 'http://oiswww.eumetsat.org/IPPS/html/latestImages/EUMETSAT_MSG_RGBNatColour_LowResolution.jpg',
			'europeDiscSnow': 'http://oiswww.eumetsat.org/IPPS/html/latestImages/EUMETSAT_MSG_RGBSolarDay_CentralEurope.jpg'
		}
		this.hiResImageUrls = {
			'natColor': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest_hi_res/himawari-8/full_disk_ahi_natural_color.jpg',
			'geoColor': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest_hi_res/himawari-8/full_disk_ahi_true_color.jpg',
			'airMass': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest_hi_res/himawari-8/full_disk_ahi_rgb_airmass.jpg',
			'fullBand': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/himawari-8_band_03_sector_02.gif',
			'europeDiscNat': 'http://oiswww.eumetsat.org/IPPS/html/latestImages/EUMETSAT_MSG_RGBNatColour_LowResolution.jpg',
			'europePartSnow': 'http://oiswww.eumetsat.org/IPPS/html/latestImages/EUMETSAT_MSG_RGBSolarDay_CentralEurope.jpg'
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
			setInterval(function () {
				self.updateDom(1000);
				console.log('update')
			}, this.config.updateInterval);
		}
	},

	getStyles: function () {
		return ["MMM-Globe.css"]
	},

	// Override dom generator.
	getDom: function () {
		var wrapper = document.createElement("div");
		if (this.config.style == "europeDiscNat") {
			//wrapper.style.height = "587px";
			wrapper.style.height = 0.98 * this.config.imageSize - 1 + "px";
			wrapper.style.overflow = "hidden";
		}

		var image = document.createElement("img");
		if (this.config.ownImagePath != '') {
			image.src = this.url;
		} else {
			image.src = this.url + '?' + new Date().getTime();
			image.className = 'MMM-Globe-image';
		}

		image.width = this.config.imageSize.toString();
		image.height = this.config.imageSize.toString();

		wrapper.appendChild(image);
		return wrapper;
	}
});
