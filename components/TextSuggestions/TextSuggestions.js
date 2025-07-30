/**
 * @filename TextSuggestions.js
 * @desc This file contains TextSuggestions component, which gives suggestions when @ is typed at the end of a typed string.
 * @auth Mursleen & Sehrish Naseer
 * @date 01/12/2022
 */

import React, {
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useState,
} from "react";
import { Editor, Transforms, Range, createEditor } from "slate";
import { withHistory } from "slate-history";
import {
  Slate,
  Editable,
  ReactEditor,
  withReact,
  useSelected,
  useFocused,
} from "slate-react";
import { Portal } from "./component";

export default function TextSuggestions({
  charactersProp,
  formStateProp,
  setFormStateProp,
  fieldNameProp,
  fieldValueProp,
  placeholderProp,
}) {
  const CHARACTERS = charactersProp;
  const ref = useRef();
  const [target, setTarget] = useState();
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(
    () => withMentions(withReact(withHistory(createEditor()))),
    []
  );

  const chars = CHARACTERS.filter((c) =>
    c.toLowerCase().startsWith(search.toLowerCase())
  );

  const onKeyDown = useCallback(
    (event) => {
      if (target && chars.length > 0) {
        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            const prevIndex = index >= chars.length - 1 ? 0 : index + 1;
            setIndex(prevIndex);
            break;
          case "ArrowUp":
            event.preventDefault();
            const nextIndex = index <= 0 ? chars.length - 1 : index - 1;
            setIndex(nextIndex);
            break;
          case "Tab":
          case "Enter":
            event.preventDefault();
            Transforms.select(editor, target);
            insertMention(editor, chars[index]);
            setTarget(null);
            break;
          case "Escape":
            event.preventDefault();
            setTarget(null);
            break;
        }
      }
    },
    [index, search, target]
  );

  useEffect(() => {
    if (target && chars.length > 0) {
      const el = ref.current;

      const domRange = ReactEditor.toDOMRange(editor, target);
      const rect = domRange.getBoundingClientRect();
      el.style.top = `${rect.top + window.scrollY + 24}px`;
      el.style.left = `${rect.left + window.scrollX}px`;
    }
  }, [chars.length, editor, index, search, target]);

  //Sehrish code Starts
  editor.children = fieldValueProp;

  return (
    <Slate
      editor={editor}
      value={[...fieldValueProp]}
      onChange={async (value) => {
        const { selection } = editor;

        if (selection && Range.isCollapsed(selection)) {
          const [start, end] = Range.edges(selection);

          const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type
          );
          if (isAstChange) {
            if (value) {
              await setFormStateProp({
                ...formStateProp,
                [fieldNameProp]: value,
              });
            }
          }

          //Sehrish code Ends

          // Mursleen & Sehrish
          // 01st Dec, 2022
          if (Editor.last(editor, end)[0].text.slice(-1) === "@") {
            const before = Editor.before(editor, selection);
            const beforeRange = before && Editor.range(editor, before, start);
            setTarget(beforeRange);
            setSearch("");
            setIndex(0);
            return;
          }
        }
        setTarget(null);
      }}
    >
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
        placeholder={placeholderProp}
        style={{ color: "black" }}
      />
      {target && chars.length > 0 && (
        <Portal>
          <div
            ref={ref}
            style={{
              top: "-9999px",
              left: "-9999px",
              position: "absolute",
              zIndex: 9999,
              padding: "3px",
              background: "white",
              borderRadius: "4px",
              boxShadow: "0 1px 5px rgba(0,0,0,.2)",
            }}
            data-cy="mentions-portal"
          >
            {chars.map((char, i) => (
              <div
                key={char}
                style={{
                  padding: "1px 3px",
                  borderRadius: "3px",
                  background: i === index ? "#B4D5FF" : "transparent",
                }}
              >
                {char}
              </div>
            ))}
          </div>
        </Portal>
      )}
    </Slate>
  );
}

const withMentions = (editor) => {
  const { isInline, isVoid, markableVoid } = editor;

  editor.isInline = (element) => {
    return element.type === "mention" ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === "mention" ? true : isVoid(element);
  };

  editor.markableVoid = (element) => {
    return element.type === "mention" || markableVoid(element);
  };

  return editor;
};

const insertMention = (editor, character) => {
  const mention = {
    type: "mention",
    character,
    children: [{ text: "" }],
  };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
};

// Borrow Leaf renderer from the Rich Text example.
// In a real project you would get this via `withRichText(editor)` or similar.
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const Element = (props) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case "mention":
      return <Mention {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Mention = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  const style = {
    padding: "3px 3px 2px",
    margin: "0 1px",
    verticalAlign: "baseline",
    display: "inline-block",
    borderRadius: "4px",
    backgroundColor: "#eee",
    fontSize: "0.9em",
    boxShadow: selected && focused ? "0 0 0 2px #B4D5FF" : "none",
  };
  // See if our empty text child has any styling marks applied and apply those
  if (element.children[0].bold) {
    style.fontWeight = "bold";
  }
  if (element.children[0].italic) {
    style.fontStyle = "italic";
  }
  return (
    <span
      {...attributes}
      contentEditable={false}
      data-cy={`mention-${element.character.replace(" ", "-")}`}
      style={style}
    >
      {children}@{element.character}
    </span>
  );
};
