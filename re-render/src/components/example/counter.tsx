import { ButtonCounter } from "./button-counter";

export function Counter() {
  return (
    <div className="p-6 space-y-4">
      <ButtonCounter />
      <SlowComponent />
    </div>
  );
}

function SlowComponent() {
  console.log("❗ SlowComponent rendered");
  const now = performance.now();
  while (performance.now() - now < 500) {
    continue;
  }
  return <div className="text-gray-600">I am very slow!</div>;
}
