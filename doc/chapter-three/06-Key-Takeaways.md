# Key takeaways

> Before we move on to the Render Props pattern, let's remember:

- When a component renders another component, the configuration of which is controlled by props, we can pass the entire component element as a prop instead, leaving the configuration concerns to the consumer.

- When passing JSX elements as props, we can keep the code cleaner by creating the elements inline:

```Javascript
const Button = ({ icon }) => {
    return (
        <button>
            Submit {icon}
        </button>
    );
};

// large red Error icon
<Button
    icon={
        <Error
            color="red"
            size="large"
        />
    }
/>;
```

- If a component that has elements as props is rendered conditionally, then even if those elements are created outside of the condition, they will only be rendered when the conditional component is rendered.

- When elements passed as props are rendered conditionally, they are only rendered when the condition is met. Here's an example:

```Javascript
const App = () => {
    // footer will be rendered only when the dialog itself renders
    // after isDialogOpen is set to "true"
    const footer = <Footer />;

    return isDialogOpen ? (
        <ModalDialog footer={footer} />
    ) : null;
};
```

- If we need to provide default props to the element from props, we can use the cloneElement function for that.

- This pattern, however, is very fragile. It's too easy to make a mistake there, so use it only for very simple cases.

⬅️ **Back:📑 [Table of Contents](../../Readme.md)**
