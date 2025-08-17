# The big re-renders myth

> Have you noticed that I haven't mentioned anything about props here? You might have heard this statement: "Component re-renders when its props change." It's one of the most common misconceptions in React: everyone believes it, no one doubts it, and it's just not true.
> Normal React behavior is that if a state update is triggered, React will re-render all the nested components regardless of their props. And if a state update is not triggered, then changing props will be just "swallowed": React doesn't monitor them.
> If I have a component with props, and I try to change those props without triggering a state update, something like this:

```javascript
const App = () => {
  // local variable won't work
  let isOpen = false;
  return (
    <div className="layout">
      {/* nothing will happen */}
      <Button onClick={() => (isOpen = true)}>Open dialog </Button>
      {/* will never show up */}
      {isOpen ? <ModalDialog onClose={() => (isOpen = false)} /> : null}
    </div>
  );
};
```

> It just won't work. When the Button is clicked, the local isOpen variable will change. But the React lifecycle is not triggered, so the render output is never updated, and the ModalDialog will never show up.

[Interactive example and full code](https://advanced-react.com/examples/01/02)

> In the context of re-renders, whether props have changed or not on a component matters only in one case: if the said component is wrapped in the React.memo higher-order component. Then, and only then, will React stop its natural chain of re-renders and first check the props. If none of the props change, then re-renders will stop there. If even one single prop changes, they will continue as usual.

![use-memo](./img/use-memo.png)

> Preventing re-renders with memoization properly is a complicated topic with several caveats. Read about it in more detail in Chapter 5. Memoization with useMemo, useCallback and React.memo.

⬅️ **Back:📑 [Table of Contents](../../Readme.md)**

➡️ **Next Chapter: ⬇️ [Moving state down](./05-Moving-State-Down.md)**
