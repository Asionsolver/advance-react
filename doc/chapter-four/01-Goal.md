# Goal

> In the previous chapter, we talked about flexibility, component configuration, how to pass elements as props to solve that, and how to set default values on those. But elements as props, however great they are, don't solve everything for us. If a component that accepts other components
> through props needs to influence their props or pass some state to them in some explicit non-magical way, then elements as props and the cloneElement function are no help here.

> This is where the pattern known as "render props" comes in handy. In this chapter, you'll learn:

- What the render props pattern is and what kind of configuration concerns it solves, but elements as props can't.
- How to share stateful logic with render props and how children as
  render props look like.
- Why we shouldn't actually do that these days, now that we have hooks.
- When the render props for sharing logic pattern can still be useful, even in the hooks era.

⬅️ **Back:📑 [Table of Contents](../../Readme.md)**

➡️ **Next Chapter: 💼 [Problem](./02-Problem.md)**
