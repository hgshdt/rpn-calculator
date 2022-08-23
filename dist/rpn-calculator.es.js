var Ee = Object.defineProperty;
var Oe = (w, h, O) => h in w ? Ee(w, h, { enumerable: !0, configurable: !0, writable: !0, value: O }) : w[h] = O;
var ie = (w, h, O) => (Oe(w, typeof h != "symbol" ? h + "" : h, O), O);
var me = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, ae = Math.ceil, X = Math.floor, C = "[BigNumber Error] ", xe = C + "Number primitive has more than 15 significant digits: ", $ = 1e14, E = 14, ge = 9007199254740991, pe = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], J = 1e7, P = 1e9;
function Ne(w) {
  var h, O, I, p = g.prototype = { constructor: g, toString: null, valueOf: null }, T = new g(1), S = 20, _ = 4, L = -7, U = 21, Q = -1e7, q = 1e7, Z = !1, b = 1, Y = 0, fe = {
    prefix: "",
    groupSize: 3,
    secondaryGroupSize: 0,
    groupSeparator: ",",
    decimalSeparator: ".",
    fractionGroupSize: 0,
    fractionGroupSeparator: "\xA0",
    suffix: ""
  }, K = "0123456789abcdefghijklmnopqrstuvwxyz", le = !0;
  function g(e, r) {
    var t, o, n, f, c, i, s, u, l = this;
    if (!(l instanceof g))
      return new g(e, r);
    if (r == null) {
      if (e && e._isBigNumber === !0) {
        l.s = e.s, !e.c || e.e > q ? l.c = l.e = null : e.e < Q ? l.c = [l.e = 0] : (l.e = e.e, l.c = e.c.slice());
        return;
      }
      if ((i = typeof e == "number") && e * 0 == 0) {
        if (l.s = 1 / e < 0 ? (e = -e, -1) : 1, e === ~~e) {
          for (f = 0, c = e; c >= 10; c /= 10, f++)
            ;
          f > q ? l.c = l.e = null : (l.e = f, l.c = [e]);
          return;
        }
        u = String(e);
      } else {
        if (!me.test(u = String(e)))
          return I(l, u, i);
        l.s = u.charCodeAt(0) == 45 ? (u = u.slice(1), -1) : 1;
      }
      (f = u.indexOf(".")) > -1 && (u = u.replace(".", "")), (c = u.search(/e/i)) > 0 ? (f < 0 && (f = c), f += +u.slice(c + 1), u = u.substring(0, c)) : f < 0 && (f = u.length);
    } else {
      if (v(r, 2, K.length, "Base"), r == 10 && le)
        return l = new g(e), k(l, S + l.e + 1, _);
      if (u = String(e), i = typeof e == "number") {
        if (e * 0 != 0)
          return I(l, u, i, r);
        if (l.s = 1 / e < 0 ? (u = u.slice(1), -1) : 1, g.DEBUG && u.replace(/^0\.0*|\./, "").length > 15)
          throw Error(xe + e);
      } else
        l.s = u.charCodeAt(0) === 45 ? (u = u.slice(1), -1) : 1;
      for (t = K.slice(0, r), f = c = 0, s = u.length; c < s; c++)
        if (t.indexOf(o = u.charAt(c)) < 0) {
          if (o == ".") {
            if (c > f) {
              f = s;
              continue;
            }
          } else if (!n && (u == u.toUpperCase() && (u = u.toLowerCase()) || u == u.toLowerCase() && (u = u.toUpperCase()))) {
            n = !0, c = -1, f = 0;
            continue;
          }
          return I(l, String(e), i, r);
        }
      i = !1, u = O(u, r, 10, l.s), (f = u.indexOf(".")) > -1 ? u = u.replace(".", "") : f = u.length;
    }
    for (c = 0; u.charCodeAt(c) === 48; c++)
      ;
    for (s = u.length; u.charCodeAt(--s) === 48; )
      ;
    if (u = u.slice(c, ++s)) {
      if (s -= c, i && g.DEBUG && s > 15 && (e > ge || e !== X(e)))
        throw Error(xe + l.s * e);
      if ((f = f - c - 1) > q)
        l.c = l.e = null;
      else if (f < Q)
        l.c = [l.e = 0];
      else {
        if (l.e = f, l.c = [], c = (f + 1) % E, f < 0 && (c += E), c < s) {
          for (c && l.c.push(+u.slice(0, c)), s -= E; c < s; )
            l.c.push(+u.slice(c, c += E));
          c = E - (u = u.slice(c)).length;
        } else
          c -= s;
        for (; c--; u += "0")
          ;
        l.c.push(+u);
      }
    } else
      l.c = [l.e = 0];
  }
  g.clone = Ne, g.ROUND_UP = 0, g.ROUND_DOWN = 1, g.ROUND_CEIL = 2, g.ROUND_FLOOR = 3, g.ROUND_HALF_UP = 4, g.ROUND_HALF_DOWN = 5, g.ROUND_HALF_EVEN = 6, g.ROUND_HALF_CEIL = 7, g.ROUND_HALF_FLOOR = 8, g.EUCLID = 9, g.config = g.set = function(e) {
    var r, t;
    if (e != null)
      if (typeof e == "object") {
        if (e.hasOwnProperty(r = "DECIMAL_PLACES") && (t = e[r], v(t, 0, P, r), S = t), e.hasOwnProperty(r = "ROUNDING_MODE") && (t = e[r], v(t, 0, 8, r), _ = t), e.hasOwnProperty(r = "EXPONENTIAL_AT") && (t = e[r], t && t.pop ? (v(t[0], -P, 0, r), v(t[1], 0, P, r), L = t[0], U = t[1]) : (v(t, -P, P, r), L = -(U = t < 0 ? -t : t))), e.hasOwnProperty(r = "RANGE"))
          if (t = e[r], t && t.pop)
            v(t[0], -P, -1, r), v(t[1], 1, P, r), Q = t[0], q = t[1];
          else if (v(t, -P, P, r), t)
            Q = -(q = t < 0 ? -t : t);
          else
            throw Error(C + r + " cannot be zero: " + t);
        if (e.hasOwnProperty(r = "CRYPTO"))
          if (t = e[r], t === !!t)
            if (t)
              if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
                Z = t;
              else
                throw Z = !t, Error(C + "crypto unavailable");
            else
              Z = t;
          else
            throw Error(C + r + " not true or false: " + t);
        if (e.hasOwnProperty(r = "MODULO_MODE") && (t = e[r], v(t, 0, 9, r), b = t), e.hasOwnProperty(r = "POW_PRECISION") && (t = e[r], v(t, 0, P, r), Y = t), e.hasOwnProperty(r = "FORMAT"))
          if (t = e[r], typeof t == "object")
            fe = t;
          else
            throw Error(C + r + " not an object: " + t);
        if (e.hasOwnProperty(r = "ALPHABET"))
          if (t = e[r], typeof t == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(t))
            le = t.slice(0, 10) == "0123456789", K = t;
          else
            throw Error(C + r + " invalid: " + t);
      } else
        throw Error(C + "Object expected: " + e);
    return {
      DECIMAL_PLACES: S,
      ROUNDING_MODE: _,
      EXPONENTIAL_AT: [L, U],
      RANGE: [Q, q],
      CRYPTO: Z,
      MODULO_MODE: b,
      POW_PRECISION: Y,
      FORMAT: fe,
      ALPHABET: K
    };
  }, g.isBigNumber = function(e) {
    if (!e || e._isBigNumber !== !0)
      return !1;
    if (!g.DEBUG)
      return !0;
    var r, t, o = e.c, n = e.e, f = e.s;
    e:
      if ({}.toString.call(o) == "[object Array]") {
        if ((f === 1 || f === -1) && n >= -P && n <= P && n === X(n)) {
          if (o[0] === 0) {
            if (n === 0 && o.length === 1)
              return !0;
            break e;
          }
          if (r = (n + 1) % E, r < 1 && (r += E), String(o[0]).length == r) {
            for (r = 0; r < o.length; r++)
              if (t = o[r], t < 0 || t >= $ || t !== X(t))
                break e;
            if (t !== 0)
              return !0;
          }
        }
      } else if (o === null && n === null && (f === null || f === 1 || f === -1))
        return !0;
    throw Error(C + "Invalid BigNumber: " + e);
  }, g.maximum = g.max = function() {
    return we(arguments, p.lt);
  }, g.minimum = g.min = function() {
    return we(arguments, p.gt);
  }, g.random = function() {
    var e = 9007199254740992, r = Math.random() * e & 2097151 ? function() {
      return X(Math.random() * e);
    } : function() {
      return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
    };
    return function(t) {
      var o, n, f, c, i, s = 0, u = [], l = new g(T);
      if (t == null ? t = S : v(t, 0, P), c = ae(t / E), Z)
        if (crypto.getRandomValues) {
          for (o = crypto.getRandomValues(new Uint32Array(c *= 2)); s < c; )
            i = o[s] * 131072 + (o[s + 1] >>> 11), i >= 9e15 ? (n = crypto.getRandomValues(new Uint32Array(2)), o[s] = n[0], o[s + 1] = n[1]) : (u.push(i % 1e14), s += 2);
          s = c / 2;
        } else if (crypto.randomBytes) {
          for (o = crypto.randomBytes(c *= 7); s < c; )
            i = (o[s] & 31) * 281474976710656 + o[s + 1] * 1099511627776 + o[s + 2] * 4294967296 + o[s + 3] * 16777216 + (o[s + 4] << 16) + (o[s + 5] << 8) + o[s + 6], i >= 9e15 ? crypto.randomBytes(7).copy(o, s) : (u.push(i % 1e14), s += 7);
          s = c / 7;
        } else
          throw Z = !1, Error(C + "crypto unavailable");
      if (!Z)
        for (; s < c; )
          i = r(), i < 9e15 && (u[s++] = i % 1e14);
      for (c = u[--s], t %= E, c && t && (i = pe[E - t], u[s] = X(c / i) * i); u[s] === 0; u.pop(), s--)
        ;
      if (s < 0)
        u = [f = 0];
      else {
        for (f = -1; u[0] === 0; u.splice(0, 1), f -= E)
          ;
        for (s = 1, i = u[0]; i >= 10; i /= 10, s++)
          ;
        s < E && (f -= E - s);
      }
      return l.e = f, l.c = u, l;
    };
  }(), g.sum = function() {
    for (var e = 1, r = arguments, t = new g(r[0]); e < r.length; )
      t = t.plus(r[e++]);
    return t;
  }, O = function() {
    var e = "0123456789";
    function r(t, o, n, f) {
      for (var c, i = [0], s, u = 0, l = t.length; u < l; ) {
        for (s = i.length; s--; i[s] *= o)
          ;
        for (i[0] += f.indexOf(t.charAt(u++)), c = 0; c < i.length; c++)
          i[c] > n - 1 && (i[c + 1] == null && (i[c + 1] = 0), i[c + 1] += i[c] / n | 0, i[c] %= n);
      }
      return i.reverse();
    }
    return function(t, o, n, f, c) {
      var i, s, u, l, a, x, N, d, B = t.indexOf("."), M = S, m = _;
      for (B >= 0 && (l = Y, Y = 0, t = t.replace(".", ""), d = new g(o), x = d.pow(t.length - B), Y = l, d.c = r(
        W(G(x.c), x.e, "0"),
        10,
        n,
        e
      ), d.e = d.c.length), N = r(t, o, n, c ? (i = K, e) : (i = e, K)), u = l = N.length; N[--l] == 0; N.pop())
        ;
      if (!N[0])
        return i.charAt(0);
      if (B < 0 ? --u : (x.c = N, x.e = u, x.s = f, x = h(x, d, M, m, n), N = x.c, a = x.r, u = x.e), s = u + M + 1, B = N[s], l = n / 2, a = a || s < 0 || N[s + 1] != null, a = m < 4 ? (B != null || a) && (m == 0 || m == (x.s < 0 ? 3 : 2)) : B > l || B == l && (m == 4 || a || m == 6 && N[s - 1] & 1 || m == (x.s < 0 ? 8 : 7)), s < 1 || !N[0])
        t = a ? W(i.charAt(1), -M, i.charAt(0)) : i.charAt(0);
      else {
        if (N.length = s, a)
          for (--n; ++N[--s] > n; )
            N[s] = 0, s || (++u, N = [1].concat(N));
        for (l = N.length; !N[--l]; )
          ;
        for (B = 0, t = ""; B <= l; t += i.charAt(N[B++]))
          ;
        t = W(t, u, i.charAt(0));
      }
      return t;
    };
  }(), h = function() {
    function e(o, n, f) {
      var c, i, s, u, l = 0, a = o.length, x = n % J, N = n / J | 0;
      for (o = o.slice(); a--; )
        s = o[a] % J, u = o[a] / J | 0, c = N * s + u * x, i = x * s + c % J * J + l, l = (i / f | 0) + (c / J | 0) + N * u, o[a] = i % f;
      return l && (o = [l].concat(o)), o;
    }
    function r(o, n, f, c) {
      var i, s;
      if (f != c)
        s = f > c ? 1 : -1;
      else
        for (i = s = 0; i < f; i++)
          if (o[i] != n[i]) {
            s = o[i] > n[i] ? 1 : -1;
            break;
          }
      return s;
    }
    function t(o, n, f, c) {
      for (var i = 0; f--; )
        o[f] -= i, i = o[f] < n[f] ? 1 : 0, o[f] = i * c + o[f] - n[f];
      for (; !o[0] && o.length > 1; o.splice(0, 1))
        ;
    }
    return function(o, n, f, c, i) {
      var s, u, l, a, x, N, d, B, M, m, A, D, te, ce, he, H, ee, z = o.s == n.s ? 1 : -1, y = o.c, R = n.c;
      if (!y || !y[0] || !R || !R[0])
        return new g(
          !o.s || !n.s || (y ? R && y[0] == R[0] : !R) ? NaN : y && y[0] == 0 || !R ? z * 0 : z / 0
        );
      for (B = new g(z), M = B.c = [], u = o.e - n.e, z = f + u + 1, i || (i = $, u = F(o.e / E) - F(n.e / E), z = z / E | 0), l = 0; R[l] == (y[l] || 0); l++)
        ;
      if (R[l] > (y[l] || 0) && u--, z < 0)
        M.push(1), a = !0;
      else {
        for (ce = y.length, H = R.length, l = 0, z += 2, x = X(i / (R[0] + 1)), x > 1 && (R = e(R, x, i), y = e(y, x, i), H = R.length, ce = y.length), te = H, m = y.slice(0, H), A = m.length; A < H; m[A++] = 0)
          ;
        ee = R.slice(), ee = [0].concat(ee), he = R[0], R[1] >= i / 2 && he++;
        do {
          if (x = 0, s = r(R, m, H, A), s < 0) {
            if (D = m[0], H != A && (D = D * i + (m[1] || 0)), x = X(D / he), x > 1)
              for (x >= i && (x = i - 1), N = e(R, x, i), d = N.length, A = m.length; r(N, m, d, A) == 1; )
                x--, t(N, H < d ? ee : R, d, i), d = N.length, s = 1;
            else
              x == 0 && (s = x = 1), N = R.slice(), d = N.length;
            if (d < A && (N = [0].concat(N)), t(m, N, A, i), A = m.length, s == -1)
              for (; r(R, m, H, A) < 1; )
                x++, t(m, H < A ? ee : R, A, i), A = m.length;
          } else
            s === 0 && (x++, m = [0]);
          M[l++] = x, m[0] ? m[A++] = y[te] || 0 : (m = [y[te]], A = 1);
        } while ((te++ < ce || m[0] != null) && z--);
        a = m[0] != null, M[0] || M.splice(0, 1);
      }
      if (i == $) {
        for (l = 1, z = M[0]; z >= 10; z /= 10, l++)
          ;
        k(B, f + (B.e = l + u * E - 1) + 1, c, a);
      } else
        B.e = u, B.r = +a;
      return B;
    };
  }();
  function oe(e, r, t, o) {
    var n, f, c, i, s;
    if (t == null ? t = _ : v(t, 0, 8), !e.c)
      return e.toString();
    if (n = e.c[0], c = e.e, r == null)
      s = G(e.c), s = o == 1 || o == 2 && (c <= L || c >= U) ? se(s, c) : W(s, c, "0");
    else if (e = k(new g(e), r, t), f = e.e, s = G(e.c), i = s.length, o == 1 || o == 2 && (r <= f || f <= L)) {
      for (; i < r; s += "0", i++)
        ;
      s = se(s, f);
    } else if (r -= c, s = W(s, f, "0"), f + 1 > i) {
      if (--r > 0)
        for (s += "."; r--; s += "0")
          ;
    } else if (r += f - i, r > 0)
      for (f + 1 == i && (s += "."); r--; s += "0")
        ;
    return e.s < 0 && n ? "-" + s : s;
  }
  function we(e, r) {
    for (var t, o = 1, n = new g(e[0]); o < e.length; o++)
      if (t = new g(e[o]), t.s)
        r.call(n, t) && (n = t);
      else {
        n = t;
        break;
      }
    return n;
  }
  function ue(e, r, t) {
    for (var o = 1, n = r.length; !r[--n]; r.pop())
      ;
    for (n = r[0]; n >= 10; n /= 10, o++)
      ;
    return (t = o + t * E - 1) > q ? e.c = e.e = null : t < Q ? e.c = [e.e = 0] : (e.e = t, e.c = r), e;
  }
  I = function() {
    var e = /^(-?)0([xbo])(?=\w[\w.]*$)/i, r = /^([^.]+)\.$/, t = /^\.([^.]+)$/, o = /^-?(Infinity|NaN)$/, n = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
    return function(f, c, i, s) {
      var u, l = i ? c : c.replace(n, "");
      if (o.test(l))
        f.s = isNaN(l) ? null : l < 0 ? -1 : 1;
      else {
        if (!i && (l = l.replace(e, function(a, x, N) {
          return u = (N = N.toLowerCase()) == "x" ? 16 : N == "b" ? 2 : 8, !s || s == u ? x : a;
        }), s && (u = s, l = l.replace(r, "$1").replace(t, "0.$1")), c != l))
          return new g(l, u);
        if (g.DEBUG)
          throw Error(C + "Not a" + (s ? " base " + s : "") + " number: " + c);
        f.s = null;
      }
      f.c = f.e = null;
    };
  }();
  function k(e, r, t, o) {
    var n, f, c, i, s, u, l, a = e.c, x = pe;
    if (a) {
      e: {
        for (n = 1, i = a[0]; i >= 10; i /= 10, n++)
          ;
        if (f = r - n, f < 0)
          f += E, c = r, s = a[u = 0], l = s / x[n - c - 1] % 10 | 0;
        else if (u = ae((f + 1) / E), u >= a.length)
          if (o) {
            for (; a.length <= u; a.push(0))
              ;
            s = l = 0, n = 1, f %= E, c = f - E + 1;
          } else
            break e;
        else {
          for (s = i = a[u], n = 1; i >= 10; i /= 10, n++)
            ;
          f %= E, c = f - E + n, l = c < 0 ? 0 : s / x[n - c - 1] % 10 | 0;
        }
        if (o = o || r < 0 || a[u + 1] != null || (c < 0 ? s : s % x[n - c - 1]), o = t < 4 ? (l || o) && (t == 0 || t == (e.s < 0 ? 3 : 2)) : l > 5 || l == 5 && (t == 4 || o || t == 6 && (f > 0 ? c > 0 ? s / x[n - c] : 0 : a[u - 1]) % 10 & 1 || t == (e.s < 0 ? 8 : 7)), r < 1 || !a[0])
          return a.length = 0, o ? (r -= e.e + 1, a[0] = x[(E - r % E) % E], e.e = -r || 0) : a[0] = e.e = 0, e;
        if (f == 0 ? (a.length = u, i = 1, u--) : (a.length = u + 1, i = x[E - f], a[u] = c > 0 ? X(s / x[n - c] % x[c]) * i : 0), o)
          for (; ; )
            if (u == 0) {
              for (f = 1, c = a[0]; c >= 10; c /= 10, f++)
                ;
              for (c = a[0] += i, i = 1; c >= 10; c /= 10, i++)
                ;
              f != i && (e.e++, a[0] == $ && (a[0] = 1));
              break;
            } else {
              if (a[u] += i, a[u] != $)
                break;
              a[u--] = 0, i = 1;
            }
        for (f = a.length; a[--f] === 0; a.pop())
          ;
      }
      e.e > q ? e.c = e.e = null : e.e < Q && (e.c = [e.e = 0]);
    }
    return e;
  }
  function V(e) {
    var r, t = e.e;
    return t === null ? e.toString() : (r = G(e.c), r = t <= L || t >= U ? se(r, t) : W(r, t, "0"), e.s < 0 ? "-" + r : r);
  }
  return p.absoluteValue = p.abs = function() {
    var e = new g(this);
    return e.s < 0 && (e.s = 1), e;
  }, p.comparedTo = function(e, r) {
    return j(this, new g(e, r));
  }, p.decimalPlaces = p.dp = function(e, r) {
    var t, o, n, f = this;
    if (e != null)
      return v(e, 0, P), r == null ? r = _ : v(r, 0, 8), k(new g(f), e + f.e + 1, r);
    if (!(t = f.c))
      return null;
    if (o = ((n = t.length - 1) - F(this.e / E)) * E, n = t[n])
      for (; n % 10 == 0; n /= 10, o--)
        ;
    return o < 0 && (o = 0), o;
  }, p.dividedBy = p.div = function(e, r) {
    return h(this, new g(e, r), S, _);
  }, p.dividedToIntegerBy = p.idiv = function(e, r) {
    return h(this, new g(e, r), 0, 1);
  }, p.exponentiatedBy = p.pow = function(e, r) {
    var t, o, n, f, c, i, s, u, l, a = this;
    if (e = new g(e), e.c && !e.isInteger())
      throw Error(C + "Exponent not an integer: " + V(e));
    if (r != null && (r = new g(r)), i = e.e > 14, !a.c || !a.c[0] || a.c[0] == 1 && !a.e && a.c.length == 1 || !e.c || !e.c[0])
      return l = new g(Math.pow(+V(a), i ? 2 - ne(e) : +V(e))), r ? l.mod(r) : l;
    if (s = e.s < 0, r) {
      if (r.c ? !r.c[0] : !r.s)
        return new g(NaN);
      o = !s && a.isInteger() && r.isInteger(), o && (a = a.mod(r));
    } else {
      if (e.e > 9 && (a.e > 0 || a.e < -1 || (a.e == 0 ? a.c[0] > 1 || i && a.c[1] >= 24e7 : a.c[0] < 8e13 || i && a.c[0] <= 9999975e7)))
        return f = a.s < 0 && ne(e) ? -0 : 0, a.e > -1 && (f = 1 / f), new g(s ? 1 / f : f);
      Y && (f = ae(Y / E + 2));
    }
    for (i ? (t = new g(0.5), s && (e.s = 1), u = ne(e)) : (n = Math.abs(+V(e)), u = n % 2), l = new g(T); ; ) {
      if (u) {
        if (l = l.times(a), !l.c)
          break;
        f ? l.c.length > f && (l.c.length = f) : o && (l = l.mod(r));
      }
      if (n) {
        if (n = X(n / 2), n === 0)
          break;
        u = n % 2;
      } else if (e = e.times(t), k(e, e.e + 1, 1), e.e > 14)
        u = ne(e);
      else {
        if (n = +V(e), n === 0)
          break;
        u = n % 2;
      }
      a = a.times(a), f ? a.c && a.c.length > f && (a.c.length = f) : o && (a = a.mod(r));
    }
    return o ? l : (s && (l = T.div(l)), r ? l.mod(r) : f ? k(l, Y, _, c) : l);
  }, p.integerValue = function(e) {
    var r = new g(this);
    return e == null ? e = _ : v(e, 0, 8), k(r, r.e + 1, e);
  }, p.isEqualTo = p.eq = function(e, r) {
    return j(this, new g(e, r)) === 0;
  }, p.isFinite = function() {
    return !!this.c;
  }, p.isGreaterThan = p.gt = function(e, r) {
    return j(this, new g(e, r)) > 0;
  }, p.isGreaterThanOrEqualTo = p.gte = function(e, r) {
    return (r = j(this, new g(e, r))) === 1 || r === 0;
  }, p.isInteger = function() {
    return !!this.c && F(this.e / E) > this.c.length - 2;
  }, p.isLessThan = p.lt = function(e, r) {
    return j(this, new g(e, r)) < 0;
  }, p.isLessThanOrEqualTo = p.lte = function(e, r) {
    return (r = j(this, new g(e, r))) === -1 || r === 0;
  }, p.isNaN = function() {
    return !this.s;
  }, p.isNegative = function() {
    return this.s < 0;
  }, p.isPositive = function() {
    return this.s > 0;
  }, p.isZero = function() {
    return !!this.c && this.c[0] == 0;
  }, p.minus = function(e, r) {
    var t, o, n, f, c = this, i = c.s;
    if (e = new g(e, r), r = e.s, !i || !r)
      return new g(NaN);
    if (i != r)
      return e.s = -r, c.plus(e);
    var s = c.e / E, u = e.e / E, l = c.c, a = e.c;
    if (!s || !u) {
      if (!l || !a)
        return l ? (e.s = -r, e) : new g(a ? c : NaN);
      if (!l[0] || !a[0])
        return a[0] ? (e.s = -r, e) : new g(l[0] ? c : _ == 3 ? -0 : 0);
    }
    if (s = F(s), u = F(u), l = l.slice(), i = s - u) {
      for ((f = i < 0) ? (i = -i, n = l) : (u = s, n = a), n.reverse(), r = i; r--; n.push(0))
        ;
      n.reverse();
    } else
      for (o = (f = (i = l.length) < (r = a.length)) ? i : r, i = r = 0; r < o; r++)
        if (l[r] != a[r]) {
          f = l[r] < a[r];
          break;
        }
    if (f && (n = l, l = a, a = n, e.s = -e.s), r = (o = a.length) - (t = l.length), r > 0)
      for (; r--; l[t++] = 0)
        ;
    for (r = $ - 1; o > i; ) {
      if (l[--o] < a[o]) {
        for (t = o; t && !l[--t]; l[t] = r)
          ;
        --l[t], l[o] += $;
      }
      l[o] -= a[o];
    }
    for (; l[0] == 0; l.splice(0, 1), --u)
      ;
    return l[0] ? ue(e, l, u) : (e.s = _ == 3 ? -1 : 1, e.c = [e.e = 0], e);
  }, p.modulo = p.mod = function(e, r) {
    var t, o, n = this;
    return e = new g(e, r), !n.c || !e.s || e.c && !e.c[0] ? new g(NaN) : !e.c || n.c && !n.c[0] ? new g(n) : (b == 9 ? (o = e.s, e.s = 1, t = h(n, e, 0, 3), e.s = o, t.s *= o) : t = h(n, e, 0, b), e = n.minus(t.times(e)), !e.c[0] && b == 1 && (e.s = n.s), e);
  }, p.multipliedBy = p.times = function(e, r) {
    var t, o, n, f, c, i, s, u, l, a, x, N, d, B, M, m = this, A = m.c, D = (e = new g(e, r)).c;
    if (!A || !D || !A[0] || !D[0])
      return !m.s || !e.s || A && !A[0] && !D || D && !D[0] && !A ? e.c = e.e = e.s = null : (e.s *= m.s, !A || !D ? e.c = e.e = null : (e.c = [0], e.e = 0)), e;
    for (o = F(m.e / E) + F(e.e / E), e.s *= m.s, s = A.length, a = D.length, s < a && (d = A, A = D, D = d, n = s, s = a, a = n), n = s + a, d = []; n--; d.push(0))
      ;
    for (B = $, M = J, n = a; --n >= 0; ) {
      for (t = 0, x = D[n] % M, N = D[n] / M | 0, c = s, f = n + c; f > n; )
        u = A[--c] % M, l = A[c] / M | 0, i = N * u + l * x, u = x * u + i % M * M + d[f] + t, t = (u / B | 0) + (i / M | 0) + N * l, d[f--] = u % B;
      d[f] = t;
    }
    return t ? ++o : d.splice(0, 1), ue(e, d, o);
  }, p.negated = function() {
    var e = new g(this);
    return e.s = -e.s || null, e;
  }, p.plus = function(e, r) {
    var t, o = this, n = o.s;
    if (e = new g(e, r), r = e.s, !n || !r)
      return new g(NaN);
    if (n != r)
      return e.s = -r, o.minus(e);
    var f = o.e / E, c = e.e / E, i = o.c, s = e.c;
    if (!f || !c) {
      if (!i || !s)
        return new g(n / 0);
      if (!i[0] || !s[0])
        return s[0] ? e : new g(i[0] ? o : n * 0);
    }
    if (f = F(f), c = F(c), i = i.slice(), n = f - c) {
      for (n > 0 ? (c = f, t = s) : (n = -n, t = i), t.reverse(); n--; t.push(0))
        ;
      t.reverse();
    }
    for (n = i.length, r = s.length, n - r < 0 && (t = s, s = i, i = t, r = n), n = 0; r; )
      n = (i[--r] = i[r] + s[r] + n) / $ | 0, i[r] = $ === i[r] ? 0 : i[r] % $;
    return n && (i = [n].concat(i), ++c), ue(e, i, c);
  }, p.precision = p.sd = function(e, r) {
    var t, o, n, f = this;
    if (e != null && e !== !!e)
      return v(e, 1, P), r == null ? r = _ : v(r, 0, 8), k(new g(f), e, r);
    if (!(t = f.c))
      return null;
    if (n = t.length - 1, o = n * E + 1, n = t[n]) {
      for (; n % 10 == 0; n /= 10, o--)
        ;
      for (n = t[0]; n >= 10; n /= 10, o++)
        ;
    }
    return e && f.e + 1 > o && (o = f.e + 1), o;
  }, p.shiftedBy = function(e) {
    return v(e, -ge, ge), this.times("1e" + e);
  }, p.squareRoot = p.sqrt = function() {
    var e, r, t, o, n, f = this, c = f.c, i = f.s, s = f.e, u = S + 4, l = new g("0.5");
    if (i !== 1 || !c || !c[0])
      return new g(!i || i < 0 && (!c || c[0]) ? NaN : c ? f : 1 / 0);
    if (i = Math.sqrt(+V(f)), i == 0 || i == 1 / 0 ? (r = G(c), (r.length + s) % 2 == 0 && (r += "0"), i = Math.sqrt(+r), s = F((s + 1) / 2) - (s < 0 || s % 2), i == 1 / 0 ? r = "5e" + s : (r = i.toExponential(), r = r.slice(0, r.indexOf("e") + 1) + s), t = new g(r)) : t = new g(i + ""), t.c[0]) {
      for (s = t.e, i = s + u, i < 3 && (i = 0); ; )
        if (n = t, t = l.times(n.plus(h(f, n, u, 1))), G(n.c).slice(0, i) === (r = G(t.c)).slice(0, i))
          if (t.e < s && --i, r = r.slice(i - 3, i + 1), r == "9999" || !o && r == "4999") {
            if (!o && (k(n, n.e + S + 2, 0), n.times(n).eq(f))) {
              t = n;
              break;
            }
            u += 4, i += 4, o = 1;
          } else {
            (!+r || !+r.slice(1) && r.charAt(0) == "5") && (k(t, t.e + S + 2, 1), e = !t.times(t).eq(f));
            break;
          }
    }
    return k(t, t.e + S + 1, _, e);
  }, p.toExponential = function(e, r) {
    return e != null && (v(e, 0, P), e++), oe(this, e, r, 1);
  }, p.toFixed = function(e, r) {
    return e != null && (v(e, 0, P), e = e + this.e + 1), oe(this, e, r);
  }, p.toFormat = function(e, r, t) {
    var o, n = this;
    if (t == null)
      e != null && r && typeof r == "object" ? (t = r, r = null) : e && typeof e == "object" ? (t = e, e = r = null) : t = fe;
    else if (typeof t != "object")
      throw Error(C + "Argument not an object: " + t);
    if (o = n.toFixed(e, r), n.c) {
      var f, c = o.split("."), i = +t.groupSize, s = +t.secondaryGroupSize, u = t.groupSeparator || "", l = c[0], a = c[1], x = n.s < 0, N = x ? l.slice(1) : l, d = N.length;
      if (s && (f = i, i = s, s = f, d -= f), i > 0 && d > 0) {
        for (f = d % i || i, l = N.substr(0, f); f < d; f += i)
          l += u + N.substr(f, i);
        s > 0 && (l += u + N.slice(f)), x && (l = "-" + l);
      }
      o = a ? l + (t.decimalSeparator || "") + ((s = +t.fractionGroupSize) ? a.replace(
        new RegExp("\\d{" + s + "}\\B", "g"),
        "$&" + (t.fractionGroupSeparator || "")
      ) : a) : l;
    }
    return (t.prefix || "") + o + (t.suffix || "");
  }, p.toFraction = function(e) {
    var r, t, o, n, f, c, i, s, u, l, a, x, N = this, d = N.c;
    if (e != null && (i = new g(e), !i.isInteger() && (i.c || i.s !== 1) || i.lt(T)))
      throw Error(C + "Argument " + (i.isInteger() ? "out of range: " : "not an integer: ") + V(i));
    if (!d)
      return new g(N);
    for (r = new g(T), u = t = new g(T), o = s = new g(T), x = G(d), f = r.e = x.length - N.e - 1, r.c[0] = pe[(c = f % E) < 0 ? E + c : c], e = !e || i.comparedTo(r) > 0 ? f > 0 ? r : u : i, c = q, q = 1 / 0, i = new g(x), s.c[0] = 0; l = h(i, r, 0, 1), n = t.plus(l.times(o)), n.comparedTo(e) != 1; )
      t = o, o = n, u = s.plus(l.times(n = u)), s = n, r = i.minus(l.times(n = r)), i = n;
    return n = h(e.minus(t), o, 0, 1), s = s.plus(n.times(u)), t = t.plus(n.times(o)), s.s = u.s = N.s, f = f * 2, a = h(u, o, f, _).minus(N).abs().comparedTo(
      h(s, t, f, _).minus(N).abs()
    ) < 1 ? [u, o] : [s, t], q = c, a;
  }, p.toNumber = function() {
    return +V(this);
  }, p.toPrecision = function(e, r) {
    return e != null && v(e, 1, P), oe(this, e, r, 2);
  }, p.toString = function(e) {
    var r, t = this, o = t.s, n = t.e;
    return n === null ? o ? (r = "Infinity", o < 0 && (r = "-" + r)) : r = "NaN" : (e == null ? r = n <= L || n >= U ? se(G(t.c), n) : W(G(t.c), n, "0") : e === 10 && le ? (t = k(new g(t), S + n + 1, _), r = W(G(t.c), t.e, "0")) : (v(e, 2, K.length, "Base"), r = O(W(G(t.c), n, "0"), 10, e, o, !0)), o < 0 && t.c[0] && (r = "-" + r)), r;
  }, p.valueOf = p.toJSON = function() {
    return V(this);
  }, p._isBigNumber = !0, p[Symbol.toStringTag] = "BigNumber", p[Symbol.for("nodejs.util.inspect.custom")] = p.valueOf, w != null && g.set(w), g;
}
function F(w) {
  var h = w | 0;
  return w > 0 || w === h ? h : h - 1;
}
function G(w) {
  for (var h, O, I = 1, p = w.length, T = w[0] + ""; I < p; ) {
    for (h = w[I++] + "", O = E - h.length; O--; h = "0" + h)
      ;
    T += h;
  }
  for (p = T.length; T.charCodeAt(--p) === 48; )
    ;
  return T.slice(0, p + 1 || 1);
}
function j(w, h) {
  var O, I, p = w.c, T = h.c, S = w.s, _ = h.s, L = w.e, U = h.e;
  if (!S || !_)
    return null;
  if (O = p && !p[0], I = T && !T[0], O || I)
    return O ? I ? 0 : -_ : S;
  if (S != _)
    return S;
  if (O = S < 0, I = L == U, !p || !T)
    return I ? 0 : !p ^ O ? 1 : -1;
  if (!I)
    return L > U ^ O ? 1 : -1;
  for (_ = (L = p.length) < (U = T.length) ? L : U, S = 0; S < _; S++)
    if (p[S] != T[S])
      return p[S] > T[S] ^ O ? 1 : -1;
  return L == U ? 0 : L > U ^ O ? 1 : -1;
}
function v(w, h, O, I) {
  if (w < h || w > O || w !== X(w))
    throw Error(C + (I || "Argument") + (typeof w == "number" ? w < h || w > O ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(w));
}
function ne(w) {
  var h = w.c.length - 1;
  return F(w.e / E) == h && w.c[h] % 2 != 0;
}
function se(w, h) {
  return (w.length > 1 ? w.charAt(0) + "." + w.slice(1) : w) + (h < 0 ? "e" : "e+") + h;
}
function W(w, h, O) {
  var I, p;
  if (h < 0) {
    for (p = O + "."; ++h; p += O)
      ;
    w = p + w;
  } else if (I = w.length, ++h > I) {
    for (p = O, h -= I; --h; p += O)
      ;
    w += p;
  } else
    h < I && (w = w.slice(0, h) + "." + w.slice(h));
  return w;
}
var re = Ne();
const de = (w, h) => re(w).plus(h).toString(), Ae = (w, h) => re(w).minus(h).toString(), Se = (w, h) => re(w).times(h).toString(), ve = (w, h) => re(w).div(h).toString(), _e = (w) => re(w).negated().toString();
class Re {
  constructor(h) {
    ie(this, "s");
    ie(this, "e");
    ie(this, "o");
    this.s = { ...h }, this.e = !1, this.o = !1;
  }
  result() {
    return this.s;
  }
  enter() {
    const h = { ...this.s };
    return this.s = { x: h.x, y: h.x, z: h.y, t: h.z }, this.e = !0, this;
  }
  abs() {
    const h = { ...this.s };
    return h.x.length < 1 ? this : (this.s = { ...h, x: _e(h.x) }, this);
  }
  swap() {
    const h = { ...this.s };
    return h.x.length < 1 || h.y.length < 1 ? this : (this.s = { ...h, x: h.y, y: h.x }, this);
  }
  backspace() {
    const h = { ...this.s };
    return this.s = { ...h, x: h.x.length === 1 ? "0" : h.x.slice(0, -1) }, this;
  }
  div() {
    const h = { ...this.s };
    return h.x.length < 1 || h.y.length < 1 ? this : (this.s = { x: ve(h.y, h.x), y: h.z, z: h.t, t: h.t }, this.o = !0, this);
  }
  times() {
    const h = { ...this.s };
    return h.x.length < 1 || h.y.length < 1 ? this : (this.s = { x: Se(h.y, h.x), y: h.z, z: h.t, t: h.t }, this.o = !0, this);
  }
  minus() {
    const h = { ...this.s };
    return h.x.length < 1 || h.y.length < 1 ? this : (this.s = { x: Ae(h.y, h.x), y: h.z, z: h.t, t: h.t }, this.o = !0, this);
  }
  plus() {
    const h = { ...this.s };
    return h.x.length < 1 || h.y.length < 1 ? this : (this.s = { x: de(h.y, h.x), y: h.z, z: h.t, t: h.t }, this.o = !0, this);
  }
  clear() {
    return this.s = { x: "0", y: "0", z: "0", t: "0" }, this;
  }
  period() {
    const h = { ...this.s };
    return h.x.length < 1 ? this : h.x.includes(".") ? this : (this.s = { ...h, x: h.x + "." }, this);
  }
  n(h) {
    if (h.length < 1)
      return this;
    this.o && (this.enter(), this.o = !1);
    const O = { ...this.s };
    return O.x === "0" || this.e ? (this.s = { ...O, x: h }, this.e = !1) : this.s = { ...O, x: O.x + h }, this;
  }
}
export {
  Re as RPN
};
