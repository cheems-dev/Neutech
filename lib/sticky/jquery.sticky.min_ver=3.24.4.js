!(function (t) {
  var o = function (o, s) {
    var i,
      e,
      n,
      r,
      a = !1,
      c = !1,
      f = !1,
      p = {},
      l = {
        to: "top",
        offset: 0,
        effectsOffset: 0,
        parent: !1,
        classes: {
          sticky: "sticky",
          stickyActive: "sticky-active",
          stickyEffects: "sticky-effects",
          spacer: "sticky-spacer",
        },
        isRTL: !1,
        handleScrollbarWidth: !1,
      },
      d = function (t, o, s) {
        var i = {},
          e = t[0].style;
        s.forEach(function (t) {
          i[t] = void 0 !== e[t] ? e[t] : "";
        }),
          t.data("css-backup-" + o, i);
      },
      m = function (t, o) {
        return t.data("css-backup-" + o);
      };
    const u = () => {
      if (((r = b(i, "width")), (n = i.offset().left), e.isRTL)) {
        const t = e.handleScrollbarWidth
          ? window.innerWidth
          : document.body.offsetWidth;
        n = Math.max(t - r - n, 0);
      }
    };
    var h = function () {
        (p.$spacer = i.clone().addClass(e.classes.spacer).css({
          visibility: "hidden",
          transition: "none",
          animation: "none",
        })),
          i.after(p.$spacer);
      },
      y = function () {
        p.$spacer.remove();
      },
      k = function () {
        d(i, "unsticky", [
          "position",
          "width",
          "margin-top",
          "margin-bottom",
          "top",
          "bottom",
          "inset-inline-start",
        ]);
        const t = {
          position: "fixed",
          width: r,
          marginTop: 0,
          marginBottom: 0,
        };
        (t[e.to] = e.offset),
          (t["top" === e.to ? "bottom" : "top"] = ""),
          n && (t["inset-inline-start"] = n + "px"),
          i.css(t).addClass(e.classes.stickyActive);
      },
      v = function () {
        i.css(m(i, "unsticky")).removeClass(e.classes.stickyActive);
      },
      b = function (t, o, s) {
        var i = getComputedStyle(t[0]),
          e = parseFloat(i[o]),
          n = "height" === o ? ["top", "bottom"] : ["left", "right"],
          r = [];
        return (
          "border-box" !== i.boxSizing && r.push("border", "padding"),
          s && r.push("margin"),
          r.forEach(function (t) {
            n.forEach(function (o) {
              e += parseFloat(i[t + "-" + o]);
            });
          }),
          e
        );
      },
      w = function (t) {
        var o = p.$window.scrollTop(),
          s = b(t, "height"),
          i = innerHeight,
          e = t.offset().top - o,
          n = e - i;
        return {
          top: { fromTop: e, fromBottom: n },
          bottom: { fromTop: e + s, fromBottom: n + s },
        };
      },
      g = function () {
        v(), y(), (a = !1), i.trigger("sticky:unstick");
      },
      $ = function () {
        var t = w(i),
          o = "top" === e.to;
        if (c) {
          (o ? t.top.fromTop > e.offset : t.bottom.fromBottom < -e.offset) &&
            (p.$parent.css(m(p.$parent, "childNotFollowing")),
            i.css(m(i, "notFollowing")),
            (c = !1));
        } else {
          var s = w(p.$parent),
            a = getComputedStyle(p.$parent[0]),
            f = parseFloat(a[o ? "borderBottomWidth" : "borderTopWidth"]),
            l = o ? s.bottom.fromTop - f : s.top.fromBottom + f;
          (o ? l <= t.bottom.fromTop : l >= t.top.fromBottom) &&
            (function () {
              d(p.$parent, "childNotFollowing", ["position"]),
                p.$parent.css("position", "relative"),
                d(i, "notFollowing", [
                  "position",
                  "inset-inline-start",
                  "top",
                  "bottom",
                ]);
              const t = { position: "absolute" };
              if (((n = p.$spacer.position().left), e.isRTL)) {
                const t = i.parent().outerWidth(),
                  o = p.$spacer.position().left;
                (r = p.$spacer.outerWidth()), (n = Math.max(t - r - o, 0));
              }
              (t["inset-inline-start"] = n + "px"),
                (t[e.to] = ""),
                (t["top" === e.to ? "bottom" : "top"] = 0),
                i.css(t),
                (c = !0);
            })();
        }
      },
      T = function () {
        var t,
          o = e.offset;
        if (a) {
          var s = w(p.$spacer);
          (t = "top" === e.to ? s.top.fromTop - o : -s.bottom.fromBottom - o),
            e.parent && $(),
            t > 0 && g();
        } else {
          var n = w(i);
          (t = "top" === e.to ? n.top.fromTop - o : -n.bottom.fromBottom - o) <=
            0 &&
            (u(),
            h(),
            k(),
            (a = !0),
            i.trigger("sticky:stick"),
            e.parent && $());
        }
        !(function (t) {
          f && -t < e.effectsOffset
            ? (i.removeClass(e.classes.stickyEffects), (f = !1))
            : !f &&
              -t >= e.effectsOffset &&
              (i.addClass(e.classes.stickyEffects), (f = !0));
        })(t);
      },
      B = function () {
        T();
      },
      C = function () {
        a && (v(), y(), u(), h(), k(), e.parent && ((c = !1), $()));
      };
    (this.destroy = function () {
      a && g(),
        p.$window.off("scroll", B).off("resize", C),
        i.removeClass(e.classes.sticky);
    }),
      (e = jQuery.extend(!0, l, s)),
      (i = t(o).addClass(e.classes.sticky)),
      (p.$window = t(window)),
      e.parent &&
        ((p.$parent = i.parent()),
        "parent" !== e.parent && (p.$parent = p.$parent.closest(e.parent))),
      p.$window.on({ scroll: B, resize: C }),
      T();
  };
  (t.fn.sticky = function (s) {
    var i = "string" == typeof s;
    return (
      this.each(function () {
        var e = t(this);
        if (i) {
          var n = e.data("sticky");
          if (!n)
            throw Error(
              "Trying to perform the `" + s + "` method prior to initialization"
            );
          if (!n[s])
            throw ReferenceError(
              "Method `" + s + "` not found in sticky instance"
            );
          n[s].apply(n, Array.prototype.slice.call(arguments, 1)),
            "destroy" === s && e.removeData("sticky");
        } else e.data("sticky", new o(this, s));
      }),
      this
    );
  }),
    (window.Sticky = o);
})(jQuery);
