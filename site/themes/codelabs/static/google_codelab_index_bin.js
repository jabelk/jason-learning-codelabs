(function () {
     "use strict";
     var h = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this,
         aa =
             "function" == typeof Object.create
                 ? Object.create
                 : function (a) {
                       function b() {}
                       b.prototype = a;
                       return new b();
                   },
         k;
     if ("function" == typeof Object.setPrototypeOf) k = Object.setPrototypeOf;
     else {
         var n;
         a: {
             var ba = { I: !0 },
                 ca = {};
             try {
                 ca.__proto__ = ba;
                 n = ca.I;
                 break a;
             } catch (a) {}
             n = !1;
         }
         k = n
             ? function (a, b) {
                   a.__proto__ = b;
                   if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
                   return a;
               }
             : null;
     }
     var da = k;
     function ea(a, b) {
         a.prototype = aa(b.prototype);
         a.prototype.constructor = a;
         if (da) da(a, b);
         else
             for (var c in b)
                 if ("prototype" != c)
                     if (Object.defineProperties) {
                         var d = Object.getOwnPropertyDescriptor(b, c);
                         d && Object.defineProperty(a, c, d);
                     } else a[c] = b[c];
         a.G = b.prototype;
     }
     var fa =
         "function" == typeof Object.defineProperties
             ? Object.defineProperty
             : function (a, b, c) {
                   a != Array.prototype && a != Object.prototype && (a[b] = c.value);
               };
     function ha() {
         ha = function () {};
         h.Symbol || (h.Symbol = ia);
     }
     var ia = (function () {
         var a = 0;
         return function (b) {
             return "jscomp_symbol_" + (b || "") + a++;
         };
     })();
     function ja() {
         ha();
         var a = h.Symbol.iterator;
         a || (a = h.Symbol.iterator = h.Symbol("iterator"));
         "function" != typeof Array.prototype[a] &&
             fa(Array.prototype, a, {
                 configurable: !0,
                 writable: !0,
                 value: function () {
                     return ka(this);
                 },
             });
         ja = function () {};
     }
     function ka(a) {
         var b = 0;
         return la(function () {
             return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
         });
     }
     function la(a) {
         ja();
         a = { next: a };
         a[h.Symbol.iterator] = function () {
             return this;
         };
         return a;
     }
     function p(a) {
         if (!(a instanceof Array)) {
             ja();
             var b = a[Symbol.iterator];
             a = b ? b.call(a) : ka(a);
             for (var c = []; !(b = a.next()).done; ) c.push(b.value);
             a = c;
         }
         return a;
     }
     var q = this;
     function r(a) {
         return "string" == typeof a;
     }
     function ma() {}
     function t(a) {
         var b = typeof a;
         if ("object" == b)
             if (a) {
                 if (a instanceof Array) return "array";
                 if (a instanceof Object) return b;
                 var c = Object.prototype.toString.call(a);
                 if ("[object Window]" == c) return "object";
                 if ("[object Array]" == c || ("number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))) return "array";
                 if ("[object Function]" == c || ("undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))) return "function";
             } else return "null";
         else if ("function" == b && "undefined" == typeof a.call) return "object";
         return b;
     }
     function na(a) {
         var b = typeof a;
         return ("object" == b && null != a) || "function" == b;
     }
     var oa = "closure_uid_" + ((1e9 * Math.random()) >>> 0),
         pa = 0;
     function qa(a, b, c) {
         return a.call.apply(a.bind, arguments);
     }
     function ra(a, b, c) {
         if (!a) throw Error();
         if (2 < arguments.length) {
             var d = Array.prototype.slice.call(arguments, 2);
             return function () {
                 var c = Array.prototype.slice.call(arguments);
                 Array.prototype.unshift.apply(c, d);
                 return a.apply(b, c);
             };
         }
         return function () {
             return a.apply(b, arguments);
         };
     }
     function u(a, b, c) {
         Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? (u = qa) : (u = ra);
         return u.apply(null, arguments);
     }
     var sa =
         Date.now ||
         function () {
             return +new Date();
         };
     function v(a, b) {
         function c() {}
         c.prototype = b.prototype;
         a.G = b.prototype;
         a.prototype = new c();
         a.prototype.constructor = a;
         a.U = function (a, c, f) {
             for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++) d[e - 2] = arguments[e];
             return b.prototype[c].apply(a, d);
         };
     }
     var w;
     var ta = Array.prototype.indexOf
             ? function (a, b) {
                   return Array.prototype.indexOf.call(a, b, void 0);
               }
             : function (a, b) {
                   if (r(a)) return r(b) && 1 == b.length ? a.indexOf(b, 0) : -1;
                   for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
                   return -1;
               },
         ua = Array.prototype.forEach
             ? function (a, b) {
                   Array.prototype.forEach.call(a, b, void 0);
               }
             : function (a, b) {
                   for (var c = a.length, d = r(a) ? a.split("") : a, e = 0; e < c; e++) e in d && b.call(void 0, d[e], e, a);
               };
     function va() {}
     function wa() {}
     v(wa, va);
     function x(a) {
         this.l = a;
     }
     v(x, wa);
     x.prototype.set = function (a, b) {
         try {
             this.l.setItem(a, b);
         } catch (c) {
             if (0 == this.l.length) throw "Storage mechanism: Storage disabled";
             throw "Storage mechanism: Quota exceeded";
         }
     };
     x.prototype.get = function (a) {
         a = this.l.getItem(a);
         if (!r(a) && null !== a) throw "Storage mechanism: Invalid value was encountered";
         return a;
     };
     x.prototype.key = function (a) {
         return this.l.key(a);
     };
     function xa() {
         var a = null;
         try {
             a = window.localStorage || null;
         } catch (b) {}
         this.l = a;
     }
     v(xa, x);
     var ya = String.prototype.trim
         ? function (a) {
               return a.trim();
           }
         : function (a) {
               return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
           };
     function y(a) {
         if (!za.test(a)) return a;
         -1 != a.indexOf("&") && (a = a.replace(Aa, "&amp;"));
         -1 != a.indexOf("<") && (a = a.replace(Ba, "&lt;"));
         -1 != a.indexOf(">") && (a = a.replace(Ca, "&gt;"));
         -1 != a.indexOf('"') && (a = a.replace(Da, "&quot;"));
         -1 != a.indexOf("'") && (a = a.replace(Ea, "&#39;"));
         -1 != a.indexOf("\x00") && (a = a.replace(Fa, "&#0;"));
         return a;
     }
     var Aa = /&/g,
         Ba = /</g,
         Ca = />/g,
         Da = /"/g,
         Ea = /'/g,
         Fa = /\x00/g,
         za = /[\x00&<>"']/;
     function Ga(a, b) {
         return a < b ? -1 : a > b ? 1 : 0;
     }
     function Ha(a, b, c) {
         for (var d in a) b.call(c, a[d], d, a);
     }
     function z() {
         this.H = Ia;
     }
     z.prototype.w = !0;
     z.prototype.b = function () {
         return "";
     };
     z.prototype.D = !0;
     z.prototype.a = function () {
         return 1;
     };
     var Ia = {};
     function A() {
         this.c = "";
         this.f = Ja;
     }
     A.prototype.w = !0;
     A.prototype.b = function () {
         return this.c;
     };
     A.prototype.D = !0;
     A.prototype.a = function () {
         return 1;
     };
     function Ka(a) {
         return a instanceof A && a.constructor === A && a.f === Ja ? a.c : "type_error:SafeUrl";
     }
     var La = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
         Ja = {};
     function Ma(a) {
         var b = new A();
         b.c = a;
         return b;
     }
     Ma("about:blank");
     var B;
     a: {
         var Na = q.navigator;
         if (Na) {
             var Oa = Na.userAgent;
             if (Oa) {
                 B = Oa;
                 break a;
             }
         }
         B = "";
     }
     function C() {
         this.c = "";
         this.v = Pa;
         this.f = null;
     }
     C.prototype.D = !0;
     C.prototype.a = function () {
         return this.f;
     };
     C.prototype.w = !0;
     C.prototype.b = function () {
         return this.c;
     };
     function D(a) {
         return a instanceof C && a.constructor === C && a.v === Pa ? a.c : "type_error:SafeHtml";
     }
     function Qa(a) {
         if (a instanceof C) return a;
         var b = "object" == typeof a,
             c = null;
         b && a.D && (c = a.a());
         a = y(b && a.w ? a.b() : String(a));
         return E(a, c);
     }
     function Ra(a) {
         function b(a) {
             "array" == t(a) ? ua(a, b) : ((a = Qa(a)), (d += D(a)), (a = a.a()), 0 == c ? (c = a) : 0 != a && c != a && (c = null));
         }
         var c = 0,
             d = "";
         ua(arguments, b);
         return E(d, c);
     }
     var Pa = {};
     function E(a, b) {
         var c = new C();
         c.c = a;
         c.f = b;
         return c;
     }
     E("<!DOCTYPE html>", 0);
     E("", 0);
     var Sa = E("<br>", 0);
     var F = {},
         Ta = {},
         Ua = {},
         Va = {};
     function G() {
         throw Error("Do not instantiate directly");
     }
     G.prototype.C = null;
     G.prototype.toString = function () {
         return this.u;
     };
     function Wa() {
         G.call(this);
     }
     v(Wa, G);
     Wa.prototype.g = F;
     function Xa(a) {
         Xa[" "](a);
         return a;
     }
     Xa[" "] = ma;
     var Ya = -1 != B.indexOf("Opera"),
         H = -1 != B.indexOf("Trident") || -1 != B.indexOf("MSIE"),
         Za = -1 != B.indexOf("Edge"),
         $a = -1 != B.indexOf("Gecko") && !(-1 != B.toLowerCase().indexOf("webkit") && -1 == B.indexOf("Edge")) && !(-1 != B.indexOf("Trident") || -1 != B.indexOf("MSIE")) && -1 == B.indexOf("Edge"),
         ab = -1 != B.toLowerCase().indexOf("webkit") && -1 == B.indexOf("Edge");
     function bb() {
         var a = q.document;
         return a ? a.documentMode : void 0;
     }
     var I;
     a: {
         var eb = "",
             fb = (function () {
                 var a = B;
                 if ($a) return /rv:([^\);]+)(\)|;)/.exec(a);
                 if (Za) return /Edge\/([\d\.]+)/.exec(a);
                 if (H) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
                 if (ab) return /WebKit\/(\S+)/.exec(a);
                 if (Ya) return /(?:Version)[ \/]?(\S+)/.exec(a);
             })();
         fb && (eb = fb ? fb[1] : "");
         if (H) {
             var gb = bb();
             if (null != gb && gb > parseFloat(eb)) {
                 I = String(gb);
                 break a;
             }
         }
         I = eb;
     }
     var hb = {},
         ib;
     var jb = q.document;
     ib = jb && H ? bb() || ("CSS1Compat" == jb.compatMode ? parseInt(I, 10) : 5) : void 0;
     function kb(a) {
         if (null != a)
             switch (a.C) {
                 case 1:
                     return 1;
                 case -1:
                     return -1;
                 case 0:
                     return 0;
             }
         return null;
     }
     function J(a) {
         return null != a && a.g === F ? a : a instanceof C ? K(D(a), a.a()) : K(y(String(String(a))), kb(a));
     }
     var K = (function (a) {
         function b(a) {
             this.u = a;
         }
         b.prototype = a.prototype;
         return function (a, d) {
             a = new b(String(a));
             void 0 !== d && (a.C = d);
             return a;
         };
     })(Wa);
     function L(a) {
         return null != a && a.g === F ? String(String(a.u).replace(lb, "").replace(mb, "&lt;")).replace(nb, ob) : y(String(a));
     }
     var pb = {
         "\x00": "&#0;",
         "\t": "&#9;",
         "\n": "&#10;",
         "\x0B": "&#11;",
         "\f": "&#12;",
         "\r": "&#13;",
         " ": "&#32;",
         '"': "&quot;",
         "&": "&amp;",
         "'": "&#39;",
         "-": "&#45;",
         "/": "&#47;",
         "<": "&lt;",
         "=": "&#61;",
         ">": "&gt;",
         "`": "&#96;",
         "\u0085": "&#133;",
         "\u00a0": "&#160;",
         "\u2028": "&#8232;",
         "\u2029": "&#8233;",
     };
     function ob(a) {
         return pb[a];
     }
     var qb = {
         "\x00": "%00",
         "\u0001": "%01",
         "\u0002": "%02",
         "\u0003": "%03",
         "\u0004": "%04",
         "\u0005": "%05",
         "\u0006": "%06",
         "\u0007": "%07",
         "\b": "%08",
         "\t": "%09",
         "\n": "%0A",
         "\x0B": "%0B",
         "\f": "%0C",
         "\r": "%0D",
         "\u000e": "%0E",
         "\u000f": "%0F",
         "\u0010": "%10",
         "\u0011": "%11",
         "\u0012": "%12",
         "\u0013": "%13",
         "\u0014": "%14",
         "\u0015": "%15",
         "\u0016": "%16",
         "\u0017": "%17",
         "\u0018": "%18",
         "\u0019": "%19",
         "\u001a": "%1A",
         "\u001b": "%1B",
         "\u001c": "%1C",
         "\u001d": "%1D",
         "\u001e": "%1E",
         "\u001f": "%1F",
         " ": "%20",
         '"': "%22",
         "'": "%27",
         "(": "%28",
         ")": "%29",
         "<": "%3C",
         ">": "%3E",
         "\\": "%5C",
         "{": "%7B",
         "}": "%7D",
         "\u007f": "%7F",
         "\u0085": "%C2%85",
         "\u00a0": "%C2%A0",
         "\u2028": "%E2%80%A8",
         "\u2029": "%E2%80%A9",
         "\uff01": "%EF%BC%81",
         "\uff03": "%EF%BC%83",
         "\uff04": "%EF%BC%84",
         "\uff06": "%EF%BC%86",
         "\uff07": "%EF%BC%87",
         "\uff08": "%EF%BC%88",
         "\uff09": "%EF%BC%89",
         "\uff0a": "%EF%BC%8A",
         "\uff0b": "%EF%BC%8B",
         "\uff0c": "%EF%BC%8C",
         "\uff0f": "%EF%BC%8F",
         "\uff1a": "%EF%BC%9A",
         "\uff1b": "%EF%BC%9B",
         "\uff1d": "%EF%BC%9D",
         "\uff1f": "%EF%BC%9F",
         "\uff20": "%EF%BC%A0",
         "\uff3b": "%EF%BC%BB",
         "\uff3d": "%EF%BC%BD",
     };
     function M(a) {
         return qb[a];
     }
     var nb = /[\x00\x22\x27\x3c\x3e]/g,
         N = /[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g,
         rb = /^(?![^#?]*\/(?:\.|%2E){2}(?:[\/?#]|$))(?:(?:https?|mailto):|[^&:\/?#]*(?:[\/?#]|$))/i,
         lb = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g,
         mb = /</g;
     function sb(a) {
         var sorting = a.sort;
         var categories = a.L;
         var output =
             '<div id="sort-by-tabs" class="sort-by-inner"><a href="#" sort="alpha"' +
             ("alpha" == sorting ? " selected" : "") +
             '>A-Z</a><a href="#" sort="recent"' +
             ("recent" == sorting ? " selected" : "") +
             '>Recent</a><a href="#" sort="duration"' +
             ("duration" == sorting ? " selected" : "") +
             '>Duration</a></div><div class="sort-by-inner"><select id="codelab-categories"><option value="">Category</option>';
         for (var c = Math.max(0, Math.ceil(categories.length)), i = 0; i < c; i++) {
             output += '<option value="' + L(String(categories[i]).toLowerCase().replace(/\s+/g, "-").replace(/--+/g, "-").trim()) + '">' + J(String(categories[i])) + "</option>";
         }
         return K(output + "</select></div>");
     }
     var tb = (function (a) {
         var b = !1,
             c;
         return function () {
             b || ((c = a()), (b = !0));
             return c;
         };
     })(function () {
         var a = document.createElement("div");
         a.innerHTML = "<div><div></div></div>";
         var b = a.firstChild.firstChild;
         a.innerHTML = "";
         return !b.parentElement;
     });
     function ub(a, b) {
         if (tb()) for (; a.lastChild; ) a.removeChild(a.lastChild);
         a.innerHTML = b;
     }
     function vb() {
         this.a = q.document || document;
     }
     function wb(a, b) {
         b = a(b || xb, void 0, void 0);
         a = (w || (w = new vb())).a.createElement("DIV");
         b = yb(b);
         ub(a, b);
         1 == a.childNodes.length && ((b = a.firstChild), 1 == b.nodeType && (a = b));
         return a;
     }
     function yb(a) {
         if (a instanceof G) {
             if (a.g === F) return a.u;
             if (a.g === Va) return y(a.u);
         }
         return "zSoyz";
     }
     var xb = {}; /*

  Copyright 2018 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
 */
     function O() {
         var a = HTMLElement.call(this) || this;
         a.l = new xa();
         return a;
     }
     ea(O, HTMLElement);
     O.prototype.connectedCallback = function () {
         this.hasAttribute("sort") ? sort_page(this) : this.setAttribute("sort", "alpha");
         (this.hasAttribute("filter") || this.hasAttribute("categories") || this.hasAttribute("tags")) && filter_page(this);
     };
     O.prototype.connectedCallback = O.prototype.connectedCallback;
     O.prototype.attributeChangedCallback = function (a) {
         switch (a) {
             case "sort":
                 sort_page(this);
                 break;
             case "filter":
             case "categories":
             case "tags":
                 filter_page(this);
         }
     };
     O.prototype.attributeChangedCallback = O.prototype.attributeChangedCallback;
     function sort_page(a) {
         var b = a.getAttribute("sort") || "alpha",
             c = [].concat(p(a.querySelectorAll(".card")));
         if (!(2 > c.length)) {
             switch (b) {
                 case "duration":
                     c.sort(a.f.bind(a));
                     break;
                 case "recent":
                     c.sort(a.c.bind(a));
                     break;
                 default:
                     (b = "alpha"), c.sort(a.b.bind(a));
             }
             c.forEach(function (b) {
                 return a.appendChild(b);
             });
             c = new URL(document.location.toString());
             b && "alpha" !== b ? c.searchParams.set("sort", b) : c.searchParams.delete("sort");
             Bb(a);
             b = c.pathname + c.search;
             window.history.replaceState({ path: b }, document.title, b);
         }
     }
     function Bb(a) {
         a.setAttribute("num", a.querySelectorAll(".card:not([hidden])").length);
     }
     O.prototype.f = function (a, b) {
         if (!a || !b) return 0;
         var c = parseFloat(a.getAttribute("duration")) || 0,
             d = parseFloat(b.getAttribute("duration")) || 0;
         c -= d;
         return 0 === c ? this.c(a, b) : c;
     };
     O.prototype.c = function (a, b) {
         if (!a || !b) return 0;
         var c = new Date(a.getAttribute("updated") || 0);
         c = new Date(b.getAttribute("updated") || 0).getTime() - c.getTime();
         return 0 === c ? this.b(a, b) : c;
     };
     O.prototype.b = function (a, b) {
         if (!a || !b) return 0;
         a = a.getAttribute("title");
         b = b.getAttribute("title");
         return a < b ? -1 : a > b ? 1 : 0;
     };
     function filter_page(a) {
         var b = Cb(a.getAttribute("filter")),
             c = P((a.getAttribute("tags") || "").split(",")),
             d = P((a.getAttribute("categories") || "").split(","));
         [].concat(p(a.querySelectorAll(".card"))).forEach(function (a) {
             var e = Cb(a.getAttribute("title")),
                 f = P((a.getAttribute("categories") || "").split(",")).map(function (a) { return a.replace(/\s+/g, "-").replace(/--+/g, "-").trim(); }),
                 S = P((a.getAttribute("tags") || "").split(",")),
                 l = !0,
                 cb = !0,
                 db = !0;
             b && (l = -1 !== e.indexOf(b));
             c.length && (cb = Db(S, c));
             d.length && (db = Db(f, d));
             l && cb && db ? a.removeAttribute("hidden") : a.setAttribute("hidden", "");
         });
         var e = new URL(document.location.toString());
         c.length ? e.searchParams.set("tags", c.join(",")) : e.searchParams.delete("tags");
         d.length ? e.searchParams.set("cat", d.join(",")) : e.searchParams.delete("cat");
         b ? e.searchParams.set("filter", b) : e.searchParams.delete("filter");
         Bb(a);
         a = e.pathname + e.search;
         window.history.replaceState({ path: a }, document.title, a);
     }
     function Db(a, b) {
         for (var c = 0; c < a.length; c++) if (b.includes(a[c])) return !0;
         return !1;
     }
     function Cb(a) {
         return (a || "").trim().toLowerCase().replace("\n", "").replace(/\s+/g, " ");
     }
     function P(a) {
         a = a || [];
         var b = [];
         a.forEach(function (a) {
             (a = Cb(a)) && b.push(a);
         });
         return b.sort();
     }
     O.prototype.J = function (a) {
         let categories = a.getAttribute("categories").split(",");

         var category = (categories[0]).toLowerCase().replace(/\s+/g, "-").replace(/--+/g, "-").trim(),
             title = a.getAttribute("title") || "",
             tags = a.getAttribute("tags") || "",
             description = a.getAttribute("description") || "",
             duration = parseInt(a.getAttribute("duration"), 10) || 0,
             author = a.getAttribute("authors") || "",
             href = a.href,
             updated = "Unknown";

         (updated = a.getAttribute("updated")) ? ((updated = new Date(updated)), (updated = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")[updated.getMonth()] + " " + updated.getUTCDate() + ", " + updated.getFullYear())) : (updated = "Unknown");

         var html =
             '<div class="card ' +
             L(category) +
             '-bottom" title="' +
             L(title) +
             '" categories="' +
             L(categories.join(',')) +
             '" tags="' +
             L(tags) +
             '" duration="' +
             L(duration) +
             '" updated="' +
             L(updated) +
             '"><div class="card-title">' +
             J(title) +
             '</div><div class="card-description">' +
             J(description) +
             '</div><div class="card-author"> by ' +
             author +
             '</div><div class="card-duration"><span>' +
             (duration ? J(duration) + " min" : "") +
             "</span><span>" +
             (updated ? " Updated " + J(updated) : "") +
             '</span></div><div class="card-footer"><a class="' +
             L(category) +
             '-bg x-scope paper-button" href="';
         var e;
         (null != href && href.g === Ta) || (null != href && href.g === Ua)
             ? (e = String(href).replace(N, M))
             : href instanceof A
             ? (e = String(Ka(href)).replace(N, M))
             : href instanceof z
             ? (e = String(href instanceof z && href.constructor === z && href.H === Ia ? "" : "type_error:TrustedResourceUrl").replace(N, M))
             : ((e = String(href)), (e = rb.test(e) ? e.replace(N, M) : "about:invalid#zSoyz"));
         var c = K(html + L(e) + '">Start</a></div></div>');
         var d = yb(c);
         if (c instanceof G) {
             if (c.g === Va) {
                 c = Qa(c.toString());
             } else {
                 if (c.g !== F) throw Error("Sanitized content was not of kind TEXT or HTML.");
                 c = E(c.toString(), c.C || null);
             }
         } else {
             c = E(d, null);
         }
         var b = new vb();
         b = b.a;
         d = c;
         c = b.createElement("DIV");
         H ? ((d = Ra(Sa, d)), ub(c, D(d)), c.removeChild(c.firstChild)) : ub(c, D(d));
         if (1 == c.childNodes.length) b = c.removeChild(c.firstChild);
         else for (b = b.createDocumentFragment(); c.firstChild; ) b.appendChild(c.firstChild);
         c = new URL(a.href, document.location.origin);
         c.searchParams.has("index") || c.searchParams.set("index", document.location.pathname);
         c = c.href;
         c instanceof A || c instanceof A || ((c = "object" == typeof c && c.w ? c.b() : String(c)), La.test(c) || (c = "about:invalid#zClosurez"), (c = Ma(c)));
         a.href = Ka(c);
         if ((c = a.getAttribute("id"))) (c = this.l.get("progress_" + c)), (d = a.getAttribute("steps")), c && d && a.setAttribute("progress", (parseFloat(c) / parseFloat(d) - 1).toFixed(2));
         this.appendChild(b);
     };
     O.prototype.addCard = O.prototype.J;
     h.Object.defineProperties(O, {
         observedAttributes: {
             configurable: !0,
             enumerable: !0,
             get: function () {
                 return ["sort", "filter", "categories", "tags"];
             },
         },
     });
     try {
         window.customElements.define("google-codelab-index-cards", O);
     } catch (a) {
         console.warn("googlecodelabs.CodelabIndex.Cards", a);
     }
     function Q() {
         0 != Eb && (this[oa] || (this[oa] = ++pa));
     }
     var Eb = 0;
     var Fb;
     (Fb = !H) || (Fb = 9 <= Number(ib));
     var Gb = Fb,
         Hb;
     if ((Hb = H)) {
         var Ib;
         if (Object.prototype.hasOwnProperty.call(hb, "9")) Ib = hb["9"];
         else {
             for (var R = 0, Jb = ya(String(I)).split("."), Kb = ya("9").split("."), Lb = Math.max(Jb.length, Kb.length), T = 0; 0 == R && T < Lb; T++) {
                 var Mb = Jb[T] || "",
                     Nb = Kb[T] || "";
                 do {
                     var U = /(\d*)(\D*)(.*)/.exec(Mb) || ["", "", "", ""],
                         V = /(\d*)(\D*)(.*)/.exec(Nb) || ["", "", "", ""];
                     if (0 == U[0].length && 0 == V[0].length) break;
                     R = Ga(0 == U[1].length ? 0 : parseInt(U[1], 10), 0 == V[1].length ? 0 : parseInt(V[1], 10)) || Ga(0 == U[2].length, 0 == V[2].length) || Ga(U[2], V[2]);
                     Mb = U[3];
                     Nb = V[3];
                 } while (0 == R);
             }
             Ib = hb["9"] = 0 <= R;
         }
         Hb = !Ib;
     }
     var Ob = Hb,
         Pb = (function () {
             if (!q.addEventListener || !Object.defineProperty) return !1;
             var a = !1,
                 b = Object.defineProperty({}, "passive", {
                     get: function () {
                         a = !0;
                     },
                 });
             q.addEventListener("test", ma, b);
             q.removeEventListener("test", ma, b);
             return a;
         })();
     function Qb(a, b) {
         this.type = a;
         this.a = this.target = b;
     }
     Qb.prototype.preventDefault = function () {};
     function W(a, b) {
         Qb.call(this, a ? a.type : "");
         this.relatedTarget = this.a = this.target = null;
         this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
         this.key = "";
         this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
         this.pointerId = 0;
         this.pointerType = "";
         this.b = null;
         if (a) {
             var c = (this.type = a.type),
                 d = a.changedTouches ? a.changedTouches[0] : null;
             this.target = a.target || a.srcElement;
             this.a = b;
             if ((b = a.relatedTarget)) {
                 if ($a) {
                     a: {
                         try {
                             Xa(b.nodeName);
                             var e = !0;
                             break a;
                         } catch (f) {}
                         e = !1;
                     }
                     e || (b = null);
                 }
             } else "mouseover" == c ? (b = a.fromElement) : "mouseout" == c && (b = a.toElement);
             this.relatedTarget = b;
             null === d
                 ? ((this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX), (this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY), (this.screenX = a.screenX || 0), (this.screenY = a.screenY || 0))
                 : ((this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX), (this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY), (this.screenX = d.screenX || 0), (this.screenY = d.screenY || 0));
             this.button = a.button;
             this.key = a.key || "";
             this.ctrlKey = a.ctrlKey;
             this.altKey = a.altKey;
             this.shiftKey = a.shiftKey;
             this.metaKey = a.metaKey;
             this.pointerId = a.pointerId || 0;
             this.pointerType = r(a.pointerType) ? a.pointerType : Rb[a.pointerType] || "";
             this.b = a;
             a.defaultPrevented && this.preventDefault();
         }
     }
     v(W, Qb);
     var Rb = { 2: "touch", 3: "pen", 4: "mouse" };
     W.prototype.preventDefault = function () {
         W.G.preventDefault.call(this);
         var a = this.b;
         if (a.preventDefault) a.preventDefault();
         else if (((a.returnValue = !1), Ob))
             try {
                 if (a.ctrlKey || (112 <= a.keyCode && 123 >= a.keyCode)) a.keyCode = -1;
             } catch (b) {}
     };
     var Sb = "closure_listenable_" + ((1e6 * Math.random()) | 0),
         Tb = 0;
     function Ub(a, b, c, d, e) {
         this.listener = a;
         this.proxy = null;
         this.src = b;
         this.type = c;
         this.capture = !!d;
         this.a = e;
         this.key = ++Tb;
         this.s = this.B = !1;
     }
     function Vb(a) {
         a.s = !0;
         a.listener = null;
         a.proxy = null;
         a.src = null;
         a.a = null;
     }
     function Wb(a) {
         this.src = a;
         this.a = {};
         this.b = 0;
     }
     Wb.prototype.add = function (a, b, c, d, e) {
         var f = a.toString();
         a = this.a[f];
         a || ((a = this.a[f] = []), this.b++);
         var g;
         a: {
             for (g = 0; g < a.length; ++g) {
                 var m = a[g];
                 if (!m.s && m.listener == b && m.capture == !!d && m.a == e) break a;
             }
             g = -1;
         }
         -1 < g ? ((b = a[g]), c || (b.B = !1)) : ((b = new Ub(b, this.src, f, !!d, e)), (b.B = c), a.push(b));
         return b;
     };
     function Xb(a, b) {
         var c = b.type;
         if (c in a.a) {
             var d = a.a[c],
                 e = ta(d, b),
                 f;
             (f = 0 <= e) && Array.prototype.splice.call(d, e, 1);
             f && (Vb(b), 0 == a.a[c].length && (delete a.a[c], a.b--));
         }
     }
     var Yb = "closure_lm_" + ((1e6 * Math.random()) | 0),
         Zb = {},
         $b = 0;
     function ac(a, b, c, d, e) {
         if (d && d.once) return bc(a, b, c, d, e);
         if ("array" == t(b)) {
             for (var f = 0; f < b.length; f++) ac(a, b[f], c, d, e);
             return null;
         }
         c = cc(c);
         return a && a[Sb] ? a.a.add(String(b), c, !1, na(d) ? !!d.capture : !!d, e) : dc(a, b, c, !1, d, e);
     }
     function dc(a, b, c, d, e, f) {
         if (!b) throw Error("Invalid event type");
         var g = na(e) ? !!e.capture : !!e,
             m = ec(a);
         m || (a[Yb] = m = new Wb(a));
         c = m.add(b, c, d, g, f);
         if (c.proxy) return c;
         d = fc();
         c.proxy = d;
         d.src = a;
         d.listener = c;
         if (a.addEventListener) Pb || (e = g), void 0 === e && (e = !1), a.addEventListener(b.toString(), d, e);
         else if (a.attachEvent) a.attachEvent(gc(b.toString()), d);
         else if (a.addListener && a.removeListener) a.addListener(d);
         else throw Error("addEventListener and attachEvent are unavailable.");
         $b++;
         return c;
     }
     function fc() {
         var a = hc,
             b = Gb
                 ? function (c) {
                       return a.call(b.src, b.listener, c);
                   }
                 : function (c) {
                       c = a.call(b.src, b.listener, c);
                       if (!c) return c;
                   };
         return b;
     }
     function bc(a, b, c, d, e) {
         if ("array" == t(b)) {
             for (var f = 0; f < b.length; f++) bc(a, b[f], c, d, e);
             return null;
         }
         c = cc(c);
         return a && a[Sb] ? a.a.add(String(b), c, !0, na(d) ? !!d.capture : !!d, e) : dc(a, b, c, !0, d, e);
     }
     function ic(a) {
         if ("number" != typeof a && a && !a.s) {
             var b = a.src;
             if (b && b[Sb]) Xb(b.a, a);
             else {
                 var c = a.type,
                     d = a.proxy;
                 b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(gc(c), d) : b.addListener && b.removeListener && b.removeListener(d);
                 $b--;
                 (c = ec(b)) ? (Xb(c, a), 0 == c.b && ((c.src = null), (b[Yb] = null))) : Vb(a);
             }
         }
     }
     function gc(a) {
         return a in Zb ? Zb[a] : (Zb[a] = "on" + a);
     }
     function jc(a, b, c, d) {
         var e = !0;
         if ((a = ec(a)))
             if ((b = a.a[b.toString()]))
                 for (b = b.concat(), a = 0; a < b.length; a++) {
                     var f = b[a];
                     f && f.capture == c && !f.s && ((f = kc(f, d)), (e = e && !1 !== f));
                 }
         return e;
     }
     function kc(a, b) {
         var c = a.listener,
             d = a.a || a.src;
         a.B && ic(a);
         return c.call(d, b);
     }
     function hc(a, b) {
         if (a.s) return !0;
         if (!Gb) {
             if (!b)
                 a: {
                     b = ["window", "event"];
                     for (var c = q, d = 0; d < b.length; d++)
                         if (((c = c[b[d]]), null == c)) {
                             b = null;
                             break a;
                         }
                     b = c;
                 }
             d = b;
             b = new W(d, this);
             c = !0;
             if (!(0 > d.keyCode || void 0 != d.returnValue)) {
                 a: {
                     var e = !1;
                     if (0 == d.keyCode)
                         try {
                             d.keyCode = -1;
                             break a;
                         } catch (g) {
                             e = !0;
                         }
                     if (e || void 0 == d.returnValue) d.returnValue = !0;
                 }
                 d = [];
                 for (e = b.a; e; e = e.parentNode) d.push(e);
                 a = a.type;
                 for (e = d.length - 1; 0 <= e; e--) {
                     b.a = d[e];
                     var f = jc(d[e], a, !0, b);
                     c = c && f;
                 }
                 for (e = 0; e < d.length; e++) (b.a = d[e]), (f = jc(d[e], a, !1, b)), (c = c && f);
             }
             return c;
         }
         return kc(a, new W(b, this));
     }
     function ec(a) {
         a = a[Yb];
         return a instanceof Wb ? a : null;
     }
     var lc = "__closure_events_fn_" + ((1e9 * Math.random()) >>> 0);
     function cc(a) {
         if ("function" == t(a)) return a;
         a[lc] ||
             (a[lc] = function (b) {
                 return a.handleEvent(b);
             });
         return a[lc];
     }
     function mc(a, b) {
         if ("function" != t(a))
             if (a && "function" == typeof a.handleEvent) a = u(a.handleEvent, a);
             else throw Error("Invalid listener argument");
         return 2147483647 < Number(b) ? -1 : q.setTimeout(a, b || 0);
     }
     function X(a, b, c) {
         Q.call(this);
         this.O = null != c ? u(a, c) : a;
         this.v = b;
         this.f = u(this.P, this);
         this.a = this.b = null;
         this.c = [];
     }
     v(X, Q);
     X.prototype.N = function (a) {
         this.c = arguments;
         this.b ? (this.a = sa() + this.v) : (this.b = mc(this.f, this.v));
     };
     X.prototype.P = function () {
         this.a ? ((this.b = mc(this.f, this.a - sa())), (this.a = null)) : ((this.b = null), this.O.apply(null, this.c));
     };
     function nc(a) {
         Q.call(this);
         this.b = a;
         this.a = {};
     }
     v(nc, Q);
     var oc = [];
     function Y(a, b, c, d) {
         "array" != t(c) && (c && (oc[0] = c.toString()), (c = oc));
         for (var e = 0; e < c.length; e++) {
             var f = ac(b, c[e], d || a.handleEvent, !1, a.b || a);
             if (!f) break;
             a.a[f.key] = f;
         }
     }
     function pc(a) {
         Ha(
             a.a,
             function (a, c) {
                 this.a.hasOwnProperty(c) && ic(a);
             },
             a
         );
         a.a = {};
     }
     nc.prototype.handleEvent = function () {
         throw Error("EventHandler.handleEvent not implemented");
     };
     function Z() {
         var a = HTMLElement.call(this) || this;
         a.o = new nc();
         a.F = !1;
         a.i = null;
         a.A = null;
         a.h = null;
         a.m = null;
         a.j = null;
         a.R = new X(function () {
             var b = a.h.value.trim();
             a.m && ("" === b ? a.m.setAttribute("hide", "") : a.m.removeAttribute("hide"));
             a.i && a.i.setAttribute("filter", b);
         }, 20);
         return a;
     }
     ea(Z, HTMLElement);
     Z.prototype.connectedCallback = function () {
         this.F || qc(this);
         rc(this);
         window.requestAnimationFrame(function () {
             document.body.removeAttribute("unresolved");
         });
     };
     Z.prototype.connectedCallback = Z.prototype.connectedCallback;
     Z.prototype.disconnectedCallback = function () {
         pc(this.o);
     };
     Z.prototype.disconnectedCallback = Z.prototype.disconnectedCallback;
     function rc(a) {
         if (a.A) {
             var b = a.A.querySelector("#sort-by-tabs");
             b &&
                 Y(a.o, b, "click", function (b) {
                     b.preventDefault();
                     b = b.target;
                     var c = b.getAttribute("sort");
                     a.i && a.i.setAttribute("sort", c);
                     (c = a.querySelector("[selected]")) && c.removeAttribute("selected");
                     b.setAttribute("selected", "");
                 });
         }
         a.h &&
             Y(a.o, a.h, "keyup", function () {
                 return sc(a);
             });
         a.m &&
             Y(a.o, a.m, "click", function () {
                 a.h && (a.h.value = "");
                 sc(a);
             });
         a.j &&
             Y(a.o, a.j, "change", function () {
                 a.i && a.j && a.i.setAttribute("categories", a.j.value);
             });
     }
     function sc(a) {
         window.requestAnimationFrame(function () {
             return a.R.N();
         });
     }
     function qc(a) {
         var b = a.querySelector("main .main-inner");
         if (b) {
            // Find locations of elements in document
             a.h = document.querySelector("#search-field");
             a.m = document.querySelector("#clear-icon");
             var c = a.querySelector("main ul"),
                 d = document.createElement("google-codelab-index-cards"),
                 e = new URL(document.location.toString());
            // Check for URL passed tags
             e.searchParams.has("tags") && d.setAttribute("tags", e.searchParams.getAll("tags").join(","));
             // Check for URL passed category
             var f = "";
             if (e.searchParams.has("cat")) {
                 var g = e.searchParams.getAll("cat");
                 f = g[0].trim().toLowerCase();
                 d.setAttribute("categories", g.join(","));
             }
            // Set sorting
             g = "alpha";
             e.searchParams.has("sort") && ((g = e.searchParams.get("sort")), d.setAttribute("sort", g));
            // Find and replace index page <ul> element with card index
             c
                 ? ([].concat(p(c.querySelectorAll("a"))).forEach(function (a) {
                       d.addCard(a);
                   }),
                   c && c.parentNode && c.parentNode.removeChild(c),
                   b.appendChild(d))
                 : (d = b.querySelector("google-codelab-index-cards"));
             if (d) {
                 // Create unique array of categories from each card
                 var m = new Set();
                 var categories;
                 [].concat(p(d.querySelectorAll(".card"))).forEach(function (a) {
                     (categories = a.getAttribute("categories")) &&
                         categories.split(",").forEach(function (a) {
                             m.add(a.trim());
                         });
                 });
                 // Create Category selector
                 b = wb(sb, { L: Array.from(m).sort(), V: f, sort: g });
                 b.setAttribute("id", "sort-by");
                 d.parentNode && d.parentNode.insertBefore(b, d);
                 a.A = b;
                 a.i = d;
                 a.j = a.A.querySelector("#codelab-categories");
                 // Select Category based on URL category if present
                 f &&
                     a.j &&
                     [].concat(p(a.j.options)).forEach(function (a) {
                         a.value.toLowerCase() === f && (a.selected = !0);
                     });
             }
             // Check and apply filter from URL
             e.searchParams.has("filter") && ((e = e.searchParams.get("filter")), a.h && ((a.h.value = e), sc(a)));
             a.F = !0;
         }
     }
     try {
         window.customElements.define("google-codelab-index", Z);
     } catch (a) {
         console.warn("googlecodelabs.CodelabIndex", a);
     }
 }.call(this));
