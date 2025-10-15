import { ReactRenderer } from '@tiptap/react'

import Suggestion from '@/plugins/editor/suggestions/Suggestion'
import tippy from 'tippy.js'

const suggestionsList = [
  {
    value: 'h1',
    label: 'H1 标题1',
    type: 'format',
    attrs: { level: 1 },

  },
  {
    value: 'h2',
    label: 'H2 标题2',
    type: 'format',
    attrs: { level: 2 }
  },
  {
    value: 'h3',
    label: 'H3 标题3',
    type: 'format',
    attrs: { level: 3 }
  },
  {
    value: 'h4',
    label: 'H4 标题4',
    type: 'format',
    attrs: { level: 4 }
  },
  {
    value: 'h5',
    label: 'H5 标题5',
    type: 'format',
    attrs: { level: 5 }
  },
  {
    value: 'h6',
    label: 'H6 标题6',
    type: 'format',
    attrs: { level: 6 }
  },
  {
    value: 'bulletList',
    label: '无序列表',
    type: 'format',
    attrs: {}
  },
  {
    value: 'orderList',
    label: '有序列表',
    type: 'format',
    attrs: {}
  },
  {
    value: 'taskList',
    label: '任务列表',
    type: 'format',
    attrs: {}
  },
  {
    value: 'blockQuote',
    label: '引用',
    type: 'format',
    attrs: {}
  },
  {
    value: 'codeBlock',
    label: '代码块',
    type: 'format',
    attrs: {}
  },
  {
    value: 'table',
    label: '表格',
    type: 'other',
    attrs: {}
  },
  {
    value: 'image',
    label: '图片',
    type: 'other',
    attrs: {}
  },
  {
    value: 'horizontalRule',
    label: '分割线',
    type: 'other',
    attrs: {}
  }
]

export default {
  char: '/',
  items: ({ query } : {query: string}) => {
    return suggestionsList
      .filter(item => item.value.toLowerCase().startsWith(query.toLowerCase()))
  },

  render: () => {
    let component: any, tippyInstance: any

    return {
      onStart: (props: any) => {
        const { decorationNode } = props
        component = new ReactRenderer(Suggestion, {
          props,
          editor: props.editor,
        })
        tippyInstance = tippy(decorationNode, {
          content: component.element,
          placement: 'right',
          animation: 'fade',
          allowHTML: true,
        })
        tippyInstance.show()
        if (!props.clientRect) {
          return
        }
      },

      onUpdate(props:any) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }
        tippyInstance.show()
      },

      onExit() {
        component.element.remove()
        component.destroy()
      },
    }
  },
}