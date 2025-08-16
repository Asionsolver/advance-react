// vO1
// export const useModalDialog = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   return {
//     isOpen,
//     open: () => setIsOpen(true),
//     close: () => setIsOpen(false),
//   };
// };

// vO2
// ! not isolated
// import { useEffect, useState } from "react";
// export const useModalDialog = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [width, setWidth] = useState(0);

//   useEffect(() => {
//     const listener = () => {
//       setWidth(window.outerWidth);
//     };

//     window.addEventListener("resize", listener);

//     return () => window.removeEventListener("resize", listener);
//   }, []);

//   return {
//     isOpen,
//     open: () => setIsOpen(true),
//     close: () => setIsOpen(false),
//   };
// };

// v03
// ? isolated
// import { useState } from "react";
// import { useResizeDetector } from "./useResizeDetector";

// export const useModalDialog = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   // I don't even use it, just call it here
//   useResizeDetector();

//   return {
//     isOpen,
//     open: () => setIsOpen(true),
//     close: () => setIsOpen(false),
//   };
// };

// v04
// ? isolated
import { useState } from "react";

export const useModalDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
};
