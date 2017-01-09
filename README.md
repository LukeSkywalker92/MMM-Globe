MMM-Globe
===================
This a module for the [MagicMirror](https://github.com/MichMich/MagicMirror). It can display live images of our planet. The pictures are taken from the Himawari-8 sattelite. You can also display custum pictures.

## Preview

![](https://github.com/LukeSkywalker92/MMM-Globe/blob/master/screenshot.png?raw=true)

## Installation
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/LukeSkywalker92/MMM-Globe.git`.



## Config
The entry in `config.js` can include the following options:

|Option|Description|
|---|---|
|`style`|Style of the image. There are four diffrent styles available. You can preview them [here for the asia-centric images](http://rammb.cira.colostate.edu/ramsdis/online/himawari-8.asp) or [here for for the africa/europe-centric images] (http://oiswww.eumetsat.org/IPPS/html/latestImages.html).<br><br>**Type:** `string`<br>**Possible values:** `natColor`, `geoColor`, `airMass`, `fullBand`, `europeDiscNat`, `europeDiscSnow`|
|`imageSize`|Defines the size of the displayed image in pixels. <br><br>**Type:** `integer`<br>**Default value:** `600`|
|`updateInterval`|How often the image is updated. There is a new picture uploadet every 10 minutes. So there is no need to go faster.<br><br>**Default value:** `10 • 60 • 1000 // every 10 minutes`|
|`ownImagePath`|If you want to display a custom picture, place the link of it here. The module will automatically display it.<br><br>**Default value:** `''`|




Here is an example of an entry in `config.js`
```
{
	module: 'MMM-Globe',
	position: 'center',
	config: {
		style: 'geoColor',
		imageSize: 600,
		ownImagePath:'',
		updateInterval: 10*60*1000
	}
},
```



## Special Thanks
- [Michael Teeuw](https://github.com/MichMich) for creating the awesome [MagicMirror2](https://github.com/MichMich/MagicMirror/tree/develop) project that made this module possible.
