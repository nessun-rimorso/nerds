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





























//
