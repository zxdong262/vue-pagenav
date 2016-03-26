
describe('vue-pagenav', function () {

	var scope, sandboxEl
	var vmm

	beforeEach(function () {
		sandboxEl = $('<div>').attr('id', 'sandbox').appendTo($('body'))
	})

	afterEach(function() {
		vmm.$destroy()
		$('#sandbox').remove(	)
	})

	var elem = '<div id="test"><zpagenav v-bind:page.sync="page", v-bind:page-size.sync="pageSize", v-bind:total.sync="total", v-bind:max-link.sync="maxLink"><zpagenav></div>'
	
	function prepare(data, initOption) {
		var element = $(elem).appendTo(sandboxEl)
		Vue.use(window.zPagenav, initOption)
		var defs = {
			el: '#test'
			,data: {
				page: 1
				,pageSize: 10
				,total: 509
				,maxLink: 5
			}
		}
		if(data) $.extend(defs.data, data)

		vmm = new Vue(defs)
		return vmm
	}

	// Tests

	describe('basic', function () {

		it('init', function(done) {
			var vmm = prepare()
			Vue.nextTick(function() {
				var pts = $('#test').find('.page-item')
				expect(pts.length).to.equal(8)
				done()
			})
		})

	})

	describe('options', function () {

		it('init page=4', function(done) {
			var vmm = prepare({
				page: 4
			})
			Vue.nextTick(function() {
				var pts = $('#test').find('.page-item')
				expect(pts.length).to.equal(9)
				expect($('#test').find('.page-item.active').text()).to.equal('4')
				done()
			})
		})

		it('init maxLink=100', function(done) {
			var vmm = prepare({
				maxLink: 100
				,total: 503
			})
			Vue.nextTick(function() {
				var pts = $('#test').find('.page-item')
				expect(pts.length).to.equal(53)
				expect($('#test').find('.page-item.active').text()).to.equal('1')
				done()
			})
		})

		it('init maxLink=1(maxLink will never less than 5)', function(done) {
			var vmm = prepare({
				maxLink: 1
			})
			Vue.nextTick(function() {
				var pts = $('#test').find('.page-item')
				expect(pts.length).to.equal(8)
				expect($('#test').find('.page-item.active').text()).to.equal('1')
				done()
			})
		})

		it('init total=1', function(done) {
			var vmm = prepare({
				total: 1
			})
			Vue.nextTick(function() {
				var pts = $('#test').find('.page-item')
				expect(pts.length).to.equal(3)
				expect($('#test').find('.page-item.active').text()).to.equal('1')
				done()
			})
		})

		it('init total=0', function(done) {
			var vmm = prepare({
				total: 1
			})
			Vue.nextTick(function() {
				var pts = $('#test').find('.page-item')
				expect(pts.length).to.equal(3)
				expect($('#test').find('.page-item.active').text()).to.equal('1')
				done()
			})
		})

	})

	describe('event', function () {

		it('click link page=2', function(done) {
			var vmm = prepare()

			Vue.nextTick(function() {
				var pts = $('#test').find('.page-item')
				expect(pts.length).to.equal(8)
				$('#test .page-item').eq(2).trigger('click')
				Vue.nextTick(function() {
					var pts = $('#test').find('.page-item')
					expect(pts.length).to.equal(8)
					expect($('#test').find('.page-item.active').text()).to.equal('2')
					expect(vmm.page === 2)
					done()
				})

			})
		})

		it('click link pagenext', function(done) {
			var vmm = prepare()

			Vue.nextTick(function() {
				var pts = $('#test').find('.page-item')
				expect(pts.length).to.equal(8)
				$('#test .page-item:last').trigger('click')
				Vue.nextTick(function() {
					var pts = $('#test').find('.page-item')
					expect(pts.length).to.equal(8)
					expect($('#test').find('.page-item.active').text()).to.equal('2')
					expect(vmm.page === 2)
					done()
				})

			})
		})

		it('click link page=51', function(done) {
			var vmm = prepare()

			Vue.nextTick(function() {
				var pts = $('#test').find('.page-item')
				expect(pts.length).to.equal(8)
				$('#test .page-item').eq(6).trigger('click')
				Vue.nextTick(function() {
					var pts = $('#test').find('.page-item')
					expect(pts.length).to.equal(8)
					expect($('#test').find('.page-item.active').text()).to.equal('51')
					expect(vmm.page === 51)
					done()
				})

			})
		})

	})

	describe('data bind', function () {

		it('vmm.total and vmm.page change', function(done) {
			var vmm = prepare()
			Vue.nextTick(function() {
				var pts = $('#test').find('.page-item')
				expect(pts.length).to.equal(8)
				vmm.total = 400
				vmm.page = 6
				Vue.nextTick(function() {
					var pts = $('#test').find('.page-item')
					expect(pts.length).to.equal(9)
					expect($('#test').find('.page-item.active').text()).to.equal('6')
					done()
				})

			})
		})

		it('vmm.pageSize change', function(done) {
			var vmm = prepare()
			Vue.nextTick(function() {
				var pts = $('#test').find('.page-item')
				expect(pts.length).to.equal(8)
				vmm.total = 400
				vmm.pageSize = 20
				Vue.nextTick(function() {
					var pts = $('#test').find('.page-item')
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
			var vmm = prepare()
			Vue.nextTick(function() {
				var pts = $('#test').find('.page-item')
				expect($('#test').find('.page-item').eq(0).find('span').eq(0).text()).to.equal('prev')
				done()
			})
		})

		it('next text', function(done) {
			zPagenav.default.nextHtml = 'next'
			var vmm = prepare()
			Vue.nextTick(function() {
				var pts = $('#test').find('.page-item')
				expect($('#test').find('.page-item').eq(7).find('span').eq(0).text()).to.equal('next')
				done()
			})
		})

		it('prev screen reader text', function(done) {
			zPagenav.default.prevSrHtml = 'prev0'
			var vmm = prepare()
			Vue.nextTick(function() {
				var pts = $('#test').find('.page-item')
				expect($('#test').find('.page-item').eq(0).find('.sr-only').html()).to.equal('prev0')
				done()
			})
		})

		it('next screen reader text', function(done) {
			zPagenav.default.nextSrHtml = 'next0'
			var vmm = prepare()
			Vue.nextTick(function() {
				var pts = $('#test').find('.page-item')
				expect($('#test').find('.page-item').eq(7).find('.sr-only').html()).to.equal('next0')
				done()
			})
		})

		it('template', function(done) {
			zPagenav.default.template = '<nav class="zpagenav" >' +
					'<span class="pagination0 page-link m-r-1">total:{{total}}</span>' +
					'<ul class="pagination">' +
						'<li  @click="setPage(unit.page)" track-by="$index" v-for="unit in units" class="page-item {{unit.class}}" :disabled="unit.disabled">' +
							'<a class="page-link" href="#p={{unit.page}}" aria-label="{{unit.ariaLabel}}">' +
								'<span v-if="unit.isPager" aria-hidden="true">{{{unit.html}}}</span>' +
								'<span v-else>{{{unit.html}}}</span>' +
								'<span v-if="unit.isPager" class="sr-only">{{{unit.srHtml}}}</span>' +
							'</a>' +
						'</li>' +
					'</ul>' +
				'</nav>'
			zPagenav.installed = false
			var vmm = prepare()
			Vue.nextTick(function() {
				expect($('#test .pagination0').length).to.equal(1)
				done()
			})
		})

	})

	//end
})
