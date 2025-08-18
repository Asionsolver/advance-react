# Conditional rendering and performance

> One of the biggest concerns that sometimes arises with this pattern is the performance of it. Which is ironic, considering that in the previous chapter, we discussed how to use it to improve performance. So, what's going on?

> Imagine we render the component that accepts elements as props conditionally. Like our ModalDialog , that typically would be rendered only when the isDialogOpen variable is true:

```JavaScript
const App = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // when is this one going to be rendered?
    const footer = <Footer />;

    return isDialogOpen ? (
        <ModalDialog footer={footer} />
    ) : null;
};
```

> The question here, with which even very experienced developers sometimes struggle, is this: we declare our Footer before the dialog. While the dialog is still closed and won't be open for a while (or maybe never). Does this mean that the footer will always be rendered, even if the dialog is not on the screen? What about the performance implications? Won't this slow down the App component?

> Fortunately, we have nothing to worry about here. Remember, how in Chapter 2. Elements, children as props, and re-renders we discussed what an Element is? All we did when we declared the footer variable (footer = <Footer />) was create an Element, nothing more. From the React and code perspective, it's just an object that sits in memory quietly and does nothing. And creating objects is cheap (at least compared to rendering components).

> This Footer will actually be rendered only when it ends up in the return object of one of the components, not sooner. In our case, it will be the ModalDialog component. It doesn't matter that the <Footer /> element was created in the App . It's the ModalDialog that will take it and actually return it:

```JavaScript
const ModalDialog = ({ children, footer }) => {
    return (
        <div className="dialog">
            <div className="content">
                {children}
            </div>
            {/* Whatever is coming from footer prop is going to be
                    rendered only when this entire component renders */}
            {/* not sooner */}
            <div className="footer">
                {footer}
            </div>
        </div>
    );
};
```

> This is what makes routing patterns, like in one of the versions of React router, completely safe:

```JavaScript
const App = () => {
    return (
        <>
            <Route
                path="/some/path"
                element={<Page />}
            />
            <Route
                path="/other/path"
                element={<OtherPage />}
            />
        </>
    );
};
```

> There is no condition here, so it feels like the App owns and renders both <Page /> and <OtherPage /> at the same time. But it doesn't. It just creates small objects that describe those pages. The actual rendering will only happen when the path in one of the routes matches the URL and the element prop is actually returned from the Route component.

⬅️ **Back:📑 [Table of Contents](../../Readme.md)**

➡️ **Next Chapter: 🎨 [Default Values for The Elements From Props](./05-Default-Values-For-The-Elements-From-Props.md)**
