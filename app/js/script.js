// Выровнять элементы по высоте.
// elements - строка селектора, напр. '.element'
function setMaxHeight(elements) {
  var maxHeight = 0;
  elements = document.querySelectorAll(elements);

  if (!elements.length) {
    return;
  }

  Array.prototype.forEach.call(elements, function findMaxHeight(element) {
    maxHeight = (maxHeight > element.clientHeight) ? maxHeight : element.clientHeight;
  });

  Array.prototype.forEach.call(elements, function specifyMaxHeight(element) {
    element.style.height = maxHeight + 'px';
  });
}


document.addEventListener('DOMContentLoaded', function() {

  /*====================================
  =            Index slider            =
  ====================================*/

  var indexSlider = document.querySelector('.index-slider');

  if (indexSlider) {
    $(indexSlider).slick({
      accessibility: false,
      dots: true,
      arrows: false,
      // autoplay: true
    });
  }

  /*=====  End of Index slider  ======*/


  /*================================
  =            Dest nav            =
  ================================*/

  var destNav = document.querySelector('.dest-nav');

  if (destNav) {
    setTimeout(function() {
      setMaxHeight('.dest-nav__item-title')
    }, 100);

  }

  /*=====  End of Dest nav  ======*/


  /*=============================
  =            Mmenu            =
  =============================*/

  var mainNav = document.querySelector('.main-nav');

  if (mainNav && (matchMedia('(max-width: 767px)').matches)) {
    $(mainNav).mmenu({
      navbar: {
        title: "Меню"
      }
    }, {
      // configuration
      offCanvas: {
        pageSelector: ".site-wrapper"
      },
      classNames: {
        selected: "main-nav__item--active"
      }
    });
  }

  /*=====  End of Mmenu  ======*/



});
