(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["zPagenav"] = factory();
	else
		root["zPagenav"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	var zPagenav = {
	
		default: {
			page: 1,
			pageSize: 10,
			total: 0,
			prevHtml: '«',
			nextHtml: '»',
			prevSrHtml: 'Previous',
			nextSrHtml: 'Next',
			dotsHtml: '...',
			template: '<nav class="zpagenav">' + '<span class="pagination page-link m-r-1">total:{{total}}</span>' + '<ul class="pagination">' + '<li :key="index" v-for="(unit, index) in units" :class="\'page-item \' + unit.class" :disabled="unit.disabled">' + '<a @click.prevent="setPage(unit.page)" class="page-link" :href="setUrl(unit)" :aria-label="unit.ariaLabel">' + '<span v-if="unit.isPager" aria-hidden="true" v-html="unit.html"></span>' + '<span v-else v-html="unit.html"></span>' + '<span v-if="unit.isPager" class="sr-only" v-html="unit.srHtml"></span>' + '</a>' + '</li>' + '</ul>' + '</nav>'
		}
	
	};
	
	zPagenav.install = function (Vue) {
	
		// define & register
		Vue.component('zpagenav', {
			template: zPagenav.default.template,
			props: {
				page: Number,
				total: Number,
				pageSize: Number,
				maxLink: Number,
				pageHandler: Function,
				createUrl: Function
			},
			methods: {
				setPage: function setPage(page) {
					if (page === this.page) return false;
					if (this.pageHandler) this.pageHandler(page);
				},
				setUrl: function setUrl(unit) {
					return this.createUrl ? this.createUrl(unit) : unit.page > 1 ? '#page=' + unit.page : '';
				}
			},
			computed: {
				units: function units() {
	
					var option = zPagenav.default;
					var th = this;
					var page = th.page || option.page;
					var pageSize = th.pageSize || option.pageSize;
					var total = th.total || option.total;
					var maxLink = th.maxLink > 5 ? th.maxLink : 5;
	
					var linksCount = Math.ceil(total / pageSize);
	
					if (page > linksCount) page = linksCount + 0;
	
					var hasPrev = page > 1;
					var hasNext = page < linksCount;
					var realMaxLink = maxLink > linksCount ? linksCount : maxLink;
					var len1 = void 0,
					    len2 = void 0,
					    len3 = void 0,
					    shouldInsertDots12 = void 0,
					    shouldInsertDots23 = void 0;
					var len2Start = void 0,
					    len3Start = void 0;
	
					var units = [];
					var arr = computeLens();
	
					units.push({
						class: hasPrev ? '' : 'disabled',
						page: hasPrev ? page - 1 : page,
						isPager: true,
						isPrev: true,
						isNext: false,
						html: option.prevHtml,
						srHtml: option.prevSrHtml,
						ariaLabel: option.prevSrHtml
					});
	
					var dotUnit = {
						class: 'disabled',
						page: page,
						isPager: false,
						isPrev: false,
						isNext: true,
						html: option.dotsHtml
					};
	
					for (var i = 0, len = arr.length; i < len; i++) {
						pushUnit(arr[i]);
					}
	
					units.push({
						class: hasNext ? '' : 'disabled',
						page: hasNext ? page + 1 : page,
						isPager: true,
						isPrev: false,
						isNext: true,
						html: option.nextHtml,
						srHtml: option.nextSrHtml,
						ariaLabel: option.nextSrHtml
					});
	
					function pushUnit(i) {
						if (typeof i === 'number') {
							units.push({
								page: i,
								isPrev: false,
								isPager: false,
								disabled: false,
								class: i === page ? 'active' : '',
								isNext: false,
								html: i
							});
						} else units.push(dotUnit);
					}
	
					function computeLens() {
						var a4 = Math.floor((realMaxLink - 2) / 2);
						var a5 = realMaxLink - 3 - a4;
						var s2 = page - a4;
						var s3 = page + a5;
						if (s2 < 2) {
							s2 = 2;
						} else if (s3 > linksCount) {
							s2 = linksCount - (realMaxLink - 2);
						}
						var arr = [1];
						if (s2 > 2) arr.push('dot');
						var it = void 0;
						for (var _i = 0, _len = realMaxLink - 2 < 1 ? realMaxLink - 1 : realMaxLink - 2; _i < _len; _i++) {
							it = _i + s2;
							arr.push(it);
						}
						if (it < linksCount - 1) arr.push('dot');
						if (it < linksCount) arr.push(linksCount);
						return arr;
					}
	
					return units;
					//end unit
				}
			}
		});
	};
	
	module.exports = exports.default = zPagenav;

/***/ }
/******/ ])
});
;