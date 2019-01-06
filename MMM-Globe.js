/* global Module */

/* Magic Mirror
 * Module: MMM-Globe
 *
 * By Luke Scheffler https://github.com/LukeSkywalker92
 * MIT Licensed.
 */

const loadImage = src =>
  new Promise(resolve => {
    const image = new Image();
    image.onload = () => resolve({ image, isError: false });
    image.onerror = () => resolve({ image, isError: true });
    image.src = src;
  });

let successfullyLoadedWrapper = null;

Module.register("MMM-Globe", {
  // Default module config.
  defaults: {
    style: "geoColor",
    imageSize: 600,
    ownImagePath: "",
    updateInterval: 10 * 60 * 1000
  },

  start: function() {
    self = this;
    this.url = "";
    this.imageUrls = {
      natColor:
        "http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/full_disk_ahi_natural_color.jpg",
      geoColor:
        "http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/full_disk_ahi_true_color.jpg",
      airMass:
        "http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/full_disk_ahi_rgb_airmass.jpg",
      fullBand:
        "http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/himawari-8_band_03_sector_02.gif",
      europeDiscNat:
        "http://oiswww.eumetsat.org/IPPS/html/latestImages/EUMETSAT_MSG_RGBNatColour_LowResolution.jpg",
      europeDiscSnow:
        "http://oiswww.eumetsat.org/IPPS/html/latestImages/EUMETSAT_MSG_RGBSolarDay_CentralEurope.jpg",
      centralAmericaDiscNat:
        "https://cdn.star.nesdis.noaa.gov/GOES16/ABI/FD/GEOCOLOR/20183421830_GOES16-ABI-FD-GEOCOLOR-678x678.jpg"
    };
    this.hiResImageUrls = {
      natColor:
        "http://rammb.cira.colostate.edu/ramsdis/online/images/latest_hi_res/himawari-8/full_disk_ahi_natural_color.jpg",
      geoColor:
        "http://rammb.cira.colostate.edu/ramsdis/online/images/latest_hi_res/himawari-8/full_disk_ahi_true_color.jpg",
      airMass:
        "http://rammb.cira.colostate.edu/ramsdis/online/images/latest_hi_res/himawari-8/full_disk_ahi_rgb_airmass.jpg",
      fullBand:
        "http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/himawari-8_band_03_sector_02.gif",
      europeDiscNat:
        "http://oiswww.eumetsat.org/IPPS/html/latestImages/EUMETSAT_MSG_RGBNatColour_LowResolution.jpg",
      europePartSnow:
        "http://oiswww.eumetsat.org/IPPS/html/latestImages/EUMETSAT_MSG_RGBSolarDay_CentralEurope.jpg",
      centralAmericaDiscNat:
        "https://cdn.star.nesdis.noaa.gov/GOES16/ABI/FD/GEOCOLOR/20183421830_GOES16-ABI-FD-GEOCOLOR-1808x1808.jpg"
    };
    console.log(this.imageUrls[this.config.style]);
    if (this.config.ownImagePath != "") {
      this.url = this.config.ownImagePath;
    } else {
      if (this.config.imageSize > 800) {
        this.url = this.hiResImageUrls[this.config.style];
      } else {
        this.url = this.imageUrls[this.config.style];
      }
      setInterval(function() {
        self.updateDom(1000);
        console.log("update");
      }, this.config.updateInterval);
    }
  },

  getStyles: function() {
    return ["MMM-Globe.css"];
  },

  // Override dom generator.

  getDom: async function() {
    var wrapper = document.createElement("div");
    if (this.config.style == "europeDiscNat") {
      wrapper.style.height = 0.98 * this.config.imageSize - 1 + "px";
      wrapper.style.overflow = "hidden";
    }

    const { image, isError } = await loadImage(
      this.url + "?" + new Date().getTime()
    );

    if (this.config.style === "centralAmericaDiscNat") {
      image.className = "MMM-Globe-image-centralAmericaDiscNat";
    } else {
      image.className = "MMM-Globe-image";
    }

    image.width = this.config.imageSize.toString();
    image.height = this.config.imageSize.toString();

    if (!isError) {
	  wrapper.appendChild(image);
	  successfullyLoadedWrapper = wrapper
	  return wrapper
    } else if (successfullyLoadedWrapper) {
		return successfullyLoadedWrapper
	}

    return document.createElement("div");
  }
});
