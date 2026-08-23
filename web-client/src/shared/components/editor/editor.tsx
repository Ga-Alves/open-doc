import { useEffect, useRef } from "react";
import { exampleSetup } from "prosemirror-example-setup";
import { Schema } from "prosemirror-model";
import { schema } from "prosemirror-schema-basic";
import { addListNodes } from "prosemirror-schema-list";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

import "./styles/prosemirror-example-setup.css";
import "./styles/prosemirror-gapcursor.css";
import "./styles/prosemirror-menu.css";
import "./styles/prosemirror-view.css";

const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks,
});

type EditorProps = {
  isEditable: boolean;
  initialContent?: string;
  onChange?: (content: string) => void;
};

export default function Editor({ isEditable, initialContent, onChange }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!editorRef.current) return;

    const state = EditorState.create({
      doc: createInitialDoc(initialContent),
      plugins: exampleSetup({ schema: mySchema, menuBar: isEditable }),
    });

    const view = new EditorView(editorRef.current, {
      state,
      dispatchTransaction(tr) {
        const newState = view.state.apply(tr);
        view.updateState(newState);

        if (tr.docChanged) {
          onChangeRef.current?.(JSON.stringify(newState.doc.toJSON()));
        }
      },
      editable: () => isEditable,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!viewRef.current) return;

    const currentDocJSON = JSON.stringify(viewRef.current.state.doc.toJSON());
    if (initialContent && initialContent !== currentDocJSON) {
      try {
        const newDoc = mySchema.nodeFromJSON(JSON.parse(initialContent));
        const tr = viewRef.current.state.tr.replaceWith(0, viewRef.current.state.doc.content.size, newDoc);
        viewRef.current.dispatch(tr);
      } catch (e) {
        console.error("Erro ao carregar conteúdo externo no editor", e);
      }
    }
  }, [initialContent]);

  return (
    <div>
      <div className="no-preflight" ref={editorRef}></div>
    </div>
  );
}

function createInitialDoc(json?: string) {
  try {
    return mySchema.nodeFromJSON(JSON.parse(json ?? ""));
  } catch {
    const paragraphContent = json?.trim().length ? json : "What you want to share?";
    return mySchema.node("doc", null, [
      mySchema.node("paragraph", null, [mySchema.text(paragraphContent)]),
    ]);
  }
}