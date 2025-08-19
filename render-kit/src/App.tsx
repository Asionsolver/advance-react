// ! v01:Normal Way
// ! Elements as props (Only components are being sent)
// import Card from "./components/card";

// const App = () => {
//   return (
//     <div>
//       <Card header={<h1>Hello</h1>} content={<p>This is content</p>} />
//     </div>
//   );
// };

// export default App;

import ButtonLibrary from "./components/button-library";
import ExampleOne from "./components/example-one";
import "./styles.scss";
// ! v02:Render Props Pattern
// ! header as a function
const App = () => {
  return (
    <>
      <ExampleOne />
      <ButtonLibrary />
    </>
  );
};

export default App;
