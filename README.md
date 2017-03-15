# vue-pagenav

[![Travis][build-badge]][build] [![Codecov][codecov-badge]][codecov]

a vue pagenav plugin.

(since v2.0.0 support vue 2 only, use 1.x for vue1+)

## check the demo

<a href="http://html5beta.com/apps/vue-pagenav.html">http://html5beta.com/apps/vue-pagenav.html</a>

## get
```bash
bower install vue-pagenav

#for 1.0+ users, bower install vue-pagenav#1
#or
npm install vue-pagenav

#for 1.0+ users, npm install vue-pagenav@1
```

## use

### reference it in html
```html
<script src="vue.min.js">
<script src="vue-pagenav.min.js">
```

### new way to change page, supported by vue 1.0+/2.0+
```html
<div id="test">
  <zpagenav :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl"><zpagenav>
</div>

```

```javascript
new Vue({
  el: '#test',
  data: {
    page: 1 //page
    ,pageSize: 10 //pageSize,  default is 10
    ,total: 509 //total item count
    ,maxLink: 5 //how many links to show, must not less than 5,  default is 5
  }
  ,methods: {
    pageHandler: function(page) {
      //here you can do custom state update
      this.page = page
    }
    ,createUrl: function(unit) {
      return unit.page > 1?'#page=' + unit.page:'#'
    }
  }
})
```

### the vue 1.x way by event, for vue 1.x
```html

<div id="test">
  <zpagenav :page="page", :page-size="pageSize", :total="total", :max-link.sync="maxLink" :event-name="eventName" :create-url="createUrl"><zpagenav>
</div>

```

```javascript

//commonjs way
var Vue = require('vue')
var zPagenav = require('vue-pagenav')
Vue.use(zPagenav)

//or direct use if window.Vue exists
//Vue.use(window.zPagenav)

new Vue({
  el: '#test',
  data: {
    page: 1 //page
    ,pageSize: 10 //pageSize,  default is 10
    ,total: 509 //total item count
    ,maxLink: 5 //how many links to show, must not less than 5,  default is 5

    // page change event name, default is 'page-change',
    // optional
    // for different pagenav, should use different name
    ,eventName: 'custom'
  }
  ,events: {
    'custom': function(page) {
      this.page = page
      console.log(page)
    }
  }
})
```

### style it, just the same css from bootstrap4 pagination module
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.sr-only-focusable:active, .sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
}
.m-r-1 {
    margin-right: 1rem!important;
}
.pagination {
  display: inline-block;
  padding-left: 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: .25rem;
}

.page-item {
  display: inline;
}

.page-item:first-child .page-link {
  margin-left: 0;
  border-top-left-radius: .25rem;
  border-bottom-left-radius: .25rem;
}

.page-item:last-child .page-link {
  border-top-right-radius: .25rem;
  border-bottom-right-radius: .25rem;
}

.page-item.active .page-link, .page-item.active .page-link:focus, .page-item.active .page-link:hover {
  z-index: 2;
  color: #fff;
  cursor: default;
  background-color: #0275d8;
  border-color: #0275d8;
}

.page-item.disabled .page-link, .page-item.disabled .page-link:focus, .page-item.disabled .page-link:hover {
  color: #818a91;
  cursor: not-allowed;
  background-color: #fff;
  border-color: #ddd;
}

.page-link {
  position: relative;
  float: left;
  padding: .5rem .75rem;
  margin-left: -1px;
  line-height: 1.5;
  color: #0275d8;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd;
}

.page-link:focus, .page-link:hover {
  color: #014c8c;
  background-color: #eceeef;
  border-color: #ddd;
}

.pagination-lg .page-link {
  padding: .75rem 1.5rem;
  font-size: 1.25rem;
  line-height: 1.333333;
}

.pagination-lg .page-item:first-child .page-link {
  border-top-left-radius: .3rem;
  border-bottom-left-radius: .3rem;
}

.pagination-lg .page-item:last-child .page-link {
  border-top-right-radius: .3rem;
  border-bottom-right-radius: .3rem;
}

.pagination-sm .page-link {
  padding: .275rem .75rem;
  font-size: .875rem;
  line-height: 1.5;
}

.pagination-sm .page-item:first-child .page-link {
  border-top-left-radius: .2rem;
  border-bottom-left-radius: .2rem;
}

.pagination-sm .page-item:last-child .page-link {
  border-top-right-radius: .2rem;
  border-bottom-right-radius: .2rem;
}

.pager {
  padding-left: 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  list-style: none;
}

.pager::after {
  display: table;
  clear: both;
  content: "";
}

.pager li {
  display: inline;
}

.pager li > a,
.pager li > span {
  display: inline-block;
  padding: 5px 14px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 15px;
}

.pager li > a:focus, .pager li > a:hover {
  text-decoration: none;
  background-color: #eceeef;
}

.pager .disabled > a, .pager .disabled > a:focus, .pager .disabled > a:hover {
  color: #818a91;
  cursor: not-allowed;
  background-color: #fff;
}

.pager .disabled > span {
  color: #818a91;
  cursor: not-allowed;
  background-color: #fff;
}

.pager-next > a,
.pager-next > span {
  float: right;
}

.pager-prev > a,
.pager-prev > span {
  float: left;
}
```

## customize
```javascript
var zPagenav = {

  default: {
    page: 1 //page
    ,pageSize: 10 //pageSize
    ,total: 0 //total items count
    ,prevHtml: '«' //prev button html
    ,nextHtml: '»' //next button html
    ,prevSrHtml: 'Previous' //prev button screen reader html
    ,nextSrHtml: 'Next' //next button screen reader html
    ,dotsHtml: '...' //sepration element html
    ,template: //template
			`<nav class="zpagenav">` +
				`<span class="pagination page-link m-r-1">total:{{total}}</span>` +
				`<ul class="pagination">` +
					`<li track-by="$index" v-for="unit in units" :class="'page-item ' + unit.class" :disabled="unit.disabled">` +
						`<a @click.prevent="setPage(unit.page)" class="page-link" :href="setUrl(unit)" :aria-label="unit.ariaLabel">` +
							`<span v-if="unit.isPager" aria-hidden="true" v-html="unit.html"></span>` +
							`<span v-else v-html="unit.html"></span>` +
							`<span v-if="unit.isPager" class="sr-only" v-html="unit.srHtml"></span>` +
						`</a>` +
					`</li>` +
				`</ul>` +
			`</nav>`
  }

}

//by modify zPagenav.default to customize the template or other params, like:
zPagenav.default.nextHtml = 'next'
```

## test & build & dev
```bash
git clone https://github.com/zxdong262/vue-pagenav.git
cd vue-pagenav
npm install
npm run test

#build
npm run build

#dev
npm start
```

## License
MIT


[build-badge]: https://img.shields.io/travis/zxdong262/vue-pagenav/master.svg?style=flat-square
[build]: https://travis-ci.org/zxdong262/vue-pagenav
[codecov-badge]: https://img.shields.io/codecov/c/github/zxdong262/vue-pagenav/master.svg?style=flat-square
[codecov]: https://codecov.io/gh/zxdong262/vue-pagenav
