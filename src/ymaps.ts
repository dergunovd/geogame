export const ymaps = window.ymaps;

// function a(ym) {
//   ym.modules.define(
//     "Panorama",
//     [
//       "coordSystem.geo",
//       "data.Manager",
//       "option.Manager",
//       "panorama.ConnectionArrow",
//       "panorama.ConnectionMarker",
//       "panorama.Graph",
//       "panorama.Marker",
//       "panorama.TileLevel",
//       "panorama.math.util",
//       "panorama.util.coordOrder",
//       "util.array",
//       "util.defineClass",
//       "util.math.cycleRestrict",
//     ],
//     function (t, e, n, a, r, i, o, s, u, g, h, c, l, m) {
//       function p(t) {
//         for (var e = t[0].getImageSize(), n = 1; n < t.length; ++n) {
//           var a = t[n].getImageSize();
//           a[0] > e[0] && (e = a);
//         }
//         return e;
//       }
//       function f(t, e) {
//         var a = new n(t);
//         (this.metadata = a), (this._name = a.get("Data.Point.name", ""));
//         var h = (this._position = a.get("Data.Point.coordinates"));
//         (h[2] = h[2] || 0),
//           (this._layer = e),
//           (this._defaultDirection = c.map(
//             a.get("Data.View.Direction", [0, 0]),
//             g.deg2rad
//           )),
//           (this._defaultSpan = c.map(
//             a.get("Data.View.Span", [0, 0]),
//             g.deg2rad
//           ));
//         var l = a.get("Data.Images.Tiles"),
//           f =
//             ((this._tileSize = [l.width, l.height]),
//             a.get("Data.Images.imageId")),
//           d = f
//             ? ym.env.hosts.panoramasTiles.replace("%s", f)
//             : a.get("Data.Images.href");
//         this._tileLevels = c.map(a.get("Data.Images.Zooms"), function (t) {
//           return new u(d, t.level, [t.width, t.height]);
//         });
//         var _ = p(this._tileLevels),
//           w = (Math.PI * _[1]) / _[0],
//           y = a.get("Data.EquirectangularProjection.Origin"),
//           D = g.deg2rad(y[1]),
//           v = m(g.deg2rad(y[0]), 0, 2 * Math.PI);
//         (this._angularBBox = [D + w, v + 2 * Math.PI, D - w, v]),
//           (this._connectionMarkers = c.map(
//             a.get("Annotation.Connections", []),
//             function (t) {
//               return new i(t, this);
//             },
//             this
//           ));
//         var M = a.get("Annotation.Graph");
//         (this._graph = M ? new o(M, this) : null),
//           (this._markers = c.map(
//             a.get("Annotation.Markers", []),
//             function (t) {
//               return new s(t, this);
//             },
//             this
//           )),
//           (this._connectionArrows = c.map(
//             a.get("Annotation.Thoroughfares", []),
//             function (t) {
//               return new r(t, this);
//             },
//             this
//           ));
//       }
//       l(f, {
//         createPlayer: function (t, e) {
//           return ym.modules.require("panorama.Player").spread(function (n) {
//             return new n(t, this, e);
//           }, this);
//         },
//         getName: function () {
//           return this._name;
//         },
//         getPosition: function () {
//           return h.toApiOrder(this._position);
//         },
//         getCoordSystem: function () {
//           return e;
//         },
//         getLayer: function () {
//           return this._layer;
//         },
//         getDefaultDirection: function () {
//           return this._defaultDirection;
//         },
//         getDefaultSpan: function () {
//           return this._defaultSpan;
//         },
//         getTileSize: function () {
//           return this._tileSize;
//         },
//         getTileLevels: function () {
//           return this._tileLevels;
//         },
//         getAngularBBox: function () {
//           return this._angularBBox;
//         },
//         getConnectionMarkers: function () {
//           return this._connectionMarkers;
//         },
//         getGraph: function () {
//           return this._graph;
//         },
//         getMarkers: function () {
//           return this._markers;
//         },
//         getConnectionArrows: function () {
//           return this._connectionArrows;
//         },
//       }),
//         (f.prototype.getConnections = f.prototype.getConnectionMarkers),
//         (f.prototype.getThoroughfares = f.prototype.getConnectionArrows),
//         t(f);
//     }
//   );
// }
