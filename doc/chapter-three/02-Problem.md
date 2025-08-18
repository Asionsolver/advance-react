# The problem

> Imagine, for example, that you need to implement a Button component. One of the requirements is that the button should be able to show the "loading" icon on the right when it's used in the "loading" context. Quite a common pattern for data sending in forms.
>
> No problem! We can just implement the button and add the isLoading prop, based on which we'll render the icon.

```Javascript
const Button = ({ isLoading }) => {
    return (
        <button>
            Submit {isLoading ? <Loading /> : null}
        </button>
    );
};
```

> The next day, this button needs to support all available icons from your library, not only the Loading . Okay, we can add the iconName prop to the Button for that. The next day - people want to be able to control the color of that icon so that it aligns better with the color palette used on the website. The iconColor prop is added. Then iconSize , to control the size of the icon. And then, a use case appears for the button to support icons on the left side as well. And avatars.
>
> Eventually, half of the props on the Button are there just to control those icons, no one is able to understand what is happening inside, and every change results in some broken functionality for the customers.

```Javascript
const Button = ({
    isLoading,
    iconLeftName,
    iconLeftColor,
    iconLeftSize,
    isIconLeftAvatar,
    ...props
}) => {
    // no one knows what's happening here
    // and how all those props work
    return (
        // component implementation
    );
};
```

> Sounds familiar?

⬅️ **Back:📑 [Table of Contents](../../Readme.md)**

➡️ **Next Chapter: 🧩 [Elements as Props](./03-Elements-As-Props.md)**
