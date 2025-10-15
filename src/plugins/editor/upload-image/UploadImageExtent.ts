import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import UploadImage from '@/plugins/editor/upload-image/UploadImage'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    uploadImage: {
      insertUploadImage: () => ReturnType
    }
  }
}


export default Node.create({
  name: 'uploadImage',

  group: 'block',

  atom: true,

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: '',
      },
      name: {
        default: '',
      },
      width: {
        default: 0,
      },
      height: {
        default: 0,
      },
      ratio: {
        default: '75'
      },
      align: {
        default: 'start'
      },
      rotate: {
        default: 0
      },
      originWidth: {
        default: 0,
      },
      originHeight: {
        default: 0,
      },
      originRatio: {
        default: 0
      },
      description: {
        default: ''
      },
      descriptionVisible: {
        default: false
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'upload-image',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['upload-image', mergeAttributes(HTMLAttributes)]
  },

  addCommands() {
    return {
      insertUploadImage: () => ({ state, dispatch, commands }) => {
        if (dispatch) {
          const node = state.schema.nodes.uploadImage.create()
          const { from } = state.selection
          commands.insertContentAt(from, node)
        }
        return true
      },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(UploadImage)
  },
})