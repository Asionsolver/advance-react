# The danger of custom hooks

> Another very important concept that we should not forget when dealing with state, re-renders, and performance is custom hooks. After all, they were introduced exactly so that we could abstract away stateful logic. It's very common to see logic like the one we had above extracted into something like the useModalDialog hook. A simplified version could look like this:

```javascript
const useModalDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
};
```

> And then use this hook in our App instead of setting state directly:

```javascript
const App = () => {
  // state is in the hook now
  const { isOpen, open, close } = useModalDialog();
  return (
    <div className="layout">
      {/* just use "open" method
from the hook */}
      <Button onClick={open}>Open dialog</Button>
      {/* just use "close" method
from the hook */}
      {isOpen ? <ModalDialog onClose={close} /> : null}
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </div>
  );
};
```

> Why did I call this "the danger"? It seems like a reasonable pattern, and the code is slightly cleaner. Because the hook hides the fact that we have state in the app. But the state is still there! Every time it changes, it will still trigger a re-render of the component that uses this hook. It doesn't even matter whether this state is used in the App directly or even whether the hook returns anything.

[Interactive example and full code](https://advanced-react.com/examples/01/04)

> If, for example, I want to be fancy with this dialog's positioning and introduce some state inside that hook that listens for the window's resize:

```javascript
const useModalDialog = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const listener = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', listener);
    return () =>
      window.removeEventListener('resize', listener);
  }, []);
  // return is the same
  return ...
}

```

> The entire App component will re-render on every resize, even though this value is not even returned from the hook!

[Interactive example and full code](https://advanced-react.com/examples/01/05)

> Hooks are essentially just pockets in your trousers. If, instead of carrying a 10-kilogram dumbbell in your hands, you put it in your pocket, it wouldn't change the fact that it's still hard to run: you have 10 kilograms of additional weight on your person. But if you put that ten kilograms in a self-driving trolley, you can run around freely and fresh and maybe even stop for coffee: the trolley will take care of itself. Components for the state are that trolley.

> Exactly the same logic applies to the hooks that use other hooks: anything that can trigger a re-render, however deep in the chain of hooks it's happening, will trigger a re-render in the component that uses that very first hook. If I extract that additional state into a hook that returns null , App will still re-render on every resize:

```javascript
const useResizeDetector = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const listener = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, []);
  return null;
}
const useModalDialog = () => {
  // I don't even use it, just
  call it here
  useResizeDetector();
  // return is the same
  return {
   ...
  };
}
const useModalDialog = () => {
// I don't even use it, just call it here
useResizeDetector();
// return is the same
return {
 ...
};
}
const App = () => {
// this hook uses useResizeDetector underneath that triggers state update on resize
// the entire App will re-render on every resize!
const { isOpen, open, close } = useModalDialog();
return // same return
}
```

[Interactive example and full code](https://advanced-react.com/examples/01/06)

> So, be careful with those.
> In order to fix our app, you'd still need to extract that button,dialog, and the custom hook into a component:

```javascript
const ButtonWithModalDialog = () => {
  const { isOpen, open, close } = useModalDialog();
  // render only Button and
  ModalDialog here
  return (
    <>
      <Button onClick={open}>Open dialog</Button>
      {isOpen ? <ModalDialog onClose={close} /> : null}
    </>
  );
};
```

[Interactive example and full code](https://advanced-react.com/examples/01/07)

> So, where you put state is very important. Ideally, to avoid future performance problems, you'd want to isolate it as much as possible to as tiny and light components as possible. In the next chapter (Chapter 2. Elements, children as props, and re-renders), we'll take a look at another pattern that helps with exactly that.

⬅️ **Back:📑 [Table of Contents](../../Readme.md)**

➡️ **Next Chapter: 🎯 [Key takeaways](./07-Key-Takeaways.md)**
