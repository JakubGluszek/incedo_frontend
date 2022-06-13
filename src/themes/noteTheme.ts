import { EditorView } from "@codemirror/view"

export const lightNordTheme = EditorView.theme({
  "&": {
    color: "black",
    backgroundColor: "#fff"
  },
}, { dark: false })

export const darkNordTheme = EditorView.theme({
  "&": {
    color: "white",
    backgroundColor: "#034",
  },
}, { dark: true })
