import Card from "./card";

const ExampleOne = () => {
  return (
    <div>
      <Card
        header={(isActive, toggle) => (
          <h1 onClick={toggle} style={{ color: isActive ? "red" : "black" }}>
            {isActive ? "Active Header" : "Inactive Header"}
          </h1>
        )}
        content={<p>This is content</p>}
      />
    </div>
  );
};

export default ExampleOne;
