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


document.addEventListener('DOMContentLoaded', function () {

  var mainNavLinks = document.querySelectorAll('.main-nav__link');
  var pageURL = location.pathname;
  var mainNavItem = null;



  Array.prototype.forEach.call(mainNavLinks, function (item) {
    mainNavItem = item.parentElement;

    if (pageURL === '/') {
      return;
    }

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


  // Production common slider
  if ($('.production-common-slider').length) {
    $('.production-common-slider').slick({
      accessibility: false,
      arrows: false,
      dots: true
    });
  }


  // Gallery slider
  $('.gallery-slider').slick({
    accessibility: false,
    infinite: false,
    slidesToShow: 4,
    responsive: [{
      breakpoint: 770,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 567,
      settings: {
        slidesToShow: 1,
        arrows: false
      }
    }]
  });

  $('.gallery-slider [data-fancybox]').fancybox({
    transitionEffect: 'slide',
    loop: true,
    afterShow: function (instance, slide) {
      $('.gallery-slider').slick('slickGoTo', instance.currIndex - 1);
    }
  });

  // Report
  var reportSlider = document.querySelector('.report-slider');

  if (reportSlider) {
    var reportImageOriginWrapper = document.querySelector('.report__image-origin-wrapper');
    var reportImageOrigin = document.querySelector('.report__image-origin');
    reportImageOrigin.addEventListener('load', function (event) {
      setTimeout(function () {
        reportImageOriginWrapper.classList.remove('report__image-origin-wrapper--loading');
      }, 2500);
    });
    reportImageOrigin.src = reportSlider.querySelector('a').href;
  }
  $(reportSlider).on('click', 'a', function (event) {
    event.preventDefault();
    reportImageOrigin.src = this.href;
    reportImageOriginWrapper.classList.add('report__image-origin-wrapper--loading');
  });

  $(reportSlider).slick({
    accessibility: false,
    infinite: false,
    slidesToShow: 5,
    responsive: [{
      breakpoint: 770,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 567,
      settings: {
        slidesToShow: 1,
        arrows: false
      }
    }]
  });


  /*================================
  =            Dest nav            =
  ================================*/

  var destNav = document.querySelector('.dest-nav');

  if (destNav) {
    setTimeout(function () {
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



  /*============================
  =            Tabs            =
  ============================*/

  $('.tabs').tabslet();


  $('.tabs').on('_after', function () {
    $('.gallery-slider:visible').slick('refresh');
  });

  /*=====  End of Tabs  ======*/



  /*====================================
  =            Inline popup            =
  ====================================*/

  $('.js-trigger-inline-popup').magnificPopup({
    mainClass: 'popup-fade',
    focus: 'input',
    removalDelay: 300
  });

  /*=====  End of Inline popup  ======*/





  /*==================================
  =            Input mask            =
  ==================================*/

  $('input[type="tel"]').mask("+7 (999) 999-99-99", {});

  /*=====  End of Input mask  ======*/



  /*=========================================
  =            Vacancy accordion            =
  =========================================*/

  var vacancy = document.querySelector('.vacancy');

  if (vacancy) {
    $(vacancy).collapse({
      open: function () {
        this.slideDown(250);
      },
      close: function () {
        this.slideUp(250);
      },
      query: ".vacancy__item-head"
    });
  }

  /*=====  End of Vacancy accordion  ======*/



  /*=============================================
  =            Filter archive events            =
  =============================================*/

  var archiveEventsList = document.querySelector('.archive-events__list');

  if (archiveEventsList) {
    var $grid = $(archiveEventsList).isotope({
      layoutMode: 'vertical'
    });

    var $filters = $('.archive-events__filter').on('click', 'a', function (event) {
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


/*=======================================
=            Fixed accordion            =
=======================================*/

setTimeout(function () {
  calcHeightFixedAccordion();
}, 100);

$(".fixed-accordion").on("click", ".fixed-accordion__caption", function (event) {
  $(this).closest(".fixed-accordion").toggleClass("fixed-accordion--opened");
  $(this).next(".fixed-accordion__body").slideToggle();
});

function calcHeightFixedAccordion() {
  $(".fixed-accordion").height(function () {
    return $(this).find(".fixed-accordion__caption").outerHeight();
  });
}

/*=====  End of Fixed accordion  ======*/



/*========================================
=            Retail locations            =
========================================*/

ymaps.ready(initRetailMap);

function initRetailMap() {
  // г. Брянск, ул. Бурова, д. 8
  var map1 = new ymaps.Map("retail-map-1", {
    center: [53.2984, 34.3145],
    zoom: 16,
    controls: []
  });

  mapMarker1 = new ymaps.Placemark([53.2984, 34.3145], {
    hintContent: "г. Брянск, ул. Бурова, д. 8"
  }, {
    preset: 'islands#darkOrangeDotIcon'
  });

  map1.behaviors.disable(['scrollZoom']);
  map1.geoObjects.add(mapMarker1);

  // г. Брянск, пр-т. Ст. Димитрова, д. 67
  var map2 = new ymaps.Map("retail-map-2", {
    center: [53.2271, 34.3212],
    zoom: 16,
    controls: []
  });

  mapMarker2 = new ymaps.Placemark([53.2271, 34.3212], {
    hintContent: "г. Брянск, пр-т. Ст. Димитрова, д. 67"
  }, {});

  map2.behaviors.disable(['scrollZoom']);
  map2.geoObjects.add(mapMarker2);

  // г. Брянск, ул. Степная, д. 12
  var map3 = new ymaps.Map("retail-map-3", {
    center: [53.2733, 34.3467],
    zoom: 16,
    controls: []
  });

  mapMarker3 = new ymaps.Placemark([53.2733, 34.3467], {
    hintContent: "г. Брянск, ул. Степная, д. 12"
  }, {});

  map3.behaviors.disable(['scrollZoom']);
  map3.geoObjects.add(mapMarker3);
}

/*=====  End of Retail locations  ======*/



/*===========================================
=            Wholesale locations            =
===========================================*/

ymaps.ready(initWholesalelMap);

function initWholesalelMap() {
  // г. Брянск, ул. Бурова, д. 8
  var map1 = new ymaps.Map("wholesale-map-1", {
    center: [53.2984, 34.3145],
    zoom: 16,
    controls: []
  });

  mapMarker1 = new ymaps.Placemark([53.2984, 34.3145], {
    hintContent: "г. Брянск, ул. Бурова, д. 8"
  }, {
    preset: 'islands#darkOrangeDotIcon'
  });

  map1.behaviors.disable(['scrollZoom']);
  map1.geoObjects.add(mapMarker1);

  // г. Брянск, пр-т. Ст. Димитрова, д. 67
  var map2 = new ymaps.Map("wholesale-map-2", {
    center: [53.2271, 34.3212],
    zoom: 16,
    controls: []
  });

  mapMarker2 = new ymaps.Placemark([53.2271, 34.3212], {
    hintContent: "г. Брянск, пр-т. Ст. Димитрова, д. 67"
  }, {});

  map2.behaviors.disable(['scrollZoom']);
  map2.geoObjects.add(mapMarker2);

  // г. Брянск, ул. Степная, д. 12
  var map3 = new ymaps.Map("wholesale-map-3", {
    center: [53.2733, 34.3467],
    zoom: 16,
    controls: []
  });

  mapMarker3 = new ymaps.Placemark([53.2733, 34.3467], {
    hintContent: "г. Брянск, ул. Степная, д. 12"
  }, {});

  map3.behaviors.disable(['scrollZoom']);
  map3.geoObjects.add(mapMarker3);
}

/*=====  End of Wholesale locations  ======*/



/*==================================================
=            Section contacts accordion            =
==================================================*/

var contactsSectionsList = document.querySelector('.contacts__sections-list');

if (contactsSectionsList) {
  $(contactsSectionsList).collapse({
    open: function () {
      this.slideDown(250);
    },
    close: function () {
      this.slideUp(250);
    },
    query: ".contacts__section-head",
    accordion: true,
  });

  $(contactsSectionsList).bind('opened', function (e, section) {
    setTimeout(function () {
      calcHeightFixedAccordion();
    }, 100);
    if (section.$summary) {
      // contactsMap.setCenter(section.$summary.data('center-map'));
      contactsMap.panTo(section.$summary.data('center-map'));
    }
  });

  ymaps.ready(init);
  var contactsMap = null;

  function init() {
    var centerBryansk = [53.26419, 34.33363];
    var centerOrel = [52.9770, 36.0682];
    var centerSmolensk = [54.7417, 32.0858];

    contactsMap = new ymaps.Map('contacts-map', {
      center: centerBryansk,
      zoom: 12,
      // controls: []
      controls: ["zoomControl", "fullscreenControl"]
    });

    var bryansk1 = new ymaps.Placemark([53.2984, 34.3145], {
      hintContent: 'г. Брянск, ул. Бурова, д. 8',
    }, {
      preset: 'islands#darkOrangeDotIcon'
    });

    var bryansk2 = new ymaps.Placemark([53.2271, 34.3212], {
      hintContent: 'г. Брянск, пр-т. Ст. Димитрова, д. 67'
    });

    var bryansk3 = new ymaps.Placemark([53.2733, 34.3467], {
      hintContent: 'г. Брянск, ул. Степная, д. 12'
    });

    var orel1 = new ymaps.Placemark([52.9770, 36.0682], {
      hintContent: 'г. Орёл, ул. Красноармейская, д. 1'
    });

    var smolensk1 = new ymaps.Placemark([54.7417, 32.0858], {
      hintContent: 'г. Смоленск, пос. Тихвинка, д. 71'
    });

    contactsMap.geoObjects.add(bryansk1);
    contactsMap.geoObjects.add(bryansk2);
    contactsMap.geoObjects.add(bryansk3);
    contactsMap.geoObjects.add(orel1);
    contactsMap.geoObjects.add(smolensk1);
  }
}

/*=====  End of Section contacts accordion  ======*/
