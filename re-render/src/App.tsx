import { useState } from "react";
import { BunchOfStuff, OtherStuffAlsoComplicated } from "./components/mocks";
import { VerySlowComponent } from "./components/very-slow-component";
import { Button } from "./components/Button";
import { ModalDialog } from "./components/modal-dialog";

const App = () => {
  //add some state
  const [isOpen, setOpen] = useState(false);
  console.log("App component rendered");
  return (
    <>
      {/* Add the button */}
      <Button onClick={() => setOpen(!isOpen)}>Open Dialog</Button>

      {isOpen ? <ModalDialog onClose={() => setOpen(false)} /> : null}
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </>
  );
};

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
export default App;
