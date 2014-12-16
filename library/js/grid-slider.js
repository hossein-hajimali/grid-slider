(function($){
	$.fn.gridSlider = function(options){
		$('.slider-frame').remove();
		var settings = $.extend({
			rowNumber: 3,
			colNumber: 3,
			animateTime: 0.3,
			easing: "ease",
			nextHtml: '<',
			prevHtml: '>',
			effect: 'normal',
			rowActionTime: 100,
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
			if(settings.effect == "normal"){
				moveSliderLeft($('.slider-row.row'+index), rc*slideWidth);
			} else if(settings.effect == "snake"){
				if(index % 2 == 1){
					moveSliderLeft($('.slider-row.row'+index), rc*slideWidth);
				} else{
					moveSliderRight($('.slider-row.row'+index), (rc*slideWidth)+1);
				}
			}
		}
		function doSetTimeout(index, obj, j){
			setTimeout(function(){
				if(j){
					checkRow(j, obj);
				} else{
					checkRow(index, obj);
				}
			}, index*settings.rowActionTime);
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
		
		$next.html(settings.nextHtml).css('top', slideHeight/2);
		$prev.html(settings.prevHtml).css('bottom', slideHeight/2);;
		$eachElement.each(function(){
			$slides.push($(this).html());
		});
		$eachElement.hide();
		$mother.append('<div class="slider-frame"></div>');


		for(var i=1; i<=sliderRow;i++){
			rowCounter[i-1] = (i-1)*sliderCol;
			if(settings.effect == "normal"){
				$('.slider-frame').append('<div class="slider-row normal row'+i+'"></div>');
				moveSliderLeft($('.slider-row.row'+i), rowCounter[i-1]*slideWidth);
				doSetTimeout(i, rowCounter[i-1]);
			} else if(settings.effect == 'snake'){
				$('.slider-frame').append('<div class="slider-row snake row'+i+'"></div>');
				if(i%2 == 1){
					moveSliderLeft($('.slider-row.row'+i), rowCounter[i-1]*slideWidth);
				} else{
					moveSliderRight($('.slider-row.row'+i), (rowCounter[i-1]*slideWidth)+1);
				}
			}
			$('.slider-row.row'+i).css('top',(i-1)*slideHeight);
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
				doSetTimeout(i, rowCounter[i-1]);
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
				var j = sliderRow-i;
				rowCounter[j] --;
				doSetTimeout(i, rowCounter[j],j+1);
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