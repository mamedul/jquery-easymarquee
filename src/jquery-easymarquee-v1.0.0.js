/**
 * jQuery.easyMarquee - jQuery easyMarquee - Easy marqueee effect jQuery plugin
 * 
 * Copyright (c) 2022 by MAMEDUL ISLAM (https://mamedul.github.io/)
 *
 * Licensed under the MIT license:
 *   https://opensource.org/licenses/MIT
 *
 * Project home:
 *   https://mamedul.gitlab.io/dev-projects/jquery-easymarquee
 * 
 * Version: 1.0.0
 */
(function($){

    "use strict";

    if($.fn && $.fn.jquery){
		
        $.fn.easyMarquee = function(options){

            var opts = {
                'side' : 'horizontal', // side- vertical and horizontal
                'speed' : 100, // Speed
                'running' : null, // Event
                'paused' : null, // Event
                'revert' : null, // Event
                'multiplier' : 2, // Multiplier
                'timingFunction' : 'linear', // Animation property
                'delay' : '1s', // Animation property
                'direction' : 'normal', // Animation property
                'iteration' : 'infinite', // Animation property
                'fillMode' : 'none', // Animation property
                'playState' : 'running', // Animation property
            };

            opts = $.extend( opts, options ) || opts;
            opts = $.extend( opts, {'randNumber' : Math.floor(Math.random()*(999999-9999)+9999) } ) || opts;
            
            var marquee = function(index,selector){
                
                var opt = opts;
                    opt = $.extend( opt, { 'selector': selector } ) || opt;

                var $gallery = $(selector);
                var $gallery_parent = $gallery.parent();
                var $gallery_items = $gallery.children();
                
                var scroll = opt;

                scroll.css = '';

                scroll.init = function(){

                    var _this = this;
                    $gallery = $(selector);
                    $gallery_parent = $gallery.parent();
                    $gallery_items = $gallery.children();
                    var gp_width = $gallery_parent.innerWidth();
                    var gi_width = 0;
                    $gallery_items.each(function(index,item){
                        gi_width+= $(this).outerWidth(true);
                    });

                    if(gp_width*this.multiplier>gi_width){
                        var tg_width = gp_width*this.multiplier;
                        var tg_widthMultiplier = Math.ceil( tg_width/gi_width );
                        for( var i=0; tg_widthMultiplier>i; i++ ){
                            $gallery_items.each(function(index,item){
                                $(this||item).clone().attr('data-cloned','true').appendTo( $gallery );
                            });
                        }
                        gp_width = $gallery_parent.innerWidth();
                        gi_width = 0;
                        $gallery_items = $gallery.children();
                        $gallery_items.each(function(index,item){
                            gi_width+= $(this).outerWidth(true);
                        });
                    }

                    this.scrollWidth = gi_width;
                    this.width = gp_width;
                    this.scrollableWidth = gi_width - gp_width;
                    this.scrollableNegWidth = this.scrollableWidth*-1;
                    
                    $gallery_parent.attr('data-width',this.width);
                    $gallery_parent.data('width',this.width);
                    $gallery.attr('data-scrollable',this.scrollableWidth);
                    $gallery.data('scrollable',this.scrollableWidth);
                    $gallery.attr('data-scroll',this.scrollWidth);
                    $gallery.data('scroll',this.scrollWidth);
                    $gallery.attr('data-width',this.scrollWidth);
                    $gallery.data('width',this.scrollWidth);
                    $gallery.css('width',this.scrollWidth+'px');

                    this.speedCalc = (gp_width/this.speed)*gi_width;
                    this.speedCalc = Math.floor(this.speedCalc);
                    this.speedCalc = Math.floor(this.speedCalc/1000);
                    this.animName =  'easyMarquee_'+this.randNumber+'_'+(index+1);
                    this.translate = this.scrollableNegWidth+'px';

                    this.css+='@-webkit-keyframes '+this.animName+'{100% {-webkit-transform:translateX('+this.translate+');transform:translateX('+this.translate+');}}';
                    this.css+='@keyframes '+this.animName+'{100%{-webkit-transform:translateX('+this.translate+');transform:translateX('+this.translate+');}}';

                    $('<style id="'+this.animName+'" class="easyMarquee_class">'+this.css+'</style>').appendTo(document.head||document.body);

                    $gallery.css({
                        'animation-duration' : this.speedCalc+'s',
                        'animation-timing-function' : this.timingFunction,
                        'animation-delay' : this.delay,
                        'animation-iteration-count' : this.iteration,
                        'animation-direction' : this.direction,
                        'animation-fill-mode' : this.fillMode,
                        'animation-play-state' : this.playState,
                        'animation-name' : this.animName
                    });

                    

                    if(typeof opt.running=='string' ){ $gallery.on(opt.running, animRunning); }
                    if(typeof opt.paused=='string' ){ $gallery.on(opt.paused, animPaused); }
                    if(typeof opt.revert=='string' ){ $gallery.on(opt.revert, animRevert); }
                    $(window).on('resize', resizer);

                    _this = null;

                };

                var animRunning = function(e){
                    $(this||e.target).css('animation-play-state', 'running');
                };

                var animPaused = function(e){
                    $(this||e.target).css('animation-play-state', 'paused');
                };

                var animRevert = function(e){
                    $(this||e.target).css('animation-play-state', 'revert');
                };
                
                var resizer = function(){
                    if(typeof opt.running=='string' ){ $gallery.on(opt.running, animRunning); }
                    if(typeof opt.running=='string' ){ $gallery.on(opt.running, animRunning); }
                    if(typeof opt.paused=='string' ){ $gallery.on(opt.paused, animPaused); }
                    if(typeof opt.paused=='string' ){ $gallery.on(opt.paused, animPaused); }
                    if(typeof opt.revert=='string' ){ $gallery.on(opt.revert, animRevert); }
                    if(typeof opt.revert=='string' ){ $gallery.on(opt.revert, animRevert); }
                    $(window).off('resize', resizer);
                    $(window).off('resize', resizer);
                    $('.easyMarquee_class').remove();
                    $('.easyMarquee_class').remove();
                    $gallery.css('animation-delay', '0s');
                    setTimeout(function(){scroll.init();},200);
                };

                scroll.init();

            };

            ( (this.fn && this.fn.jquery) ? this : $(this) ).each(function(index,item){
                marquee(index,this||item);
                return this||item;
            });

            ( (this.fn && this.fn.jquery) ? this : $(this) ).pluginBy = 'MAMEDUL ISLAM';

            return ( (this.fn && this.fn.jquery) ? this : $(this) );

        }

    }else{
        console.log("%cWarning: %s", 'color:#e4672e;font-size:200%;', 'Need jQuery');
    }

})(jQuery||{});