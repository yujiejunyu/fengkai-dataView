(window.webpackJsonp=window.webpackJsonp||[]).push([[86],{K79h:function(e,t,r){"use strict";var o=r("Iv0b");function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(t,e){var r,o=Object.keys(t);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(t),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),o.push.apply(o,r)),o}function n(o){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach(function(e){var t,r;t=o,r=n[e=e],(e=function(e){e=function(e,t){if("object"!==i(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0===r)return("string"===t?String:Number)(e);r=r.call(e,t||"default");if("object"!==i(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}(e,"string");return"symbol"===i(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach(function(e){Object.defineProperty(o,e,Object.getOwnPropertyDescriptor(n,e))})}return o}var s="sm-component-message",l=o.default.config;l({prefixCls:s}),o.default.config=function(e){e.prefixCls&&e.prefixCls!==s&&o.default.destroy(),l(n(n({},e),{},{prefixCls:e.prefixCls||s}))},t.a=o.default},bIX3:function(H,e,t){"use strict";t.r(e);var r=t("oCYn"),o=t("YKMj"),i=(t("/aIJ"),t("8OJ3")),n=t("/Hi2"),a=t.n(n),s=(t("Tqys"),t("ewaw")),n=t("vgmO"),l=t.n(n);var n=i.a.getComponent("Tech"),u=i.a.dom,c=i.a.url,p=i.a.createTimeRange,y=i.a.mergeOptions,d=l.a&&l.a.navigator||{},f=function(r){var e=n,t=r;if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);function n(e,t){if(this instanceof n)return t=function(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(this,r.call(this,e,t)),e.source&&t.ready(function(){this.setSource(e.source)},!0),e.startTime&&t.ready(function(){this.load(),this.play(),this.currentTime(e.startTime)},!0),l.a.videojs=l.a.videojs||{},l.a.videojs.Flash=l.a.videojs.Flash||{},l.a.videojs.Flash.onReady=n.onReady,l.a.videojs.Flash.onEvent=n.onEvent,l.a.videojs.Flash.onError=n.onError,t.on("seeked",function(){this.lastSeekTarget_=void 0}),t;throw new TypeError("Cannot call a class as a function")}return e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t),n.prototype.createEl=function(){var e=this.options_,t=(e.swf||(e.swf="https://vjs.zencdn.net/swf/"+s.a+"/video-js.swf"),e.techId),r=y({readyFunction:"videojs.Flash.onReady",eventProxyFunction:"videojs.Flash.onEvent",errorEventProxyFunction:"videojs.Flash.onError",autoplay:e.autoplay,preload:e.preload,loop:e.loop,muted:e.muted},e.flashVars),o=y({wmode:"opaque",bgcolor:"#000000"},e.params),t=y({id:t,name:t,class:"vjs-tech"},e.attributes);return this.el_=n.embed(e.swf,r,o,t),(this.el_.tech=this).el_},n.prototype.play=function(){this.ended()&&this.setCurrentTime(0),this.el_.vjs_play()},n.prototype.pause=function(){this.el_.vjs_pause()},n.prototype.src=function(e){return void 0===e?this.currentSrc():this.setSrc(e)},n.prototype.setSrc=function(e){var t=this;e=c.getAbsoluteURL(e),this.el_.vjs_src(e),this.autoplay()&&this.setTimeout(function(){return t.play()},0)},n.prototype.seeking=function(){return void 0!==this.lastSeekTarget_},n.prototype.setCurrentTime=function(e){var t=this.seekable();t.length&&(e=(e=e>t.start(0)?e:t.start(0))<t.end(t.length-1)?e:t.end(t.length-1),this.lastSeekTarget_=e,this.trigger("seeking"),this.el_.vjs_setProperty("currentTime",e),r.prototype.setCurrentTime.call(this))},n.prototype.currentTime=function(){return this.seeking()?this.lastSeekTarget_||0:this.el_.vjs_getProperty("currentTime")},n.prototype.currentSrc=function(){return this.currentSource_?this.currentSource_.src:this.el_.vjs_getProperty("currentSrc")},n.prototype.duration=function(){var e;return 0===this.readyState()?NaN:0<=(e=this.el_.vjs_getProperty("duration"))?e:1/0},n.prototype.load=function(){this.el_.vjs_load()},n.prototype.poster=function(){this.el_.vjs_getProperty("poster")},n.prototype.setPoster=function(){},n.prototype.seekable=function(){var e=this.duration();return 0===e?p():p(0,e)},n.prototype.buffered=function(){var e=this.el_.vjs_getProperty("buffered");return 0===e.length?p():p(e[0][0],e[0][1])},n.prototype.supportsFullScreen=function(){return!1},n.prototype.enterFullScreen=function(){return!1},n.prototype.getVideoPlaybackQuality=function(){var e=this.el_.vjs_getProperty("getVideoPlaybackQuality");return l.a.performance&&"function"==typeof l.a.performance.now?e.creationTime=l.a.performance.now():l.a.performance&&l.a.performance.timing&&"number"==typeof l.a.performance.timing.navigationStart&&(e.creationTime=l.a.Date.now()-l.a.performance.timing.navigationStart),e},n}(n),h=["rtmpConnection","rtmpStream","preload","defaultPlaybackRate","playbackRate","autoplay","loop","controls","volume","muted","defaultMuted"],m=["networkState","readyState","initialTime","startOffsetTime","paused","ended","videoWidth","videoHeight"],v=f.prototype;function b(e){v[e]=function(){return this.el_.vjs_getProperty(e)}}for(var g=0;g<h.length;g++)b(h[g]),!function(t){var e=t.charAt(0).toUpperCase()+t.slice(1);v["set"+e]=function(e){return this.el_.vjs_setProperty(t,e)}}(h[g]);for(var P,O=0;O<m.length;O++)b(m[O]);f.isSupported=function(){return!((!i.a.browser.IS_CHROME||i.a.browser.IS_ANDROID&&i.a.browser.IS_IOS)&&(!i.a.browser.IS_SAFARI||i.a.browser.IS_IOS)&&!i.a.browser.IS_EDGE)||10<=f.version()[0]},n.withSourceHandlers(f),f.nativeSourceHandler={},f.nativeSourceHandler.canPlayType=function(e){return e in f.formats?"maybe":""},f.nativeSourceHandler.canHandleSource=function(e,t){var r=void 0;return r=e.type?e.type.replace(/;.*/,"").toLowerCase():(e=e.src,(e=c.getFileExtension(e))?"video/"+e:""),f.nativeSourceHandler.canPlayType(r)},f.nativeSourceHandler.handleSource=function(e,t,r){t.setSrc(e.src)},f.nativeSourceHandler.dispose=function(){},f.registerSourceHandler(f.nativeSourceHandler),f.formats={"video/flv":"FLV","video/x-flv":"FLV","video/mp4":"MP4","video/m4v":"MP4"},f.onReady=function(e){e=u.$("#"+e),e=e&&e.tech;e&&e.el()&&f.checkReady(e)},f.checkReady=function(e){e.el()&&(e.el().vjs_getProperty?e.triggerReady():this.setTimeout(function(){f.checkReady(e)},50))},f.onEvent=function(e,t){var r=u.$("#"+e).tech,o=Array.prototype.slice.call(arguments,2);r.setTimeout(function(){r.trigger(t,o)},1)},f.onError=function(e,t){e=u.$("#"+e).tech;if("srcnotfound"===t)return e.error(4);"string"==typeof t?e.error("FLASH: "+t):(t.origin="flash",e.error(t))},f.version=function(){var t="0,0,0";try{t=new l.a.ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g,",").match(/^,?(.+),?$/)[1]}catch(e){try{d.mimeTypes["application/x-shockwave-flash"].enabledPlugin&&(t=(d.plugins["Shockwave Flash 2.0"]||d.plugins["Shockwave Flash"]).description.replace(/\D+/g,",").match(/^,?(.+),?$/)[1])}catch(e){}}return t.split(",")},f.embed=function(e,t,r,o){e=f.getEmbedCode(e,t,r,o);return u.createEl("div",{innerHTML:e}).childNodes[0]},f.getEmbedCode=function(e,t,r,o){var n="",i="",a="";return t&&Object.getOwnPropertyNames(t).forEach(function(e){n+=e+"="+t[e]+"&amp;"}),r=y({movie:e,flashvars:n,allowScriptAccess:"always",allowNetworking:"all"},r),Object.getOwnPropertyNames(r).forEach(function(e){i+='<param name="'+e+'" value="'+r[e]+'" />'}),o=y({data:e,width:"100%",height:"100%"},o),Object.getOwnPropertyNames(o).forEach(function(e){a+=e+'="'+o[e]+'" '}),'<object type="application/x-shockwave-flash" '+a+">"+i+"</object>"},(P=f).streamingFormats={"rtmp/mp4":"MP4","rtmp/flv":"FLV"},P.streamFromParts=function(e,t){return e+"&"+t},P.streamToParts=function(e){var t,r,o={connection:"",stream:""};return e&&(r=void 0,-1!==(t=e.search(/&(?![\w-]+=)/))?r=t+1:0===(t=r=e.lastIndexOf("/")+1)&&(t=r=e.length),o.connection=e.substring(0,t),o.stream=e.substring(r,e.length)),o},P.isStreamingType=function(e){return e in P.streamingFormats},P.RTMP_RE=/^rtmp[set]?:\/\//i,P.isStreamingSrc=function(e){return P.RTMP_RE.test(e)},P.rtmpSourceHandler={},P.rtmpSourceHandler.canPlayType=function(e){return P.isStreamingType(e)?"maybe":""},P.rtmpSourceHandler.canHandleSource=function(e,t){var r=P.rtmpSourceHandler.canPlayType(e.type);return r||(P.isStreamingSrc(e.src)?"maybe":"")},P.rtmpSourceHandler.handleSource=function(e,t,r){e=P.streamToParts(e.src);t.setRtmpConnection(e.connection),t.setRtmpStream(e.stream)},P.registerSourceHandler(P.rtmpSourceHandler),n.getTech("Flash")?(i.a.log.warn("Not using videojs-flash as it appears to already be registered"),i.a.log.warn("videojs-flash should only be used with video.js@6 and above")):i.a.registerTech("Flash",f),f.VERSION="2.2.1";function j(e){return(j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function M(e,t,r){return(t=function(e){e=function(e,t){if("object"!==j(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0===r)return("string"===t?String:Number)(e);r=r.call(e,t||"default");if("object"!==j(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}(e,"string");return"symbol"===j(e)?e:String(e)}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var L=window.videojs||i.a,n={name:"videoplayer",props:{crossOrigin:{type:String,default:""},playsinline:{type:Boolean,default:!1},customEventName:{type:String,default:"statechanged"},options:{type:Object,required:!0},events:{type:Array,default:function(){return[]}},globalOptions:{type:Object,default:function(){return{autoplay:!0,controls:!0,language:"zh",inactivityTimeout:0,preload:"auto",fluid:!1,techOrder:["html5"],plugins:{}}}},globalEvents:{type:Array,default:function(){return[]}},trackList:{type:Array,default:function(){return[]}}},data:function(){return{player:null,reseted:!0}},methods:{initialize:function(){var n=this,i=this,e=this.$refs.video,t=Object.assign({},this.globalOptions,this.options);this.playsinline&&(e.setAttribute("playsinline",this.playsinline),e.setAttribute("webkit-playsinline",this.playsinline),e.setAttribute("x5-playsinline",this.playsinline),e.setAttribute("x5-video-player-type","h5"),e.setAttribute("x5-video-player-fullscreen",!1)),""!==this.crossOrigin&&(e.crossOrigin=this.crossOrigin,e.setAttribute("crossOrigin",this.crossOrigin)),t.plugins&&delete t.plugins.__ob__;this.player=L(e,t,function(){for(var e=this,t=["loadeddata","canplay","canplaythrough","play","pause","waiting","playing","ended","error"].concat(i.events).concat(i.globalEvents),o={},r=0;r<t.length;r++)"string"==typeof t[r]&&void 0===o[t[r]]&&!function(r){o[r]=null,e.on(r,function(){var e,t;t=!0,(e=r)&&n.$emit(e,n.player),t&&n.$emit(n.customEventName,M({},e,t))})}(t[r]);i.$emit("ready",this)})},dispose:function(e){var t=this;this.player&&this.player.dispose&&("Flash"!==this.player.techName_&&this.player.pause&&this.player.pause(),this.player.dispose(),this.player=null,this.$nextTick(function(){t.reseted=!1,t.$nextTick(function(){t.reseted=!0,t.$nextTick(function(){e&&e()})})}))}},watch:{options:{deep:!0,handler:function(e,t){var r=this;this.dispose(function(){e&&e.sources&&e.sources.length&&r.initialize()})}}},mounted:function(){this.player||this.initialize()},beforeDestroy:function(){this.player&&this.dispose()}},w=t("KHd+"),n=Object(w.a)(n,function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.reseted?r("div",[r("video",{ref:"video",staticClass:"video-js"},[e._l(e.trackList,function(e,t){return r("track",{key:t,attrs:{kind:e.kind,label:e.label,src:e.src,srcLang:e.srcLang,default:e.default}})}),e._v(" "),e._m(0)],2)]):e._e()},[function(){var e=this.$createElement,e=this._self._c||e;return e("p",{staticClass:"vjs-no-js"},[this._v("\n      To view this video please enable JavaScript, and consider upgrading to a web browser that\n      "),e("a",{attrs:{href:"https://videojs.com/html5-video-support/",target:"_blank"}},[this._v("supports HTML5 video")])])}],!1,null,"907385c2",null).exports,S=t("zT9C"),N=t.n(S),_=t("g13d"),S=t("oTir"),k=t("ghbr"),T=t("X1Ka"),C=t("tmJK"),T=Object(T.default)().type,T={prefixCls:k.a.string,visible:k.a.bool,confirmLoading:k.a.bool,title:k.a.any,closable:k.a.bool,closeIcon:k.a.any,afterClose:k.a.func,centered:k.a.bool,width:k.a.oneOfType([k.a.string,k.a.number]),footer:k.a.any,okText:k.a.any,okType:T,cancelText:k.a.any,icon:k.a.any,maskClosable:k.a.bool,forceRender:k.a.bool,okButtonProps:k.a.object,cancelButtonProps:k.a.object,destroyOnClose:k.a.bool,wrapClassName:k.a.string,maskTransitionName:k.a.string,transitionName:k.a.string,getContainer:k.a.func,zIndex:k.a.number,bodyStyle:k.a.object,maskStyle:k.a.object,mask:k.a.bool,keyboard:k.a.bool,wrapProps:k.a.object,focusTriggerAfterClose:k.a.bool},k={name:"SmModal",defaultComponent:_.default,mixins:[S.a,C.a],inheritAttrs:!1,model:{prop:"visible",event:"change"},props:T,computed:{extralListeners:function(){var t=this;return{change:function(e){t.$emit("change",e)}}}}},x=Object(w.a)(k,void 0,void 0,!1,null,null,null).exports,F="sm-component-btn";["info","success","error","warn","warning","confirm"].forEach(function(e){var o=_.default[e];x[e]=function(e){var t=(e.okButtonProps||{}).props,t=void 0===t?{}:t,r=(e.cancelButtonProps||{}).props,r=void 0===r?{}:r;return o(Object.assign(Object.assign({},e),{prefixCls:e.prefixCls||"sm-component-modal",okButtonProps:Object.assign(Object.assign({},e.okButtonProps),{props:Object.assign(Object.assign({},t),{prefixCls:t.prefixCls||F})}),cancelButtonProps:Object.assign(Object.assign({},e.cancelButtonProps),{props:Object.assign(Object.assign({},r),{prefixCls:r.prefixCls||F})})}))}}),x.destroyAll=function(){return _.default.destroyAll()};var S=x,E=t("yJ0+");function R(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,function(e){e=function(e,t){if("object"!==A(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0===r)return("string"===t?String:Number)(e);r=r.call(e,t||"default");if("object"!==A(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}(e,"string");return"symbol"===A(e)?e:String(e)}(o.key),o)}}function V(e,t){return(V=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function B(r){var o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var e,t=$(r),t=(e=o?(e=$(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments),this);if(e&&("object"===A(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");if(void 0!==t)return t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}}function $(e){return($=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function A(e){return(A="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}C=function(e,t,r,o){var n,i=arguments.length,a=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"===("undefined"==typeof Reflect?"undefined":A(Reflect))&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var s=e.length-1;0<=s;s--)(n=e[s])&&(a=(i<3?n(a):3<i?n(t,r,a):n(t,r))||a);return 3<i&&a&&Object.defineProperty(t,r,a),a},T=function(e){var t=n;if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&V(t,e);var r,o=B(n);function n(){var e=this,t=n;if(e instanceof t)return(e=o.apply(this,arguments)).isFirst=!0,e.modalVisible=!1,e.playerOptions={},e.modalPlayerOptions={},e;throw new TypeError("Cannot call a class as a function")}return t=n,(e=[{key:"isRtmp",get:function(){return this.checkUrl(this.url)&&-1!==this.url.indexOf("rtmp://")}},{key:"isFlv",get:function(){return!a.a&&this.checkUrl(this.url)&&-1!==this.url.indexOf(".flv")?(console.error(this.$t("warning.flvPlayer")),!1):a.a.isSupported()&&this.checkUrl(this.url)&&-1!==this.url.indexOf(".flv")}},{key:"autoplay",get:function(){return this.options.autoplay&&this.checkUrl(this.url)}},{key:"player",get:function(){return this.modalVisible?this.modalVideoPlayer:this.smPlayer}},{key:"isFullFill",get:function(){return"full"===this.ratio}},{key:"modalVisibleChanged",value:function(){this.modalVisible&&this.modalVideoPlayer&&(this.handlePlayerOptions(),this.modalVideoPlayer.currentTime(0),this.modalVideoPlayer.play()),!this.modalVisible&&this.modalVideoPlayer&&this.modalVideoPlayer.reset()}},{key:"urlChanged",value:function(){this.handlePlayerOptions(),this.replayRtmp()}},{key:"playerOptionsChanged",value:function(){this.player&&this.player.el_&&this.player.load()}},{key:"optionsChanged",value:function(){this.handlePlayerOptions()}},{key:"popupChanged",value:function(){this.options.popupToPlay&&(this.modalVideoPlayer=this.$refs.modalVideoPlayer&&this.$refs.modalVideoPlayer.player)}},{key:"beforeCreate",value:function(){i.a||console.error(this.$t("warning.videojs"))}},{key:"created",value:function(){this.handlePlayerOptions()}},{key:"getPlayer",value:function(){var t=this;setTimeout(function(){t.smPlayer=t.$refs.videoPlayer&&t.$refs.videoPlayer.player,t.modalVideoPlayer=t.$refs.modalVideoPlayer&&t.$refs.modalVideoPlayer.player,setTimeout(function(){t.replayRtmp()});var e=t.modalVisible?t.modalVideoPlayer:t.smPlayer;e&&(e.muted(t.options.muted),t.options.muted)&&e.volume(0),t.$emit("instance-loaded",e)})}},{key:"replayRtmp",value:function(){var e=this,t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:this.player;this.isRtmp&&t&&t.el_&&(t.one("play",function(){e.timer=setTimeout(function(){clearTimeout(e.timer),t.reset(),t.src(N()(e.playerOptions.sources))},e.replayTime)}),t.one("canplay",function(){clearTimeout(e.timer)}))}},{key:"handlePlayerOptions",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:this.options;if(!this.url)return{};if(!this.checkUrl(this.url))return E.a.warning(this.$t("warning.unsupportedVideoAddress"),1),this.playerOptions.sources&&(this.playerOptions.sources[0].src="",this.modalPlayerOptions.sources[0].src=""),{};this.isMatchPosterUrl(e.poster)||E.a.warning(this.$t("warning.unsupportedPosterAddress"),1);var t={height:"100%",autoplay:null!==e.autoplay&&e.autoplay,muted:null===e.muted||e.muted,loop:null!==e.loop&&e.loop,fluid:!1,language:"zh-CN",playbackRates:["0.7","1.0","1.5","2.0"],sources:[{src:this.url}],techOrder:["html5"],flash:{hls:{withCredentials:!1},swf:this.swf},flvjs:{mediaDataSource:{isLive:!0,cors:!0,hasAudio:!0}},preload:"auto",poster:e.poster||"",controlBar:{timeDivider:!1,durationDisplay:!1,remainingTimeDisplay:!1,fullscreenToggle:!0},notSupportedMessage:this.$t("warning.unavailableVideo")};return-1===this.url.indexOf("rtmp")&&-1!==this.url.indexOf(".flv")&&(t.techOrder=["html5","flvjs"],t.sources[0].type="video/x-flv"),-1!==this.url.indexOf(".mp4")&&(t.sources[0].type="video/mp4"),-1!==this.url.indexOf("rtmp")&&(t.techOrder=["flash","html5"],t.sources[0].type="rtmp/flv"),-1!==this.url.indexOf(".m3u8")&&(t.sources[0].type="application/x-mpegURL"),this.playerOptions=Object.assign({},t,{autoplay:this.isRtmp||e.autoplay}),this.modalPlayerOptions=Object.assign({},t,{autoplay:!0,preload:"none",height:"600"}),t}},{key:"onPlayerPlay",value:function(e){e&&this.checkUrl(this.url)&&(this.isFirst&&this.options.popupToPlay&&E.a.info(this.$t("info.pressEscToExit"),3),!this.isFirst||this.options.popupToPlay||this.options.autoplay||(e.currentTime(0),this.isFirst=!1),this.options.popupToPlay?(e.pause(),e.currentTime(1),e.controlBar.el_.style.visibility="hidden",this.modalVisible=!0):this.handleControlBar(e),!this.options.popupToPlay)&&this.isFullscreen&&e.requestFullscreen()}},{key:"onFullscreenchange",value:function(e){e.isFullscreen()||e.pause()}},{key:"onModalPlayerPlay",value:function(e){this.handleControlBar(e)}},{key:"onModalPlayerLoadeddata",value:function(e){(this.modalVideoPlayer=e).play(),this.handleControlBar(e)}},{key:"onPlayerEnded",value:function(e){this.options.autoplay||this.options.popupToPlay||(e.currentTime(1),this.isFirst=!0)}},{key:"onPlayerLoadeddata",value:function(e){e&&this.checkUrl(this.url)&&(this.options.popupToPlay&&e.pause(),!this.options.popupToPlay)&&this.options.autoplay&&e.play()}},{key:"handleControlBar",value:function(e){var t=null===this.options.controlBar||this.options.controlBar;e.controlBar.el_.style.visibility=t?"visible":"hidden"}},{key:"checkUrl",value:function(e){e=!(""===e||!this.isMatchVideoUrl(e)||e.indexOf("ogg")<0&&e.indexOf("mp4")<0&&e.indexOf("webm")<0&&e.indexOf("m3u8")<0&&e.indexOf("flv")<0&&e.indexOf("rtmp")<0);return e}},{key:"isMatchVideoUrl",value:function(e){return!!e&&(!!this.isMatchFileUrl(e)||new RegExp("(https?|http|file|ftp|rtmp)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]").test(e))}},{key:"isMatchPosterUrl",value:function(e){return!e||!!this.isMatchFileUrl(e)||new RegExp("(https?|http|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]").test(e)}},{key:"isMatchFileUrl",value:function(e){return/^((\.\.\/)|(\.\/))/g.test(e)}}])&&R(t.prototype,e),r&&R(t,r),Object.defineProperty(t,"prototype",{writable:!1}),n}(r.default),C([Object(o.Prop)()],T.prototype,"url",void 0),C([Object(o.Prop)({default:"https://vjs.zencdn.net/swf/5.4.2/video-js.swf"})],T.prototype,"swf",void 0),C([Object(o.Prop)({default:3e3})],T.prototype,"replayTime",void 0),C([Object(o.Prop)({default:!1})],T.prototype,"isFullscreen",void 0),C([Object(o.Prop)({default:"origin"})],T.prototype,"ratio",void 0),C([Object(o.Prop)({default:function(){return{muted:!0,loop:!1,popupToPlay:!1,autoplay:!1,controlBar:!0,poster:""}}})],T.prototype,"options",void 0),C([Object(o.Watch)("modalVisible")],T.prototype,"modalVisibleChanged",null),C([Object(o.Watch)("url")],T.prototype,"urlChanged",null),C([Object(o.Watch)("playerOptions")],T.prototype,"playerOptionsChanged",null),C([Object(o.Watch)("options")],T.prototype,"optionsChanged",null),C([Object(o.Watch)("options.popupToPlay")],T.prototype,"popupChanged",null),T=C([Object(o.Component)({name:"SmVideoPlayer",components:{videoPlayer:n,SmModal:S}})],T),k=T,t=Object(w.a)(k,function(){var t=this,e=t.$createElement,e=t._self._c||e;return e("div",{class:["sm-component-video-player",{"sm-component-video-full-fill":t.isFullFill}]},[e("video-player",{ref:"videoPlayer",staticClass:"sm-component-video-player__player sm-component-video-player__player--main",attrs:{options:t.playerOptions,playsinline:!0,"data-autoplay":t.autoplay,"data-isLive":t.isRtmp,"data-popupplay":""+t.options.popupToPlay,events:["fullscreenchange"]},on:{play:function(e){return t.onPlayerPlay(e)},ended:function(e){return t.onPlayerEnded(e)},loadeddata:function(e){return t.onPlayerLoadeddata(e)},ready:t.getPlayer,fullscreenchange:t.onFullscreenchange}}),t._v(" "),t.url?e("sm-modal",{class:{"sm-component-video-full-fill":t.isFullFill},attrs:{wrapClassName:"sm-component-video-player-modal",footer:null,width:"60%",maskClosable:!1},model:{value:t.modalVisible,callback:function(e){t.modalVisible=e},expression:"modalVisible"}},[e("video-player",{ref:"modalVideoPlayer",staticClass:"sm-component-video-player__player",attrs:{options:t.modalPlayerOptions,playsinline:!0,"data-autoplay":t.autoplay,"data-isLive":t.isRtmp,"data-popupplay":""+t.options.popupToPlay},on:{play:function(e){return t.onModalPlayerPlay(e)},loadeddata:function(e){return t.onModalPlayerLoadeddata(e)},ready:t.getPlayer}})],1):t._e()],1)},[],!1,null,null,null);e.default=t.exports},ewaw:function(e){e.exports=JSON.parse('{"a":"5.4.2"}')},"yJ0+":function(e,t,r){"use strict";r=r("K79h");t.a=r.a}}]);