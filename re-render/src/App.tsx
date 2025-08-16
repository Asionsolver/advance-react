// ! not-optimize version
// import { BunchOfStuff, OtherStuffAlsoComplicated } from "./components/mocks";
// import { VerySlowComponent } from "./components/very-slow-component";
// import { ModalDialog } from "./components/modal-dialog";
// import { useState } from "react";
// import { Button } from "./components/button";

// const App = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   console.log("App component rendered");
//   return (
//     <>
//       {/* add the button */}
//       <Button onClick={() => setIsOpen(true)}>Open dialog</Button>
//       {/* add the dialog itself */}
//       {isOpen ? <ModalDialog onClose={() => setIsOpen(false)} /> : null}
//       <VerySlowComponent />
//       <BunchOfStuff />
//       <OtherStuffAlsoComplicated />
//     </>
//   );
// };

// export default App;

// ? optimize version
import { BunchOfStuff, OtherStuffAlsoComplicated } from "./components/mocks";
import { VerySlowComponent } from "./components/very-slow-component";
import { ButtonWithModalDialog } from "./components/modal-dialog";

const App = () => {
  console.log("App component rendered");
  return (
    <>
      {/* Optimize re-renders */}
      <ButtonWithModalDialog />
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </>
  );
};

export default App;
