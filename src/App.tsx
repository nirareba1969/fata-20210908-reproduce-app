import React from "react";
import ReactFlow, { Elements, Node } from "react-flow-renderer";
import { useAppSelector, useAppDispatch } from "./hooks";
import { select, selectState } from "./slice";

const initialElements: Elements = [
  {
    id: "1",
    type: "input",
    data: { label: "Input Node" },
    position: { x: 250, y: 25 }
  },
  {
    id: "2",
    data: { label: "Default Node" },
    position: { x: 100, y: 125 }
  },
  {
    id: "3",
    type: "output",
    data: { label: "Output Node" },
    position: { x: 250, y: 250 }
  },
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3" }
];

const App: React.VFC = () => {
  const { selected } = useAppSelector(selectState);
  const dispatch = useAppDispatch();

  const onNodeDrag = (_event: React.MouseEvent<Element>, node: Node<any>) => {
    console.log(`onNodeDrag: dragging:${node.id}, selected:${selected?.id ?? null}`);
  };

  const onNodeDoubleClick = (
    _event: React.MouseEvent<Element>,
    node: Node<any>
  ) => {
    console.log(`onNodeDoubleClick: selected:${node.id}`);

    /* Bug: set node of wrapNode immutable*/
    dispatch(select(node));

    /* Fix: select node of elements */
    //const n = elements.find(e => e.id === node.id);
    //dispatch(select(n!));
  };

  return (
    <div className="App" style={{ height: "300px" }}>
      <ReactFlow
        elements={initialElements}
        onNodeDrag={onNodeDrag}
        onNodeDoubleClick={onNodeDoubleClick}
      />
    </div>
  );
};

export default App;
