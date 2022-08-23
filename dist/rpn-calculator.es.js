var Ee = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, ce = Math.ceil, X = Math.floor, U = "[BigNumber Error] ", pe = U + "Number primitive has more than 15 significant digits: ", z = 1e14, O = 14, ae = 9007199254740991, he = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], J = 1e7, D = 1e9;
function we(E) {
  var N, _, R, g = h.prototype = { constructor: h, toString: null, valueOf: null }, T = new h(1), x = 20, v = 4, C = -7, k = 21, Q = -1e7, $ = 1e7, Z = !1, b = 1, Y = 0, te = {
    prefix: "",
    groupSize: 3,
    secondaryGroupSize: 0,
    groupSeparator: ",",
    decimalSeparator: ".",
    fractionGroupSize: 0,
    fractionGroupSeparator: "\xA0",
    suffix: ""
  }, K = "0123456789abcdefghijklmnopqrstuvwxyz", fe = !0;
  function h(e, r) {
    var i, s, t, l, c, n, f, u, o = this;
    if (!(o instanceof h))
      return new h(e, r);
    if (r == null) {
      if (e && e._isBigNumber === !0) {
        o.s = e.s, !e.c || e.e > $ ? o.c = o.e = null : e.e < Q ? o.c = [o.e = 0] : (o.e = e.e, o.c = e.c.slice());
        return;
      }
      if ((n = typeof e == "number") && e * 0 == 0) {
        if (o.s = 1 / e < 0 ? (e = -e, -1) : 1, e === ~~e) {
          for (l = 0, c = e; c >= 10; c /= 10, l++)
            ;
          l > $ ? o.c = o.e = null : (o.e = l, o.c = [e]);
          return;
        }
        u = String(e);
      } else {
        if (!Ee.test(u = String(e)))
          return R(o, u, n);
        o.s = u.charCodeAt(0) == 45 ? (u = u.slice(1), -1) : 1;
      }
      (l = u.indexOf(".")) > -1 && (u = u.replace(".", "")), (c = u.search(/e/i)) > 0 ? (l < 0 && (l = c), l += +u.slice(c + 1), u = u.substring(0, c)) : l < 0 && (l = u.length);
    } else {
      if (S(r, 2, K.length, "Base"), r == 10 && fe)
        return o = new h(e), G(o, x + o.e + 1, v);
      if (u = String(e), n = typeof e == "number") {
        if (e * 0 != 0)
          return R(o, u, n, r);
        if (o.s = 1 / e < 0 ? (u = u.slice(1), -1) : 1, h.DEBUG && u.replace(/^0\.0*|\./, "").length > 15)
          throw Error(pe + e);
      } else
        o.s = u.charCodeAt(0) === 45 ? (u = u.slice(1), -1) : 1;
      for (i = K.slice(0, r), l = c = 0, f = u.length; c < f; c++)
        if (i.indexOf(s = u.charAt(c)) < 0) {
          if (s == ".") {
            if (c > l) {
              l = f;
              continue;
            }
          } else if (!t && (u == u.toUpperCase() && (u = u.toLowerCase()) || u == u.toLowerCase() && (u = u.toUpperCase()))) {
            t = !0, c = -1, l = 0;
            continue;
          }
          return R(o, String(e), n, r);
        }
      n = !1, u = _(u, r, 10, o.s), (l = u.indexOf(".")) > -1 ? u = u.replace(".", "") : l = u.length;
    }
    for (c = 0; u.charCodeAt(c) === 48; c++)
      ;
    for (f = u.length; u.charCodeAt(--f) === 48; )
      ;
    if (u = u.slice(c, ++f)) {
      if (f -= c, n && h.DEBUG && f > 15 && (e > ae || e !== X(e)))
        throw Error(pe + o.s * e);
      if ((l = l - c - 1) > $)
        o.c = o.e = null;
      else if (l < Q)
        o.c = [o.e = 0];
      else {
        if (o.e = l, o.c = [], c = (l + 1) % O, l < 0 && (c += O), c < f) {
          for (c && o.c.push(+u.slice(0, c)), f -= O; c < f; )
            o.c.push(+u.slice(c, c += O));
          c = O - (u = u.slice(c)).length;
        } else
          c -= f;
        for (; c--; u += "0")
          ;
        o.c.push(+u);
      }
    } else
      o.c = [o.e = 0];
  }
  h.clone = we, h.ROUND_UP = 0, h.ROUND_DOWN = 1, h.ROUND_CEIL = 2, h.ROUND_FLOOR = 3, h.ROUND_HALF_UP = 4, h.ROUND_HALF_DOWN = 5, h.ROUND_HALF_EVEN = 6, h.ROUND_HALF_CEIL = 7, h.ROUND_HALF_FLOOR = 8, h.EUCLID = 9, h.config = h.set = function(e) {
    var r, i;
    if (e != null)
      if (typeof e == "object") {
        if (e.hasOwnProperty(r = "DECIMAL_PLACES") && (i = e[r], S(i, 0, D, r), x = i), e.hasOwnProperty(r = "ROUNDING_MODE") && (i = e[r], S(i, 0, 8, r), v = i), e.hasOwnProperty(r = "EXPONENTIAL_AT") && (i = e[r], i && i.pop ? (S(i[0], -D, 0, r), S(i[1], 0, D, r), C = i[0], k = i[1]) : (S(i, -D, D, r), C = -(k = i < 0 ? -i : i))), e.hasOwnProperty(r = "RANGE"))
          if (i = e[r], i && i.pop)
            S(i[0], -D, -1, r), S(i[1], 1, D, r), Q = i[0], $ = i[1];
          else if (S(i, -D, D, r), i)
            Q = -($ = i < 0 ? -i : i);
          else
            throw Error(U + r + " cannot be zero: " + i);
        if (e.hasOwnProperty(r = "CRYPTO"))
          if (i = e[r], i === !!i)
            if (i)
              if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
                Z = i;
              else
                throw Z = !i, Error(U + "crypto unavailable");
            else
              Z = i;
          else
            throw Error(U + r + " not true or false: " + i);
        if (e.hasOwnProperty(r = "MODULO_MODE") && (i = e[r], S(i, 0, 9, r), b = i), e.hasOwnProperty(r = "POW_PRECISION") && (i = e[r], S(i, 0, D, r), Y = i), e.hasOwnProperty(r = "FORMAT"))
          if (i = e[r], typeof i == "object")
            te = i;
          else
            throw Error(U + r + " not an object: " + i);
        if (e.hasOwnProperty(r = "ALPHABET"))
          if (i = e[r], typeof i == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(i))
            fe = i.slice(0, 10) == "0123456789", K = i;
          else
            throw Error(U + r + " invalid: " + i);
      } else
        throw Error(U + "Object expected: " + e);
    return {
      DECIMAL_PLACES: x,
      ROUNDING_MODE: v,
      EXPONENTIAL_AT: [C, k],
      RANGE: [Q, $],
      CRYPTO: Z,
      MODULO_MODE: b,
      POW_PRECISION: Y,
      FORMAT: te,
      ALPHABET: K
    };
  }, h.isBigNumber = function(e) {
    if (!e || e._isBigNumber !== !0)
      return !1;
    if (!h.DEBUG)
      return !0;
    var r, i, s = e.c, t = e.e, l = e.s;
    e:
      if ({}.toString.call(s) == "[object Array]") {
        if ((l === 1 || l === -1) && t >= -D && t <= D && t === X(t)) {
          if (s[0] === 0) {
            if (t === 0 && s.length === 1)
              return !0;
            break e;
          }
          if (r = (t + 1) % O, r < 1 && (r += O), String(s[0]).length == r) {
            for (r = 0; r < s.length; r++)
              if (i = s[r], i < 0 || i >= z || i !== X(i))
                break e;
            if (i !== 0)
              return !0;
          }
        }
      } else if (s === null && t === null && (l === null || l === 1 || l === -1))
        return !0;
    throw Error(U + "Invalid BigNumber: " + e);
  }, h.maximum = h.max = function() {
    return ge(arguments, g.lt);
  }, h.minimum = h.min = function() {
    return ge(arguments, g.gt);
  }, h.random = function() {
    var e = 9007199254740992, r = Math.random() * e & 2097151 ? function() {
      return X(Math.random() * e);
    } : function() {
      return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
    };
    return function(i) {
      var s, t, l, c, n, f = 0, u = [], o = new h(T);
      if (i == null ? i = x : S(i, 0, D), c = ce(i / O), Z)
        if (crypto.getRandomValues) {
          for (s = crypto.getRandomValues(new Uint32Array(c *= 2)); f < c; )
            n = s[f] * 131072 + (s[f + 1] >>> 11), n >= 9e15 ? (t = crypto.getRandomValues(new Uint32Array(2)), s[f] = t[0], s[f + 1] = t[1]) : (u.push(n % 1e14), f += 2);
          f = c / 2;
        } else if (crypto.randomBytes) {
          for (s = crypto.randomBytes(c *= 7); f < c; )
            n = (s[f] & 31) * 281474976710656 + s[f + 1] * 1099511627776 + s[f + 2] * 4294967296 + s[f + 3] * 16777216 + (s[f + 4] << 16) + (s[f + 5] << 8) + s[f + 6], n >= 9e15 ? crypto.randomBytes(7).copy(s, f) : (u.push(n % 1e14), f += 7);
          f = c / 7;
        } else
          throw Z = !1, Error(U + "crypto unavailable");
      if (!Z)
        for (; f < c; )
          n = r(), n < 9e15 && (u[f++] = n % 1e14);
      for (c = u[--f], i %= O, c && i && (n = he[O - i], u[f] = X(c / n) * n); u[f] === 0; u.pop(), f--)
        ;
      if (f < 0)
        u = [l = 0];
      else {
        for (l = -1; u[0] === 0; u.splice(0, 1), l -= O)
          ;
        for (f = 1, n = u[0]; n >= 10; n /= 10, f++)
          ;
        f < O && (l -= O - f);
      }
      return o.e = l, o.c = u, o;
    };
  }(), h.sum = function() {
    for (var e = 1, r = arguments, i = new h(r[0]); e < r.length; )
      i = i.plus(r[e++]);
    return i;
  }, _ = function() {
    var e = "0123456789";
    function r(i, s, t, l) {
      for (var c, n = [0], f, u = 0, o = i.length; u < o; ) {
        for (f = n.length; f--; n[f] *= s)
          ;
        for (n[0] += l.indexOf(i.charAt(u++)), c = 0; c < n.length; c++)
          n[c] > t - 1 && (n[c + 1] == null && (n[c + 1] = 0), n[c + 1] += n[c] / t | 0, n[c] %= t);
      }
      return n.reverse();
    }
    return function(i, s, t, l, c) {
      var n, f, u, o, a, p, w, A, B = i.indexOf("."), M = x, m = v;
      for (B >= 0 && (o = Y, Y = 0, i = i.replace(".", ""), A = new h(s), p = A.pow(i.length - B), Y = o, A.c = r(
        W(q(p.c), p.e, "0"),
        10,
        t,
        e
      ), A.e = A.c.length), w = r(i, s, t, c ? (n = K, e) : (n = e, K)), u = o = w.length; w[--o] == 0; w.pop())
        ;
      if (!w[0])
        return n.charAt(0);
      if (B < 0 ? --u : (p.c = w, p.e = u, p.s = l, p = N(p, A, M, m, t), w = p.c, a = p.r, u = p.e), f = u + M + 1, B = w[f], o = t / 2, a = a || f < 0 || w[f + 1] != null, a = m < 4 ? (B != null || a) && (m == 0 || m == (p.s < 0 ? 3 : 2)) : B > o || B == o && (m == 4 || a || m == 6 && w[f - 1] & 1 || m == (p.s < 0 ? 8 : 7)), f < 1 || !w[0])
        i = a ? W(n.charAt(1), -M, n.charAt(0)) : n.charAt(0);
      else {
        if (w.length = f, a)
          for (--t; ++w[--f] > t; )
            w[f] = 0, f || (++u, w = [1].concat(w));
        for (o = w.length; !w[--o]; )
          ;
        for (B = 0, i = ""; B <= o; i += n.charAt(w[B++]))
          ;
        i = W(i, u, n.charAt(0));
      }
      return i;
    };
  }(), N = function() {
    function e(s, t, l) {
      var c, n, f, u, o = 0, a = s.length, p = t % J, w = t / J | 0;
      for (s = s.slice(); a--; )
        f = s[a] % J, u = s[a] / J | 0, c = w * f + u * p, n = p * f + c % J * J + o, o = (n / l | 0) + (c / J | 0) + w * u, s[a] = n % l;
      return o && (s = [o].concat(s)), s;
    }
    function r(s, t, l, c) {
      var n, f;
      if (l != c)
        f = l > c ? 1 : -1;
      else
        for (n = f = 0; n < l; n++)
          if (s[n] != t[n]) {
            f = s[n] > t[n] ? 1 : -1;
            break;
          }
      return f;
    }
    function i(s, t, l, c) {
      for (var n = 0; l--; )
        s[l] -= n, n = s[l] < t[l] ? 1 : 0, s[l] = n * c + s[l] - t[l];
      for (; !s[0] && s.length > 1; s.splice(0, 1))
        ;
    }
    return function(s, t, l, c, n) {
      var f, u, o, a, p, w, A, B, M, m, d, P, re, se, ue, H, ee, F = s.s == t.s ? 1 : -1, L = s.c, I = t.c;
      if (!L || !L[0] || !I || !I[0])
        return new h(
          !s.s || !t.s || (L ? I && L[0] == I[0] : !I) ? NaN : L && L[0] == 0 || !I ? F * 0 : F / 0
        );
      for (B = new h(F), M = B.c = [], u = s.e - t.e, F = l + u + 1, n || (n = z, u = y(s.e / O) - y(t.e / O), F = F / O | 0), o = 0; I[o] == (L[o] || 0); o++)
        ;
      if (I[o] > (L[o] || 0) && u--, F < 0)
        M.push(1), a = !0;
      else {
        for (se = L.length, H = I.length, o = 0, F += 2, p = X(n / (I[0] + 1)), p > 1 && (I = e(I, p, n), L = e(L, p, n), H = I.length, se = L.length), re = H, m = L.slice(0, H), d = m.length; d < H; m[d++] = 0)
          ;
        ee = I.slice(), ee = [0].concat(ee), ue = I[0], I[1] >= n / 2 && ue++;
        do {
          if (p = 0, f = r(I, m, H, d), f < 0) {
            if (P = m[0], H != d && (P = P * n + (m[1] || 0)), p = X(P / ue), p > 1)
              for (p >= n && (p = n - 1), w = e(I, p, n), A = w.length, d = m.length; r(w, m, A, d) == 1; )
                p--, i(w, H < A ? ee : I, A, n), A = w.length, f = 1;
            else
              p == 0 && (f = p = 1), w = I.slice(), A = w.length;
            if (A < d && (w = [0].concat(w)), i(m, w, d, n), d = m.length, f == -1)
              for (; r(I, m, H, d) < 1; )
                p++, i(m, H < d ? ee : I, d, n), d = m.length;
          } else
            f === 0 && (p++, m = [0]);
          M[o++] = p, m[0] ? m[d++] = L[re] || 0 : (m = [L[re]], d = 1);
        } while ((re++ < se || m[0] != null) && F--);
        a = m[0] != null, M[0] || M.splice(0, 1);
      }
      if (n == z) {
        for (o = 1, F = M[0]; F >= 10; F /= 10, o++)
          ;
        G(B, l + (B.e = o + u * O - 1) + 1, c, a);
      } else
        B.e = u, B.r = +a;
      return B;
    };
  }();
  function le(e, r, i, s) {
    var t, l, c, n, f;
    if (i == null ? i = v : S(i, 0, 8), !e.c)
      return e.toString();
    if (t = e.c[0], c = e.e, r == null)
      f = q(e.c), f = s == 1 || s == 2 && (c <= C || c >= k) ? ne(f, c) : W(f, c, "0");
    else if (e = G(new h(e), r, i), l = e.e, f = q(e.c), n = f.length, s == 1 || s == 2 && (r <= l || l <= C)) {
      for (; n < r; f += "0", n++)
        ;
      f = ne(f, l);
    } else if (r -= c, f = W(f, l, "0"), l + 1 > n) {
      if (--r > 0)
        for (f += "."; r--; f += "0")
          ;
    } else if (r += l - n, r > 0)
      for (l + 1 == n && (f += "."); r--; f += "0")
        ;
    return e.s < 0 && t ? "-" + f : f;
  }
  function ge(e, r) {
    for (var i, s = 1, t = new h(e[0]); s < e.length; s++)
      if (i = new h(e[s]), i.s)
        r.call(t, i) && (t = i);
      else {
        t = i;
        break;
      }
    return t;
  }
  function oe(e, r, i) {
    for (var s = 1, t = r.length; !r[--t]; r.pop())
      ;
    for (t = r[0]; t >= 10; t /= 10, s++)
      ;
    return (i = s + i * O - 1) > $ ? e.c = e.e = null : i < Q ? e.c = [e.e = 0] : (e.e = i, e.c = r), e;
  }
  R = function() {
    var e = /^(-?)0([xbo])(?=\w[\w.]*$)/i, r = /^([^.]+)\.$/, i = /^\.([^.]+)$/, s = /^-?(Infinity|NaN)$/, t = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
    return function(l, c, n, f) {
      var u, o = n ? c : c.replace(t, "");
      if (s.test(o))
        l.s = isNaN(o) ? null : o < 0 ? -1 : 1;
      else {
        if (!n && (o = o.replace(e, function(a, p, w) {
          return u = (w = w.toLowerCase()) == "x" ? 16 : w == "b" ? 2 : 8, !f || f == u ? p : a;
        }), f && (u = f, o = o.replace(r, "$1").replace(i, "0.$1")), c != o))
          return new h(o, u);
        if (h.DEBUG)
          throw Error(U + "Not a" + (f ? " base " + f : "") + " number: " + c);
        l.s = null;
      }
      l.c = l.e = null;
    };
  }();
  function G(e, r, i, s) {
    var t, l, c, n, f, u, o, a = e.c, p = he;
    if (a) {
      e: {
        for (t = 1, n = a[0]; n >= 10; n /= 10, t++)
          ;
        if (l = r - t, l < 0)
          l += O, c = r, f = a[u = 0], o = f / p[t - c - 1] % 10 | 0;
        else if (u = ce((l + 1) / O), u >= a.length)
          if (s) {
            for (; a.length <= u; a.push(0))
              ;
            f = o = 0, t = 1, l %= O, c = l - O + 1;
          } else
            break e;
        else {
          for (f = n = a[u], t = 1; n >= 10; n /= 10, t++)
            ;
          l %= O, c = l - O + t, o = c < 0 ? 0 : f / p[t - c - 1] % 10 | 0;
        }
        if (s = s || r < 0 || a[u + 1] != null || (c < 0 ? f : f % p[t - c - 1]), s = i < 4 ? (o || s) && (i == 0 || i == (e.s < 0 ? 3 : 2)) : o > 5 || o == 5 && (i == 4 || s || i == 6 && (l > 0 ? c > 0 ? f / p[t - c] : 0 : a[u - 1]) % 10 & 1 || i == (e.s < 0 ? 8 : 7)), r < 1 || !a[0])
          return a.length = 0, s ? (r -= e.e + 1, a[0] = p[(O - r % O) % O], e.e = -r || 0) : a[0] = e.e = 0, e;
        if (l == 0 ? (a.length = u, n = 1, u--) : (a.length = u + 1, n = p[O - l], a[u] = c > 0 ? X(f / p[t - c] % p[c]) * n : 0), s)
          for (; ; )
            if (u == 0) {
              for (l = 1, c = a[0]; c >= 10; c /= 10, l++)
                ;
              for (c = a[0] += n, n = 1; c >= 10; c /= 10, n++)
                ;
              l != n && (e.e++, a[0] == z && (a[0] = 1));
              break;
            } else {
              if (a[u] += n, a[u] != z)
                break;
              a[u--] = 0, n = 1;
            }
        for (l = a.length; a[--l] === 0; a.pop())
          ;
      }
      e.e > $ ? e.c = e.e = null : e.e < Q && (e.c = [e.e = 0]);
    }
    return e;
  }
  function V(e) {
    var r, i = e.e;
    return i === null ? e.toString() : (r = q(e.c), r = i <= C || i >= k ? ne(r, i) : W(r, i, "0"), e.s < 0 ? "-" + r : r);
  }
  return g.absoluteValue = g.abs = function() {
    var e = new h(this);
    return e.s < 0 && (e.s = 1), e;
  }, g.comparedTo = function(e, r) {
    return j(this, new h(e, r));
  }, g.decimalPlaces = g.dp = function(e, r) {
    var i, s, t, l = this;
    if (e != null)
      return S(e, 0, D), r == null ? r = v : S(r, 0, 8), G(new h(l), e + l.e + 1, r);
    if (!(i = l.c))
      return null;
    if (s = ((t = i.length - 1) - y(this.e / O)) * O, t = i[t])
      for (; t % 10 == 0; t /= 10, s--)
        ;
    return s < 0 && (s = 0), s;
  }, g.dividedBy = g.div = function(e, r) {
    return N(this, new h(e, r), x, v);
  }, g.dividedToIntegerBy = g.idiv = function(e, r) {
    return N(this, new h(e, r), 0, 1);
  }, g.exponentiatedBy = g.pow = function(e, r) {
    var i, s, t, l, c, n, f, u, o, a = this;
    if (e = new h(e), e.c && !e.isInteger())
      throw Error(U + "Exponent not an integer: " + V(e));
    if (r != null && (r = new h(r)), n = e.e > 14, !a.c || !a.c[0] || a.c[0] == 1 && !a.e && a.c.length == 1 || !e.c || !e.c[0])
      return o = new h(Math.pow(+V(a), n ? 2 - ie(e) : +V(e))), r ? o.mod(r) : o;
    if (f = e.s < 0, r) {
      if (r.c ? !r.c[0] : !r.s)
        return new h(NaN);
      s = !f && a.isInteger() && r.isInteger(), s && (a = a.mod(r));
    } else {
      if (e.e > 9 && (a.e > 0 || a.e < -1 || (a.e == 0 ? a.c[0] > 1 || n && a.c[1] >= 24e7 : a.c[0] < 8e13 || n && a.c[0] <= 9999975e7)))
        return l = a.s < 0 && ie(e) ? -0 : 0, a.e > -1 && (l = 1 / l), new h(f ? 1 / l : l);
      Y && (l = ce(Y / O + 2));
    }
    for (n ? (i = new h(0.5), f && (e.s = 1), u = ie(e)) : (t = Math.abs(+V(e)), u = t % 2), o = new h(T); ; ) {
      if (u) {
        if (o = o.times(a), !o.c)
          break;
        l ? o.c.length > l && (o.c.length = l) : s && (o = o.mod(r));
      }
      if (t) {
        if (t = X(t / 2), t === 0)
          break;
        u = t % 2;
      } else if (e = e.times(i), G(e, e.e + 1, 1), e.e > 14)
        u = ie(e);
      else {
        if (t = +V(e), t === 0)
          break;
        u = t % 2;
      }
      a = a.times(a), l ? a.c && a.c.length > l && (a.c.length = l) : s && (a = a.mod(r));
    }
    return s ? o : (f && (o = T.div(o)), r ? o.mod(r) : l ? G(o, Y, v, c) : o);
  }, g.integerValue = function(e) {
    var r = new h(this);
    return e == null ? e = v : S(e, 0, 8), G(r, r.e + 1, e);
  }, g.isEqualTo = g.eq = function(e, r) {
    return j(this, new h(e, r)) === 0;
  }, g.isFinite = function() {
    return !!this.c;
  }, g.isGreaterThan = g.gt = function(e, r) {
    return j(this, new h(e, r)) > 0;
  }, g.isGreaterThanOrEqualTo = g.gte = function(e, r) {
    return (r = j(this, new h(e, r))) === 1 || r === 0;
  }, g.isInteger = function() {
    return !!this.c && y(this.e / O) > this.c.length - 2;
  }, g.isLessThan = g.lt = function(e, r) {
    return j(this, new h(e, r)) < 0;
  }, g.isLessThanOrEqualTo = g.lte = function(e, r) {
    return (r = j(this, new h(e, r))) === -1 || r === 0;
  }, g.isNaN = function() {
    return !this.s;
  }, g.isNegative = function() {
    return this.s < 0;
  }, g.isPositive = function() {
    return this.s > 0;
  }, g.isZero = function() {
    return !!this.c && this.c[0] == 0;
  }, g.minus = function(e, r) {
    var i, s, t, l, c = this, n = c.s;
    if (e = new h(e, r), r = e.s, !n || !r)
      return new h(NaN);
    if (n != r)
      return e.s = -r, c.plus(e);
    var f = c.e / O, u = e.e / O, o = c.c, a = e.c;
    if (!f || !u) {
      if (!o || !a)
        return o ? (e.s = -r, e) : new h(a ? c : NaN);
      if (!o[0] || !a[0])
        return a[0] ? (e.s = -r, e) : new h(o[0] ? c : v == 3 ? -0 : 0);
    }
    if (f = y(f), u = y(u), o = o.slice(), n = f - u) {
      for ((l = n < 0) ? (n = -n, t = o) : (u = f, t = a), t.reverse(), r = n; r--; t.push(0))
        ;
      t.reverse();
    } else
      for (s = (l = (n = o.length) < (r = a.length)) ? n : r, n = r = 0; r < s; r++)
        if (o[r] != a[r]) {
          l = o[r] < a[r];
          break;
        }
    if (l && (t = o, o = a, a = t, e.s = -e.s), r = (s = a.length) - (i = o.length), r > 0)
      for (; r--; o[i++] = 0)
        ;
    for (r = z - 1; s > n; ) {
      if (o[--s] < a[s]) {
        for (i = s; i && !o[--i]; o[i] = r)
          ;
        --o[i], o[s] += z;
      }
      o[s] -= a[s];
    }
    for (; o[0] == 0; o.splice(0, 1), --u)
      ;
    return o[0] ? oe(e, o, u) : (e.s = v == 3 ? -1 : 1, e.c = [e.e = 0], e);
  }, g.modulo = g.mod = function(e, r) {
    var i, s, t = this;
    return e = new h(e, r), !t.c || !e.s || e.c && !e.c[0] ? new h(NaN) : !e.c || t.c && !t.c[0] ? new h(t) : (b == 9 ? (s = e.s, e.s = 1, i = N(t, e, 0, 3), e.s = s, i.s *= s) : i = N(t, e, 0, b), e = t.minus(i.times(e)), !e.c[0] && b == 1 && (e.s = t.s), e);
  }, g.multipliedBy = g.times = function(e, r) {
    var i, s, t, l, c, n, f, u, o, a, p, w, A, B, M, m = this, d = m.c, P = (e = new h(e, r)).c;
    if (!d || !P || !d[0] || !P[0])
      return !m.s || !e.s || d && !d[0] && !P || P && !P[0] && !d ? e.c = e.e = e.s = null : (e.s *= m.s, !d || !P ? e.c = e.e = null : (e.c = [0], e.e = 0)), e;
    for (s = y(m.e / O) + y(e.e / O), e.s *= m.s, f = d.length, a = P.length, f < a && (A = d, d = P, P = A, t = f, f = a, a = t), t = f + a, A = []; t--; A.push(0))
      ;
    for (B = z, M = J, t = a; --t >= 0; ) {
      for (i = 0, p = P[t] % M, w = P[t] / M | 0, c = f, l = t + c; l > t; )
        u = d[--c] % M, o = d[c] / M | 0, n = w * u + o * p, u = p * u + n % M * M + A[l] + i, i = (u / B | 0) + (n / M | 0) + w * o, A[l--] = u % B;
      A[l] = i;
    }
    return i ? ++s : A.splice(0, 1), oe(e, A, s);
  }, g.negated = function() {
    var e = new h(this);
    return e.s = -e.s || null, e;
  }, g.plus = function(e, r) {
    var i, s = this, t = s.s;
    if (e = new h(e, r), r = e.s, !t || !r)
      return new h(NaN);
    if (t != r)
      return e.s = -r, s.minus(e);
    var l = s.e / O, c = e.e / O, n = s.c, f = e.c;
    if (!l || !c) {
      if (!n || !f)
        return new h(t / 0);
      if (!n[0] || !f[0])
        return f[0] ? e : new h(n[0] ? s : t * 0);
    }
    if (l = y(l), c = y(c), n = n.slice(), t = l - c) {
      for (t > 0 ? (c = l, i = f) : (t = -t, i = n), i.reverse(); t--; i.push(0))
        ;
      i.reverse();
    }
    for (t = n.length, r = f.length, t - r < 0 && (i = f, f = n, n = i, r = t), t = 0; r; )
      t = (n[--r] = n[r] + f[r] + t) / z | 0, n[r] = z === n[r] ? 0 : n[r] % z;
    return t && (n = [t].concat(n), ++c), oe(e, n, c);
  }, g.precision = g.sd = function(e, r) {
    var i, s, t, l = this;
    if (e != null && e !== !!e)
      return S(e, 1, D), r == null ? r = v : S(r, 0, 8), G(new h(l), e, r);
    if (!(i = l.c))
      return null;
    if (t = i.length - 1, s = t * O + 1, t = i[t]) {
      for (; t % 10 == 0; t /= 10, s--)
        ;
      for (t = i[0]; t >= 10; t /= 10, s++)
        ;
    }
    return e && l.e + 1 > s && (s = l.e + 1), s;
  }, g.shiftedBy = function(e) {
    return S(e, -ae, ae), this.times("1e" + e);
  }, g.squareRoot = g.sqrt = function() {
    var e, r, i, s, t, l = this, c = l.c, n = l.s, f = l.e, u = x + 4, o = new h("0.5");
    if (n !== 1 || !c || !c[0])
      return new h(!n || n < 0 && (!c || c[0]) ? NaN : c ? l : 1 / 0);
    if (n = Math.sqrt(+V(l)), n == 0 || n == 1 / 0 ? (r = q(c), (r.length + f) % 2 == 0 && (r += "0"), n = Math.sqrt(+r), f = y((f + 1) / 2) - (f < 0 || f % 2), n == 1 / 0 ? r = "5e" + f : (r = n.toExponential(), r = r.slice(0, r.indexOf("e") + 1) + f), i = new h(r)) : i = new h(n + ""), i.c[0]) {
      for (f = i.e, n = f + u, n < 3 && (n = 0); ; )
        if (t = i, i = o.times(t.plus(N(l, t, u, 1))), q(t.c).slice(0, n) === (r = q(i.c)).slice(0, n))
          if (i.e < f && --n, r = r.slice(n - 3, n + 1), r == "9999" || !s && r == "4999") {
            if (!s && (G(t, t.e + x + 2, 0), t.times(t).eq(l))) {
              i = t;
              break;
            }
            u += 4, n += 4, s = 1;
          } else {
            (!+r || !+r.slice(1) && r.charAt(0) == "5") && (G(i, i.e + x + 2, 1), e = !i.times(i).eq(l));
            break;
          }
    }
    return G(i, i.e + x + 1, v, e);
  }, g.toExponential = function(e, r) {
    return e != null && (S(e, 0, D), e++), le(this, e, r, 1);
  }, g.toFixed = function(e, r) {
    return e != null && (S(e, 0, D), e = e + this.e + 1), le(this, e, r);
  }, g.toFormat = function(e, r, i) {
    var s, t = this;
    if (i == null)
      e != null && r && typeof r == "object" ? (i = r, r = null) : e && typeof e == "object" ? (i = e, e = r = null) : i = te;
    else if (typeof i != "object")
      throw Error(U + "Argument not an object: " + i);
    if (s = t.toFixed(e, r), t.c) {
      var l, c = s.split("."), n = +i.groupSize, f = +i.secondaryGroupSize, u = i.groupSeparator || "", o = c[0], a = c[1], p = t.s < 0, w = p ? o.slice(1) : o, A = w.length;
      if (f && (l = n, n = f, f = l, A -= l), n > 0 && A > 0) {
        for (l = A % n || n, o = w.substr(0, l); l < A; l += n)
          o += u + w.substr(l, n);
        f > 0 && (o += u + w.slice(l)), p && (o = "-" + o);
      }
      s = a ? o + (i.decimalSeparator || "") + ((f = +i.fractionGroupSize) ? a.replace(
        new RegExp("\\d{" + f + "}\\B", "g"),
        "$&" + (i.fractionGroupSeparator || "")
      ) : a) : o;
    }
    return (i.prefix || "") + s + (i.suffix || "");
  }, g.toFraction = function(e) {
    var r, i, s, t, l, c, n, f, u, o, a, p, w = this, A = w.c;
    if (e != null && (n = new h(e), !n.isInteger() && (n.c || n.s !== 1) || n.lt(T)))
      throw Error(U + "Argument " + (n.isInteger() ? "out of range: " : "not an integer: ") + V(n));
    if (!A)
      return new h(w);
    for (r = new h(T), u = i = new h(T), s = f = new h(T), p = q(A), l = r.e = p.length - w.e - 1, r.c[0] = he[(c = l % O) < 0 ? O + c : c], e = !e || n.comparedTo(r) > 0 ? l > 0 ? r : u : n, c = $, $ = 1 / 0, n = new h(p), f.c[0] = 0; o = N(n, r, 0, 1), t = i.plus(o.times(s)), t.comparedTo(e) != 1; )
      i = s, s = t, u = f.plus(o.times(t = u)), f = t, r = n.minus(o.times(t = r)), n = t;
    return t = N(e.minus(i), s, 0, 1), f = f.plus(t.times(u)), i = i.plus(t.times(s)), f.s = u.s = w.s, l = l * 2, a = N(u, s, l, v).minus(w).abs().comparedTo(
      N(f, i, l, v).minus(w).abs()
    ) < 1 ? [u, s] : [f, i], $ = c, a;
  }, g.toNumber = function() {
    return +V(this);
  }, g.toPrecision = function(e, r) {
    return e != null && S(e, 1, D), le(this, e, r, 2);
  }, g.toString = function(e) {
    var r, i = this, s = i.s, t = i.e;
    return t === null ? s ? (r = "Infinity", s < 0 && (r = "-" + r)) : r = "NaN" : (e == null ? r = t <= C || t >= k ? ne(q(i.c), t) : W(q(i.c), t, "0") : e === 10 && fe ? (i = G(new h(i), x + t + 1, v), r = W(q(i.c), i.e, "0")) : (S(e, 2, K.length, "Base"), r = _(W(q(i.c), t, "0"), 10, e, s, !0)), s < 0 && i.c[0] && (r = "-" + r)), r;
  }, g.valueOf = g.toJSON = function() {
    return V(this);
  }, g._isBigNumber = !0, g[Symbol.toStringTag] = "BigNumber", g[Symbol.for("nodejs.util.inspect.custom")] = g.valueOf, E != null && h.set(E), h;
}
function y(E) {
  var N = E | 0;
  return E > 0 || E === N ? N : N - 1;
}
function q(E) {
  for (var N, _, R = 1, g = E.length, T = E[0] + ""; R < g; ) {
    for (N = E[R++] + "", _ = O - N.length; _--; N = "0" + N)
      ;
    T += N;
  }
  for (g = T.length; T.charCodeAt(--g) === 48; )
    ;
  return T.slice(0, g + 1 || 1);
}
function j(E, N) {
  var _, R, g = E.c, T = N.c, x = E.s, v = N.s, C = E.e, k = N.e;
  if (!x || !v)
    return null;
  if (_ = g && !g[0], R = T && !T[0], _ || R)
    return _ ? R ? 0 : -v : x;
  if (x != v)
    return x;
  if (_ = x < 0, R = C == k, !g || !T)
    return R ? 0 : !g ^ _ ? 1 : -1;
  if (!R)
    return C > k ^ _ ? 1 : -1;
  for (v = (C = g.length) < (k = T.length) ? C : k, x = 0; x < v; x++)
    if (g[x] != T[x])
      return g[x] > T[x] ^ _ ? 1 : -1;
  return C == k ? 0 : C > k ^ _ ? 1 : -1;
}
function S(E, N, _, R) {
  if (E < N || E > _ || E !== X(E))
    throw Error(U + (R || "Argument") + (typeof E == "number" ? E < N || E > _ ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(E));
}
function ie(E) {
  var N = E.c.length - 1;
  return y(E.e / O) == N && E.c[N] % 2 != 0;
}
function ne(E, N) {
  return (E.length > 1 ? E.charAt(0) + "." + E.slice(1) : E) + (N < 0 ? "e" : "e+") + N;
}
function W(E, N, _) {
  var R, g;
  if (N < 0) {
    for (g = _ + "."; ++N; g += _)
      ;
    E = g + E;
  } else if (R = E.length, ++N > R) {
    for (g = _, N -= R; --N; g += _)
      ;
    E += g;
  } else
    N < R && (E = E.slice(0, N) + "." + E.slice(N));
  return E;
}
var Ne = we();
const Oe = (E, N) => Ne(E).plus(N).toString(), me = () => {
  const E = Oe("12", "3");
  console.log(E);
};
export {
  me as test
};
