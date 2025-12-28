"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Zap } from "lucide-react"

interface RobotsMetaData {
  robotsContent: string
  allowIndexing: boolean
  allowFollowLinks: boolean
  allowImageIndexing: boolean
  customRobotsTxt: string
}

interface RobotsMetaProps {
  data: RobotsMetaData
  onChange: (data: RobotsMetaData) => void
}

export function RobotsMeta({ data, onChange }: RobotsMetaProps) {
  const handleChange = (field: keyof RobotsMetaData, value: string | boolean) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Robots & Crawling Settings</CardTitle>
        </div>
        <CardDescription>Control how search engines crawl and index your website</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Label>Meta Robots Settings</Label>
          <p className="text-xs text-muted-foreground">Choose which content should be indexed by search engines</p>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 p-3 rounded-md border border-border hover:bg-accent/50 transition-colors">
              <Checkbox
                id="allow-indexing"
                checked={data.allowIndexing}
                onCheckedChange={(checked) => handleChange("allowIndexing", checked as boolean)}
              />
              <label htmlFor="allow-indexing" className="text-sm cursor-pointer flex-1">
                Allow search engines to index this site
              </label>
            </div>

            <div className="flex items-center space-x-2 p-3 rounded-md border border-border hover:bg-accent/50 transition-colors">
              <Checkbox
                id="allow-follow-links"
                checked={data.allowFollowLinks}
                onCheckedChange={(checked) => handleChange("allowFollowLinks", checked as boolean)}
              />
              <label htmlFor="allow-follow-links" className="text-sm cursor-pointer flex-1">
                Allow following links from this site
              </label>
            </div>

            <div className="flex items-center space-x-2 p-3 rounded-md border border-border hover:bg-accent/50 transition-colors">
              <Checkbox
                id="allow-image-indexing"
                checked={data.allowImageIndexing}
                onCheckedChange={(checked) => handleChange("allowImageIndexing", checked as boolean)}
              />
              <label htmlFor="allow-image-indexing" className="text-sm cursor-pointer flex-1">
                Allow images on this site to be indexed
              </label>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="robots-content">Meta Robots Content</Label>
          <Textarea
            id="robots-content"
            placeholder="index, follow"
            value={data.robotsContent}
            onChange={(e) => handleChange("robotsContent", e.target.value)}
            rows={2}
          />
          <p className="text-xs text-muted-foreground">
            Common values: index, noindex, follow, nofollow, max-snippet:-1, max-image-preview:large
          </p>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="custom-robots">Custom robots.txt Content</Label>
          <Textarea
            id="custom-robots"
            placeholder="User-agent: *\nDisallow: /admin/"
            value={data.customRobotsTxt}
            onChange={(e) => handleChange("customRobotsTxt", e.target.value)}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            Define rules for search engine crawlers. Leave empty to use default settings.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
