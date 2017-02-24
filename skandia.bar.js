/* SkandiaBar */
/* Kittenxs - https://github.com/Kittenxs/ */
/* SkandiaBot - https://skandiabot.com */
! function(t, e, i, s) {
	"use strict";

	function r(e, i, s) {
		if (s._placement = s.position, delete s.position, "boolean" == typeof s.animate && this.animation(s.animate), "boolean" == typeof s.draggable && this.draggable(s.draggable), "boolean" == typeof s.scrollable && this.scrollable(s.scrollable), this._id = e.id, this._viewport = e, this._$viewport = t(e), this._wrapper = i, this._$wrapper = t(i), "undefined" == typeof s.axis) throw "Axis must be defined";
		return t.extend(this, {
			offset: 0,
			fade: !1,
			_animation: !0,
			_draggable: !0,
			_scrollable: !0,
			_pos: 0,
			_percent: 0,
			_placement: "x" === s.axis ? "bottom" : "right",
			_position: "x" === s.axis ? "left" : "top",
			_area: "x" === s.axis ? "width" : "height",
			_clientArea: "x" === s.axis ? "clientWidth" : "clientHeight",
			_offsetArea: "x" === s.axis ? "offsetWidth" : "offsetHeight",
			_scrollArea: "x" === s.axis ? "scrollWidth" : "scrollHeight",
			_scrollTo: "x" === s.axis ? "scrollLeft" : "scrollTop",
			_move: "x" === s.axis ? "moveX" : "moveY",
			_down: "x" === s.axis ? "downX" : "downY"
		}, s), this.scrollable(!0), this._build(), this
	}
	r.prototype = {
		_build: function() {
			var e, s;
			return e = this._scrollbar = i.createElement("div"), e.className = "skandiabar-" + this.axis, s = this._scrubber = i.createElement("div"), s.className = "scrubber", this._$scrollbar = t(this._scrollbar), this._$scrubber = t(this._scrubber), e.appendChild(s), this._wrapper.appendChild(e), this._$viewport.addClass("skandiabars").addClass("skandiabars-" + this.axis), this.refresh(!0), this._events(), t("#" + this._id).trigger("lb.ready", {
				id: this._id,
				axis: this.axis,
				position: this._pos,
				percent: this._percent
			}), !1
		},
		refresh: function(e) {
			return this._skandiaview(), this._skandiabar(), e || t("#" + this._id).trigger("lb.refresh", {
				id: this._id,
				axis: this.axis,
				position: this._pos,
				percent: this._percent
			}), this
		},
		_skandiaview: function() {
			var t = Math.min(this._wrapper[this._offsetArea], this._$wrapper.parent()[this._area]()),
				e = this._$viewport.css("padding"),
				i = this._$viewport.css("border-width");
			this._$viewport.css({
				padding: 0,
				"border-width": 0
			}), this._wrapper.style.width = this._viewport.style.width, this._wrapper.style.height = this._viewport.style.height, this._$viewport[this._area](t), this._$viewport.css({
				padding: e,
				"border-width": i
			}), this._viewport[this._scrollArea] > this._viewport[this._clientArea] ? (this._scrollable = !0, this._$scrollbar.fadeIn("fast")) : this._$scrollbar.hide()
		},
		_skandiabar: function() {
			var t, e = {};
			t = this._viewport[this._clientArea] / this._viewport[this._scrollArea] * 100, t = this._$scrollbar[this._area]() / 100 * t, t = Math.floor(t), this._$scrubber[this._area](t), e[this._placement] = this.offset, this._$scrollbar[this._area](this._wrapper[this._offsetArea]).css(e), this._scroll(), this._fader = this.fade ? this._fade() : s
		},
		_events: function() {
			var i, s, r = this,
				a = {},
				o = r._viewport[r._scrollArea] - r._viewport[r._offsetArea];
			if (s = r._$wrapper, s.on("mousewheel MozMousePixelScroll", function(t) {
					var e = t.originalEvent,
						s = {
							x: 0,
							y: 0
						};
					return i = {
						top: r._viewport.scrollTop,
						left: r._viewport.scrollLeft
					}, e.wheelDelta && (s.y = -1 * e.wheelDelta), e.wheelDeltaY && (s.y = -1 * e.wheelDeltaY), e.wheelDeltaX && (s.x = -1 * e.wheelDeltaX), e.detail && (s.y = e.detail), 1 === e.axis && (s.x = e.detail), 2 === e.axis && (s.y = e.detail), e.deltaY && (s.y = e.deltaY), e.deltaX && (s.x = e.deltaX), s.y = Math.abs(s.y) > 99 ? s.y / 10 : s.y, s.x = Math.abs(s.x) > 99 ? s.x / 10 : s.x, a.wheelX = s.x, a.wheelY = s.y, r._viewport.scrollLeft = i.left + a.wheelX, r._viewport.scrollTop = i.top + a.wheelY, r._viewport[r._scrollTo] >= o && (r._viewport[r._scrollTo] = o), r._viewport[r._scrollTo] > 0 && r._viewport[r._scrollTo] < o ? !1 : void 0
				}), s = r._$scrubber.add(r._$wrapper), s.on("mousedown touchstart", function(s) {
					if (this === r._wrapper && r._draggable && r._scrollable || this === r._scrubber && r.scrollable) {
						var o, l = t(this);
						return l.hasClass("scrubber") && (o = !0), i = r._viewport[r._scrollTo], o && (i = r._$scrubber.position()[r._position]), a.downX = s.pageX || s.originalEvent.pageX, a.downY = s.pageY || s.originalEvent.pageY, t(e).on("mousemove touchmove", function(t) {
							var e;
							a.moveX = t.pageX || t.originalEvent.pageX, a.moveY = t.pageY || t.originalEvent.pageY, o ? (e = i + (a[r._move] - a[r._down]), e = e / r._$scrollbar[r._area]() * 100, e = Math.floor(e), e = e / 100 * r._viewport[r._scrollArea]) : e = i - (a[r._move] - a[r._down]), r._viewport[r._scrollTo] = e
						}), !1
					}
				}), t(e).on("mouseup touchend", function() {
					t(e).off("mousemove touchmove")
				}), t(e).on("load resize", function() {
					r.refresh()
				}), t("img").on("load", function() {
					r.refresh()
				}), r._$viewport.on("scroll", function() {
					r._scroll()
				}), r.fade) {
				var l = r._$wrapper.add(r._$scrollbar);
				l.on("mouseenter touchstart", function() {
					clearTimeout(r._fader), r._$scrollbar.fadeIn("fast")
				}), l.on("mouseleave touchend", function() {
					clearTimeout(r._fader), r._fader = r._fade()
				})
			}
			return !1
		},
		_scroll: function() {
			var e, i = this,
				s = this._viewport[this._scrollArea] - this._viewport[this._clientArea];
			return this._percent = this._viewport[this._scrollTo] / s * 100, this._percent = Math.round(10 * this._percent) / 10, e = this._viewport[this._scrollTo] / this._viewport[this._scrollArea] * 100, e = this._$scrollbar[this._area]() / 100 * e, e = this._pos = Math.floor(e), this._$scrubber.css(this._position, e), this._percent <= 0 && t("#" + this._id).trigger("lb.start", {
				id: this._id,
				axis: this.axis,
				position: this._pos,
				percent: this._percent
			}), this._percent > 0 && this._percent < 100 && t("#" + this._id).trigger("lb.scroll", {
				id: this._id,
				axis: this.axis,
				position: this._pos,
				percent: this._percent
			}), this._percent >= 100 && t("#" + this._id).trigger("lb.end", {
				id: this._id,
				axis: this.axis,
				position: this._pos,
				percent: this._percent
			}), clearTimeout(this._scrollTimeout), this._scrollTimeout = setTimeout(function() {
				t("#" + i._id).trigger("lb.idle", {
					id: i._id,
					axis: i.axis,
					position: i._pos,
					percent: i._percent
				})
			}, 500), this._viewport[this._scrollTo]
		},
		_animate: function(e, i) {
			var s = this;
			t({
				scroll: e
			}).animate({
				scroll: i
			}, {
				duration: 500,
				easing: "swing",
				step: function() {
					s._jump(this.scroll)
				}
			})
		},
		_jump: function(t) {
			this._viewport[this._scrollTo] = t
		},
		_fade: function() {
			var t = this;
			return setTimeout(function() {
				t._$scrollbar.fadeOut()
			}, 1e3)
		},
		scroll: function(t) {
			var e = this._viewport[this._scrollArea] - this._viewport[this._clientArea];
			t.indexOf("%") > -1 && (t = parseInt(t) / 100 * e), "start" === t && (t = 0), "end" === t && (t = e), this._animation ? this._animate(this._viewport[this._scrollTo], parseInt(t)) : this._jump(parseInt(t))
		},
		animation: function(t) {
			return "boolean" == typeof t && (this._animation = t), this._animation
		},
		draggable: function(t) {
			return "boolean" == typeof t && (this._draggable = t), this._draggable
		},
		scrollable: function(t) {
			return "boolean" == typeof t && (this._scrollable = t), this._scrollable
		}
	}, t.fn.skandiabars = function(e, s, a) {
		var o, l, n, h, _, c, p, d, f, u;
		return this.each(function() {
			l = t(this), o = l.attr("id"), "undefined" == typeof o && (n = new Date, h = n.getTime() + Math.floor(1e7 * Math.random() + 1), o = "skandiabars-" + h, l.attr("id", o)), _ = o + "-wrapper", p = l.parent(), p.hasClass("skandiabars-wrapper") || (p = t(i.createElement("div")).attr("id", _).addClass("skandiabars-wrapper"), l.wrap(p)), c = i.getElementById(_), p = t(c), d = p.data("skandiabars"), e = e || l.data(), f = "object" == typeof e && e, "undefined" == typeof d && p.data("skandiabars", d = new r(this, c, f, s)), "string" == typeof e && (u = d[e](s, a))
		}), u || this
	}, t.fn.skandiabars.constructor = r, t(i).ready(function() {
		t(".skandiabars-x").each(function() {
			var e = t(this);
			e.data("axis", "x"), e.skandiabars(e.data())
		}), t(".skandiabars-y").each(function() {
			var e = t(this);
			e.data("axis", "y"), e.skandiabars(e.data())
		})
	})
}(jQuery, window, document, void 0);
