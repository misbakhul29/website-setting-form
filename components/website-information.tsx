"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileType } from "lucide-react"

interface WebsiteData {
  name: string
  description: string
}

interface WebsiteInformationProps {
  data: WebsiteData
  onChange: (data: WebsiteData) => void
}

export function WebsiteInformation({ data, onChange }: WebsiteInformationProps) {
  const handleChange = (field: keyof WebsiteData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileType className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Website Information</CardTitle>
        </div>
        <CardDescription>Basic information about your website</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="website-name">Website Name</Label>
          <Input
            id="website-name"
            placeholder="My Awesome Website"
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            The name of your website as it will appear in the browser tab and headers
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website-description">Website Description</Label>
          <Textarea
            id="website-description"
            placeholder="A brief description of what your website is about..."
            value={data.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={3}
          />
          <p className="text-xs text-muted-foreground">A short summary describing the purpose of your website</p>
        </div>
      </CardContent>
    </Card>
  )
}
