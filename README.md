##Grid Slider
This repository makes a fully customizable grid slider. 

###Browsers support
* Firefox 4.0+
* Chrome 4.0+
* Safari 3.1+
* IE 10.0+

###Version
1.0

####See [Demo]

###Installation
First add css and js files to your page
```sh
<script type="text/javascript" src="library/js/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="library/js/min/grid-slider.min.js"></script>
<link rel="stylesheet" type="text/css" media="all" href="library/css/grid-slider.css">
```
Now you can create your html very simple 
```sh
<div id="mySlider">
  <div class="each-slide">{any content here...}</div>
  <div class="each-slide">{any content here...}</div>
  <div class="each-slide">{any content here...}</div>
  <div class="each-slide">{any content here...}</div>
  <div class="each-slide">{any content here...}</div>
  <div class="each-slide">{any content here...}</div>
</div>
```
At the end just select your slider container with grid-slider plugin
```sh
$('#mySlider').gridSlider();
```
And how to pass options?
```sh
$('#mySlider').gridSlider({
  effect: "snake",
  rowNumber: 3,
  colNumber: 3
});
```
That's it!

###Options
All effects applies letter after letter. if you want just split your string run plugin without any options.
  - ***effect:*** "normal" , "snake" , default is "normal"
  - ***rowNumber:*** number of rows you want to have
  - ***colNumber:*** number of columns you want to have
  - ***animateTime:*** seconds or milliseconds number, transition time. default is 0.3s
  - ***easing:*** any css3 transition type could be use, for example "ease-out", default is "ease"
  - ***rowActionTime:*** each row sliding action timeout, is milliseconds and default is 100
  - ***nextHtml:*** how do you want to next button to be, you can even add html for your button, default is fontawesome
  - ***prevHtml:*** how do you want to previews button to be, you can even add html for your button, default is fontawesome

[Demo]: http://hajimali.com/grid-slider
 
