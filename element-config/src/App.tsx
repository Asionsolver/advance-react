// ! This code demonstrates a React component setup with Material-UI icons and custom components
// ! It shows how to create reusable icon components with customizable properties
// ! The App component renders different buttons with various icons and configurations

// import type { ReactElement } from "react";

// import ErrorIcon from "@mui/icons-material/Error";
// import Loading from "@mui/icons-material/HourglassEmpty";
// import WarningIcon from "@mui/icons-material/Warning";
// import "./styles.scss";

// type IconProps = {
//   color: string;
//   size?: "large" | "medium" | "small";
// };
// const Error = ({ color, size }: IconProps) => (
//   <ErrorIcon style={{ color }} fontSize={size} />
// );
// const Warning = ({ color, size }: IconProps) => (
//   <WarningIcon style={{ color }} fontSize={size} />
// );
// const Avatar = () => <span className="avatar">AB</span>;

// const Button = ({ icon }: { icon: ReactElement }) => {
//   return <button className="button">Submit button {icon}</button>;
// };

// export default function App() {
//   return (
//     <>
//       <h4>Default button with loading icon</h4>
//       <Button icon={<Loading />} />
//       <h4>Default button with Error icon colored red</h4>
//       <Button icon={<Error color="red" />} />
//       <h4>Default button with large Warning icon colored yellow</h4>
//       <Button icon={<Warning color="yellow" size="large" />} />
//       <h4>Default button with some random avatar instead of the icon</h4>
//       <Button icon={<Avatar />} />
//     </>
//   );
// }

// ! This code is a React component that demonstrates conditional rendering and performance optimization by using a modal dialog with a footer. The footer is created but only rendered when the modal dialog is open, showcasing how to manage component rendering efficiently.

// import { useState } from "react";
// import { Footer } from "./components/footer";
// import { ModalDialog } from "./components/modal-dialog";
// import "./styles.scss";
// // App component
// export default function App() {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   // Footer element created always, but only rendered when ModalDialog is open
//   const footer = <Footer onClose={() => setIsDialogOpen(false)} />;

//   console.log("👉 App rendered");

//   return (
//     <div className="app-container">
//       <h2>Conditional Rendering Demo</h2>

//       {/* Button to open modal */}
//       <button
//         onClick={() => setIsDialogOpen(true)}
//         className="open-dialog-button"
//       >
//         Open Dialog
//       </button>

//       {/* ModalDialog is conditionally rendered */}
//       {isDialogOpen ? (
//         <ModalDialog footer={footer} onClose={() => setIsDialogOpen(false)}>
//           <p>
//             This is the modal content. Notice how the footer is only rendered
//             when the modal is open.
//           </p>
//         </ModalDialog>
//       ) : null}
//     </div>
//   );
// }

import LoadingIcon from "@mui/icons-material/HourglassEmpty";
import "./styles.scss";
import { Button } from "./components/button";

type IconProps = {
  color?: string;
  size?: "large" | "medium" | "small";
};
const Loading = ({ color, size }: IconProps) => (
  <LoadingIcon style={{ color }} fontSize={size} />
);

export default function App() {
  return (
    <>
      <h4>primary button will have white icons</h4>
      <Button appearance="primary" icon={<Loading />} />

      <h4>secondary button will have black icons</h4>
      <Button appearance="secondary" icon={<Loading />} />

      <h4>large button will have large icons</h4>
      <Button size="large" icon={<Loading />} />

      <h4>override default icons</h4>
      <Button size="large" icon={<Loading color="red" />} />
    </>
  );
}
