# Key takeaways

> Hope all of this makes sense and the pattern is as clear as day now. A few things to remember from this chapter:

- If a component that has elements as props wants to have control over the props of those elements or pass state to them, you'll need to convert those elements into render props:

```Javascript
const Button = ({ renderIcon }) => {
    const [someState, setSomeState] = useState();
    const someProps = { ... };

    return (
        <button>
            Submit
            {renderIcon(someProps, someState)}
        </button>
    );
};

<Button
    renderIcon={(props, state) => (
        <IconComponent {...props} someProps={state} />
    )}
/>
```

> Children also can be render props, including "nesting" syntax.

```Javascript
const Parent = ({ children }) => {
    return children(somedata);
};
```

- Render props were very useful when we needed to share stateful logic between components without lifting it up.
- But hooks replaced that use case in 99% of cases.
- Render props for sharing stateful logic and data can still be useful even today, for example, when this logic is attached to a DOM element.

⬅️ **Back:📑 [Table of Contents](../../Readme.md)**
