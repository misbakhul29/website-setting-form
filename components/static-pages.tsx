"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { MarkdownEditor } from "@/components/markdown-editor"
import { FileText, Info, Mail, Scale, AlertTriangle, Shield, ChevronDown } from "lucide-react"

interface StaticPagesData {
  aboutUs: string
  contactUs: string
  termsOfService: string
  disclaimer: string
  privacyPolicy: string
}

interface StaticPagesProps {
  data: StaticPagesData
  onChange: (data: StaticPagesData) => void
}

const staticPagesConfig = [
  {
    id: "aboutUs",
    title: "About Us",
    icon: <Info className="h-4 w-4" />,
    placeholder: "# About Us\n\nWrite about your company history, mission, and values...",
  },
  {
    id: "contactUs",
    title: "Contact Us",
    icon: <Mail className="h-4 w-4" />,
    placeholder: "# Contact Us\n\nProvide information on how visitors can reach you...",
  },
  {
    id: "termsOfService",
    title: "Terms of Service",
    icon: <Scale className="h-4 w-4" />,
    placeholder: "# Terms of Service\n\nOutline the terms and conditions for using your website...",
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    icon: <AlertTriangle className="h-4 w-4" />,
    placeholder: "# Disclaimer\n\nInclude any legal disclaimers or limitations of liability...",
  },
  {
    id: "privacyPolicy",
    title: "Privacy Policy",
    icon: <Shield className="h-4 w-4" />,
    placeholder: "# Privacy Policy\n\nExplain how you collect, use, and protect user data...",
  },
]

export function StaticPages({ data, onChange }: StaticPagesProps) {
  const [openPages, setOpenPages] = useState<string[]>([])

  const togglePage = (pageId: string) => {
    setOpenPages((prev: string[]) => (prev.includes(pageId) ? prev.filter((id) => id !== pageId) : [...prev, pageId]))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Static Pages</CardTitle>
        </div>
        <CardDescription>Create content for your website's static pages using Markdown</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {staticPagesConfig.map((page) => (
          <Collapsible key={page.id} open={openPages?.includes(page.id)} onOpenChange={() => togglePage(page.id)}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between font-normal bg-transparent">
                <div className="flex items-center gap-2">
                  {page.icon}
                  <span>{page.title}</span>
                  {data[page.id as keyof StaticPagesData] && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Has content
                    </Badge>
                  )}
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    openPages?.includes(page.id) ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3 animate-in fade-in-50 slide-in-from-top-2 duration-200">
              <MarkdownEditor
                value={data[page.id as keyof StaticPagesData]}
                onChange={(value) => onChange({ ...data, [page.id]: value })}
                placeholder={page.placeholder}
              />
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  )
}
