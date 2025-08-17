# The problem

> Imagine yourself as a developer who inherited a large, complicated, and very performance-sensitive app. Lots of things are happening there, many people have worked on it over the years, millions of customers are using it now. As your first task on the job, you are asked to add a simple button that opens a modal dialog right at the top of this app. You look at the code and find the place where the dialog should be triggered:

```javascript
const App = () => {
  // lots of code here
  return (
    <div className="layout">
      {/* button should go somewhere
here */}
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </div>
  );
};
```

> Then you implement it. The task seems trivial. We've all done it hundreds of times:

```javascript
const App = () => {
  // add some state
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="layout">
      {/* add the button */}
      <Button onClick={() => setIsOpen(true)}>Open dialog </Button>
      {/* add the dialog itself */}
      {isOpen ? <ModalDialog onClose={() => setIsOpen(false)} /> : null}
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </div>
  );
};
```

> Just add some state that holds whether the dialog is open or closed. Add the button that triggers the state update on click. And the dialog itself that is rendered if the state variable is true .
> You start the app, try it out - and oops. It takes almost a second to open that simple dialog!

[Interactive example and full code](https://advanced-react.com/examples/01/01)

> People experienced with dealing with React performance might be tempted to say something like: "Ah, of course! You're re-rendering the whole app there, you just need to wrap everything in React.memo and use useCallback hooks to prevent it." And technically this is true. But don't rush. Memoization is completely unnecessary here and will do more harm than good. There is a more efficient way.
> But first, let's review what exactly is happening here and why.

⬅️ **Back:📑 [Table of Contents](../../Readme.md)**
</br>
➡️ **Next Chapter: 🔄 [State update, nested components, and re-renders](./03-State-Update-Nested-Components-And-Re-Renders.md)**
