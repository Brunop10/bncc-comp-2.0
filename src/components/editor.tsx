import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react'


import bulletListImage from '@/assets/bulleted-list.webp'
import headingImage from '@/assets/header.webp'
import numberedListImage from '@/assets/numbered-list.webp'
import plainTextImage from '@/assets/plain-text.webp'
import subheaderImage from '@/assets/subheader.webp'
import subSubheaderImage from '@/assets/subsubheader.webp'

import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { useEffect } from 'react'

interface EditorProps {
  content: string | null
  disabled?: boolean
  placeholder?: string
  onChangeContent: (content: string) => void
}


export function Editor({
  content,
  placeholder,
  onChangeContent,
  disabled
}: EditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: ({ editor }) => {
          const tipMessage = "Digite '/' para ver comandos básicos"
          const placeholderMessage = placeholder && `${placeholder}.\n` || ''

          if (editor.isEmpty) return `${placeholderMessage}${tipMessage}`

          return tipMessage
        },
      }),
      Underline,
      BulletList,
      OrderedList,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'outline-none',
      },
    },
    editable: !disabled,
    onUpdate({ editor }) {
      onChangeContent(editor.getHTML())
    },
    onTransaction() {},
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '')
    }
  }, [editor, content])

  if (!editor) return null

  return (
    <div className="flex h-full flex-col rounded-lg border border-muted-foreground/15">
      <div className="flex flex-wrap items-center gap-4 rounded-t-lg bg-muted p-4">
        <ToggleGroup type="single">
          <ToggleGroupItem
            value="heading-1"
            size="sm"
            data-active={editor.isActive('heading', { level: 1 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className="hover:bg-zinc-200 data-[active=true]:bg-primary data-[active=true]:text-white"
          >
            <Heading1Icon />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="heading-2"
            size="sm"
            data-active={editor.isActive('heading', { level: 2 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className="hover:bg-zinc-200 data-[active=true]:bg-primary data-[active=true]:text-white"
          >
            <Heading2Icon />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="heading-3"
            size="sm"
            data-active={editor.isActive('heading', { level: 3 })}
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className="hover:bg-zinc-200 data-[active=true]:bg-primary data-[active=true]:text-white"
          >
            <Heading3Icon />
          </ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup type="multiple">
          <ToggleGroupItem
            value="bold"
            size="sm"
            data-active={editor.isActive('bold')}
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="hover:bg-zinc-200 data-[active=true]:bg-primary data-[active=true]:text-white"
          >
            <BoldIcon />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="italic"
            size="sm"
            data-active={editor.isActive('italic')}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="hover:bg-zinc-200 data-[active=true]:bg-primary data-[active=true]:text-white"
          >
            <ItalicIcon />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="underline"
            size="sm"
            data-active={editor.isActive('underline')}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className="hover:bg-zinc-200 data-[active=true]:bg-primary data-[active=true]:text-white"
          >
            <UnderlineIcon />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="strike"
            size="sm"
            data-active={editor.isActive('strike')}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className="hover:bg-zinc-200 data-[active=true]:bg-primary data-[active=true]:text-white"
          >
            <StrikethroughIcon />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="bullet-list"
            size="sm"
            data-active={editor.isActive('bulletList')}
            onClick={() => {
              editor.chain().focus().toggleBulletList().run()
              editor
                ?.chain()
                .focus()
                .deleteRange({
                  from: editor.state.selection.from - 1,
                  to: editor.state.selection.from,
                })
                .run()
            }}
            className="hover:bg-zinc-200 data-[active=true]:bg-primary data-[active=true]:text-white"
          >
            <ListIcon />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="list-ordered"
            size="sm"
            data-active={editor.isActive('orderedList')}
            onClick={() => {
              editor.chain().focus().toggleOrderedList().run()
              editor
                ?.chain()
                .focus()
                .deleteRange({
                  from: editor.state.selection.from - 1,
                  to: editor.state.selection.from,
                })
                .run()
            }}
            className="hover:bg-zinc-200 data-[active=true]:bg-primary data-[active=true]:text-white"
          >
            <ListOrderedIcon />
          </ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup type="single">
          <ToggleGroupItem
            value="left"
            size="sm"
            data-active={editor.isActive({ textAlign: 'left' })}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className="hover:bg-zinc-200 data-[active=true]:bg-primary data-[active=true]:text-white"
          >
            <AlignLeftIcon />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="center"
            size="sm"
            data-active={editor.isActive({ textAlign: 'center' })}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className="hover:bg-zinc-200 data-[active=true]:bg-primary data-[active=true]:text-white"
          >
            <AlignCenterIcon />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="right"
            size="sm"
            data-active={editor.isActive({ textAlign: 'right' })}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className="hover:bg-zinc-200 data-[active=true]:bg-primary data-[active=true]:text-white"
          >
            <AlignRightIcon />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="justify"
            size="sm"
            data-active={editor.isActive({ textAlign: 'justify' })}
            onClick={() =>
              editor.chain().focus().setTextAlign('justify').run()
            }
            className="hover:bg-zinc-200 data-[active=true]:bg-primary data-[active=true]:text-white"
          >
            <AlignJustifyIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <EditorContent
        editor={editor}
        className="prose prose-rose h-full max-h-[200px] min-h-[200px] max-w-none flex-1 overflow-y-auto px-4 [&_p]:my-1 [&_p]:leading-relaxed"
      />

      {editor && (
        <FloatingMenu
          editor={editor}
          shouldShow={({ state }) => {
            const { $from } = state.selection
            const currentLineText = $from.nodeBefore?.textContent

            return currentLineText === '/'
          }}
          className="flex flex-col items-center gap-1 rounded border border-muted bg-white px-1 py-2 shadow"
        >
          <button
            type="button"
            onClick={() => {
              editor.chain().focus().setParagraph().run()
              editor
                .chain()
                .focus()
                .deleteRange({
                  from: editor.state.selection.from - 1,
                  to: editor.state.selection.from,
                })
                .run()
            }}
            className="flex w-full min-w-[320px] items-center gap-2 rounded p-1 hover:bg-muted-foreground/10"
          >
            <img
              src={plainTextImage}
              alt="Texto"
              width={100}
              height={100}
              className="bg-wh size-12 rounded border border-muted-foreground/10"
              draggable={false}
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Texto</span>
              <span className="text-xs text-muted-foreground/80">
                Comece escrevendo um texto simples.
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              editor.chain().focus().setHeading({ level: 1 }).run()
              editor
                .chain()
                .focus()
                .deleteRange({
                  from: editor.state.selection.from - 1,
                  to: editor.state.selection.from,
                })
                .run()
            }}
            className="flex w-full min-w-[320px] items-center gap-2 rounded p-1 hover:bg-muted-foreground/10"
          >
            <img
              src={headingImage}
              alt="Cabeçalho 1"
              width={100}
              height={100}
              className="bg-wh size-12 rounded border border-muted-foreground/10"
              draggable={false}
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Cabeçalho 1</span>
              <span className="text-xs text-muted-foreground/80">
                Cabeçalho de seção grande.
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              editor.chain().focus().setHeading({ level: 2 }).run()
              editor
                .chain()
                .focus()
                .deleteRange({
                  from: editor.state.selection.from - 1,
                  to: editor.state.selection.from,
                })
                .run()
            }}
            className="flex w-full min-w-[320px] items-center gap-2 rounded p-1 hover:bg-muted-foreground/10"
          >
            <img
              src={subheaderImage}
              alt="Cabeçalho 2"
              width={100}
              height={100}
              className="bg-wh size-12 rounded border border-muted-foreground/10"
              draggable={false}
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Cabeçalho 2</span>
              <span className="text-xs text-muted-foreground/80">
                Cabeçalho de seção médio.
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              editor.chain().focus().setHeading({ level: 3 }).run()
              editor
                .chain()
                .focus()
                .deleteRange({
                  from: editor.state.selection.from - 1,
                  to: editor.state.selection.from,
                })
                .run()
            }}
            className="flex w-full min-w-[320px] items-center gap-2 rounded p-1 hover:bg-muted-foreground/10"
          >
            <img
              src={subSubheaderImage}
              alt="Cabeçalho 3"
              width={100}
              height={100}
              className="bg-wh size-12 rounded border border-muted-foreground/10"
              draggable={false}
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Cabeçalho 3</span>
              <span className="text-xs text-muted-foreground/80">
                Cabeçalho de seção pequeno.
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              editor.chain().focus().toggleBulletList().run()
              editor
                .chain()
                .focus()
                .deleteRange({
                  from: editor.state.selection.from - 1,
                  to: editor.state.selection.from,
                })
                .run()
            }}
            className="flex w-full min-w-[320px] items-center gap-2 rounded p-1 hover:bg-muted-foreground/10"
          >
            <img
              src={bulletListImage}
              alt="Lista com marcador"
              width={100}
              height={100}
              className="bg-wh size-12 rounded border border-muted-foreground/10 bg-white"
              draggable={false}
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Lista com marcador</span>
              <span className="text-xs text-muted-foreground/80">
                Crie uma lista com marcador simples.
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              editor.chain().focus().toggleOrderedList().run()
              editor
                .chain()
                .focus()
                .deleteRange({
                  from: editor.state.selection.from - 1,
                  to: editor.state.selection.from,
                })
                .run()
            }}
            className="flex w-full min-w-[320px] items-center gap-2 rounded p-1 hover:bg-muted-foreground/10"
          >
            <img
              src={numberedListImage}
              alt="Lista numerada"
              width={100}
              height={100}
              className="bg-wh size-12 rounded border border-muted-foreground/10 bg-white"
              draggable={false}
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Lista numerada</span>
              <span className="text-xs text-muted-foreground/80">
                Crie uma lista com numeração.
              </span>
            </div>
          </button>
        </FloatingMenu>
      )}
      {editor && (
        <BubbleMenu
          editor={editor}
          className="flex items-center divide-x divide-muted-foreground/10 rounded border border-muted bg-muted shadow"
        >
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            data-active={editor.isActive('bold')}
            className="flex items-center gap-1.5 rounded-l p-2 text-sm font-medium leading-none text-foreground/50 hover:bg-muted-foreground/10 hover:text-foreground data-[active=true]:text-primary"
          >
            <BoldIcon className="size-3" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            data-active={editor.isActive('italic')}
            className="flex items-center gap-1.5 p-2 text-sm font-medium leading-none text-foreground/50 hover:bg-muted-foreground/10 hover:text-foreground data-[active=true]:text-primary"
          >
            <ItalicIcon className="size-3" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            data-active={editor.isActive('underline')}
            className="flex items-center gap-1.5 p-2 text-sm font-medium leading-none text-foreground/50 hover:bg-muted-foreground/10 hover:text-foreground data-[active=true]:text-primary"
          >
            <UnderlineIcon className="size-3" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            data-active={editor.isActive('strike')}
            className="flex items-center gap-1.5 rounded-r p-2 text-sm font-medium leading-none text-foreground/50 hover:bg-muted-foreground/10 hover:text-foreground data-[active=true]:text-primary"
          >
            <StrikethroughIcon className="size-3" />
          </button>
        </BubbleMenu>
      )}
    </div>
  )
}
