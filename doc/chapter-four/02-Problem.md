# The problem

> Here is the Button component that we implemented in the previous chapter:

```Javascript
const Button = ({ appearance, size, icon }) => {
    // create default props
    const defaultIconProps = {
        size: size === 'large' ? 'large' : 'medium',
        color: appearance === 'primary' ? 'white' : 'black'
    };

    const newProps = {
        ...defaultIconProps,
        // make sure that props that are coming from the icon override default if they exist
        ...icon.props,
    };

    // clone the icon and assign new props to it
    const clonedIcon = React.cloneElement(icon, newProps);

    return (
        <button className={`button ${appearance}`}>
            Submit {clonedIcon}
        </button>
    );
};
```

> The Button accepts an icon Element and sets its size and color props by default.

> While this approach works pretty well for simple cases, it is not that good for something more complicated. What if I want to introduce some state to the Button and give Button 's consumers access to that state? Like adjusting the icon while the button is hovered, for example? It's easy enough to implement that state in the button:

```Javascript
const Button = ({ ... }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
        />
    );
};
```

> But then what? How do we share it with the icon?

> Another problem with this approach is that we're making some major assumptions about the Element that comes through the icon prop. We expect it to have at least size and color props. What if we wanted to use a different library for icons, and those icons didn't have those exact props? Our default props logic will just stop working with no way of fixing it.

⬅️ **Back:📑 [Table of Contents](../../Readme.md)**

➡️ **Next Chapter: 🔧 [Render props for rendering Elements](./03-Render-Props-For-Rendering-Elements.md)**
