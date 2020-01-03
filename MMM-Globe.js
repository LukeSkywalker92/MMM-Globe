/* global Module */

/* Magic Mirror
 * Module: MMM-Globe
 *
 * By Luke Scheffler https://github.com/LukeSkywalker92
 * MIT Licensed.
 */

// Promise based image loader with error handling
const loadImage = src =>
  new Promise(resolve => {
    const image = new Image();
    image.onload = () => resolve({ image, isError: false });
    image.onerror = () => resolve({ image, isError: true });
    image.src = src;
  });

// Store last successfully loaded image in case the next one fails to load
let successfullyLoadedImageWrapper = null;

Module.register("MMM-Globe", {
  // Default module config.
  defaults: {
    style: "geoColor",
    imageSize: 600,
    ownImagePath: "",
    updateInterval: 10 * 60 * 1000  // 10 minutes
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
        "https://eumetview.eumetsat.int/static-images/latestImages/EUMETSAT_MSG_RGBNatColourEnhncd_LowResolution.jpg",
      europeDiscSnow:
        "https://eumetview.eumetsat.int/static-images/latestImages/EUMETSAT_MSG_RGBSolarDay_LowResolution.jpg",
      centralAmericaDiscNat:
        "https://cdn.star.nesdis.noaa.gov/GOES16/ABI/FD/GEOCOLOR/678x678.jpg"
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
        "https://eumetview.eumetsat.int/static-images/latestImages/EUMETSAT_MSG_RGBNatColourEnhncd_LowResolution.jpg",
      europePartSnow:
        "https://eumetview.eumetsat.int/static-images/latestImages/EUMETSAT_MSG_RGBSolarDay_LowResolution.jpg",
      centralAmericaDiscNat:
        "https://cdn.star.nesdis.noaa.gov/GOES16/ABI/FD/GEOCOLOR/1808x1808.jpg"
    };
    if (this.config.ownImagePath != "") {
      this.url = this.config.ownImagePath;
    } else {
      if (this.config.imageSize > 800) {
        this.url = this.hiResImageUrls[this.config.style];
      } else {
        this.url = this.imageUrls[this.config.style];
      }
    }

      //Update module after interval set in config (default 10 minutes)
      if (this.config.updateInterval > 0) {
          setInterval(function () {
              self.updateDom(1000);
          }, this.config.updateInterval);
      }
  },

  getStyles: function() {
    return ["MMM-Globe.css"];
  },

  getDom: async function() {
    const { image, isError } = await loadImage(
      this.url + "?" + new Date().getTime()
    );

    if (!isError) {
      // If the image loaded show it
      var wrapper = document.createElement("div");
      if (this.config.style == "europeDiscNat") {
        wrapper.style.height = 0.98 * this.config.imageSize - 1 + "px";
        wrapper.style.overflow = "hidden";
      }

      if (this.config.style === "centralAmericaDiscNat") {
        image.className = "MMM-Globe-image-centralAmericaDiscNat";
      } else {
        image.className = "MMM-Globe-image";
      }

      image.width = this.config.imageSize.toString();
      image.height = this.config.imageSize.toString();
      wrapper.appendChild(image);
      successfullyLoadedImageWrapper = wrapper;
      return wrapper;
    } else if (successfullyLoadedImageWrapper) {
      // If there was an error loading the image show the last successfully loaded image
      return successfullyLoadedImageWrapper;
    }
    // If we haven't successfully loaded an image yet show nothing
    return document.createElement("div");
  }
});
