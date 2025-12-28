"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Building } from "lucide-react"

interface OrganizationData {
  name: string
  legalName: string
  description: string
  foundedYear: string
  industry: string
  website: string
  logo: string
}

interface OrganizationInformationProps {
  data: OrganizationData
  onChange: (data: OrganizationData) => void
}

export function OrganizationInformation({ data, onChange }: OrganizationInformationProps) {
  const handleChange = (field: keyof OrganizationData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Building className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Organization Information</CardTitle>
        </div>
        <CardDescription>Provide details about your organization</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="org-name">Organization Name</Label>
            <Input
              id="org-name"
              placeholder="Acme Inc."
              value={data.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="org-legal-name">Legal Name</Label>
            <Input
              id="org-legal-name"
              placeholder="Acme Incorporated"
              value={data.legalName}
              onChange={(e) => handleChange("legalName", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="org-description">Organization Description</Label>
          <Textarea
            id="org-description"
            placeholder="Brief description of your organization and what it does..."
            value={data.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="org-founded">Founded Year</Label>
            <Input
              id="org-founded"
              placeholder="2020"
              value={data.foundedYear}
              onChange={(e) => handleChange("foundedYear", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="org-industry">Industry</Label>
            <Input
              id="org-industry"
              placeholder="Technology"
              value={data.industry}
              onChange={(e) => handleChange("industry", e.target.value)}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="org-website">Organization Website</Label>
          <Input
            id="org-website"
            placeholder="https://www.acme.com"
            value={data.website}
            onChange={(e) => handleChange("website", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="org-logo">Logo URL</Label>
          <Input
            id="org-logo"
            placeholder="https://www.acme.com/logo.png"
            value={data.logo}
            onChange={(e) => handleChange("logo", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">URL to your organization logo (PNG or SVG recommended)</p>
        </div>
      </CardContent>
    </Card>
  )
}
