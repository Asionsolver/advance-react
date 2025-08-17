// ! re-render issue. Because whenever we scroll the page component will re-render.
// import { useState } from "react";
// import { BunchOfStuff, OtherStuffAlsoComplicated } from "./components/mocks";
// import { VerySlowComponent } from "./components/very-slow-component";
// import { getPosition } from "./utils";
// import { MovingBlock } from "./components/moving-block";

// function App() {
//   const [position, setPosition] = useState(300);
//   console.log(position);
//   const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
//     const target = e.target as HTMLDivElement; // 👈 Type Assertion
//     // calculate position base on the scrolled value
//     const calculated = getPosition(target.scrollTop);
//     setPosition(calculated);
//   };
//   return (
//     <div className="scrollable-block" onScroll={onScroll}>
//       <MovingBlock position={position} />
//       <VerySlowComponent />
//       <BunchOfStuff />
//       <OtherStuffAlsoComplicated />
//     </div>
//   );
// }

// export default App;

// ! This is the fixed version that prevents unnecessary re-renders.
// ! By moving the slow components into a separate component and passing them as children,
// ! they won't re-render when the scroll position changes.
import { useState } from "react";
import { BunchOfStuff, OtherStuffAlsoComplicated } from "./components/mocks";
import { VerySlowComponent } from "./components/very-slow-component";
import { getPosition } from "./utils";
import { MovingBlock } from "./components/moving-block";

const ScrollableWithMovingBlock = ({
  content,
}: {
  content: React.ReactNode;
}) => {
  const [position, setPosition] = useState(300);
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const calculated = getPosition(target.scrollTop);
    setPosition(calculated);
  };
  return (
    <div className="scrollable-block" onScroll={onScroll}>
      <MovingBlock position={position} />
      {content}
    </div>
  );
};

function App() {
  const slowComponents = (
    <>
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </>
  );
  return <ScrollableWithMovingBlock content={slowComponents} />;
}

export default App;
