(function($){
	$.fn.gridSlider = function(options){
		var settings = $.extend({
			rowNumber: 3,
			colNumber: 3,
			animateTime: 0.2,
			easing: "ease",
			nextText: '<',
			prevText: '>'
		}, options);
		function moveSliderLeft($obj,index){
			$obj.css({
				"-webkit-transform":"translateX("+ -index +"px)",
				"-moz-transform":"translateX("+ -index +"px)",
				"-ms-transform":"translateX("+ -index +"px)",
				"-o-transform":"translateX("+ -index +"px)",
				"transform":"translateX("+ -index +"px)"
			});
		}
		function moveSliderRight($obj,index){
			$obj.css({
				"-webkit-transform":"translateX("+ index +"px)",
				"-moz-transform":"translateX("+ index +"px)",
				"-ms-transform":"translateX("+ index +"px)",
				"-o-transform":"translateX("+ index +"px)",
				"transform":"translateX("+ index +"px)"
			});
		}
		function checkRow(index, rc){
			if(index % 2 == 1){
				moveSliderLeft($('.slider-row.row'+index), rc*slideWidth);
			} else{
				moveSliderRight($('.slider-row.row'+index), rc*slideWidth);
			}
		}
		var $mother = $('#mySlider'),
			$eachElement = $('#mySlider > .each-slide'),
			$slides = [],
			slidesLength = $eachElement.length,
			sliderRow = settings.rowNumber,
			sliderCol = settings.colNumber,
			motherWidth = $mother.width(),
			motherHeight = $mother.height(),
			slideWidth = motherWidth/sliderCol,
			slideHeight = motherHeight/sliderRow,
			sliderRowWidth = slideWidth*slidesLength,
			$next = $('.slider-controller.next'),
			$prev = $('.slider-controller.prev'),
			rowCounter = [];

			
		$next.html(settings.nextText);
		$prev.html(settings.prevText);
		$eachElement.each(function(){
			$slides.push($(this).html());
		});
		$eachElement.hide();
		$mother.append('<div class="slider-frame"></div>');
		for(var i=1; i<=sliderRow;i++){
			rowCounter[i-1]= (i-1)*sliderCol;
			$('.slider-frame').append('<div class="slider-row row'+i+'"></div>')
			$('.slider-row.row'+i).css('top',(i-1)*slideHeight);
			if(i%2 == 1){
				moveSliderLeft($('.slider-row.row'+i), rowCounter[i-1]*slideWidth);
			} else{
				moveSliderRight($('.slider-row.row'+i), rowCounter[i-1]*slideWidth);
			}
			for(var j=0;j<slidesLength;j++){
				$('.slider-row.row'+i).append('<div class="each-slide">'+$slides[j]+'</div>');
			}
		}
		$('.slider-row').css({
			'width': sliderRowWidth,
			'height': slideHeight,
			"transition": "all "+ settings.animateTime +"s "+ settings.easing,
			"-o-transition": "all "+ settings.animateTime +"s "+ settings.easing,
			"-ms-transition": "all "+ settings.animateTime +"s "+ settings.easing,
			"-moz-transition": "all "+ settings.animateTime +"s "+ settings.easing,
			"-webkit-transition": "all "+ settings.animateTime +"s "+ settings.easing
		});
		$('.slider-row > .each-slide').css({
			'width': slideWidth,
			"height": slideHeight
		});


		// controller
		// ------------------------------
		if(slidesLength <= sliderCol*sliderRow){
			$next.add($prev).addClass('disable');
		}
		if(rowCounter[0] <= 0){
			$prev.addClass('disable');
		}
		$next.on('click', function(){
			for(var i=1; i<=sliderRow;i++){
				rowCounter[i-1] ++;
				checkRow(i, rowCounter[i-1]);
			}
			if(rowCounter[sliderRow-1] >= slidesLength-(sliderCol) && !$next.hasClass('disable')){
				$next.addClass('disable');
			}
			if(rowCounter[0] > 0 && $prev.hasClass('disable')){
				$prev.removeClass('disable');
			}
		});
		$prev.on('click', function(){
			for(var i=1; i<=sliderRow;i++){
				rowCounter[i-1] --;
				checkRow(i, rowCounter[i-1]);
			}
			if(rowCounter[0] > 0 && $next.hasClass('disable')){
				$next.removeClass('disable');
			}
			if(rowCounter[0] <= 0 && !$prev.hasClass('disable')){
				$prev.addClass('disable');
			}
		});
	}
}(jQuery));