(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a320b2c0"],{1799:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.totalPages>1?a("div",{staticClass:"mb-4 mt-6"},[a("div",{staticClass:"flex align-center justify-center"},[a("div",{staticClass:"flex"},[t.isFirst?a("PaginationItem",{staticClass:"rounded rounded-r-none",on:{"hanlder-click":function(e){return t.handlerPage(t._currentPage-1)}}},[t._v("\n        Previous\n      ")]):t._e()],1),a("div",{staticClass:"flex"},t._l(t._pages,function(e){return a("PaginationItem",{key:e,class:{"cursor-default text-white pointer-events-none bg-blue-dark":t._currentPage===e},on:{"hanlder-click":function(a){return t.handlerPage(e)}}},[t._v("\n        "+t._s(e)+"\n      ")])}),1),a("div",{staticClass:"flex"},[t.isLast?a("PaginationItem",{on:{"hanlder-click":function(e){return t.handlerPage(t._currentPage+1)}}},[t._v("\n        Next\n      ")]):t._e()],1)])]):t._e()},n=[],i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a",{staticClass:"inline-block no-underline text-grey-darker bg-white p-2 px-3 shadow-md",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.handlerClick(e)}}},[t._t("default")],2)},s=[],c={methods:{handlerClick:function(){this.$emit("hanlder-click")}}},o=c,u=a("2877"),l=Object(u["a"])(o,i,s,!1,null,null,null),d=l.exports,g={props:["currentPage","pageLimit","pages"],components:{PaginationItem:d},data:function(){return{isHasTotalPages:!1,isFirst:!1,isLast:!1,_pages:[]}},computed:{_currentPage:function(){return this.currentPage},_pageLimit:function(){return this.pageLimit||8},totalPages:function(){return this.pages&&!this.isHasTotalPages&&(this.isHasTotalPages=!0,this.pagination(1,this.pages)),this.pages}},methods:{handlerPage:function(t){this.$emit("handler-page",t),this.pagination(t,this.totalPages)},pagination:function(t,e){var a,r;this._pages=[];r=a=Math.min(t,e);for(var n=1;n<this._pageLimit&&n<e;)r>1&&(r--,n++),n<this._pageLimit&&a<e&&(a++,n++);for(var i=r;i<=a;i++)this._pages.push(i);this.isFirst=-1===this._pages.indexOf(1),this.isLast=-1===this._pages.indexOf(e)}}},p=g,f=Object(u["a"])(p,r,n,!1,null,"2b53fe80",null);e["a"]=f.exports},"77ca":function(t,e,a){"use strict";a("7f7f");var r=a("f499"),n=a.n(r),i=a("cebc"),s=a("2f62"),c=a("fa7d");e["a"]={methods:Object(i["a"])({},Object(s["b"])(["addCart","refreshCart","incrementCart"]),{addToCart:function(t){var e=JSON.parse(localStorage.getItem("cart"))||[];if(localStorage.setItem("last-add",n()(t)),e.length){var a=Object(c["a"])(e,t._id);a?(this.incrementCart(a),localStorage.setItem("cart",n()(e)),this.refreshCart(a)):this.updateToCart(e,t)}else this.updateToCart(e,t)},updateToCart:function(t,e){var a={id:e._id,image:e.image,name:e.name,price:e.price,subtotal:1*e.price,qty:1};t.push(a),this.addCart(a),localStorage.setItem("cart",n()(t))}})}},"93d7":function(t,e,a){},a21f:function(t,e,a){var r=a("584a"),n=r.JSON||(r.JSON={stringify:JSON.stringify});t.exports=function(t){return n.stringify.apply(n,arguments)}},b54c:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container max-w-xl mx-auto mb-4 px-4"},[a("div",{staticClass:"flex flex-wrap"},[a("div",{staticClass:"w-full"},[a("div",{staticClass:"cards"},t._l(t.products,function(t){return a("div",{key:t._id,staticClass:"shadow-lg rounded-lg overflow-hidden bg-white"},[a("Product",{attrs:{product:t}})],1)}),0),a("Pagination",{attrs:{currentPage:t.currentPage,pages:t.pages,pageLimit:"5"},on:{"handler-page":t.clickHandlerPage}})],1)])])},n=[],i=a("16a4"),s=a("be6f"),c=a("1799"),o=a("1d9f"),u={props:["category"],components:{Product:s["a"],Pagination:c["a"],Categories:o["a"]},data:function(){return{products:[],currentPage:0,pages:0}},created:function(){this.fetch()},watch:{$route:function(t,e){e.params.category!==t.params.category&&this.fetch()}},methods:{fetch:function(){var t=this;i["a"].getCategoriesByTitle(this.category).then(function(e){var a=e.data;t.products=a.products,t.currentPage=a.currentPage,t.pages=a.pages})},clickHandlerPage:function(t){var e=this;i["a"].getCategoriesByPage(this.category,t).then(function(t){var a=t.data;e.products=a.products,e.currentPage=a.currentPage,e.pages=a.pages})}}},l=u,d=a("2877"),g=Object(d["a"])(l,r,n,!1,null,"31942643",null);e["default"]=g.exports},be6f:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"product"},[a("router-link",{staticClass:"block min-height",attrs:{tag:"a",to:{name:"product",params:{id:t.product._id}}}},[a("img",{attrs:{src:t.product.image||"/legumes.jpg",alt:t.product.name}})]),a("div",{staticClass:"p-3"},[a("h3",{staticClass:"text-lg mb-1 leading-tight font-medium"},[t._v(t._s(t.product.name))]),a("p",{staticClass:"font-semibold text-md mb-2"},[t._v(t._s(t._f("currency")(t.product.price)))]),a("p",{staticClass:"text-sm text-grey-darker mb-2"},[t._v(t._s(t.product.description.substring(0,50)))]),a("button",{staticClass:"block w-full border shadow p-2 rounded mt-2 hover:bg-blue-dark hover:text-white",on:{click:function(e){return t.addToCart(t.product)}}},[t._v("\n      Ajouter au panier\n    ")])])],1)},n=[],i=a("77ca"),s={props:["product"],mixins:[i["a"]]},c=s,o=(a("dff8"),a("2877")),u=Object(o["a"])(c,r,n,!1,null,"6c81103c",null);e["a"]=u.exports},dff8:function(t,e,a){"use strict";var r=a("93d7"),n=a.n(r);n.a},f499:function(t,e,a){t.exports=a("a21f")}}]);
//# sourceMappingURL=chunk-a320b2c0.0e850d89.js.map