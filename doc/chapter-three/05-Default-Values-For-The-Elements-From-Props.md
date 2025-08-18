# Default values for the elements from props

> Let's talk about our button and its icons a little bit more.

> One of the objections against passing those icons as props is that this pattern is too flexible. It's okay for the ThreeColumnsLayout component to accept anything in the leftColumn prop. But in the Button's case, we don't really want to pass everything there. In the real world, the Button would need to have some degree of control over the icons. If the button has the isDisabled property, you'd likely want the icon to appear "disabled" as well. Bigger buttons would want bigger icons by default. Blue buttons would want white icons by default, and white buttons would want black icons.

> However, if we leave the implementation as it is now, this will be problematic: it will be up to the Button 's consumers to remember all that.

```Javascript
// primary button should have white icons
<Button
    appearance="primary"
    icon={<Loading color="white" />}
/>

// secondary button should have black icons
<Button
    appearance="secondary"
    icon={<Loading color="black" />}
/>

// large button should have large icons
<Button
    size="large"
    icon={<Loading size="large" />}
/>
```

> Half of the time, it will be forgotten, and the other half misunderstood. What we need here is to assign some default values to those icons that the Button can control while still preserving the flexibility of the pattern.

> Luckily, we can do exactly that. Remember that these icons in props are just objects with known and predictable shapes. And React has APIs that allow us to operate on them easily. In our case, we can clone the icon in the Button with the help of the React.cloneElement function[2] , and assign any props to that new element that we want. So nothing stops us from creating some default icon props, merging them together with the props coming from the original icon, and assigning them to the cloned icon:

```Javascript
const Button = ({ appearance, size, icon }) => {
    // create default props
    const defaultIconProps = {
        size: size === 'large' ? 'large' : 'medium',
        color: appearance === 'primary' ? 'white' : 'black',
    };

    const newProps = {
        ...defaultIconProps,
        // make sure that props that are coming from the icon override default if they exist
        ...icon.props,
    };

    // clone the icon and assign new props to it
    const clonedIcon = React.cloneElement(icon, newProps);

    return (
        <button>
            Submit {clonedIcon}
        </button>
    );
};
```

> And now, all of our Button with icon examples will be reduced to just this:

```Javascript
// primary button will have white icons
<Button
    appearance="primary"
    icon={<Loading />}
/>

// secondary button will have black icons
<Button
    appearance="secondary"
    icon={<Loading />}
/>

// large button will have large icons
<Button
    size="large"
    icon={<Loading />}
/>
```

[Interactive example and full code](https://advanced-react.com/examples/03/05)

> No additional props on any of the icons, just the default props that are controlled by the button now! And then, if someone really needs to override the default value, they can still do it: by passing the prop as usual.

```Javascript
// override the default black color with red icons
<Button
    appearance="secondary"
    icon={<Loading color="red" />}
/>
```

> In fact, consumers of the Button won't even know about the default props.For them, the icon will just work like magic.

## Why we shouldn't go crazy with default values

> Speaking of magic: the fact that setting default values works seemingly magically can be a big downside. The biggest problem here is that it's way too easy to make a mistake and override the props for good. If, for example, I don't override the default props with the actual props and just assign them right away:

```Javascript
const Button = ({ appearance, size, icon }) => {
    // create default props
    const defaultIconProps = {
        size: size === 'large' ? 'large' : 'medium',
        color: appearance === 'primary' ? 'white' : 'black',
    };

    // clone the icon and assign the default props to it - don't do that!
    // it will override all the props that are passed to the icon from the outside!
    const clonedIcon = React.cloneElement(icon, defaultIconProps);

    return <button>Submit {clonedIcon}</button>;
};
```

> I will basically destroy the icon's API. People will try to pass different sizes or colors to it, but it will never reach the target:

```Javascript
// color "red" won't work here - I never passed those props to the cloned icon
<Button
    appearance="secondary"
    icon={<Loading color="red" />}
/>

// but if I just render this icon outside the button, it will work
<Loading color="red" />
```

[Interactive example and full code](https://advanced-react.com/examples/03/06)

> Good luck to anyone trying to understand why setting the color of the icon outside of the button works perfectly, but doesn't work if the icon is passed as this prop.

> So be very careful with this pattern, and make sure you always override the default props with the actual props. And if you feel uneasy about it - no worries. In React, there are a million ways to achieve exactly the same result. There is another pattern that can be very helpful for this case: render props. It can also be very helpful if you need to calculate the icon's props based on the button's state or just plainly pass that state back to the icon. The next chapter is all about this pattern.

⬅️ **Back:📑 [Table of Contents](../../Readme.md)**

➡️ **Next Chapter: 🎯 [Key takeaways](./06-Key-Takeaways.md)**
