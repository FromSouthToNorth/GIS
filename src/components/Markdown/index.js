import {withInstall} from "../../utils/util.js";
import markDown from "./src/Markdown.vue";
import markDownViewer from "./src/MarkdownViewer.vue";

export const MarkDown = withInstall(markDown);
export const MarkdownViewer = withInstall(markDownViewer);
