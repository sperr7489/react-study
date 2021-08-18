const qro = {
  name: "kichang",
  showName: function () {
    console.log(`hello very awesome ${this.name}`);
  },
};
qro.showName();
let fn = qro.showName;

fn.call(qro);
fn.apply(qro);
let boundFn = fn.bind(qro);
boundFn();
