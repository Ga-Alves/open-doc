import { exampleSetup } from "prosemirror-example-setup";
import { Schema } from "prosemirror-model";
import { schema } from "prosemirror-schema-basic";
import { addListNodes } from "prosemirror-schema-list";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { useEffect, useRef } from "react";

import { keymap } from "prosemirror-keymap";
import {
  redo,
  undo,
  yCursorPlugin,
  ySyncPlugin,
  yUndoPlugin,
} from "y-prosemirror";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";

import "./styles/prosemirror-example-setup.css";
import "./styles/prosemirror-gapcursor.css";
import "./styles/prosemirror-menu.css";
import "./styles/prosemirror-view.css";
import { ENV_VARIABLES } from "@/utils/environmentVariables";

const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks,
});

type EditorProps = {
  room: string;
  isEditable: boolean;
  initialContent?: string;
};

export default function CollaborativeEditor(props: EditorProps) {
  const { isEditable, room, initialContent } = props;
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;
    if (viewRef.current) return;

    // setup webRTC
    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider(room, ydoc, {
      signaling: [ENV_VARIABLES.SIGNALING_SERVER_HOST],
    });
    const type = ydoc.getXmlFragment("prosemirror");

    const state = EditorState.create({
      doc: createInitialDoc(initialContent),
      plugins: [
        ySyncPlugin(type),
        yCursorPlugin(provider.awareness),
        yUndoPlugin(),
        keymap({
          "Mod-z": undo,
          "Mod-y": redo,
          "Mod-Shift-z": redo,
        }),
      ].concat(exampleSetup({ schema: mySchema })),
    });

    const view = new EditorView(editorRef.current, {
      state,
      editable: () => isEditable,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      provider.destroy();
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
        const tr = viewRef.current.state.tr.replaceWith(
          0,
          viewRef.current.state.doc.content.size,
          newDoc,
        );
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
  } catch{
    const paragraphContent = json?.trim().length
      ? json
      : "What you want to share?";
    return mySchema.node("doc", null, [
      mySchema.node("paragraph", null, [mySchema.text(paragraphContent)]),
    ]);
  }
}
