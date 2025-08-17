# Elements, Components, and re-renders

> First of all, a Component - what is it? Here's the simplest one:

```Javascript

const Parent = () => {
    return <Child />;
};

```

> As you can see, it's just a function. What makes a component different from any other function is that it returns Elements, which React then converts into DOM elements and sends to the browser to be drawn on the screen. If it has props, those would be just the first argument of that function:

```Javascript

const Parent = (props) => {
    return <Child />;
};

```

> This function returns <Child /> , which is an Element of a Child Component. Every time we use those brackets on a component, we create an Element. The Element of the Parent component would be <Parent /> .

> An Element is simply an object that defines a component that needs to be rendered on the screen. In fact, the nice HTML-like syntax is nothing more than syntax sugar for the React.createElement function[1] . We can even replace that element with this: React.createElement(Child, null, null) and everything will work as expected.

> The object definition for our <Child /> element would look something like this:

```Javascript

{
    type: Child,
    props: {}, // if Child had props
    ... // lots of other internal React stuff
}

```

> This tells us that the Parent component, which returns that definition, wants us to render the Child component with no props. The return of the Child component will have its own definitions, and so on, until we reach the end of that chain of components.

> Elements are not limited to components; they can be just normal DOM elements. Our Child could return an h1 tag, for example:

```Javascript

const Child = () => {
    return <h1>Some title</h1>;
};

```

> In this case, the definition object will be exactly the same and behave the same, only the type will be a string:

```Javascript

{
    type: "h1",
    ... // lots of other internal React stuff
}

```

> Now to re-render. What we usually refer to as "re-render" is React calling those functions and executing everything that needs to be executed in the process (like hooks). From the return of those functions, React builds a tree of those objects. We know it as the Fiber Tree now, or Virtual DOM sometimes. In fact, it's even two trees: before and after re-render. By comparing ("diffing") those, React will then extract information that goes to the browser: which DOM elements need to be updated, removed, or added. This is known as the "reconciliation" algorithm.

> The part that matters for this chapter's problem is this: if the object (Element) before and after re-render is exactly the same, then React will skip the re-render of the Component this Element represents and its nested components. And by "exactly the same," I mean whether Object.is(ElementBeforeRerender, ElementAfterRerender) returns true . React doesn't perform the deep comparison of objects. If the result of this comparison is true , then React will leave that component in peace and move on to the next one.

> If the comparison returns false , this is the signal to React that something has changed. It will look at the type then. If the type is the same, then React will re-render this component. If the type changes, then it will remove the "old" component and mount the "new" one. We'll take a look at it in more detail in Chapter 6. Deep dive into diffing and reconciliation.

> Let's take a look at the Parent/Child example again and imagine our Parent has state:

```Javascript

const Parent = (props) => {
    const [state, setState] = useState();
    return <Child />;
};

```

> When setState is called, React will know to re-render the Parent component. So it will call the Parent function and compare whatever it returns before and after state changes. And it returns an object that is defined locally to the Parent function. So on every function call (i.e. re-render), this object will be re-created, and the result of Object.is on "before" and "after" <Child /> objects will be false . As a result, every time the Parent here re-renders, the Child will also re-render. Which we already know, but it's nice to have proof of this, isn't it?

> Now, imagine what will happen here if, instead of rendering that Child component directly, I would pass it as a prop?

```Javascript

const Parent = ({ child }) => {
    const [state, setState] = useState();
    return child;
};

// someone somewhere renders Parent component like this
<Parent child={<Child />} />;

```

> Somewhere, where the Parent component is rendered, the <Child /> definition object is created and passed to it as the child prop. When the state update in Parent is triggered, React will compare what the Parent function returns "before" and "after" state change. And in this case, it will be a reference to the child : an object that is created outside of the Parent function scope and therefore doesn't change when it's called. As a result, the comparison of child "before" and "after" will return true , and React will skip the re-render of this component.

> And this is exactly what we did for our component with the scroll!

```Javascript

const ScrollableWithMovingBlock = ({ content }) => {
    const [position, setPosition] = useState(300);

    const onScroll = () => {
        // same as before
    };

    return (
        <div className="scrollable-block" onScroll={onScroll}>
            <MovingBlock position={position} />
            {content}
        </div>
    );
};


```

> When setPosition in ScrollableWithMovingBlock is triggered, and re-render happens, React will compare all those object definitions that the function returns, will see that the content object is exactly the same before and after, and will skip the re-render of whatever is there. In our case - a bunch of very slow components.

> <MovingBlock ... /> , however, will re-render: it's created inside ScrollableWithMovingBlock . The object will be re-created on every re-render, and the comparison "before" and "after" will return false .

⬅️ **Back:📑 [Table of Contents](../../Readme.md)**

➡️ **Next Chapter: [Children as props](./04-Children-As-Props.md)**
