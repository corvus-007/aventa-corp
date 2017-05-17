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


function getHashFilter() {
  var hash = location.hash;
  // get filter=filterName
  var matches = location.hash.match(/filter=([^&]+)/i);
  var hashFilter = matches && matches[1];
  return hashFilter && decodeURIComponent(hashFilter);
}


document.addEventListener('DOMContentLoaded', function() {

  var mainNavLinks = document.querySelectorAll('.main-nav__link');
  var pageURL = location.pathname;
  var mainNavItem = null;


  Array.prototype.forEach.call(mainNavLinks, function(item) {
    mainNavItem = item.parentElement;

    if (~item.href.indexOf(pageURL)) {
      mainNavItem.classList.add('main-nav__item--active');
    } else {
      mainNavItem.classList.remove('main-nav__item--active');
    }
  });

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


  /*=============================================
  =            Filter archive events            =
  =============================================*/

  var archiveEventsList = document.querySelector('.archive-events__list');

  if (archiveEventsList) {
    var $grid = $(archiveEventsList).isotope({
      layoutMode: 'vertical'
    });

    var $filters = $('.archive-events__filter').on('click', 'a', function(event) {
      event.preventDefault();
      var filterAttr = $(this).attr('data-filter');
      // set filter in hash
      location.hash = 'filter=' + encodeURIComponent(filterAttr);
    });

    var isIsotopeInit = false;

    function onHashchange() {
      var hashFilter = getHashFilter();
      if (!hashFilter && isIsotopeInit) {
        return;
      }
      isIsotopeInit = true;
      // filter isotope
      $grid.isotope({
        layoutMode: 'vertical',
        itemSelector: '.element-item',
        filter: hashFilter
      });
      // set selected class on button
      if (hashFilter) {
        $filters.find('.archive-events__filter-control--active').removeClass('archive-events__filter-control--active');
        $filters.find('[data-filter="' + hashFilter + '"]').addClass('archive-events__filter-control--active');
      }
    }

    $(window).on('hashchange', onHashchange);
    // trigger event handler to init Isotope
    onHashchange();
  }

  /*=====  End of Filter archive events  ======*/



});
