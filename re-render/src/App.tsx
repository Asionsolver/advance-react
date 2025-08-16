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

// TODO:The big re-renders myth

// import { Button } from "./components/button";
// import { ModalDialog } from "./components/modal-dialog";

// const App = () => {
//   // local variable won't work
//   let isOpen = false;
//   return (
//     <div className="layout">
//       {/* nothing will happen */}
//       <Button onClick={() => (isOpen = true)}>Open dialog </Button>
//       {/* will never show up */}
//       {isOpen ? <ModalDialog onClose={() => (isOpen = false)} /> : null}
//     </div>
//   );
// };
// export default App;

// ? optimize version
// import { BunchOfStuff, OtherStuffAlsoComplicated } from "./components/mocks";
// import { VerySlowComponent } from "./components/very-slow-component";
// import { ButtonWithModalDialog } from "./components/modal-dialog";

// const App = () => {
//   console.log("App component rendered");
//   return (
//     <>
//       {/* Optimize re-renders */}
//       <ButtonWithModalDialog />
//       <VerySlowComponent />
//       <BunchOfStuff />
//       <OtherStuffAlsoComplicated />
//     </>
//   );
// };

// export default App;

// ! The danger of custom hooks

// import { Button } from "./components/button";
// import { BunchOfStuff, OtherStuffAlsoComplicated } from "./components/mocks";
// import { ModalDialog } from "./components/modal-dialog";
// import { VerySlowComponent } from "./components/very-slow-component";
// import { useModalDialog } from "./hooks/useModalDialog";

// const App = () => {
//   // state is in the hook now
//   const { isOpen, open, close } = useModalDialog();
//   return (
//     <div className="layout">
//       {/* just use "open" method
// from the hook */}
//       <Button onClick={open}>Open dialog</Button>
//       {/* just use "close" method
// from the hook */}
//       {isOpen ? <ModalDialog onClose={close} /> : null}
//       <VerySlowComponent />
//       <BunchOfStuff />
//       <OtherStuffAlsoComplicated />
//     </div>
//   );
// };

// export default App;

// ? optimize re-renders with custom hooks
import { useEffect } from "react";
import { ButtonWithModalDialog } from "./components/modal-dialog";
import { VerySlowComponent } from "./components/very-slow-component";
import { BunchOfStuff, OtherStuffAlsoComplicated } from "./components/mocks";

export default function App() {
  useEffect(() => {
    console.info("Component that uses useModalDialog re-renders");
  });

  return (
    <>
      <ButtonWithModalDialog />
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </>
  );
}
