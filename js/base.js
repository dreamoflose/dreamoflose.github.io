(function($){
  // Search
  var $searchWrap = $('#search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function(){
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback){
    setTimeout(function(){
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('#nav-search-btn').on('click', function(){
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function(){
      $('.search-form-input').focus();
    });
  });

  $('.search-form-input').on('blur', function(){
    startSearchAnim();
    $searchWrap.removeClass('on');
    stopSearchAnim();
  });

  // Share
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    var $title = $(this).parent().parent().find('.article-title').text();

    if ($('#' + id).length){
      var box = $('#' + id);

      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
          '<div class="article-share-links" style="border-bottom: 1px solid #eee;">',
            '<a href="http://service.weibo.com/share/share.php?url=' + encodedUrl + '&title='+$title+'&appkey=255561932&searchPic=true" class="article-share-twitter iconfont icon-weibo" target="_blank" title="Weibo"></a>',
            '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook iconfont icon-weixin" target="_blank" title="Weixin"></a>',
            '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest iconfont icon-QQ" target="_blank" title="QQ"></a>',
            '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google iconfont icon-zhihu" target="_blank" title="zhihu"></a>',
          '</div>',
          '<div class="article-share-links">',
            '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter iconfont icon-twitter" target="_blank" title="Twitter"></a>',
            '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook iconfont icon-facebook" target="_blank" title="Facebook"></a>',
            '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest iconfont icon-pinterest" target="_blank" title="Pinterest"></a>',
            '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google iconfont icon-Google" target="_blank" title="Google+"></a>',
          '</div>',
        '</div>'
      ].join('');

      var box = $(html);

      $('body').append(box);
    }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  // Caption
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  // Mobile nav
  var $container = $('#container'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function(){
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function(){
    setTimeout(function(){
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  }

  $('#main-nav-toggle').on('click', function(){
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });

  $('#wrap').on('click', function(){
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;

    $container.removeClass('mobile-nav-on');
  });

  /*-- CNZZ Analytics --*/
  var cnzz_s_tag = document.createElement('script');
  cnzz_s_tag.type = 'text/javascript';
  cnzz_s_tag.async = true;
  cnzz_s_tag.charset = "utf-8";
  cnzz_s_tag.src = "https://w.cnzz.com/c.php?id=1261432707&async=1";
  var root_s = document.getElementsByTagName('script')[0];
  root_s.parentNode.insertBefore(cnzz_s_tag, root_s);
  /*-- End CNZZ Analytics --*/
  /*-- baidu Analytics --*/
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?5311832a833e7e1c3a4e0144704461a3";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
  /*-- End baidu Analytics --*/



  /*back top*/
   function mScrollTop(element, settings) {

        var _ = this,
            breakpoint;
        var scrollTo = 0;

        _.btnClass = '.icon-top';
        _.revealClass = 'reveal';
        _.btnElement = $(_.btnClass);

        _.initial = {
            revealElement: 'body',
            revealPosition: 'top',
            padding: 0,
            duration: 600,
            easing: 'swing',
            onScrollEnd: false
        }

        _.options = $.extend({}, _.initial, settings);

        _.revealElement = $(_.options.revealElement);
        breakpoint = _.options.revealPosition !== 'bottom' ? _.revealElement.offset().top : _.revealElement.offset().top + _.revealElement.height();
        scrollTo = element.offsetTop + _.options.padding;

        $(document).scroll(function() {
            if (breakpoint < $(document).scrollTop()) {
                _.btnElement.addClass(_.revealClass);
            } else {
                _.btnElement.removeClass(_.revealClass);
            }
        });

        _.btnElement.click(function() {
            var trigger = true;
            $('html, body').animate({
                scrollTop: scrollTo
            }, _.options.duration, _.options.easing, function() {
                if (trigger) { // Fix callback triggering twice on chromium
                    trigger = false;
                    var callback = _.options.onScrollEnd;
                    if (typeof callback === "function") {
                        callback();
                    }
                }
            });
            return false;
        });
    }

    $.fn.materialScrollTop = function() {
        var _ = this,
            opt = arguments[0],
            l = _.length,
            i = 0;
        if (typeof opt == 'object' || typeof opt == 'undefined') {
            _[i].materialScrollTop = new mScrollTop(_[i], opt);
        }
        return _;
    };

  $('body').materialScrollTop({
    revealElement: 'header',
    revealPosition: 'bottom'
  });
})(jQuery);
