"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Layout, ShoppingBag, FileText, Briefcase } from "lucide-react"

interface Template {
  id: string
  name: string
  description: string
  category: string
  icon: React.ReactNode
  features: string[]
  preview: string
}

const templates: Template[] = [
  {
    id: "landing",
    name: "Landing Page",
    description: "Perfect for product launches and marketing campaigns",
    category: "Marketing",
    icon: <Layout className="h-5 w-5" />,
    features: ["Hero Section", "Features Grid", "CTA Buttons", "Testimonials"],
    preview: "/landing-page-template-preview.jpg",
  },
  {
    id: "ecommerce",
    name: "E-Commerce Store",
    description: "Complete online store with cart and checkout",
    category: "Commerce",
    icon: <ShoppingBag className="h-5 w-5" />,
    features: ["Product Grid", "Shopping Cart", "Checkout Flow", "User Accounts"],
    preview: "/ecommerce-store-template-preview.jpg",
  },
  {
    id: "blog",
    name: "Blog & Articles",
    description: "Content-focused template for writers and publishers",
    category: "Content",
    icon: <FileText className="h-5 w-5" />,
    features: ["Article Layout", "Categories", "Search", "Comments"],
    preview: "/blog-template-preview.jpg",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Showcase your work with style and elegance",
    category: "Personal",
    icon: <Briefcase className="h-5 w-5" />,
    features: ["Project Gallery", "About Section", "Contact Form", "Resume"],
    preview: "/portfolio-template-preview.png",
  },
]

interface TemplateSelectorProps {
  selectedTemplate: string
  onTemplateChange: (templateId: string) => void
}

export function TemplateSelector({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
  const currentTemplate = templates.find((t) => t.id === selectedTemplate)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Layout className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Choose a Template</CardTitle>
        </div>
        <CardDescription>Select a template to get started with your new website</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedTemplate} onValueChange={onTemplateChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a template..." />
          </SelectTrigger>
          <SelectContent>
            {templates.map((template) => (
              <SelectItem key={template.id} value={template.id}>
                <div className="flex items-center gap-2">
                  {template.icon}
                  <span>{template.name}</span>
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {template.category}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {currentTemplate && (
          <div className="overflow-hidden rounded-lg border border-border animate-in fade-in-50 duration-300">
            <div className="relative">
              <img
                src={currentTemplate.preview || "/placeholder.svg"}
                alt={`${currentTemplate.name} preview`}
                className="w-full h-48 object-cover"
              />
              <Badge className="absolute top-3 right-3">{currentTemplate.category}</Badge>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                {currentTemplate.icon}
                <h3 className="font-semibold text-foreground">{currentTemplate.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{currentTemplate.description}</p>
              <div>
                <h4 className="text-sm font-medium mb-2 text-foreground">Features included:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {currentTemplate.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
