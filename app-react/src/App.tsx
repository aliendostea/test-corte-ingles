import { Card, List, BottomControls, Overlay, Form } from "./components";
import { useItemsStore } from "./store/store";
import "./style.css";

//// fix
//// change all div role="alert" to component and span
//// imports with @
//// overlay on init
//// overlay animation
//// overlay div should be outside main to avoid accessibility issues
export default function App() {
  const { items } = useItemsStore();

  return (
    <>
      <main className="main-container">
        <Card>
          <h1 className="main-title">Test: add your fruit and vegetables</h1>
          <p className="main-p">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur et
            molestiae impedit. Ut impedit sequi tempora, dolorem perferendis
            debitis a ducimus.
          </p>

          <List items={items} />

          <BottomControls />
        </Card>
      </main>

      <Overlay>
        <Form />
      </Overlay>
    </>
  );
}
