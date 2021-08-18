// // // var someone = {
// // //   name: "codechang",
// // //   whoAmI: function () {
// // //     console.log(this);
// // //   },
// // // };
// // // someone.whoAmI();
// // // //whoAmI를 호출한 애는 someone이다.

// // // var myWhoAmI = someone.whoAmI;
// // // myWhoAmI();
// // // //global이 MyWhoAmI를 호출한 것을 알 수 있다.

// // var d = 3;
// // function outer() {
// //   var a = 1;
// //   var b = 2;
// //   function inner() {
// //     var a = 2;
// //     var b = 3;
// //     console.log(this.b);
// //   }
// // }

// // outer();

// // const video = {
// //   title: 1,
// //   play() {
// //     console.log(this);
// //   },
// // };
// // video.play();
// const c = 3;
// var test = {
//   c: 3,
//   func: function a() {
//     var c = 2;
//     console.log(this.c);
//   },
// };
// test.func();

// var myobj = {
//   count: 3,
//   setCounter: function () {
//     console.log(this.count);
//   },
// };

const Myclass = function () {
  console.log(this);
};
new Myclass();
