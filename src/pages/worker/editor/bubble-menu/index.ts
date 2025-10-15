import type { Editor } from '@tiptap/core'

export { default as TableBubbleMenu } from './TableBubbleMenu'
export { default as DragMenu } from './DragMenu'
export { default as ChatBubble } from './ChatBubble'

export interface BubbleMenuProps {
  editor: Editor
}