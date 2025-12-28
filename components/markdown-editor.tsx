"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Pencil } from "lucide-react"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}

// Simple markdown to HTML converter
function parseMarkdown(markdown: string): string {
  let html = markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-4 mb-2">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.*?)\*\*\*/gim, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    // Links
    .replace(/\[(.*?)\]$$(.*?)$$/gim, '<a href="$2" class="text-primary underline">$1</a>')
    // Unordered lists
    .replace(/^\s*[-*]\s+(.*$)/gim, '<li class="ml-4">$1</li>')
    // Line breaks
    .replace(/\n/gim, "<br />")

  // Wrap consecutive <li> elements in <ul>
  html = html.replace(/(<li.*<\/li>)(<br \/>)?/g, "$1")

  return html
}

export function MarkdownEditor({ value, onChange, placeholder, rows = 8 }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<string>("write")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-2">
        <TabsTrigger value="write" className="flex items-center gap-2">
          <Pencil className="h-4 w-4" />
          Write
        </TabsTrigger>
        <TabsTrigger value="preview" className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          Preview
        </TabsTrigger>
      </TabsList>
      <TabsContent value="write" className="mt-0">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Supports Markdown: **bold**, *italic*, # headers, [links](url), - lists
        </p>
      </TabsContent>
      <TabsContent value="preview" className="mt-0">
        <div
          className="min-h-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm prose prose-sm max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{
            __html: value ? parseMarkdown(value) : '<span class="text-muted-foreground">Nothing to preview</span>',
          }}
        />
      </TabsContent>
    </Tabs>
  )
}
