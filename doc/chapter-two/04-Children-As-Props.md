# Children as props

> While this pattern is cool and totally valid, there is one small problem with it: it looks weird. Passing the entire page content into some random props just feels... wrong for some reason. So, let's improve it.

> First of all, let's talk about the nature of props. Props are just an object that we pass as the first argument to our component function. Everything that we extract from it is a prop. Everything. In our Parent/Child code, if I rename the child prop to children , nothing will change: it will continue to work.

```Javascript

// before
const Parent = ({ child }) => {
    return child;
};

// after
const Parent = ({ children }) => {
    return children;
};

```

> And on the consumer side, the same situation: nothing changes.

```Javascript

// before
<Parent child={<Child />} />
// after
<Parent children={<Child />} />

```

> However, for children props, we have a special syntax in JSX . That nice nesting composition that we use all the time with HTML tags, we just never thought about it and paid attention to it:

```Javascript
<Parent>
<Child />
</Parent>

```

> This will work exactly the same way as if we were passing the children prop explicitly:

```Javascript

<Parent children={<Child />} />
// exactly the same as above
<Parent>
<Child />
</Parent>

```

> And will be represented as this object:

```Javascript

{
    type: Parent,
    props: {
        // element for Child here
        children: {
            type: Child,
            ...
        }
    }
}

```

> And it will have exactly the same performance benefits as passing Elements as props as well! Whatever is passed through props won't be affected by the state change of the component that receives those props. So we can re-write our App from this:

```Javascript

const App = () => {
    const slowComponents = (
        <>
            <VerySlowComponent />
            <BunchOfStuff />
            <OtherStuffAlsoComplicated />
        </>
    );

    return (
        <ScrollableWithMovingBlock
            content={slowComponents}
        />
    );
};

```

> To something much prettier and easier to understand:

```Javascript
const App = () => {
    return (
        <ScrollableWithMovingBlock>
            <VerySlowComponent />
            <BunchOfStuff />
            <OtherStuffAlsoComplicated />
        </ScrollableWithMovingBlock>
    );
};
```

> All we need to do in the ScrollableWithMovingBlock component is to rename the content prop to children , nothing else! Before:

```Javascript
const ScrollableWithMovingBlock = ({ content }) => {
    // .. the rest of the code
    return (
        <div>
            ...
            {content}
        </div>
    );
};
```

> After:

```Javascript
const ScrollableWithMovingBlock = ({ children }) => {
    // .. the rest of the code
    return (
        <div>
            ...
            {children}
        </div>
    );
};
```

> And here we go: implemented a very performant scrollable block in a very slow app using just a small composition trick.

[Interactive example and full code](https://advanced-react.com/examples/02/03)

⬅️ **Back:📑 [Table of Contents](../../Readme.md)**

➡️ **Next Chapter: [Key takeaways](./05-Key-Takeaways.md)**
