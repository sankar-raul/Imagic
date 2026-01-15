import { useState } from 'react';
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
  label = 'Content'
}: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    editorProps: {
      attributes: {
        class: `prose prose-sm max-w-none p-4 focus:outline-none`,
        style: `min-height: ${minHeight}`,
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
  });

  const ToolbarButton = ({
    onClick,
    active,
    disabled,
    children
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
      className={`px-3 py-1 rounded hover:bg-gray-200 ${active ? 'bg-gray-300' : ''} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* <div className="border-b border-gray-900 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{label}</h3>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('write')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'write'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Write
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'preview'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Preview
            </button>
          </div>
        </div>
      </div> */}

      <div className="p-6">
        {activeTab === 'write' ? (
          <div>
            {/* Editor Toolbar */}
            <div className="tiptap-toolbar border border-gray-300 rounded-t-lg p-2 bg-gray-50 flex flex-wrap gap-1">
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleBold().run()}
                active={editor?.isActive('bold')}
              >
                <span className="font-bold">B</span>
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                active={editor?.isActive('italic')}
              >
                <span className="italic">I</span>
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleStrike().run()}
                active={editor?.isActive('strike')}
              >
                <span className="line-through">S</span>
              </ToolbarButton>
              
              <span className="border-l border-gray-300 mx-1"></span>
              
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                active={editor?.isActive('heading', { level: 1 })}
              >
                H1
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                active={editor?.isActive('heading', { level: 2 })}
              >
                H2
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                active={editor?.isActive('heading', { level: 3 })}
              >
                H3
              </ToolbarButton>
              
              <span className="border-l border-gray-300 mx-1"></span>
              
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                active={editor?.isActive('bulletList')}
              >
                • List
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                active={editor?.isActive('orderedList')}
              >
                1. List
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                active={editor?.isActive('blockquote')}
              >
                Quote
              </ToolbarButton>
              
              <span className="border-l border-gray-300 mx-1"></span>
              
              <ToolbarButton
                onClick={() => {
                  const url = window.prompt('Enter URL:');
                  if (url) {
                    editor?.chain().focus().setLink({ href: url }).run();
                  }
                }}
                active={editor?.isActive('link')}
              >
                Link
              </ToolbarButton>
              <ToolbarButton
                onClick={() => {
                  const url = window.prompt('Enter image URL:');
                  if (url) {
                    editor?.chain().focus().setImage({ src: url }).run();
                  }
                }}
              >
                Image
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
              >
                Table
              </ToolbarButton>
              
              <span className="border-l border-gray-300 mx-1"></span>
              
              <ToolbarButton
                onClick={() => editor?.chain().focus().undo().run()}
                disabled={!editor?.can().undo()}
              >
                ↶ Undo
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().redo().run()}
                disabled={!editor?.can().redo()}
              >
                ↷ Redo
              </ToolbarButton>
            </div>
            
            {/* Editor Content */}
            <div className="border border-t-0 border-gray-300 rounded-b-lg">
              <EditorContent editor={editor} />
            </div>
          </div>
        ) : (
          <div className="min-h-96 prose prose-sm max-w-none border border-gray-200 rounded-lg p-6">
            {editor?.getHTML() && editor.getHTML() !== '<p></p>' ? (
              <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
            ) : (
              <p className="text-gray-400 italic">No content to preview</p>
            )}
          </div>
        )}
        
        <p className="text-sm text-gray-500 mt-2">
          Tip: Use the toolbar above to format your content with headings, bold, italic, lists, links, images, and more.
        </p>
      </div>
    </div>
  );
}

// Hook to access editor instance if needed
export function useRichTextEditor(initialContent = '') {
  return useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[400px] p-4 focus:outline-none',
      },
    },
  });
}
