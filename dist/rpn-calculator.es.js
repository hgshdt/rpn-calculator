var Ne = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, ae = Math.ceil, X = Math.floor, C = "[BigNumber Error] ", we = C + "Number primitive has more than 15 significant digits: ", $ = 1e14, O = 14, he = 9007199254740991, ge = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], J = 1e7, M = 1e9;
function Ee(E) {
  var h, m, R, p = g.prototype = { constructor: g, toString: null, valueOf: null }, T = new g(1), S = 20, v = 4, L = -7, U = 21, Q = -1e7, q = 1e7, Z = !1, b = 1, Y = 0, fe = {
    prefix: "",
    groupSize: 3,
    secondaryGroupSize: 0,
    groupSeparator: ",",
    decimalSeparator: ".",
    fractionGroupSize: 0,
    fractionGroupSeparator: "\xA0",
    suffix: ""
  }, K = "0123456789abcdefghijklmnopqrstuvwxyz", le = !0;
  function g(e, i) {
    var r, o, t, l, u, n, f, c, s = this;
    if (!(s instanceof g))
      return new g(e, i);
    if (i == null) {
      if (e && e._isBigNumber === !0) {
        s.s = e.s, !e.c || e.e > q ? s.c = s.e = null : e.e < Q ? s.c = [s.e = 0] : (s.e = e.e, s.c = e.c.slice());
        return;
      }
      if ((n = typeof e == "number") && e * 0 == 0) {
        if (s.s = 1 / e < 0 ? (e = -e, -1) : 1, e === ~~e) {
          for (l = 0, u = e; u >= 10; u /= 10, l++)
            ;
          l > q ? s.c = s.e = null : (s.e = l, s.c = [e]);
          return;
        }
        c = String(e);
      } else {
        if (!Ne.test(c = String(e)))
          return R(s, c, n);
        s.s = c.charCodeAt(0) == 45 ? (c = c.slice(1), -1) : 1;
      }
      (l = c.indexOf(".")) > -1 && (c = c.replace(".", "")), (u = c.search(/e/i)) > 0 ? (l < 0 && (l = u), l += +c.slice(u + 1), c = c.substring(0, u)) : l < 0 && (l = c.length);
    } else {
      if (_(i, 2, K.length, "Base"), i == 10 && le)
        return s = new g(e), y(s, S + s.e + 1, v);
      if (c = String(e), n = typeof e == "number") {
        if (e * 0 != 0)
          return R(s, c, n, i);
        if (s.s = 1 / e < 0 ? (c = c.slice(1), -1) : 1, g.DEBUG && c.replace(/^0\.0*|\./, "").length > 15)
          throw Error(we + e);
      } else
        s.s = c.charCodeAt(0) === 45 ? (c = c.slice(1), -1) : 1;
      for (r = K.slice(0, i), l = u = 0, f = c.length; u < f; u++)
        if (r.indexOf(o = c.charAt(u)) < 0) {
          if (o == ".") {
            if (u > l) {
              l = f;
              continue;
            }
          } else if (!t && (c == c.toUpperCase() && (c = c.toLowerCase()) || c == c.toLowerCase() && (c = c.toUpperCase()))) {
            t = !0, u = -1, l = 0;
            continue;
          }
          return R(s, String(e), n, i);
        }
      n = !1, c = m(c, i, 10, s.s), (l = c.indexOf(".")) > -1 ? c = c.replace(".", "") : l = c.length;
    }
    for (u = 0; c.charCodeAt(u) === 48; u++)
      ;
    for (f = c.length; c.charCodeAt(--f) === 48; )
      ;
    if (c = c.slice(u, ++f)) {
      if (f -= u, n && g.DEBUG && f > 15 && (e > he || e !== X(e)))
        throw Error(we + s.s * e);
      if ((l = l - u - 1) > q)
        s.c = s.e = null;
      else if (l < Q)
        s.c = [s.e = 0];
      else {
        if (s.e = l, s.c = [], u = (l + 1) % O, l < 0 && (u += O), u < f) {
          for (u && s.c.push(+c.slice(0, u)), f -= O; u < f; )
            s.c.push(+c.slice(u, u += O));
          u = O - (c = c.slice(u)).length;
        } else
          u -= f;
        for (; u--; c += "0")
          ;
        s.c.push(+c);
      }
    } else
      s.c = [s.e = 0];
  }
  g.clone = Ee, g.ROUND_UP = 0, g.ROUND_DOWN = 1, g.ROUND_CEIL = 2, g.ROUND_FLOOR = 3, g.ROUND_HALF_UP = 4, g.ROUND_HALF_DOWN = 5, g.ROUND_HALF_EVEN = 6, g.ROUND_HALF_CEIL = 7, g.ROUND_HALF_FLOOR = 8, g.EUCLID = 9, g.config = g.set = function(e) {
    var i, r;
    if (e != null)
      if (typeof e == "object") {
        if (e.hasOwnProperty(i = "DECIMAL_PLACES") && (r = e[i], _(r, 0, M, i), S = r), e.hasOwnProperty(i = "ROUNDING_MODE") && (r = e[i], _(r, 0, 8, i), v = r), e.hasOwnProperty(i = "EXPONENTIAL_AT") && (r = e[i], r && r.pop ? (_(r[0], -M, 0, i), _(r[1], 0, M, i), L = r[0], U = r[1]) : (_(r, -M, M, i), L = -(U = r < 0 ? -r : r))), e.hasOwnProperty(i = "RANGE"))
          if (r = e[i], r && r.pop)
            _(r[0], -M, -1, i), _(r[1], 1, M, i), Q = r[0], q = r[1];
          else if (_(r, -M, M, i), r)
            Q = -(q = r < 0 ? -r : r);
          else
            throw Error(C + i + " cannot be zero: " + r);
        if (e.hasOwnProperty(i = "CRYPTO"))
          if (r = e[i], r === !!r)
            if (r)
              if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
                Z = r;
              else
                throw Z = !r, Error(C + "crypto unavailable");
            else
              Z = r;
          else
            throw Error(C + i + " not true or false: " + r);
        if (e.hasOwnProperty(i = "MODULO_MODE") && (r = e[i], _(r, 0, 9, i), b = r), e.hasOwnProperty(i = "POW_PRECISION") && (r = e[i], _(r, 0, M, i), Y = r), e.hasOwnProperty(i = "FORMAT"))
          if (r = e[i], typeof r == "object")
            fe = r;
          else
            throw Error(C + i + " not an object: " + r);
        if (e.hasOwnProperty(i = "ALPHABET"))
          if (r = e[i], typeof r == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(r))
            le = r.slice(0, 10) == "0123456789", K = r;
          else
            throw Error(C + i + " invalid: " + r);
      } else
        throw Error(C + "Object expected: " + e);
    return {
      DECIMAL_PLACES: S,
      ROUNDING_MODE: v,
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
    var i, r, o = e.c, t = e.e, l = e.s;
    e:
      if ({}.toString.call(o) == "[object Array]") {
        if ((l === 1 || l === -1) && t >= -M && t <= M && t === X(t)) {
          if (o[0] === 0) {
            if (t === 0 && o.length === 1)
              return !0;
            break e;
          }
          if (i = (t + 1) % O, i < 1 && (i += O), String(o[0]).length == i) {
            for (i = 0; i < o.length; i++)
              if (r = o[i], r < 0 || r >= $ || r !== X(r))
                break e;
            if (r !== 0)
              return !0;
          }
        }
      } else if (o === null && t === null && (l === null || l === 1 || l === -1))
        return !0;
    throw Error(C + "Invalid BigNumber: " + e);
  }, g.maximum = g.max = function() {
    return pe(arguments, p.lt);
  }, g.minimum = g.min = function() {
    return pe(arguments, p.gt);
  }, g.random = function() {
    var e = 9007199254740992, i = Math.random() * e & 2097151 ? function() {
      return X(Math.random() * e);
    } : function() {
      return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
    };
    return function(r) {
      var o, t, l, u, n, f = 0, c = [], s = new g(T);
      if (r == null ? r = S : _(r, 0, M), u = ae(r / O), Z)
        if (crypto.getRandomValues) {
          for (o = crypto.getRandomValues(new Uint32Array(u *= 2)); f < u; )
            n = o[f] * 131072 + (o[f + 1] >>> 11), n >= 9e15 ? (t = crypto.getRandomValues(new Uint32Array(2)), o[f] = t[0], o[f + 1] = t[1]) : (c.push(n % 1e14), f += 2);
          f = u / 2;
        } else if (crypto.randomBytes) {
          for (o = crypto.randomBytes(u *= 7); f < u; )
            n = (o[f] & 31) * 281474976710656 + o[f + 1] * 1099511627776 + o[f + 2] * 4294967296 + o[f + 3] * 16777216 + (o[f + 4] << 16) + (o[f + 5] << 8) + o[f + 6], n >= 9e15 ? crypto.randomBytes(7).copy(o, f) : (c.push(n % 1e14), f += 7);
          f = u / 7;
        } else
          throw Z = !1, Error(C + "crypto unavailable");
      if (!Z)
        for (; f < u; )
          n = i(), n < 9e15 && (c[f++] = n % 1e14);
      for (u = c[--f], r %= O, u && r && (n = ge[O - r], c[f] = X(u / n) * n); c[f] === 0; c.pop(), f--)
        ;
      if (f < 0)
        c = [l = 0];
      else {
        for (l = -1; c[0] === 0; c.splice(0, 1), l -= O)
          ;
        for (f = 1, n = c[0]; n >= 10; n /= 10, f++)
          ;
        f < O && (l -= O - f);
      }
      return s.e = l, s.c = c, s;
    };
  }(), g.sum = function() {
    for (var e = 1, i = arguments, r = new g(i[0]); e < i.length; )
      r = r.plus(i[e++]);
    return r;
  }, m = function() {
    var e = "0123456789";
    function i(r, o, t, l) {
      for (var u, n = [0], f, c = 0, s = r.length; c < s; ) {
        for (f = n.length; f--; n[f] *= o)
          ;
        for (n[0] += l.indexOf(r.charAt(c++)), u = 0; u < n.length; u++)
          n[u] > t - 1 && (n[u + 1] == null && (n[u + 1] = 0), n[u + 1] += n[u] / t | 0, n[u] %= t);
      }
      return n.reverse();
    }
    return function(r, o, t, l, u) {
      var n, f, c, s, a, w, N, d, B = r.indexOf("."), k = S, x = v;
      for (B >= 0 && (s = Y, Y = 0, r = r.replace(".", ""), d = new g(o), w = d.pow(r.length - B), Y = s, d.c = i(
        W(G(w.c), w.e, "0"),
        10,
        t,
        e
      ), d.e = d.c.length), N = i(r, o, t, u ? (n = K, e) : (n = e, K)), c = s = N.length; N[--s] == 0; N.pop())
        ;
      if (!N[0])
        return n.charAt(0);
      if (B < 0 ? --c : (w.c = N, w.e = c, w.s = l, w = h(w, d, k, x, t), N = w.c, a = w.r, c = w.e), f = c + k + 1, B = N[f], s = t / 2, a = a || f < 0 || N[f + 1] != null, a = x < 4 ? (B != null || a) && (x == 0 || x == (w.s < 0 ? 3 : 2)) : B > s || B == s && (x == 4 || a || x == 6 && N[f - 1] & 1 || x == (w.s < 0 ? 8 : 7)), f < 1 || !N[0])
        r = a ? W(n.charAt(1), -k, n.charAt(0)) : n.charAt(0);
      else {
        if (N.length = f, a)
          for (--t; ++N[--f] > t; )
            N[f] = 0, f || (++c, N = [1].concat(N));
        for (s = N.length; !N[--s]; )
          ;
        for (B = 0, r = ""; B <= s; r += n.charAt(N[B++]))
          ;
        r = W(r, c, n.charAt(0));
      }
      return r;
    };
  }(), h = function() {
    function e(o, t, l) {
      var u, n, f, c, s = 0, a = o.length, w = t % J, N = t / J | 0;
      for (o = o.slice(); a--; )
        f = o[a] % J, c = o[a] / J | 0, u = N * f + c * w, n = w * f + u % J * J + s, s = (n / l | 0) + (u / J | 0) + N * c, o[a] = n % l;
      return s && (o = [s].concat(o)), o;
    }
    function i(o, t, l, u) {
      var n, f;
      if (l != u)
        f = l > u ? 1 : -1;
      else
        for (n = f = 0; n < l; n++)
          if (o[n] != t[n]) {
            f = o[n] > t[n] ? 1 : -1;
            break;
          }
      return f;
    }
    function r(o, t, l, u) {
      for (var n = 0; l--; )
        o[l] -= n, n = o[l] < t[l] ? 1 : 0, o[l] = n * u + o[l] - t[l];
      for (; !o[0] && o.length > 1; o.splice(0, 1))
        ;
    }
    return function(o, t, l, u, n) {
      var f, c, s, a, w, N, d, B, k, x, A, D, re, ce, ue, H, ee, z = o.s == t.s ? 1 : -1, P = o.c, I = t.c;
      if (!P || !P[0] || !I || !I[0])
        return new g(
          !o.s || !t.s || (P ? I && P[0] == I[0] : !I) ? NaN : P && P[0] == 0 || !I ? z * 0 : z / 0
        );
      for (B = new g(z), k = B.c = [], c = o.e - t.e, z = l + c + 1, n || (n = $, c = F(o.e / O) - F(t.e / O), z = z / O | 0), s = 0; I[s] == (P[s] || 0); s++)
        ;
      if (I[s] > (P[s] || 0) && c--, z < 0)
        k.push(1), a = !0;
      else {
        for (ce = P.length, H = I.length, s = 0, z += 2, w = X(n / (I[0] + 1)), w > 1 && (I = e(I, w, n), P = e(P, w, n), H = I.length, ce = P.length), re = H, x = P.slice(0, H), A = x.length; A < H; x[A++] = 0)
          ;
        ee = I.slice(), ee = [0].concat(ee), ue = I[0], I[1] >= n / 2 && ue++;
        do {
          if (w = 0, f = i(I, x, H, A), f < 0) {
            if (D = x[0], H != A && (D = D * n + (x[1] || 0)), w = X(D / ue), w > 1)
              for (w >= n && (w = n - 1), N = e(I, w, n), d = N.length, A = x.length; i(N, x, d, A) == 1; )
                w--, r(N, H < d ? ee : I, d, n), d = N.length, f = 1;
            else
              w == 0 && (f = w = 1), N = I.slice(), d = N.length;
            if (d < A && (N = [0].concat(N)), r(x, N, A, n), A = x.length, f == -1)
              for (; i(I, x, H, A) < 1; )
                w++, r(x, H < A ? ee : I, A, n), A = x.length;
          } else
            f === 0 && (w++, x = [0]);
          k[s++] = w, x[0] ? x[A++] = P[re] || 0 : (x = [P[re]], A = 1);
        } while ((re++ < ce || x[0] != null) && z--);
        a = x[0] != null, k[0] || k.splice(0, 1);
      }
      if (n == $) {
        for (s = 1, z = k[0]; z >= 10; z /= 10, s++)
          ;
        y(B, l + (B.e = s + c * O - 1) + 1, u, a);
      } else
        B.e = c, B.r = +a;
      return B;
    };
  }();
  function se(e, i, r, o) {
    var t, l, u, n, f;
    if (r == null ? r = v : _(r, 0, 8), !e.c)
      return e.toString();
    if (t = e.c[0], u = e.e, i == null)
      f = G(e.c), f = o == 1 || o == 2 && (u <= L || u >= U) ? te(f, u) : W(f, u, "0");
    else if (e = y(new g(e), i, r), l = e.e, f = G(e.c), n = f.length, o == 1 || o == 2 && (i <= l || l <= L)) {
      for (; n < i; f += "0", n++)
        ;
      f = te(f, l);
    } else if (i -= u, f = W(f, l, "0"), l + 1 > n) {
      if (--i > 0)
        for (f += "."; i--; f += "0")
          ;
    } else if (i += l - n, i > 0)
      for (l + 1 == n && (f += "."); i--; f += "0")
        ;
    return e.s < 0 && t ? "-" + f : f;
  }
  function pe(e, i) {
    for (var r, o = 1, t = new g(e[0]); o < e.length; o++)
      if (r = new g(e[o]), r.s)
        i.call(t, r) && (t = r);
      else {
        t = r;
        break;
      }
    return t;
  }
  function oe(e, i, r) {
    for (var o = 1, t = i.length; !i[--t]; i.pop())
      ;
    for (t = i[0]; t >= 10; t /= 10, o++)
      ;
    return (r = o + r * O - 1) > q ? e.c = e.e = null : r < Q ? e.c = [e.e = 0] : (e.e = r, e.c = i), e;
  }
  R = function() {
    var e = /^(-?)0([xbo])(?=\w[\w.]*$)/i, i = /^([^.]+)\.$/, r = /^\.([^.]+)$/, o = /^-?(Infinity|NaN)$/, t = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
    return function(l, u, n, f) {
      var c, s = n ? u : u.replace(t, "");
      if (o.test(s))
        l.s = isNaN(s) ? null : s < 0 ? -1 : 1;
      else {
        if (!n && (s = s.replace(e, function(a, w, N) {
          return c = (N = N.toLowerCase()) == "x" ? 16 : N == "b" ? 2 : 8, !f || f == c ? w : a;
        }), f && (c = f, s = s.replace(i, "$1").replace(r, "0.$1")), u != s))
          return new g(s, c);
        if (g.DEBUG)
          throw Error(C + "Not a" + (f ? " base " + f : "") + " number: " + u);
        l.s = null;
      }
      l.c = l.e = null;
    };
  }();
  function y(e, i, r, o) {
    var t, l, u, n, f, c, s, a = e.c, w = ge;
    if (a) {
      e: {
        for (t = 1, n = a[0]; n >= 10; n /= 10, t++)
          ;
        if (l = i - t, l < 0)
          l += O, u = i, f = a[c = 0], s = f / w[t - u - 1] % 10 | 0;
        else if (c = ae((l + 1) / O), c >= a.length)
          if (o) {
            for (; a.length <= c; a.push(0))
              ;
            f = s = 0, t = 1, l %= O, u = l - O + 1;
          } else
            break e;
        else {
          for (f = n = a[c], t = 1; n >= 10; n /= 10, t++)
            ;
          l %= O, u = l - O + t, s = u < 0 ? 0 : f / w[t - u - 1] % 10 | 0;
        }
        if (o = o || i < 0 || a[c + 1] != null || (u < 0 ? f : f % w[t - u - 1]), o = r < 4 ? (s || o) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : s > 5 || s == 5 && (r == 4 || o || r == 6 && (l > 0 ? u > 0 ? f / w[t - u] : 0 : a[c - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7)), i < 1 || !a[0])
          return a.length = 0, o ? (i -= e.e + 1, a[0] = w[(O - i % O) % O], e.e = -i || 0) : a[0] = e.e = 0, e;
        if (l == 0 ? (a.length = c, n = 1, c--) : (a.length = c + 1, n = w[O - l], a[c] = u > 0 ? X(f / w[t - u] % w[u]) * n : 0), o)
          for (; ; )
            if (c == 0) {
              for (l = 1, u = a[0]; u >= 10; u /= 10, l++)
                ;
              for (u = a[0] += n, n = 1; u >= 10; u /= 10, n++)
                ;
              l != n && (e.e++, a[0] == $ && (a[0] = 1));
              break;
            } else {
              if (a[c] += n, a[c] != $)
                break;
              a[c--] = 0, n = 1;
            }
        for (l = a.length; a[--l] === 0; a.pop())
          ;
      }
      e.e > q ? e.c = e.e = null : e.e < Q && (e.c = [e.e = 0]);
    }
    return e;
  }
  function V(e) {
    var i, r = e.e;
    return r === null ? e.toString() : (i = G(e.c), i = r <= L || r >= U ? te(i, r) : W(i, r, "0"), e.s < 0 ? "-" + i : i);
  }
  return p.absoluteValue = p.abs = function() {
    var e = new g(this);
    return e.s < 0 && (e.s = 1), e;
  }, p.comparedTo = function(e, i) {
    return j(this, new g(e, i));
  }, p.decimalPlaces = p.dp = function(e, i) {
    var r, o, t, l = this;
    if (e != null)
      return _(e, 0, M), i == null ? i = v : _(i, 0, 8), y(new g(l), e + l.e + 1, i);
    if (!(r = l.c))
      return null;
    if (o = ((t = r.length - 1) - F(this.e / O)) * O, t = r[t])
      for (; t % 10 == 0; t /= 10, o--)
        ;
    return o < 0 && (o = 0), o;
  }, p.dividedBy = p.div = function(e, i) {
    return h(this, new g(e, i), S, v);
  }, p.dividedToIntegerBy = p.idiv = function(e, i) {
    return h(this, new g(e, i), 0, 1);
  }, p.exponentiatedBy = p.pow = function(e, i) {
    var r, o, t, l, u, n, f, c, s, a = this;
    if (e = new g(e), e.c && !e.isInteger())
      throw Error(C + "Exponent not an integer: " + V(e));
    if (i != null && (i = new g(i)), n = e.e > 14, !a.c || !a.c[0] || a.c[0] == 1 && !a.e && a.c.length == 1 || !e.c || !e.c[0])
      return s = new g(Math.pow(+V(a), n ? 2 - ne(e) : +V(e))), i ? s.mod(i) : s;
    if (f = e.s < 0, i) {
      if (i.c ? !i.c[0] : !i.s)
        return new g(NaN);
      o = !f && a.isInteger() && i.isInteger(), o && (a = a.mod(i));
    } else {
      if (e.e > 9 && (a.e > 0 || a.e < -1 || (a.e == 0 ? a.c[0] > 1 || n && a.c[1] >= 24e7 : a.c[0] < 8e13 || n && a.c[0] <= 9999975e7)))
        return l = a.s < 0 && ne(e) ? -0 : 0, a.e > -1 && (l = 1 / l), new g(f ? 1 / l : l);
      Y && (l = ae(Y / O + 2));
    }
    for (n ? (r = new g(0.5), f && (e.s = 1), c = ne(e)) : (t = Math.abs(+V(e)), c = t % 2), s = new g(T); ; ) {
      if (c) {
        if (s = s.times(a), !s.c)
          break;
        l ? s.c.length > l && (s.c.length = l) : o && (s = s.mod(i));
      }
      if (t) {
        if (t = X(t / 2), t === 0)
          break;
        c = t % 2;
      } else if (e = e.times(r), y(e, e.e + 1, 1), e.e > 14)
        c = ne(e);
      else {
        if (t = +V(e), t === 0)
          break;
        c = t % 2;
      }
      a = a.times(a), l ? a.c && a.c.length > l && (a.c.length = l) : o && (a = a.mod(i));
    }
    return o ? s : (f && (s = T.div(s)), i ? s.mod(i) : l ? y(s, Y, v, u) : s);
  }, p.integerValue = function(e) {
    var i = new g(this);
    return e == null ? e = v : _(e, 0, 8), y(i, i.e + 1, e);
  }, p.isEqualTo = p.eq = function(e, i) {
    return j(this, new g(e, i)) === 0;
  }, p.isFinite = function() {
    return !!this.c;
  }, p.isGreaterThan = p.gt = function(e, i) {
    return j(this, new g(e, i)) > 0;
  }, p.isGreaterThanOrEqualTo = p.gte = function(e, i) {
    return (i = j(this, new g(e, i))) === 1 || i === 0;
  }, p.isInteger = function() {
    return !!this.c && F(this.e / O) > this.c.length - 2;
  }, p.isLessThan = p.lt = function(e, i) {
    return j(this, new g(e, i)) < 0;
  }, p.isLessThanOrEqualTo = p.lte = function(e, i) {
    return (i = j(this, new g(e, i))) === -1 || i === 0;
  }, p.isNaN = function() {
    return !this.s;
  }, p.isNegative = function() {
    return this.s < 0;
  }, p.isPositive = function() {
    return this.s > 0;
  }, p.isZero = function() {
    return !!this.c && this.c[0] == 0;
  }, p.minus = function(e, i) {
    var r, o, t, l, u = this, n = u.s;
    if (e = new g(e, i), i = e.s, !n || !i)
      return new g(NaN);
    if (n != i)
      return e.s = -i, u.plus(e);
    var f = u.e / O, c = e.e / O, s = u.c, a = e.c;
    if (!f || !c) {
      if (!s || !a)
        return s ? (e.s = -i, e) : new g(a ? u : NaN);
      if (!s[0] || !a[0])
        return a[0] ? (e.s = -i, e) : new g(s[0] ? u : v == 3 ? -0 : 0);
    }
    if (f = F(f), c = F(c), s = s.slice(), n = f - c) {
      for ((l = n < 0) ? (n = -n, t = s) : (c = f, t = a), t.reverse(), i = n; i--; t.push(0))
        ;
      t.reverse();
    } else
      for (o = (l = (n = s.length) < (i = a.length)) ? n : i, n = i = 0; i < o; i++)
        if (s[i] != a[i]) {
          l = s[i] < a[i];
          break;
        }
    if (l && (t = s, s = a, a = t, e.s = -e.s), i = (o = a.length) - (r = s.length), i > 0)
      for (; i--; s[r++] = 0)
        ;
    for (i = $ - 1; o > n; ) {
      if (s[--o] < a[o]) {
        for (r = o; r && !s[--r]; s[r] = i)
          ;
        --s[r], s[o] += $;
      }
      s[o] -= a[o];
    }
    for (; s[0] == 0; s.splice(0, 1), --c)
      ;
    return s[0] ? oe(e, s, c) : (e.s = v == 3 ? -1 : 1, e.c = [e.e = 0], e);
  }, p.modulo = p.mod = function(e, i) {
    var r, o, t = this;
    return e = new g(e, i), !t.c || !e.s || e.c && !e.c[0] ? new g(NaN) : !e.c || t.c && !t.c[0] ? new g(t) : (b == 9 ? (o = e.s, e.s = 1, r = h(t, e, 0, 3), e.s = o, r.s *= o) : r = h(t, e, 0, b), e = t.minus(r.times(e)), !e.c[0] && b == 1 && (e.s = t.s), e);
  }, p.multipliedBy = p.times = function(e, i) {
    var r, o, t, l, u, n, f, c, s, a, w, N, d, B, k, x = this, A = x.c, D = (e = new g(e, i)).c;
    if (!A || !D || !A[0] || !D[0])
      return !x.s || !e.s || A && !A[0] && !D || D && !D[0] && !A ? e.c = e.e = e.s = null : (e.s *= x.s, !A || !D ? e.c = e.e = null : (e.c = [0], e.e = 0)), e;
    for (o = F(x.e / O) + F(e.e / O), e.s *= x.s, f = A.length, a = D.length, f < a && (d = A, A = D, D = d, t = f, f = a, a = t), t = f + a, d = []; t--; d.push(0))
      ;
    for (B = $, k = J, t = a; --t >= 0; ) {
      for (r = 0, w = D[t] % k, N = D[t] / k | 0, u = f, l = t + u; l > t; )
        c = A[--u] % k, s = A[u] / k | 0, n = N * c + s * w, c = w * c + n % k * k + d[l] + r, r = (c / B | 0) + (n / k | 0) + N * s, d[l--] = c % B;
      d[l] = r;
    }
    return r ? ++o : d.splice(0, 1), oe(e, d, o);
  }, p.negated = function() {
    var e = new g(this);
    return e.s = -e.s || null, e;
  }, p.plus = function(e, i) {
    var r, o = this, t = o.s;
    if (e = new g(e, i), i = e.s, !t || !i)
      return new g(NaN);
    if (t != i)
      return e.s = -i, o.minus(e);
    var l = o.e / O, u = e.e / O, n = o.c, f = e.c;
    if (!l || !u) {
      if (!n || !f)
        return new g(t / 0);
      if (!n[0] || !f[0])
        return f[0] ? e : new g(n[0] ? o : t * 0);
    }
    if (l = F(l), u = F(u), n = n.slice(), t = l - u) {
      for (t > 0 ? (u = l, r = f) : (t = -t, r = n), r.reverse(); t--; r.push(0))
        ;
      r.reverse();
    }
    for (t = n.length, i = f.length, t - i < 0 && (r = f, f = n, n = r, i = t), t = 0; i; )
      t = (n[--i] = n[i] + f[i] + t) / $ | 0, n[i] = $ === n[i] ? 0 : n[i] % $;
    return t && (n = [t].concat(n), ++u), oe(e, n, u);
  }, p.precision = p.sd = function(e, i) {
    var r, o, t, l = this;
    if (e != null && e !== !!e)
      return _(e, 1, M), i == null ? i = v : _(i, 0, 8), y(new g(l), e, i);
    if (!(r = l.c))
      return null;
    if (t = r.length - 1, o = t * O + 1, t = r[t]) {
      for (; t % 10 == 0; t /= 10, o--)
        ;
      for (t = r[0]; t >= 10; t /= 10, o++)
        ;
    }
    return e && l.e + 1 > o && (o = l.e + 1), o;
  }, p.shiftedBy = function(e) {
    return _(e, -he, he), this.times("1e" + e);
  }, p.squareRoot = p.sqrt = function() {
    var e, i, r, o, t, l = this, u = l.c, n = l.s, f = l.e, c = S + 4, s = new g("0.5");
    if (n !== 1 || !u || !u[0])
      return new g(!n || n < 0 && (!u || u[0]) ? NaN : u ? l : 1 / 0);
    if (n = Math.sqrt(+V(l)), n == 0 || n == 1 / 0 ? (i = G(u), (i.length + f) % 2 == 0 && (i += "0"), n = Math.sqrt(+i), f = F((f + 1) / 2) - (f < 0 || f % 2), n == 1 / 0 ? i = "5e" + f : (i = n.toExponential(), i = i.slice(0, i.indexOf("e") + 1) + f), r = new g(i)) : r = new g(n + ""), r.c[0]) {
      for (f = r.e, n = f + c, n < 3 && (n = 0); ; )
        if (t = r, r = s.times(t.plus(h(l, t, c, 1))), G(t.c).slice(0, n) === (i = G(r.c)).slice(0, n))
          if (r.e < f && --n, i = i.slice(n - 3, n + 1), i == "9999" || !o && i == "4999") {
            if (!o && (y(t, t.e + S + 2, 0), t.times(t).eq(l))) {
              r = t;
              break;
            }
            c += 4, n += 4, o = 1;
          } else {
            (!+i || !+i.slice(1) && i.charAt(0) == "5") && (y(r, r.e + S + 2, 1), e = !r.times(r).eq(l));
            break;
          }
    }
    return y(r, r.e + S + 1, v, e);
  }, p.toExponential = function(e, i) {
    return e != null && (_(e, 0, M), e++), se(this, e, i, 1);
  }, p.toFixed = function(e, i) {
    return e != null && (_(e, 0, M), e = e + this.e + 1), se(this, e, i);
  }, p.toFormat = function(e, i, r) {
    var o, t = this;
    if (r == null)
      e != null && i && typeof i == "object" ? (r = i, i = null) : e && typeof e == "object" ? (r = e, e = i = null) : r = fe;
    else if (typeof r != "object")
      throw Error(C + "Argument not an object: " + r);
    if (o = t.toFixed(e, i), t.c) {
      var l, u = o.split("."), n = +r.groupSize, f = +r.secondaryGroupSize, c = r.groupSeparator || "", s = u[0], a = u[1], w = t.s < 0, N = w ? s.slice(1) : s, d = N.length;
      if (f && (l = n, n = f, f = l, d -= l), n > 0 && d > 0) {
        for (l = d % n || n, s = N.substr(0, l); l < d; l += n)
          s += c + N.substr(l, n);
        f > 0 && (s += c + N.slice(l)), w && (s = "-" + s);
      }
      o = a ? s + (r.decimalSeparator || "") + ((f = +r.fractionGroupSize) ? a.replace(
        new RegExp("\\d{" + f + "}\\B", "g"),
        "$&" + (r.fractionGroupSeparator || "")
      ) : a) : s;
    }
    return (r.prefix || "") + o + (r.suffix || "");
  }, p.toFraction = function(e) {
    var i, r, o, t, l, u, n, f, c, s, a, w, N = this, d = N.c;
    if (e != null && (n = new g(e), !n.isInteger() && (n.c || n.s !== 1) || n.lt(T)))
      throw Error(C + "Argument " + (n.isInteger() ? "out of range: " : "not an integer: ") + V(n));
    if (!d)
      return new g(N);
    for (i = new g(T), c = r = new g(T), o = f = new g(T), w = G(d), l = i.e = w.length - N.e - 1, i.c[0] = ge[(u = l % O) < 0 ? O + u : u], e = !e || n.comparedTo(i) > 0 ? l > 0 ? i : c : n, u = q, q = 1 / 0, n = new g(w), f.c[0] = 0; s = h(n, i, 0, 1), t = r.plus(s.times(o)), t.comparedTo(e) != 1; )
      r = o, o = t, c = f.plus(s.times(t = c)), f = t, i = n.minus(s.times(t = i)), n = t;
    return t = h(e.minus(r), o, 0, 1), f = f.plus(t.times(c)), r = r.plus(t.times(o)), f.s = c.s = N.s, l = l * 2, a = h(c, o, l, v).minus(N).abs().comparedTo(
      h(f, r, l, v).minus(N).abs()
    ) < 1 ? [c, o] : [f, r], q = u, a;
  }, p.toNumber = function() {
    return +V(this);
  }, p.toPrecision = function(e, i) {
    return e != null && _(e, 1, M), se(this, e, i, 2);
  }, p.toString = function(e) {
    var i, r = this, o = r.s, t = r.e;
    return t === null ? o ? (i = "Infinity", o < 0 && (i = "-" + i)) : i = "NaN" : (e == null ? i = t <= L || t >= U ? te(G(r.c), t) : W(G(r.c), t, "0") : e === 10 && le ? (r = y(new g(r), S + t + 1, v), i = W(G(r.c), r.e, "0")) : (_(e, 2, K.length, "Base"), i = m(W(G(r.c), t, "0"), 10, e, o, !0)), o < 0 && r.c[0] && (i = "-" + i)), i;
  }, p.valueOf = p.toJSON = function() {
    return V(this);
  }, p._isBigNumber = !0, p[Symbol.toStringTag] = "BigNumber", p[Symbol.for("nodejs.util.inspect.custom")] = p.valueOf, E != null && g.set(E), g;
}
function F(E) {
  var h = E | 0;
  return E > 0 || E === h ? h : h - 1;
}
function G(E) {
  for (var h, m, R = 1, p = E.length, T = E[0] + ""; R < p; ) {
    for (h = E[R++] + "", m = O - h.length; m--; h = "0" + h)
      ;
    T += h;
  }
  for (p = T.length; T.charCodeAt(--p) === 48; )
    ;
  return T.slice(0, p + 1 || 1);
}
function j(E, h) {
  var m, R, p = E.c, T = h.c, S = E.s, v = h.s, L = E.e, U = h.e;
  if (!S || !v)
    return null;
  if (m = p && !p[0], R = T && !T[0], m || R)
    return m ? R ? 0 : -v : S;
  if (S != v)
    return S;
  if (m = S < 0, R = L == U, !p || !T)
    return R ? 0 : !p ^ m ? 1 : -1;
  if (!R)
    return L > U ^ m ? 1 : -1;
  for (v = (L = p.length) < (U = T.length) ? L : U, S = 0; S < v; S++)
    if (p[S] != T[S])
      return p[S] > T[S] ^ m ? 1 : -1;
  return L == U ? 0 : L > U ^ m ? 1 : -1;
}
function _(E, h, m, R) {
  if (E < h || E > m || E !== X(E))
    throw Error(C + (R || "Argument") + (typeof E == "number" ? E < h || E > m ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(E));
}
function ne(E) {
  var h = E.c.length - 1;
  return F(E.e / O) == h && E.c[h] % 2 != 0;
}
function te(E, h) {
  return (E.length > 1 ? E.charAt(0) + "." + E.slice(1) : E) + (h < 0 ? "e" : "e+") + h;
}
function W(E, h, m) {
  var R, p;
  if (h < 0) {
    for (p = m + "."; ++h; p += m)
      ;
    E = p + E;
  } else if (R = E.length, ++h > R) {
    for (p = m, h -= R; --h; p += m)
      ;
    E += p;
  } else
    h < R && (E = E.slice(0, h) + "." + E.slice(h));
  return E;
}
var ie = Ee();
const Oe = (E, h) => ie(E).plus(h).toString(), me = (E, h) => ie(E).minus(h).toString(), xe = (E, h) => ie(E).times(h).toString(), de = (E, h) => ie(E).div(h).toString(), Ae = (E) => ie(E).negated().toString(), Se = (E, h) => {
  let m = { ...h };
  if (h.x.length < 1 || h.y.length < 1 || h.z.length < 1 || h.t.length < 1)
    return m;
  switch (E) {
    case "enter":
      m = { x: "0", y: h.x, z: h.y, t: h.z };
      break;
    case "abs":
      m = { ...h, x: Ae(h.x) };
      break;
    case "swap":
      m = { ...h, x: h.y, y: h.x };
      break;
    case "backspace":
      m = {
        ...h,
        x: h.x.length === 1 ? "0" : h.x.slice(0, -1)
      };
      break;
    case "/":
      m = {
        x: de(h.y, h.x),
        y: h.z,
        z: h.t,
        t: "0"
      };
      break;
    case "*":
      m = {
        x: xe(h.y, h.x),
        y: h.z,
        z: h.t,
        t: "0"
      };
      break;
    case "-":
      m = {
        x: me(h.y, h.x),
        y: h.z,
        z: h.t,
        t: "0"
      };
      break;
    case "+":
      m = {
        x: Oe(h.y, h.x),
        y: h.z,
        z: h.t,
        t: "0"
      };
      break;
  }
  return m;
};
export {
  Se as rpnCalc
};
