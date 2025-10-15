import { Extension } from '@tiptap/core';

export default Extension.create({
  name: 'tabIndent',

  addOptions() {
    return {
      // 缩进空格数
      indentSize: 4,
      // 支持缩进的节点类型
      nodeTypes: ['paragraph', 'heading']
    };
  },

  addCommands() {
    return {
      // 缩进命令
      indent: () => ({ tr, state, dispatch }) => {
        const { selection } = state;
        const { nodeTypes } = this.options;

        // 检查当前节点是否支持缩进
        const nodeType = state.schema.nodes[selection.$head.parent.type.name];
        if (!nodeTypes.includes(selection.$head.parent.type.name)) {
          return false;
        }

        if (dispatch) {
          // 在当前位置插入指定数量的空格
          const spaces = ' '.repeat(this.options.indentSize);
          tr.insertText(spaces, selection.from, selection.to);
        }

        return true;
      },
      // 反缩进命令
      outdent: () => ({ tr, state, dispatch }) => {
        const { selection } = state;
        const { nodeTypes, indentSize } = this.options;

        // 检查当前节点是否支持缩进
        if (!nodeTypes.includes(selection.$head.parent.type.name)) {
          return false;
        }

        const start = selection.from;
        const lineStart = start - selection.$head.parentOffset;

        // 查找需要删除的空格
        let spaceCount = 0;
        for (let i = lineStart; i < start && i < lineStart + indentSize; i++) {
          const char = state.doc.textBetween(i, i + 1);
          if (char === ' ') {
            spaceCount++;
          } else {
            break;
          }
        }

        if (spaceCount > 0 && dispatch) {
          // 删除相应数量的空格（最多为缩进大小）
          const deleteCount = Math.min(spaceCount, indentSize);
          tr.delete(lineStart, lineStart + deleteCount);
        }

        return true;
      }
    };
  },

  addKeyboardShortcuts() {
    return {
      // Tab键触发缩进
      Tab: () => this.editor.commands.indent(),

      // Shift+Tab触发反缩进
      'Shift-Tab': () => this.editor.commands.outdent()
    };
  }
});