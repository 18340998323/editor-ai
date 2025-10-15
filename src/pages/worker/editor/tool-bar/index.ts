import type { Editor } from '@tiptap/core'
import type { EditorState } from '../EditorTool'

export { default as TextAndTitle } from './TextAndTitle'
export { default as FontSize } from './FontSize'
export { default as FontStyle } from './FontStyle'
export { default as FontColor } from './FontColor'
export { default as FillColor } from './FillColor'
export { default as Alignment } from './Alignment'
export { default as ParagraphList } from './ParagraphList'
export { default as TextLink } from './TextLink'
export { default as TextQuote } from './TextQuote'
export { default as TextSeparate } from './TextSeparate'
export { default as Undo } from './Undo'
export { default as Redo } from './Redo'
export { default as UnsetMarks } from './UnsetMarks'
export { default as Image } from './Image'
export { default as Plugins } from '../tool-extensions/Plugins'

export type ToolBarCompProps = {
  editorState: EditorState, 
  editor: Editor
}