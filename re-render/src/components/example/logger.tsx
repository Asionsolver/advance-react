// use custom hooks but

// import { useState, useEffect } from "react";

// function useLogger(name) {
//   const [val, setVal] = useState(0);

//   useEffect(() => {
//     const id = setInterval(() => {
//       setVal((v) => v + 1);
//     }, 2000);

//     return () => clearInterval(id);
//   }, []);

//   useEffect(() => {
//     console.log(`📢 ${name} hook val:`, val);
//   }, [val]);

//   return null;
// }

// function useModalLogic() {
//   const [isOpen, setIsOpen] = useState(false);
//   useLogger("modal");

//   return {
//     isOpen,
//     open: () => setIsOpen(true),
//     close: () => setIsOpen(false),
//   };
// }

// export default function Logger() {
//   const { isOpen, open, close } = useModalLogic();

//   useEffect(() => {
//     console.log("🔄 App rendered");
//   });

//   return (
//     <div className="p-6 space-y-4">
//       <button
//         onClick={open}
//         className="bg-purple-500 text-white px-4 py-2 rounded"
//       >
//         Open Modal
//       </button>
//       {isOpen && (
//         <div className="border p-4 bg-white rounded shadow">
//           Hello Modal
//           <button onClick={close} className="ml-3 text-purple-700 underline">
//             Close
//           </button>
//         </div>
//       )}
//       <VeryHeavyComponent />
//     </div>
//   );
// }

// function VeryHeavyComponent() {
//   console.log("😩 VeryHeavyComponent rendered");
//   const now = performance.now();
//   while (performance.now() - now < 1000) {}
//   return <div className="text-gray-700">Still slow!</div>;
// }

import { useState, useEffect } from "react";

function useLogger(name: string) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setVal((v) => v + 1);
    }, 2000);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    console.log(`📢 ${name} hook val:`, val);
  }, [val]);

  return null;
}

function useModalLogic() {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
}

const OptimizeModal = () => {
  const { isOpen, open, close } = useModalLogic();
  console.log("OptimizeModal component rendered");
  useLogger("modal");
  return (
    <>
      <button
        onClick={open}
        className="bg-purple-500 text-white px-4 py-2 rounded"
      >
        Open Modal
      </button>
      {isOpen && (
        <div className="border p-4 bg-white rounded shadow">
          Hello Modal
          <button onClick={close} className="ml-3 text-purple-700 underline">
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default function Logger() {
  useEffect(() => {
    console.log("🔄 App rendered");
  });

  return (
    <div className="p-6 space-y-4">
      <OptimizeModal />
      <VeryHeavyComponent />
    </div>
  );
}

function VeryHeavyComponent() {
  console.log("😩 VeryHeavyComponent rendered");
  const now = performance.now();
  while (performance.now() - now < 1000) {
    continue; // Simulating a heavy computation
  }
  return <div className="text-gray-700">Still slow!</div>;
}
