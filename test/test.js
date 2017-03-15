
import {karmaPort} from '../build/config'
import zPagenav from '../dist/vue-pagenav'
import Vue from 'vue'

describe('vue-pagenav', function () {

	let scope, sandboxEl
	let vmm

	beforeEach(function () {
		sandboxEl = $('<div>').attr('id', 'sandbox').appendTo($('body'))
	})

  let clickEvent = $.Event('click')

	afterEach(function() {
		if (vmm && vmm.$destroy) vmm.$destroy()
		if (zPagenav) zPagenav.installed = false
		$('#sandbox').remove()
	})

	let elem = '<div id="test"><zpagenav :page="page" :page-size="pageSize" :total="total" :max-link.sync="maxLink" :page-handler="pageHandler" :create-url="createUrl"><zpagenav></div>'

	let nextTick = Vue.nextTick

	function prepare(data, initOption, methods, events) {
		let element = $(elem).appendTo(sandboxEl)
		Vue.use(zPagenav, initOption)
		let defs = {
			el: '#test'
			,data: {
				page: 1
				,pageSize: 10
				,total: 509
				,maxLink: 5
			}
			,methods: {
				pageHandler: function(page) {
					this.page = page
				},
        createUrl: function(unit) {
          return unit.page > 1 ? '#page=' + unit.page : ''
        }
			}
			// ,events: {
			// 	'page-change': function(page) {
			// 		this.page = page
			// 		$('#test').data('events', 'yes')
			// 	}
			// }
		}
		if(data) $.extend(defs.data, data)
		if(methods) defs.methods = methods
		if(events) defs.events = events
		vmm = new Vue(defs)
		return vmm
	}

	// Tests

	describe('basic', function () {

		it('init', function(done) {
			let vmm = prepare()
			nextTick(function() {
				let pts = $('#test').find('.page-item')
				expect(pts.length).to.equal(8)
				done()
			})
		})

		it('only one page', function(done) {
			let vmm = prepare({
				pageSize: 509
			})
			nextTick(function() {
				let pts = $('#test').find('.page-item')
				expect(pts.length).to.equal(3)
				done()
			})
		})


		it('only two page', function(done) {
			let vmm = prepare({
				pageSize: 508
			})
			nextTick(function() {
				let pts = $('#test').find('.page-item')
				expect(pts.length).to.equal(4)
				done()
			})
		})

	})

	describe('options', function () {

		it('init page=4', function(done) {
			let vmm = prepare({
				page: 4
			})
			nextTick(function() {
				let pts = $('#test').find('.page-item')
				expect(pts.length).to.equal(9)
				expect($('#test').find('.page-item.active').text()).to.equal('4')
				done()
			})
		})

		it('init maxLink=100', function(done) {
			let vmm = prepare({
				maxLink: 100
				,total: 503
			})
			nextTick(function() {
				let pts = $('#test').find('.page-item')
				expect(pts.length).to.equal(53)
				expect($('#test').find('.page-item.active').text()).to.equal('1')
				done()
			})
		})

		it('init maxLink=1(maxLink will never less than 5)', function(done) {
			let vmm = prepare({
				maxLink: 1
			})
			nextTick(function() {
				let pts = $('#test').find('.page-item')
				expect(pts.length).to.equal(8)
				expect($('#test').find('.page-item.active').text()).to.equal('1')
				done()
			})
		})

		it('init total=1', function(done) {
			let vmm = prepare({
				total: 1
			})
			nextTick(function() {
				let pts = $('#test').find('.page-item')
				expect(pts.length).to.equal(3)
				expect($('#test').find('.page-item.active').text()).to.equal('1')
				done()
			})
		})

		it('init total=0', function(done) {
			let vmm = prepare({
				total: 1
			})
			nextTick(function() {
				let pts = $('#test').find('.page-item')
				expect(pts.length).to.equal(3)
				expect($('#test').find('.page-item.active').text()).to.equal('1')
				done()
			})
		})

	})

	// describe('event', function () {

	// 	it('dispatch event with custom name', function(done) {

	// 		let vmm = prepare({
	// 			eventName: 'custom'
	// 		}, {}, {}, {
	// 			custom: function(page) {
	// 				this.page = page
	// 				$('#test').data('events', 'yes')
	// 			}
	// 		})

	// 		nextTick(function() {
	// 			let pts = $('#test').find('.page-item')
	// 			expect(pts.length).to.equal(8)
	// 			$('#test .page-item').eq(3).trigger(clickEvent)
	// 			$('#test .page-item').eq(3).children('a').trigger(clickEvent)
	// 			nextTick(function() {
	// 				let pts = $('#test').find('.page-item')
	// 				expect(pts.length).to.equal(8)
	// 				expect($('#test').find('.page-item.active').text()).to.equal('3')
	// 				expect(vmm.page === 3)
	// 				expect($('#test').data('events')).to.equal('yes')
	// 				done()
	// 			})

	// 		})

	// 	})

	// 	it('click link page=2', function(done) {
	// 		let vmm = prepare()

	// 		nextTick(function() {
	// 			let pts = $('#test').find('.page-item')
	// 			expect(pts.length).to.equal(8)
	// 			$('#test .page-item').eq(2).children('a').trigger(clickEvent)
	// 			nextTick(function() {
	// 				let pts = $('#test').find('.page-item')
	// 				expect(pts.length).to.equal(8)
	// 				expect($('#test').find('.page-item.active').text()).to.equal('2')
	// 				expect(vmm.page === 2)
	// 				done()
	// 			})

	// 		})
	// 	})

	// 	it('click link pagenext', function(done) {
	// 		let vmm = prepare()

	// 		nextTick(function() {
	// 			let pts = $('#test').find('.page-item')
	// 			expect(pts.length).to.equal(8)
	// 			$('#test .page-item:last').children('a').eq(0).trigger(clickEvent)
	// 			nextTick(function() {
	// 				let pts = $('#test').find('.page-item')
	// 				expect(pts.length).to.equal(8)
	// 				expect($('#test').find('.page-item.active').text()).to.equal('2')
	// 				expect(vmm.page === 2)
	// 				done()
	// 			})

	// 		})
	// 	})

	// 	it('click link page=51', function(done) {
	// 		let vmm = prepare()

	// 		nextTick(function() {
	// 			let pts = $('#test').find('.page-item')
	// 			expect(pts.length).to.equal(8)
	// 			$('#test .page-item').eq(6).children('a').eq(0).trigger(clickEvent)
	// 			nextTick(function() {
	// 				let pts = $('#test').find('.page-item')
	// 				expect(pts.length).to.equal(8)
	// 				expect($('#test').find('.page-item.active').text()).to.equal('51')
	// 				expect(vmm.page === 51)
	// 				done()
	// 			})

	// 		})
	// 	})

	// })

	describe('data bind', function () {

		it('vmm.total and vmm.page change', function(done) {
			let vmm = prepare()
			nextTick(function() {
				let pts = $('#test').find('.page-item')
				expect(pts.length).to.equal(8)
				vmm.total = 400
				vmm.page = 6
				nextTick(function() {
					let pts = $('#test').find('.page-item')
					expect(pts.length).to.equal(9)
					expect($('#test').find('.page-item.active').text()).to.equal('6')
					done()
				})

			})
		})

		it('vmm.pageSize change', function(done) {
			let vmm = prepare()
			nextTick(function() {
				let pts = $('#test').find('.page-item')
				expect(pts.length).to.equal(8)
				vmm.total = 400
				vmm.pageSize = 20
				nextTick(function() {
					let pts = $('#test').find('.page-item')
					expect(pts.length).to.equal(8)
					expect($('#test').find('.page-item.active').text()).to.equal('1')
					expect($('#test').find('.page-item').eq(6).text()).to.equal('20')
					done()
				})

			})
		})

	})

	describe('glob default', function () {

		it('prev text', function(done) {
			zPagenav.default.prevHtml = 'prev'
			let vmm = prepare()
			nextTick(function() {
				let pts = $('#test').find('.page-item')
				expect($('#test').find('.page-item').eq(0).find('span').eq(0).text()).to.equal('prev')
				done()
			})
		})

		it('next text', function(done) {
			zPagenav.default.nextHtml = 'next'
			let vmm = prepare()
			nextTick(function() {
				let pts = $('#test').find('.page-item')
				expect($('#test').find('.page-item').eq(7).find('span').eq(0).text()).to.equal('next')
				done()
			})
		})

		it('prev screen reader text', function(done) {
			zPagenav.default.prevSrHtml = 'prev0'
			let vmm = prepare()
			nextTick(function() {
				let pts = $('#test').find('.page-item')
				expect($('#test').find('.page-item').eq(0).find('.sr-only').html()).to.equal('prev0')
				done()
			})
		})

		it('next screen reader text', function(done) {
			zPagenav.default.nextSrHtml = 'next0'
			let vmm = prepare()
			nextTick(function() {
				let pts = $('#test').find('.page-item')
				expect($('#test').find('.page-item').eq(7).find('.sr-only').html()).to.equal('next0')
				done()
			})
		})

		it('template and urlCreatror', function(done) {
			zPagenav.default.template = `<nav class="zpagenav" >
					<span class="pagination0 page-link m-r-1">total:{{total}}</span>
					<ul class="pagination">
						<li :key="index" v-for="(unit, index) in units" :class="'page-item ' + unit.class" :disabled="unit.disabled">
							<a @click.prevent="setPage(unit.page)" class="page-link" :href="setUrl(unit)" :aria-label="unit.ariaLabel">
								<span v-if="unit.isPager" aria-hidden="true" v-html="unit.html"></span>
								<span v-else v-html="unit.html"></span>
								<span v-if="unit.isPager" class="sr-only" v-html="unit.srHtml"></span>
							</a>
						</li>
					</ul>
				</nav>`.replace(/\\n|\\t/g, '')
			zPagenav.installed = false
			let vmm = prepare({}, {}, {
				pageHandler: function(page) {
					this.page = page
				}
				,createUrl: function(unit) {
					return unit.page > 1?'/?page=' + unit.page:'/'
				}
			})
			let host = `http://localhost:${karmaPort}/`
			nextTick(function() {
				expect($('#test .pagination0').length).to.equal(1)
				expect($('#test').find('.page-item a').eq(0).prop('href')).to.equal(host)
				expect($('#test').find('.page-item a').eq(2).prop('href')).to.equal(host + '?page=2')
				done()
			})
		})

	})

	//end
})
