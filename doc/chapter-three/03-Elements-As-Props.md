# Elements as props

> Luckily, there is an easy way to drastically improve this situation. All we need to do is to get rid of those configuration props and pass the icon as an Element instead:

```Javascript
const Button = ({ icon }) => {
    return <button>Submit {icon}</button>;
};
```

> And then leave it to the consumer to configure that icon in whatever way they want:

```Javascript
// default Loading icon
<Button icon={<Loading />} />

// red Error icon
<Button icon={<Error color="red" />} />

// yellow large Warning icon
<Button icon={<Warning color="yellow" size="large" />} />

// avatar instead of icon
<Button icon={<Avatar />} />
```

[Interactive example and full code](https://advanced-react.com/examples/03/01)

> Whether doing something like this for a Button is a good idea or not is sometimes debatable, of course. It highly depends on how strict your design is and how much deviation it allows for those who implement product features.

> But imagine implementing something like a modal dialog with a header, content area, and footer with some buttons.

> Unless your designers are very strict and powerful, chances are you'd need to have different configurations of those buttons in different dialogs: one, two, three buttons, one button is a link, one button is "primary," different texts on those of course, different icons, different tooltips, etc. Imagine passing all of that through configuration props!

> But with elements as props, it couldn't be easier: just create a footer prop on the dialog

```Javascript
const ModalDialog = ({ content, footer }) => {
    return (
        <div className="modal-dialog">
            <div className="content">
                {content}
            </div>
            <div className="footer">
                {footer}
            </div>
        </div>
    );
};
```

> and then pass whatever is needed:

```Javascript
// just one button in footer
<ModalDialog
    content={<SomeFormHere />}
    footer={<SubmitButton />}
/>

// two buttons
<ModalDialog
    content={<SomeFormHere />}
    footer={
        <>
            <SubmitButton />
            <CancelButton />
        </>
    }
/>
```

[Interactive example and full code](https://advanced-react.com/examples/03/02)

> Or something like a ThreeColumnsLayout component, which renders three columns with some content on the screen. In this case, you can't even do any configuration: it literally can and should render anything in those columns.

```Javascript
<ThreeColumnsLayout
    leftColumn={<Something />}
    middleColumn={<OtherThing />}
    rightColumn={<SomethingElse />}
/>
```

[Interactive example and full code](https://advanced-react.com/examples/03/03)

> Essentially, an element as a prop for a component is a way to tell the consumer: give me whatever you want, I don't know or care what it is, I am just responsible for putting it in the right place. The rest is up to you. And, of course, the "children" as props pattern, described in the previous chapter, is very useful here as well. If we want to pass something that we consider a "main" part of that component, like the "content" area in the modal dialog, or the middle column in the three columns layout, we can just use the nested syntax for that:

```Javascript
// before
<ModalDialog
    content={<SomeFormHere />}
    footer={<SubmitButton />}
/>

// after
<ModalDialog
    footer={<SubmitButton />}
>
    <SomeFormHere />
</ModalDialog>
```

> All we need to do, from the ModalDialog perspective, is to rename the "content" prop to "children":

```Javascript
const ModalDialog = ({ children, footer }) => {
    return (
        <div className="dialog">
            <div className="content">
                {children}
            </div>
            <div className="footer">
                {footer}
            </div>
        </div>
    );
};
```

[Interactive example and full code](https://advanced-react.com/examples/03/04)

> Always remember: "children" in this context are nothing more than a prop, and the "nested" syntax is just syntax sugar for it!

⬅️ **Back:📑 [Table of Contents](../../Readme.md)**

➡️ **Next Chapter: 🔀 [Conditional Rendering and Performance](./04-Conditional-Rendering-And-Performance.md)**
