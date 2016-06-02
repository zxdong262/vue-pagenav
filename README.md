# vue-pagenav
[![Build Status](https://travis-ci.org/zxdong262/vue-pagenav.svg?branch=master)](https://travis-ci.org/zxdong262/vue-pagenav)

a vue pagenav plugin

## check the demo

<a href="http://html5beta.com/apps/vue-pagenav.html">http://html5beta.com/apps/vue-pagenav.html</a>

## get
```bash
bower install vue-pagenav
#or 
npm install vue-pagenav
```

## use

### reference it in html
```html
<script src="vue.min.js">
<script src="vue-pagenav.min.js">
```

### init
```html

<div id="test">
  <zpagenav :page.sync="page", :page-size.sync="pageSize", :total.sync="total", :max-link.sync="maxLink" :event-name="eventName" ><zpagenav>
</div>

```

```javascript

//commonjs way
var Vue = require('vue')
var zPagenav = require('vue-pagenav')
Vue.use(zPagenav)

//or direct use if window.Vue exists
//Vue.use(window.zPagenav)

// create instance
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
      '<nav class="zpagenav" >' +
        '<span class="pagination page-link m-r-1">total:{{total}}</span>' +
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
  }

}

//by modify zPagenav.default to customize the template or other params, like:
zPagenav.default.nextHtml = 'next'
```

## test & build
```bash
git clone https://github.com/zxdong262/vue-pagenav.git
cd vue-pagenav
npm install
bower install
gulp test

#build
gulp build
```

## License
MIT
