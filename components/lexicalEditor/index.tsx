"use client";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { useEffect, useState } from "react";
import ToolbarPlugin from "./toolBarPlugin";
import ExampleTheme from "./ExampleTheme";

const editorConfig = {
  namespace: "Ecore It Distribution",
  nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor theme
  theme: ExampleTheme,
};
const Placeholder = () => {
  return (
    <div className=" text-gray-400  absolute left-6 bottom-32 ">
      Enter your description here
    </div>
  );
};

export default function LexicalEditorComponent({
  handleDescriptionChange,
}: {
  handleDescriptionChange: (description: string) => void;
}) {
  function onChange(editorState: any) {
    const editorStateJSON = editorState.toJSON();

    handleDescriptionChange(JSON.stringify(editorStateJSON));
  }
  function MyOnChangePlugin({
    onChange,
  }: {
    onChange: (editorState: any) => void;
  }) {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
      return editor.registerUpdateListener(({ editorState }) => {
        onChange(editorState);
      });
    }, [editor, onChange]);
    return null;
  }
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="border border-gray-500">
        {/* <ToolbarPlugin /> */}
        <div className="h-40 overflow-auto">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="h-full text-gray-800 p-2 border border-gray-300 rounded-md focus:outline-none"
                aria-placeholder="Enter your description here"
                placeholder={<Placeholder />}
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <MyOnChangePlugin onChange={onChange} />
        </div>
      </div>
    </LexicalComposer>
  );
}
