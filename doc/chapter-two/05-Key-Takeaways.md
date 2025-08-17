# Key takeaways

Hope this made sense and you're now confident with the "components as props" and "children as props" patterns. In the next chapter, we'll take a look at how components as props can be useful outside of performance. In the meantime, here are a few things to remember:

- **Component Definition**: A Component is just a function that accepts an argument (props) and returns Elements that should be rendered when this Component renders on the screen. For example: `const A = () => <B />` is a Component.

- **Element Definition**: An Element is an object that describes what needs to be rendered on the screen, with the type either being a string for DOM elements or a reference to a Component for components. For example: `const b = <B />` is an Element.

- **Re-rendering**: Re-render is simply React calling the Component's function.

- **Component Re-render Trigger**: A component re-renders when its element object changes, as determined by `Object.is` comparison of it before and after re-render.

- **Props and Re-rendering**: When elements are passed as props to a component, and this component triggers a re-render through a state update, elements that are passed as props won't re-render.

- **Children Props**: "children" are just props and behave like any other prop when they are passed via JSX nesting syntax:

```javascript
<Parent>
    <Child />
</Parent>

// is equivalent to:
<Parent children={<Child />} />
```

⬅️ **Back:📑 [Table of Contents](../../Readme.md)**
