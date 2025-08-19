# Sharing stateful logic: children as render props

> Another useful application for render props is sharing stateful logic between components, and it usually goes in combination with the "children as props" pattern. As discussed in the previous chapter, "children," when used as HTML-like nested syntax, are nothing more than a prop:

```Javascript
<Parent>
    <Child />
</Parent>

// exactly the same as above
<Parent children={<Child />} />
```

> So nothing actually stops us from making children a function as well. We don't even have to prefix it with render . renderSomething is just a naming convention. It would look like this:

```Javascript
// make it a function
<Parent children={() => <Child />} />
```

> And in Parent , you'd call it like any other render prop:

```Javascript
const Parent = ({ children }) => {
    // it's just a function that returns an element, just call it here
    return children();
};
```

> The pretty nested syntax will work with this as well:

```Javascript
<Parent>
    {() => <Child />}
</Parent>
```

[Interactive example and full code](https://advanced-react.com/examples/04/03)

> Why can it be useful? Imagine, for example, you're implementing a "resize detector" component. A component that tracks the resize event on the browser window:

```Javascript
const ResizeDetector = () => {
    const [width, setWidth] = useState();

    useEffect(() => {
        const listener = () => {
            const width = window.innerWidth;
            setWidth(width);
        }
        window.addEventListener("resize", listener);
        // the rest of the code
    }, [])
    return ...
}
```

> And you want to make it generic so that different components throughout the app can track the window width without implementing that code everywhere. So ResizeDetector needs to share that state with other components somehow. Technically, we could do this through props, just by adding the onWidthChange prop to the detector:

```Javascript
const ResizeDetector = ({ onWidthChange }) => {
    const [width, setWidth] = useState();

    useEffect(() => {
        const listener = () => {
            const width = window.innerWidth;
            setWidth(width);
            // trigger onWidthChange prop here
            onWidthChange(width);
        }
        window.addEventListener("resize", listener);
        // the rest of the code
    }, [])
    return ...
}
```

> But this would mean that any component that wants to use it would have to maintain its own state for it:

```Javascript
const Layout = () => {
    const [windowWidth, setWindowWidth] = useState(0);

    return (
        <>
            <ResizeDetector onWindowWidth={setWindowWidth} />
            {windowWidth > 600 ? (
                <WideLayout />
            ) : (
                <NarrowLayout />
            )}
        </>
    );
};
```

> A bit messy. What we can do instead is just make ResizeDetector accept children as a function and pass that width to children directly:

```Javascript
const ResizeDetector = ({ children }) => {
    const [width, setWidth] = useState();
    // same code as before
    // pass width to children
    return children(width);
};
```

> Then, any component that needs that width can just use it without introducing unnecessary state for it:

```Javascript
const Layout = () => {
    return (
        <ResizeDetector>
            {(windowWidth) => {
                // no more state! Get it directly from the resizer
                return windowWidth > 600
                    ? <WideLayout />
                    : <NarrowLayout />;
            }}
        </ResizeDetector>
    );
};
```

[Interactive example and full code](https://advanced-react.com/examples/04/04)

> In real life, of course, we'd have a re-renders problem here: we're triggering state updates on every width change. So we'd have to either calculate the layout inside the detector or debounce it. But the principle of sharing state will remain the same.

> Also, in modern code, we probably wouldn't use this at all because…

⬅️ **Back:📑 [Table of Contents](../../Readme.md)**

➡️ **Next Chapter: 🪝 [Hooks replaced render props](./05-Hooks-Replaced-Render-Props.md)**
