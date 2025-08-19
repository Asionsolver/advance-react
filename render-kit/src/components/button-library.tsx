import Home from "@mui/icons-material/Home";
import { Button } from "./button";
import { HomeOutlined } from "@mui/icons-material";

type IconProps = {
  color?: string;
  size?: "large" | "medium" | "small";
};
const HomeIcon = ({ color, size }: IconProps) => (
  <Home style={{ color }} fontSize={size} />
);
const HomeOutlinedIcon = ({ color, size }: IconProps) => (
  <HomeOutlined style={{ color }} fontSize={size} />
);
export default function ButtonLibrary() {
  return (
    <div className="app-container">
      <h4>Pass all icon default props</h4>
      <Button renderIcon={(props) => <HomeIcon {...props} />} />
      <h4>Override size</h4>
      <Button
        renderIcon={(props, state) => (
          <HomeIcon
            {...props}
            size="large"
            color={state.isHovered ? "red" : "black"}
          />
        )}
      />
      <h4>Use the actual MUI icon</h4>
      <Button
        renderIcon={(props) => (
          <Home fontSize={props.size} style={{ color: props.color }} />
        )}
      />
      <h4>Change icon on button's hover</h4>
      <Button
        renderIcon={(props, state) =>
          state.isHovered ? (
            <HomeOutlinedIcon {...props} />
          ) : (
            <HomeIcon {...props} />
          )
        }
      />
    </div>
  );
}
