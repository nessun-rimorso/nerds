// button feedback

$('.address__button').click(function() {
event.preventDefault();
$('.modal').addClass('modal__show');
});

function closeModal (clicked) {
$(clicked).click(function() {
	$('.modal').removeClass('modal__show');
});
}

closeModal('.modal__close');

$(document).ready(function(){
					$(this).keydown(function(eventObject){
							if (eventObject.which == 27)
									$('.modal').removeClass('modal__show');
					});
});

$('.modal').click(function(e) {

if($(e.target).closest('.modal__popup').length==0)
$('.modal').removeClass('modal__show');
});

// modal-error


var popup = document.querySelector('.modal__popup');
var formField = $('.modal__field');
popup.addEventListener("submit", function (evt) {
	 if (!formField.value) {
			evt.preventDefault();
			popup.classList.remove("modal-error");
			popup.offsetWidth = popup.offsetWidth;
			popup.classList.add("modal-error");
	}
});


// slider

var slides = $('.slider__item');
var controls = $('.slider-controls__control');

controls.click(function() {
event.preventDefault();
var controlsIndex = controls.index(this);
$(this).addClass('slider-controls__control--checked').siblings().removeClass('slider-controls__control--checked');
$(slides[controlsIndex]).addClass('slider__item--active').siblings().removeClass('slider__item--active');
})

// auto-slider

function autoSlider(){
	var slide = $('.slider__item');
	var slideActive = $('.slider__item.slider__item--active');
	var control = $('.slider-controls__control');
	var controlChecked = $('.slider-controls__control.slider-controls__control--checked');

	if(!slideActive.length) slide.eq(0).addClass('slider__item--active');
	else{
			slide.eq((slide.index(slideActive) + 1) % slide.length).addClass('slider__item--active');
			slideActive.removeClass('slider__item--active');
	}
	if(!controlChecked.length) control.eq(0).addClass('slider-controls__control--checked');
	else{
			control.eq((control.index(controlChecked) + 1) % control.length).addClass('slider-controls__control--checked');
			controlChecked.removeClass('slider-controls__control--checked');
	}
	setTimeout(autoSlider, 5000);
}
autoSlider();





// Range

function MyRound100(val) {
	return Math.round(val / 100) * 100;
}

var twobombSlider  = (function(){
	var drag = false;
	var values = [];
	var startRate = $('.start-rate');
	var endRate = $('.end-rate');

	$(".line").each(function(i,e){
		updateView(e);
	});
	$(".lp, .rp").bind("mousedown",function(){
		drag = $(this);
	})
	$(document).bind("mousemove",function(e){
		if(!drag)
			return;
		 var x = (e.pageX - $(drag).outerWidth()/2 - $(drag).parent().parent().offset().left)/$(drag).parent().parent().outerWidth();
		 if(x < 0 ) x = 0;
		 if(x > 1) x = 1;
		 var rp = $(drag).parent().find(".rp");
		 var lp = $(drag).parent().find(".lp");
		 if($(drag).hasClass("lp") && x > $(endRate).attr("value") ){
				$(rp).attr("data-pos",x);
				$(endRate).attr("value",x);
		 }
		 if($(drag).hasClass("rp") && x < $(startRate).attr("value") ){
				$(lp).attr("data-pos",x);
				$(startRate).attr("value",x);
		 }
		 $(drag).attr("data-pos",x);
		 updateView($(drag).parent().parent());
	});
	$(document).bind("mouseup",function(){
		drag = false;
	});
	function updateView(line){
		var startVal = parseInt($(line).find(".filter-fieldset__range").data("start"));
		var endVal = parseInt($(line).find(".filter-fieldset__range").data("end"));

		if(startVal > endVal)
			endVal = startVal;
		startVal = startVal || 0;
		endVal = endVal || 20000;
		var values = [];
		for(var i = startVal; i <= endVal;i++)
			values.push(i);
		var l  =$(line).find(".lp").attr("data-pos");
		var r  =$(line).find(".rp").attr("data-pos");
		var x = $(line).outerWidth() * l;
		var w = (r - l)*$(line).outerWidth();
		$(line).find(".filter-fieldset__range").css({left:x+"px",width:w+"px"});
		var index = Math.round(values.length*l);

		if(index >= values.length)
			index = values.length-1;
			startRate.attr( "value", MyRound100(values[index]) );
		index = Math.round(values.length*r);
		if(index >= values.length)
			index = values.length-1;
			endRate.attr( "value", MyRound100(values[index]) );

		}
	})();
