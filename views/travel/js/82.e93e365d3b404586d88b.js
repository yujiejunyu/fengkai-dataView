(window.webpackJsonp=window.webpackJsonp||[]).push([[82,34],{CKgU:function(t,e,o){"use strict";var a=o("FuRH"),i=o("yIpb"),c=o("K79h"),n=o("oCYn"),o=o("YKMj");function u(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,function(t){t=function(t,e){if("object"!==p(t)||null===t)return t;var o=t[Symbol.toPrimitive];if(void 0===o)return("string"===e?String:Number)(t);o=o.call(t,e||"default");if("object"!==p(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}(t,"string");return"symbol"===p(t)?t:String(t)}(n.key),n)}}function l(t,e){return(l=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t})(t,e)}function s(o){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}();return function(){var t,e=r(o),e=(t=n?(t=r(this).constructor,Reflect.construct(e,arguments,t)):e.apply(this,arguments),this);if(t&&("object"===p(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}}function r(t){return(r=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function p(t){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var f=function(t,e,o,n){var r,a=arguments.length,i=a<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"===("undefined"==typeof Reflect?"undefined":p(Reflect))&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,o,n);else for(var c=t.length-1;0<=c;c--)(r=t[c])&&(i=(a<3?r(i):3<a?r(e,o,i):r(e,o))||i);return 3<a&&i&&Object.defineProperty(e,o,i),i};function y(e,o){for(var t=arguments.length,n=new Array(2<t?t-2:0),r=2;r<t;r++)n[r-2]=arguments[r];var a=e.constructor.options;a.mixins&&a.mixins.forEach(function(t){t[o]&&(t=t[o]).call.apply(t,[e].concat(n))}),a[o]&&(a=a[o]).call.apply(a,[e].concat(n))}n=function(t){var e=r;if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&l(e,t);var o,n=s(r);function r(){var t=this,e=r;if(t instanceof e)return n.apply(this,arguments);throw new TypeError("Cannot call a class as a function")}return e=r,(t=[{key:"mapTargetChanged",value:function(t,e){var o;t&&e&&t!==e&&(e=e||this.firstDefaultTarget,(o=a.a.$options.getMap(e))&&this.removeMap(o,e),a.a.$options.getMap(t))&&this.loadMap(t)}},{key:"mounted",value:function(){var t=this.getTargetName();this.firstDefaultTarget=t,a.a.$options.getMap(t)&&this.loadMap(t),a.a.$on("load-map",this.loadMapSucceed),i.a.$on("delete-map",this.removeMapSucceed)}},{key:"beforeDestroy",value:function(){this.removeMap(),a.a.$off("load-map",this.loadMapSucceed),i.a.$off("delete-map",this.removeMapSucceed)}},{key:"getFirstTarget",value:function(){var t,e;for(e in a.a.$options.getAllMaps())if(e){t=e;break}return t}},{key:"getTargetName",value:function(){var t=this.$parent,t=t&&t.$options.name&&-1!==["smwebmap","smncpmap"].indexOf(t.$options.name.toLowerCase())&&t.target;return this.mapTarget||t||this.getFirstTarget()}},{key:"loadMap",value:function(t){var e=this;this.firstDefaultTarget||(this.firstDefaultTarget=t),this.map=a.a.$options.getMap(t),this.webmap=a.a.$options.getWebMap(t),this.viewModel&&"function"==typeof this.viewModel.setMap&&this.viewModel.setMap({map:this.map,webmap:this.webmap,mapTarget:t}),y(this,"loaded",this.map,t),this.$nextTick(function(){e.$emit("loaded")})}},{key:"removeMap",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:this.map,e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:this.getTargetName();t&&(this.viewModel&&this.viewModel.removed&&this.viewModel.removed(),y(this,"removed",t,e),this.map=null,this.webmap=null,this.firstDefaultTarget=null)}},{key:"loadMapSucceed",value:function(t,e){e===this.getTargetName()&&this.loadMap(e)}},{key:"removeMapSucceed",value:function(t){t===this.getTargetName()&&this.removeMap()}},{key:"mapNotLoadedTip",value:function(){return!this.map&&(c.a.destroy(),c.a.warning(this.$t("warning.unassociatedMap")),!0)}}])&&u(e.prototype,t),o&&u(e,o),Object.defineProperty(e,"prototype",{writable:!1}),r}(n.default);f([Object(o.Prop)()],n.prototype,"mapTarget",void 0),f([Object(o.Watch)("mapTarget")],n.prototype,"mapTargetChanged",null),n=f([o.Component],n),e.a=n},K79h:function(t,e,o){"use strict";var n=o("Iv0b");function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(e,t){var o,n=Object.keys(e);return Object.getOwnPropertySymbols&&(o=Object.getOwnPropertySymbols(e),t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,o)),n}function r(n){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach(function(t){var e,o;e=n,o=r[t=t],(t=function(t){t=function(t,e){if("object"!==a(t)||null===t)return t;var o=t[Symbol.toPrimitive];if(void 0===o)return("string"===e?String:Number)(t);o=o.call(t,e||"default");if("object"!==a(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}(t,"string");return"symbol"===a(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach(function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(r,t))})}return n}var c="sm-component-message",u=n.default.config;u({prefixCls:c}),n.default.config=function(t){t.prefixCls&&t.prefixCls!==c&&n.default.destroy(),u(r(r({},t),{},{prefixCls:t.prefixCls||c}))},e.a=n.default},NTr1:function(t,e,o){"use strict";o.r(e);var n=o("hdLw");function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,function(t){t=function(t,e){if("object"!==r(t)||null===t)return t;var o=t[Symbol.toPrimitive];if(void 0===o)return("string"===e?String:Number)(t);o=o.call(t,e||"default");if("object"!==r(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}(t,"string");return"symbol"===r(t)?t:String(t)}(n.key),n)}}function i(t,e){return(i=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t})(t,e)}function c(o){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}();return function(){var t,e=u(o),e=(t=n?(t=u(this).constructor,Reflect.construct(e,arguments,t)):e.apply(this,arguments),this);if(t&&("object"===r(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var l=function(t){var e=r;if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&i(e,t);var o,n=c(r);function r(){var t=this,e=r;if(t instanceof e)return n.apply(this,arguments);throw new TypeError("Cannot call a class as a function")}return e=r,(t=[{key:"setMap",value:function(t){t=t.map;this.map=t}},{key:"panTo",value:function(t){this.map.panTo(t)}},{key:"panBy",value:function(t){this.map.panBy(t)}}])&&a(e.prototype,t),o&&a(e,o),Object.defineProperty(e,"prototype",{writable:!1}),r}(o.n(n).a.Evented),n=o("CKgU"),s=o("rn6b"),p=o("oTir"),n={name:"SmPan",mixins:[n.a,s.a,p.a],props:{panLength:{type:Number,default:200}},data:function(){return{center:null,mapboxglClass:""}},created:function(){this.viewModel=new l},methods:{panToCenter:function(){this.lnglat=this.center,this.panTo(this.lnglat)},panToLeft:function(){this.panBy([-this.panLength,0])},panToRight:function(){this.panBy([this.panLength,0])},panToTop:function(){this.panBy([0,-this.panLength])},panToBottom:function(){this.panBy([0,this.panLength])},panTo:function(t){this.mapNotLoadedTip()||this.viewModel.panTo(t)},panBy:function(t){this.mapNotLoadedTip()||this.viewModel.panBy(t)}},loaded:function(){this.parentIsWebMapOrMap&&(this.mapboxglClass="mapboxgl-ctrl"),this.center=this.map.getCenter(),this.lnglat=this.center}},s=o("KHd+"),p=Object(s.a)(n,function(){var t=this,e=t.$createElement,e=t._self._c||e;return e("div",{class:["sm-component-pan",t.mapboxglClass],style:[t.collapseCardHeaderBgStyle,t.secondaryTextColorStyle]},[e("div",{staticClass:"sm-component-pan__item",on:{click:t.panToCenter}},[e("div",{staticClass:"sm-component-pan__center",style:t.collapseCardHeaderBgStyle}),t._v(" "),e("i",{staticClass:"sm-components-icon-fullscreen"})]),t._v(" "),e("div",{staticClass:"sm-component-pan__item",on:{click:t.panToLeft}},[e("div",{staticClass:"sm-component-pan__icon is-left"}),t._v(" "),e("i",{staticClass:"sm-components-icon-solid-triangle-left"})]),t._v(" "),e("div",{staticClass:"sm-component-pan__item",on:{click:t.panToRight}},[e("div",{staticClass:"sm-component-pan__icon is-right"}),t._v(" "),e("i",{staticClass:"sm-components-icon-solid-triangle-right"})]),t._v(" "),e("div",{staticClass:"sm-component-pan__item",on:{click:t.panToTop}},[e("div",{staticClass:"sm-component-pan__icon is-top"}),t._v(" "),e("i",{staticClass:"sm-components-icon-solid-triangle-up"})]),t._v(" "),e("div",{staticClass:"sm-component-pan__item",on:{click:t.panToBottom}},[e("div",{staticClass:"sm-component-pan__icon is-bottom"}),t._v(" "),e("i",{staticClass:"sm-components-icon-solid-triangle-down"})])])},[],!1,null,null,null);e.default=p.exports},oTir:function(t,e,o){"use strict";var n=o("oCYn"),r=o("YKMj"),c=o("yIpb"),a=o("qAG6"),i=o("5ZGa");function u(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,function(t){t=function(t,e){if("object"!==f(t)||null===t)return t;var o=t[Symbol.toPrimitive];if(void 0===o)return("string"===e?String:Number)(t);o=o.call(t,e||"default");if("object"!==f(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}(t,"string");return"symbol"===f(t)?t:String(t)}(n.key),n)}}function l(t,e){return(l=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t})(t,e)}function s(o){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}();return function(){var t,e=p(o),e=(t=n?(t=p(this).constructor,Reflect.construct(e,arguments,t)):e.apply(this,arguments),this);if(t&&("object"===f(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}}function p(t){return(p=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function f(t){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var y,o=function(t,e,o,n){var r,a=arguments.length,i=a<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"===("undefined"==typeof Reflect?"undefined":f(Reflect))&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,o,n);else for(var c=t.length-1;0<=c;c--)(r=t[c])&&(i=(a<3?r(i):3<a?r(e,o,i):r(e,o))||i);return 3<a&&i&&Object.defineProperty(e,o,i),i},n=y=function(t){var e=r;if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&l(e,t);var o,n=s(r);function r(){var t=this,e=r;if(t instanceof e)return(t=n.apply(this,arguments)).backgroundData="",t.textColorsData="",t.collapseCardBackgroundData="",t.collapseCardHeaderBgData="",t.subComponentSpanBgData="",t.tablePopupBgData="",t.colorGroupsData=[],t.themeStyleName=[],t;throw new TypeError("Cannot call a class as a function")}return e=r,(t=[{key:"getBackgroundStyle",get:function(){return{background:this.backgroundData}}},{key:"collapseCardBackgroundStyle",get:function(){return{background:this.collapseCardBackgroundData}}},{key:"collapseCardBackgroundLightStyle",get:function(){return{background:Object(i.b)({colorGroup:[this.collapseCardBackgroundData]})[2]}}},{key:"collapseCardHeaderBgStyle",get:function(){return{background:this.collapseCardHeaderBgData}}},{key:"subComponentSpanBgStyle",get:function(){return{background:this.subComponentSpanBgData}}},{key:"tablePopupBgStyle",get:function(){return{background:this.tablePopupBgData}}},{key:"getTextColorStyle",get:function(){return{color:this.textColorsData}}},{key:"headingTextColorStyle",get:function(){return{color:Object(a.g)(this.textColorsData,.85)}}},{key:"secondaryTextColorStyle",get:function(){return{color:Object(a.g)(this.textColorsData,.45)}}},{key:"disabledTextColorStyle",get:function(){return{color:Object(a.g)(this.textColorsData,.25)}}},{key:"getBackground",get:function(){return this.backgroundData}},{key:"getTextColor",get:function(){return this.textColorsData}},{key:"getColorStyle",get:function(){return function(t){return{color:this.colorGroupsData[t]}}}},{key:"getColor",get:function(){return function(t){return this.colorGroupsData[t]}}},{key:"themeStyleChanged",value:function(t){return t}},{key:"created",value:function(){this.initThemeData(),this.registerPropListener()}},{key:"mounted",value:function(){c.a.$on("change-theme",this.changeThemeCallback)}},{key:"beforeDestroy",value:function(){c.a.$off("change-theme",this.changeThemeCallback)}},{key:"changeThemeCallback",value:function(t){this.setDataRelatedProps(t,!0),"background"in t&&this.setDataRelatedWithBackgound("",t),this.initNeedTheme(t)}},{key:"initThemeData",value:function(){this.setDataRelatedProps(),this.setDataRelatedWithBackgound(this.background)}},{key:"initNeedTheme",value:function(e){var o=this;this.themeStyleName.forEach(function(t){o[t]="primaryColor"===t?e.colorGroup&&e.colorGroup[0]:o.getRealColor(t,e)})}},{key:"registerPropListener",value:function(){var t=this,n=this;this.getSelfProps().forEach(function(o){t.$watch(o,function(t){var e=this.getDataNameOfProp(o);n[e]=t||this.getRealColor(o),"background"===o&&n.setDataRelatedWithBackgound(t)})})}},{key:"setDataRelatedProps",value:function(n,r){var a=this,i=n||c.a.$options.theme||{};this.getSelfProps().forEach(function(t){var e,o;t in i&&(e=a.getDataNameOfProp(t),o=r?"":a[t],a[e]=o||a.getRealColor(t,n))})}},{key:"setDataRelatedWithBackgound",value:function(t,e){this.collapseCardHeaderBgData=t||this.getRealColor("collapseCardHeaderBg",e),this.subComponentSpanBgData=t||this.getRealColor("subComponentSpanBg",e),this.collapseCardBackgroundData=t||this.getRealColor("collapseCardBackground",e),this.tablePopupBgData=t||this.getRealColor("messageBackground",e)}},{key:"getSelfProps",value:function(){return Object.keys(y.extendOptions.props)}},{key:"getRealColor",value:function(t,e){var o,n,e=e||c.a.$options.theme||{};return"colorGroup"!==t&&e[t]&&-1!==e[t].indexOf("var")?(o=Object(i.c)(e),o=window.getComputedStyle(document.querySelector(o)),n=e[t].replace(/var\((.+)\)/g,"$1"),o.getPropertyValue(n).trim()):e[t]}},{key:"getDataNameOfProp",value:function(t){switch(t){case"textColor":return"textColorsData";case"colorGroup":return"colorGroupsData";default:return"".concat(t,"Data")}}},{key:"render",value:function(t){return t("template",null)}}])&&u(e.prototype,t),o&&u(e,o),Object.defineProperty(e,"prototype",{writable:!1}),r}(n.default);o([Object(r.Prop)()],n.prototype,"background",void 0),o([Object(r.Prop)()],n.prototype,"textColor",void 0),o([Object(r.Prop)()],n.prototype,"colorGroup",void 0),o([Object(r.Emit)()],n.prototype,"themeStyleChanged",null),n=y=o([Object(r.Component)({name:"Theme"})],n),e.a=n},rn6b:function(t,e,o){"use strict";var n=o("oCYn"),r=o("YKMj"),a=o("FuRH");function i(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,function(t){t=function(t,e){if("object"!==s(t)||null===t)return t;var o=t[Symbol.toPrimitive];if(void 0===o)return("string"===e?String:Number)(t);o=o.call(t,e||"default");if("object"!==s(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}(t,"string");return"symbol"===s(t)?t:String(t)}(n.key),n)}}function c(t,e){return(c=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t})(t,e)}function u(o){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}();return function(){var t,e=l(o),e=(t=n?(t=l(this).constructor,Reflect.construct(e,arguments,t)):e.apply(this,arguments),this);if(t&&("object"===s(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}}function l(t){return(l=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}o=function(t,e,o,n){var r,a=arguments.length,i=a<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"===("undefined"==typeof Reflect?"undefined":s(Reflect))&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,o,n);else for(var c=t.length-1;0<=c;c--)(r=t[c])&&(i=(a<3?r(i):3<a?r(e,o,i):r(e,o))||i);return 3<a&&i&&Object.defineProperty(e,o,i),i},n=function(t){var e=r;if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&c(e,t);var o,n=u(r);function r(){var t=this,e=r;if(t instanceof e)return(t=n.apply(this,arguments)).isShow=!0,t;throw new TypeError("Cannot call a class as a function")}return e=r,(t=[{key:"positionChanged",value:function(){this.$el&&this.parentIsWebMapOrMap&&(this.remove(),this.addTo())}},{key:"created",value:function(){var t=this.$parent.$options.name;this.parentIsWebMapOrMap=t&&-1!==["smwebmap","smncpmap"].indexOf(this.$parent.$options.name.toLowerCase())}},{key:"mounted",value:function(){var t;this.filterDelayLoad=!(-1!==["smwebmap","smminimap","smncpmap"].indexOf(this.$options.name&&this.$options.name.toLowerCase())),this.$el&&this.parentIsWebMapOrMap&&(this.filterDelayLoad&&(this.isShow=!1,(t=this.$el).style)&&(t.style.display="none"),t=this.getControlMapName(),a.a.$options.getMap(t)&&this.mapLoaded(a.a.$options.getMap(t)),a.a.$on("load-map",this.controlLoadMapSucceed))}},{key:"beforeDestroy",value:function(){this.remove(),a.a.$off("load-map",this.controlLoadMapSucceed)}},{key:"initControl",value:function(){var t=this;return{onAdd:function(){return t.$el},onRemove:function(){return t.map}}}},{key:"addTo",value:function(){this.control=this.initControl(),this.map.addControl(this.control,this.position),this.$el&&this.$el.classList&&this.$el.classList.add("mapboxgl-ctrl")}},{key:"remove",value:function(){this.control&&this.map&&this.map.removeControl(this.control)}},{key:"getControlMapName",value:function(){var t=this.$parent,t=t&&t.$options.name&&"smwebmap"===t.$options.name.toLowerCase()&&t.target;return this.mapTarget||t||Object.keys(a.a.$options.getAllMaps())[0]}},{key:"controlLoadMapSucceed",value:function(t,e){e===this.getControlMapName()&&this.mapLoaded(t)}},{key:"mapLoaded",value:function(t){this.map=t,this.addTo(),this.filterDelayLoad&&(this.isShow=!0,t=this.$el)&&t.style&&(t.style.display="block")}}])&&i(e.prototype,t),o&&i(e,o),Object.defineProperty(e,"prototype",{writable:!1}),r}(n.default);o([Object(r.Prop)()],n.prototype,"mapTarget",void 0),o([Object(r.Prop)({default:"top-left",validator:function(t){return-1!==["top-left","top-right","bottom-left","bottom-right"].indexOf(t)}})],n.prototype,"position",void 0),o([Object(r.Watch)("position")],n.prototype,"positionChanged",null),n=o([r.Component],n),e.a=n}}]);