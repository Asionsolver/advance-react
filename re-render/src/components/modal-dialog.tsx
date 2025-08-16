// ! v01: Basic modal dialog without Custom Hook
// import { useState } from "react";
// import { Button } from "./button";

// type BasicModalDialogProps = {
//   onClose: () => void;
// };

// export const ModalDialog = ({ onClose }: BasicModalDialogProps) => {
//   console.log("ModalDialog component rendered");
//   return (
//     <div className=" fixed top-7.5 left-[50%] ml-[-15rem] w-[30rem] bg-white border border-gray-500 rounded-[10px] shadow-lg">
//       <div className="content px-4 py-8">modal content</div>
//       <div className=" p-4 bg-gray-300 border-t border-gray-500 rounded-bl-[10px] rounded-br-[10px]">
//         <Button onClick={onClose}>close dialog</Button>
//       </div>
//     </div>
//   );
// };

// export const ButtonWithModalDialog = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   console.log("ButtonWithModalDialog component rendered");
//   return (
//     <>
//       <Button onClick={() => setIsOpen(true)}>Open dialog </Button>
//       {isOpen ? <ModalDialog onClose={() => setIsOpen(false)} /> : null}
//     </>
//   );
// };

// ! v02: Modal dialog with Custom Hook

import { Button } from "./button";
import { useModalDialog } from "../hooks/useModalDialog";

type BasicModalDialogProps = {
  onClose: () => void;
};

export const ModalDialog = ({ onClose }: BasicModalDialogProps) => {
  console.log("ModalDialog component rendered");
  return (
    <div className=" fixed top-7.5 left-[50%] ml-[-15rem] w-[30rem] bg-white border border-gray-500 rounded-[10px] shadow-lg">
      <div className="content px-4 py-8">modal content</div>
      <div className=" p-4 bg-gray-300 border-t border-gray-500 rounded-bl-[10px] rounded-br-[10px]">
        <Button onClick={onClose}>close dialog</Button>
      </div>
    </div>
  );
};

export const ButtonWithModalDialog = () => {
  const { isOpen, open, close } = useModalDialog();
  // render only Button and ModalDialog here
  return (
    <>
      <Button onClick={open}>Open dialog</Button>
      {isOpen ? <ModalDialog onClose={close} /> : null}
    </>
  );
};
