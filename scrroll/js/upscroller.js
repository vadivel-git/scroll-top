
Framework7.prototype.plugins.upscroller = function (app, globalPluginParams) {
  'use strict';
  
  var Upscroller = function (text) {
    var self = this,
      $$ = Dom7,
      curpage = $('.page-content:nth-child(1)').get(0);
    
    var $$pages = $$('.page-content');
    var $$btn = $$('<div class="upscroller">â†‘ ' + text + '</div>');
    var $$body = $$('body');
    $$body.prepend($$btn);

    $$btn.click(function(event){
      event.stopPropagation();
      event.preventDefault();
      $(curpage).animate({scrollTop:0}, Math.round(curpage.scrollTop/4));
    });

    $$pages.scroll(function(event){
      var page = event.target;
      if (page.scrollTop > 300) {
        $$btn.addClass('show');
      }
      else {
        $$btn.removeClass('show');
      }
    });
    
    $$pages.each(function (i, page) {
      var pagename = $$(page).parent().attr('data-page');
      app.onPageBeforeAnimation(pagename, function (thepage) {
        curpage = $(thepage.container).children('.page-content').get(0);
        var scrollpos = curpage.scrollTop;
        if (scrollpos > 300) {
          $$btn.addClass('show');
        }
        else {
          $$btn.removeClass('show');
        }
      });
    });
    
    return this;
  };
  
  app.upscroller = function (text) {
    return new Upscroller(text);
  };
  
};



var fw7App,
  fw7ViewOptions,
  mainView;

fw7App = new Framework7({
  animateNavBackIcon: true
});

fw7ViewOptions = {
  dynamicNavbar: true,
  domCache: true
};

mainView = fw7App.addView('.view-main', fw7ViewOptions);

var upscroller = fw7App.upscroller('Go up')

var $scroller = $(".page-content");
$scroller.bind('touchstart', function (ev) {
  var $this = $(this);
  var scroller = $scroller.get(0);

  if ($this.scrollTop() === 0) $this.scrollTop(1);
  var scrollTop = scroller.scrollTop;
  var scrollHeight = scroller.scrollHeight;
  var offsetHeight = scroller.offsetHeight;
  var contentHeight = scrollHeight - offsetHeight;
  if (contentHeight == scrollTop) $this.scrollTop(scrollTop-1);
});