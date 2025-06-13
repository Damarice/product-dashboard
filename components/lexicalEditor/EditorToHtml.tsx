import { $generateHtmlFromNodes } from "@lexical/html";

// Function to convert editor state to HTML
type LexicalNode = {
  type: string;
  children: Array<{ text: string }>;
  tag?: string; // For heading nodes
};

interface LexicalRoot {
  root: {
    children: LexicalNode[];
  };
}

export const convertEditorStateToHTML = (editorStateJSON: string): string => {
  const parsedState: LexicalRoot = JSON.parse(editorStateJSON);
  let html = "";

  if (parsedState && parsedState.root && parsedState.root.children) {
    parsedState.root.children.forEach((node) => {
      switch (node.type) {
        case "paragraph":
          html += `<p>${node.children
            .map((child) => child.text)
            .join(" ")}</p>`;
          break;
        case "heading":
          html += `<h${node.tag}>${node.children
            .map((child) => child.text)
            .join(" ")}</h${node.tag}>`;
        case "list":
          html += `<${node.tag}>${node.children
            .map((child) => `<li>${child.text}</li>`)
            .join(" ")}</${node.tag}>`;
        case "quote":
          html += `<blockquote>${node.children
            .map((child) => child.text)
            .join(" ")}</blockquote>`;
        case "code":
          html += `<code>${node.children
            .map((child) => child.text)
            .join(" ")}</code>`;
        case "image":
          html += `<img src="${node.children[0].text}" alt="${node.children[1].text}" />`;
        case "link":
          html += `<a href="${node.children[0].text}">${node.children[1].text}</a>`;
        case "text":
          html += node.children.map((child) => child.text).join(" ");

          break;
        // Add cases for other node types as necessary
        default:
          break;
      }
    });
  }

  return html;
};
