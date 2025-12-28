"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search } from "lucide-react"

interface SEOData {
  title: string
  description: string
  keywords: string
  ogImage: string
}

interface SEOSettingsProps {
  data: SEOData
  onChange: (data: SEOData) => void
}

export function SEOSettings({ data, onChange }: SEOSettingsProps) {
  const handleChange = (field: keyof SEOData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">SEO Settings</CardTitle>
        </div>
        <CardDescription>Optimize your website for search engines</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="seo-title">Page Title</Label>
          <Input
            id="seo-title"
            placeholder="My Awesome Website"
            value={data.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">{data.title.length}/60 characters recommended</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="seo-description">Meta Description</Label>
          <Textarea
            id="seo-description"
            placeholder="A brief description of your website that will appear in search results..."
            value={data.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={3}
          />
          <p className="text-xs text-muted-foreground">{data.description.length}/160 characters recommended</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="seo-keywords">Keywords</Label>
          <Input
            id="seo-keywords"
            placeholder="website, business, services"
            value={data.keywords}
            onChange={(e) => handleChange("keywords", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Separate keywords with commas</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="seo-og-image">Open Graph Image URL</Label>
          <Input
            id="seo-og-image"
            placeholder="https://example.com/og-image.jpg"
            value={data.ogImage}
            onChange={(e) => handleChange("ogImage", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Image shown when sharing on social media (1200x630px recommended)
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
