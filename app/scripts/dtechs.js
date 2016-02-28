/* jshint ignore: start */
/* lint ignore: start */
(function(document) {
  'use strict';
  var vin = true;
  
  //global scope reference (for variables)
  var app = document.getElementById('dmobile');

  // Sets app default base URL
  app.baseUrl = '/dm/';
  if (window.location.port === '') {  // if production
    // Uncomment app.baseURL below and
    // set app.baseURL to '/your-pathname/' if running from folder in production
    app.baseUrl = '/dm/';
  }

  /* app.displayInstalledToast = function() { */
  /*   // Check to make sure caching is actually enabled—it won't be in the dev environment. */
  /*   if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) { */
  /*     Polymer.dom(document).querySelector('#caching-complete').show(); */
  /*   } */
  /* }; */

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    /* console.log('Our app is ready to rock!'); */
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
  });

  // Scroll page to top and expand header
  app.scrollPageToTop = function() {
    document.querySelector('#headerPanelMain').scrollToTop(true);
    /* app.$.headerPanelMain.scrollToTop(true); */
  };

  app.closeDrawer = function() {
    document.querySelector('#paperDrawerPanel').closeDrawer();
    /* app.$.paperDrawerPanel.closeDrawer(); */
  };

  //build vehicle tab
  buildVehTab('dball2', vin);
  
  //build fw tab
  buildFwTab('dball2');

  //build flash tab
  buildFlashTab();

  /* window.onload = moduleConnected(vin); */

})(document);

function updateAppTitle(s) {
  var title = document.querySelector('#navHeading');
  if (s === 'digital') {
    title.firstChild.textContent = 'Digital Systems';
  } else {
    title.firstChild.textContent = 'Main Menu';
  }
};

app.setRoute = function(url) {
  var route = document.querySelector('home-screen');
  /* window.location.href = app.baseUrl + url; */
  console.log(url);
  if (url === 'digital') {
    route.route = url;
    moduleConnected(vin);
  } else {
    app.notAvail();
  }
};

function fabAction() {
  window.location.href = 'http://dm.joelgomez.me/';
  console.log('reloading...');
};

function getRoute(e) {
  var route = document.querySelector('home-screen');
  /* console.log(route.route); */
  updateAppTitle($(e).attr('data-route'));
  console.log('attribute:' + $(e).attr('data-route'));
  if ($(e).prop('tagName') === 'MENU-CARD') {
    return $(e).attr('data-route');
  } else if ($(e).attr('data-route') === 'digital') {
    moduleConnected(vin);
  } else {
    route.route = 'home';
  }
};

function vinDetected() {
  var toast = document.getElementsByTagName('paper-toast')[1];
  toast.text = vinToast;
  toast.open();
  var sMake = $('veh-dropdown').find('paper-menu');
  sMake.select('0');
};

function showFab() {
  $('paper-fab').show();
};

app.notAvail = function() {
  /* document.querySelector('paper-toast').open(); */
  var toast = document.getElementsByTagName('paper-toast')[0];
  toast.text = demoToast;
  toast.open();
};

function stepProgress(speed) {
  var progress = document.getElementsByTagName('paper-progress')[1];
  var timer = setInterval(function() {
    if (progress.value >= 100) {
      clearInterval(timer);
      $('paper-spinner-lite').hide();
      $('#flash-done').show();
      $('#dia-close').removeAttr('disabled');
      /* console.log('finished!'); */
    } else {
      progress.value += 1;
      $('#flash-progress').html(progress.value);
      /* console.log(progress.value); */
    }
  }, speed);
};

function vinDialog() {
  var dia = new VinDialog();
  var page = document.querySelector('#dmobile');
  Polymer.dom(page).appendChild(dia);
  dia.open();
};

function flashDialog() {
  var dia = document.getElementById('flash-screen');
  var progress = document.getElementsByTagName('paper-progress')[1];
  $('#dia-close').attr('disabled', true);
  $('#flash-done').hide();
  $('paper-spinner-lite').show();
  dia.open();
  progress.value = 0;
  stepProgress(40);
};

function toggleAssist(elem) {
  var btn = $(elem).next();
  toggleSw('#' + btn.attr('id'));
};

function toggleMore(card) {
  var par = card.parentElement;
  var tog = par.previousElementSibling;
  tog.toggle();
  if (card.firstChild.textContent === 'More') {
    card.firstChild.textContent = 'Less';
  } else {
    card.firstChild.textContent = 'More';
  }
}

function toggleCollapse(id) {
  var tog = document.querySelector(id);
  tog.toggle();
  var icon = $(id).prev().find('iron-icon');
  if (icon.hasClass('rotate')) {
    icon.removeClass('rotate');
  } else {
    icon.addClass('rotate');
  }
};

function toggleSw(id) {
  var tog = document.querySelector(id);
  if (tog.hasAttribute('checked')) {
    tog.removeAttribute('checked');
  } else {
    tog.setAttribute('checked', true);
  }
};

function buildFlashTab() {
  //flash tab ref
  var tab = document.getElementById('finish-tab');

  //create content
  var flash = new FlashOptions();

  //attach content to tab
  tab.appendChild(flash);
};

