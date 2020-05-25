//   let N = [];
//   let n = t.length - 1 - p;
//   if (n != P.length - 1) {
//     return n;
//   }
//   function Nij(x, t, i, j, N) {
//     // console.log(
//     //   multiply(divide(t[i + j] - x, t[i + j] - t[i + 1]), N[i + 1][j - 1])
//     // );
//     console.log(
//       [...N.map((el) => [...el])],
//       i,
//       j,
//       N[i][j - 1],
//       t[i + j - 1],
//       t[i + j],
//       t[i + 1]
//     );
//     return (
//       multiply(divide(x - t[i], t[i + j - 1]), N[i][j - 1]) +
//       multiply(divide(t[i + j] - x, t[i + j] - t[i + 1]), N[i + 1][j - 1])
//     );
//   }

//   function Nip(x, t, p) {
//     for (let j = 2; j <= n + p; j++) {
//       for (let i = 0; i <= n + p - j; i++) {
//         N[i].push(Nij(x, t, i, j, N));
//       }
//       // console.log([...N.map((el) => [. ..el])]);
//     }

//     N[0].push(Nij(x, t, 0, n + p, N));
//     // return N[i][p];
//   }

//   let Ni0;
//   // let k;
//   for (let i = 0; i <= n + p - 1; i++) {
//     if (t[i] <= x && x < t[i + 1]) {
//       // k = i;
//       Ni0 = 1;
//     } else {
//       Ni0 = 0;
//     }
//     N[i] = [0, Ni0];
//   }

//   Nip(x, t, p);

//   // console.log([...N]);

//   function bsplineValue(x, t, p, P) {
//     let sum = 0;
//     for (let i = 1; i <= n; i++) {
//       sum = add(sum, multiply(N[i][p], P[i]));
//     }

//     return sum;
//   }

//   return bsplineValue(x, t, p, P);

///////////////////////////

// if (!x1 || !x2 || !x3 || !x4) {
//   return { x: 0, y: 0 };
// }
// if (t === 0) {
//   return { x: x1, y: y1 };
// }
// if (t === 1) {
//   return { x: x4, y: y4 };
// }
// console.log({
//   x: bspline(t, [0, 0.17, 0.33, 0.5, 0.67, 0.83, 1], 3, [x1, x2, x3, x4]),
//   y: bspline(t, [0, 0.17, 0.33, 0.5, 0.67, 0.83, 1], 3, [y1, y2, y3, y4]),
// });
// console.log({
//   x: bspline(t, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], 7, [
//     x1,
//     x2,
//     x3,
//     x4,
//   ]),
//   y: bspline(t, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], 7, [
//     y1,
//     y2,
//     y3,
//     y4,
//   ]),
// });
