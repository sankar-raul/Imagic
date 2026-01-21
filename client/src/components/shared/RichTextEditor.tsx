import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import '../pages/dashboard/blog/tiptap.css';

interface RichTextEditorProps {
  value?: string;
  onChange?: (html: string) => void;
  minHeight?: string;
  label?: string;
}

export default function RichTextEditor({
  value = '',
  onChange,
  minHeight = '400px',
}: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value, // initial content only
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none p-4 focus:outline-none',
        style: `min-height: ${minHeight}`,
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  // 🔑 THIS IS THE IMPORTANT PART (HTML INJECTION FIX)
  useEffect(() => {
    if (!editor) return;

    const currentHTML = editor.getHTML();

    if (value && value !== currentHTML) {
      editor.commands.setContent(value, { emitUpdate: false }); // don't trigger onUpdate when syncing external changes
    }
  }, [value, editor]);

  const ToolbarButton = ({
    onClick,
    active,
    disabled,
    children,
  }: {
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1 rounded hover:bg-gray-200 ${
        active ? 'bg-gray-300' : ''
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        {activeTab === 'write' ? (
          <>
            {/* Toolbar */}
            <div className="border border-gray-300 rounded-t-lg p-2 bg-gray-50 flex flex-wrap gap-1">
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleBold().run()}
                active={editor?.isActive('bold')}
              >
                <b>B</b>
              </ToolbarButton>

              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                active={editor?.isActive('italic')}
              >
                <i>I</i>
              </ToolbarButton>

              <ToolbarButton
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 2 }).run()
                }
                active={editor?.isActive('heading', { level: 2 })}
              >
                H2
              </ToolbarButton>

              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                active={editor?.isActive('bulletList')}
              >
                • List
              </ToolbarButton>

              <ToolbarButton
                onClick={() => {
                  const url = window.prompt('Enter link');
                  if (url) {
                    editor?.chain().focus().setLink({ href: url }).run();
                  }
                }}
              >
                Link
              </ToolbarButton>

              <ToolbarButton
                onClick={() => {
                  const url = window.prompt('Image URL');
                  if (url) {
                    editor?.chain().focus().setImage({ src: url }).run();
                  }
                }}
              >
                Image
              </ToolbarButton>

              <ToolbarButton
                onClick={() =>
                  editor
                    ?.chain()
                    .focus()
                    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                    .run()
                }
              >
                Table
              </ToolbarButton>

              <ToolbarButton
                onClick={() => editor?.chain().focus().undo().run()}
                disabled={!editor?.can().undo()}
              >
                Undo
              </ToolbarButton>

              <ToolbarButton
                onClick={() => editor?.chain().focus().redo().run()}
                disabled={!editor?.can().redo()}
              >
                Redo
              </ToolbarButton>
            </div>

            {/* Editor */}
            <div className="border border-t-0 border-gray-300 rounded-b-lg">
              <EditorContent editor={editor} />
            </div>
          </>
        ) : (
          <div className="prose prose-sm max-w-none border rounded-lg p-6">
            {editor?.getHTML() ? (
              <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
            ) : (
              <p className="text-gray-400 italic">No content to preview</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
