"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Link } from "lucide-react"

interface DomainData {
  domain: string
  useSubdomain: boolean
  subdomain: string
}

interface DomainConfigurationProps {
  data: DomainData
  onChange: (data: DomainData) => void
}

export function DomainConfiguration({ data, onChange }: DomainConfigurationProps) {
  const handleChange = (field: keyof DomainData, value: string | boolean) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Link className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Domain Configuration</CardTitle>
        </div>
        <CardDescription>Set up your website domain and subdomain</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="domain">Domain Name</Label>
          <Input
            id="domain"
            placeholder="example.com"
            value={data.domain}
            onChange={(e) => handleChange("domain", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Enter your main domain without http:// or www</p>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="use-subdomain">Use Subdomain</Label>
            <p className="text-xs text-muted-foreground">Enable if you want to use a subdomain</p>
          </div>
          <Switch
            id="use-subdomain"
            checked={data.useSubdomain}
            onCheckedChange={(checked) => handleChange("useSubdomain", checked)}
          />
        </div>

        {data.useSubdomain && (
          <div className="space-y-2 animate-in fade-in-50 slide-in-from-top-2 duration-200">
            <Label htmlFor="subdomain">Subdomain</Label>
            <div className="flex items-center gap-2">
              <Input
                id="subdomain"
                placeholder="blog"
                value={data.subdomain}
                onChange={(e) => handleChange("subdomain", e.target.value)}
                className="flex-1"
              />
              <span className="text-muted-foreground">.{data.domain || "example.com"}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Your site will be accessible at {data.subdomain || "blog"}.{data.domain || "example.com"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