function buildFwTab(module) {
  //firmware tab reference
  var fwTab = document.getElementById('firmware-tab');

  //create cards
  var oem = getFirmware('3x');
  var std = getFirmware('std');
  var rsr = getFirmware('rsr');

  //attach cards to DOM
  fwTab.appendChild(oem);
  fwTab.appendChild(std);
  fwTab.appendChild(rsr);
};

function getFirmware(fwType) {
  if (fwType === '3x') {
    var card = new FwInfo('3X Lock Start', fwType);
  } else if (fwType === 'rsr') {
    var card = new FwInfo('Remote Start Ready', fwType);
  } else {
    var card = new FwInfo('Standard Installation', fwType);
  }

  return card;
};

function buildVehTab(module, vin) {
  //vehicle tab reference
  var vehTab = document.getElementById('vehicle-tab');

  //create cards
  var kitInfoCard = getKitInfo(module);
  var vehSelect = getLookup(vin);

  //attach cards to DOM
  vehTab.appendChild(kitInfoCard);
  vehTab.appendChild(vehSelect);
};

function getKitInfo(module) {
  //global ref to variables
  var app = document.getElementById('dmobile');

  //get kit info for given module
  if (module === 'dds') {
    var kitInfo = new KitInfo(app.kitInfoDigital);
  } else {
    var kitInfo = new KitInfo(app.kitInfoArr);
  }

  //create base
  var kitInfoCard = new TechCard('Kit Info');

  //add kit info object to card
  Polymer.dom(kitInfoCard).appendChild(kitInfo);

  return kitInfoCard;
};

function getLookup(vin) {
  //create base
  var vehSelect = new TechCard('Vehicle Lookup');

  //populate veh selection boxes
  popVehSel(vehSelect, vin);

  return vehSelect;
};

function gotoFlash(sel) {
  /* $('#mainPanel').scrollTop(0); */
  $('flash-page').find('#mainContainer').scrollTop(0);
  var page = document.getElementsByTagName('flash-page');
  var tab = document.getElementsByTagName('paper-tab');
  if (!sel) {
    fwd();
  } 
  $(tab[2]).removeClass('unavail');
  $(tab[2]).removeAttr('disabled');
  page[0].selected = 2;
  backwd();
};

function gotoFirmware(sel) {
  $('flash-page').find('#mainContainer').scrollTop(0);
  /* $('#mainPanel').scrollTop(0); */
  $('paper-fab').hide();
  var page = document.getElementsByTagName('flash-page');
  var tab = document.getElementsByTagName('paper-tab');
  if (!sel) {
    fwd();
  } else {
    $(tab[2]).addClass('unavail');
    $(tab[2]).attr('disabled', true);
  }
  $(tab[1]).removeClass('unavail');
  $(tab[1]).removeAttr('disabled');
  page[0].selected = 1;
  backwd();
};

function gotoVehicle(sel) {
  var tab = document.getElementsByTagName('paper-tab');
  $(tab[1]).addClass('unavail');
  $(tab[2]).addClass('unavail');
  $(tab[1]).attr('disabled', true);
  $(tab[2]).attr('disabled', true);
  var page = document.getElementsByTagName('flash-page');
  page[0].selected = 0;
  moduleConnected(vin);
};

function fwd() {
  var anim = document.getElementsByTagName('flash-page')[0];
  anim.entryAnimation = 'slide-from-right-animation';
  anim.exitAnimation = 'slide-left-animation';
};

function backwd() {
  var anim = document.getElementsByTagName('flash-page')[0];
  anim.entryAnimation = 'slide-from-left-animation';
  anim.exitAnimation = 'slide-right-animation';
};

function moduleConnected(vin) {
  var page = document.getElementsByTagName('flash-page');
  if (page[0].selected == 0) {
    if (vin) {
      /* vinDetected(); */
      console.log('VIN Detected');
    }
    console.log('Module Ready!');
    /* $('html, body').delay(500).animate({ */
    $('flash-page').find('#mainContainer').delay(500).animate({
      /* scrollTop: $('#vehSelectMarker').offset().top */
      scrollTop: $('flash-page').find('#mainContainer').height()
    }, 1000);
  }
  vinDialog();
};

function popVehSel(card, vin) {
  var makes = ['Toyota'];
  var models = ['Corolla'];
  var years = ['2015'];
  var make = new VehDropdown('Select Make', makes);
  var model = new VehDropdown('Select Model', models);
  var year = new VehDropdown('Select Year', years);
  if (vin) {
    make.vinDetected();
    model.vinDetected();
    year.vinDetected();
    var vinNotice = document.createElement('span');
    $(vinNotice).html(vinToast);
    Polymer.dom(card).appendChild(vinNotice);
  }

  Polymer.dom(card).appendChild(make);
  Polymer.dom(card).appendChild(model);
  Polymer.dom(card).appendChild(year);

  //add submit button
  var buttonRow = document.createElement('div');
  buttonRow.setAttribute('class', 'buttonRow');
  var submit = document.createElement('paper-button');
  submit.setAttribute('raised', true);
  submit.setAttribute('onclick', 'gotoFirmware()');
  submit.innerHTML = 'SUBMIT';
  buttonRow.appendChild(submit);
  Polymer.dom(card).appendChild(buttonRow);
};
/* lint ignore:end */
/* jshint ignore:end */
