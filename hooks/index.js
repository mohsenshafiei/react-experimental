const React = (function () {
  let hooks = [];
  let idx = 0;
  function useState(initVal) {
    const state = hooks[idx] || initVal;
    const _idx = idx;
    const setState = newVal => {
      hooks[_idx] = newVal
    }
    idx++;
    return [state, setState];
  }
  function useEffect(callback, dependencyArray) {
    const oldDependency = hooks[idx];
    let hasChanged = true;
    if (oldDependency) {
      hasChanged = dependencyArray.some(
        (dep, i) => !Object.is(dep, oldDependency[i])
      )
    }
    if (hasChanged) callback()
    hooks[idx] = dependencyArray
    idx++
  }
  function render(Component) {
    idx = 0;
    const c = Component();
    c.render();
    return c;
  }
  function _renderLoop (Component) {
    idx = 0;
    var App = render(Component)
    App.click();
    setTimeout(_renderLoop(Component), 300)
  }
  function root(Component) {
    return _renderLoop(Component)
  }
  return {
    useState,
    useEffect,
    render,
    root,
  }
})();

function Component() {
  const [count, setCount] = React.useState(1);
  const [count1, setCount1] = React.useState(1);
  const [text, setText] = React.useState('apple');
  React.useEffect(() => {
    console.log('count Changed')
  }, [])
  return {
    render: () => console.log(count, count1, text),
    type: (word) => setText(word),
    click: () => setCount(count + 1),
    click1: () => setCount1(count1 + 1),
  }
}


var App = React.render(Component);
App.click();
var App = React.render(Component);
App.click();
var App = React.render(Component);
App.click();
var App = React.render(Component);
App.click();
// var App = React.root(Component);
