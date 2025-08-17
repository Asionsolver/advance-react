# The problem

> Imagine again that you've inherited a large, complicated, and very performance-sensitive app. And that app has a scrollable content area. Probably some fancy layout with a sticky header, a collapsible sidebar on the left, and the rest of the functionality in the middle.

> The code for that main scrollable area looks something like this:

```Javascript
const App = () => {
  return (
    <div className="scrollable-block">
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </div>
  );
};

```

> Just a div with a className and CSS overflow: auto underneath. And lots of very slow components inside that div. On your very first day on the job, you're asked to implement a very creative feature: a block that shows up at the bottom of the area when a user scrolls for a bit and slowly moves to the top as the user continues to scroll down. Or slowly moves down and disappears if the user scrolls up. Something like a secondary navigation block with some useful links. And, of course, the scrolling and everything associated with it should be smooth and lag-free.

> The simplest way to implement these requirements would be to attach an onScroll handler to the scrollable div, capture the scrolled value, and calculate the position of the floating div based on that:

```Javascript
const MainScrollableArea = () => {
    const [position, setPosition] = useState(300);
    const onScroll = (e) => {
      // calculate position based on the scrolled value
      const calculated = getPosition(e.target.scrollTop);
      // save it to state
      setPosition(calculated);
    };
    return (
      <div className="scrollable-block" onScroll={onScroll}>
        {/* pass position value to the new movable component */}
        <MovingBlock position={position} />
        <VerySlowComponent />
        <BunchOfStuff />
        <OtherStuffAlsoComplicated />
      </div>
    );
};

```

[Interactive example and full code](https://advanced-react.com/examples/02/01)

> However, from the performance and re-renders perspective, this is far from optimal. Every scroll will trigger a state update, and as we already know, the state update will trigger a re-render of the App component and every nested component inside. So all the very slow bunch of stuff will re-render, and the scrolling experience will be slow and laggy. Exactly the opposite of what we need.

> And as you can see, we can't just easily extract that state into a component anymore. The setPosition is used in the onScroll function, which is attached to the div that wraps everything.

> So, what to do here? Memoization or some magic with passing Ref around? Not necessarily! As before, there's a simpler option. We can still extract that state and everything needed for the state to work into a component:

```Javascript

const ScrollableWithMovingBlock = () => {
    const [position, setPosition] = useState(300);

    const onScroll = (e) => {
        const calculated = getPosition(e.target.scrollTop);
        setPosition(calculated);
    };

    return (
        <div className="scrollable-block" onScroll={onScroll}>
            <MovingBlock position={position} />
            {/* slow bunch of stuff used to be here, but not anymore */}
        </div>
    );
};

```

> And then just pass that slow bunch of stuff to that component as props. Something like this:

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
        <ScrollableWithMovingBlock content={slowComponents} />
    );
};

```

> Just create a "content" property in our ScrollableWithMovingBlock component that accepts React Elements (more details about those a bit later). And then, inside ScrollableWithMovingBlock , accept that prop and put it where it was supposed to render:

```Javascript

// add "content" property to the component
const ScrollableWithMovingBlock = ({ content }) => {
    const [position, setPosition] = useState(0);
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

> Now, onto the state update and re-renders situation. If a state update is triggered, we will once again trigger a re-render of a component, as usual. However, in this case, it will be the ScrollableWithMovingBlock component - just a div with a movable block. The rest of the slow components are passed through props, they are outside of that component. In the "hierarchical" components tree, they belong to the parent. And remember? React never goes "up" that tree when it re-renders a component. So our slow components won't re-render when the state is updated, and the scrolling experience will be smooth and lag-free.

[Interactive example and full code](https://advanced-react.com/examples/02/02)

> Wait a second, some might think here. This doesn't make much sense. Yes, those components are declared in the parent, but they are still rendered inside that component with the state. So why don't they re-render? It's actually a very reasonable question.

> To make sense of all of this, we need to understand a few things: what we actually mean by "re-render" in React, what the difference is between an Element and a Component, and the basics of the reconciliation and diffing algorithms.

⬅️ **Back:📑 [Table of Contents](../../Readme.md)**

➡️ **Next Chapter: [Elements, Components, and re-renders](./03-Elements-Components-Re-renders.md)**

```

```
