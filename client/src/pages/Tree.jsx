import React, { useState } from "react";

const dataTree = {
  children: [
    {
      name: "Folder 1",
      children: [
        {
          name: "Subfolder 1.1",
          children: [{ name: "File 1.a" }, { name: "File 1.b" }],
        },
        {
          name: "Subfolder 1.2",
          children: [
            { name: "File 1.2.a" },
            {
              name: "Subfolder 2.2",
              children: [{ name: "File 2.1.a" }],
            },
          ],
        },
      ],
    },
    { name: "File A" },
    { name: "File B" },
  ],
};

const Entry = ({ entry, depth }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      {entry.children ? (
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "- " : "+ "}
          {entry.name}
        </button>
      ) : (
        <p>{entry.name}</p>
      )}

      {isExpanded && (
        <div style={{ marginLeft: depth * 20 }}>
          {entry.children?.map((child) => (
            <Entry entry={child} depth={depth + 1} key={child.name} />
          ))}
        </div>
      )}
    </div>
  );
};

const Tree = () => {
  return (
    <div style={{ alignContent: "left", textAlign: "left", marginLeft: 50 }}>
      {dataTree.children.map((entry) => (
        <Entry entry={entry} depth={0} key={entry.name} />
      ))}
    </div>
  );
};

export default Tree;
