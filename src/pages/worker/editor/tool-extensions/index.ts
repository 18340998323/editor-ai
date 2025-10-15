import type { Editor } from '@tiptap/core'
import type { EditorState } from '../EditorTool'

export { default as Plugins } from '../tool-extensions/Plugins'

export type ToolBarCompProps = {
  editorState: EditorState, 
  editor: Editor
}