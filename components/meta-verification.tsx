"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Shield } from "lucide-react"

interface MetaVerificationData {
  googleSiteVerification: string
  yandexVerification: string
  bingMsvalidate: string
  pinterestVerification: string
  additionalMeta: string
}

interface MetaVerificationProps {
  data: MetaVerificationData
  onChange: (data: MetaVerificationData) => void
}

export function MetaVerification({ data, onChange }: MetaVerificationProps) {
  const handleChange = (field: keyof MetaVerificationData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Meta Verification</CardTitle>
        </div>
        <CardDescription>Add verification codes from search engines and services</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="google-verification">
            Google Site Verification{" "}
            <Badge variant="secondary" className="ml-2 text-xs">
              Google Search Console
            </Badge>
          </Label>
          <Input
            id="google-verification"
            placeholder="Paste your Google verification meta tag content here"
            value={data.googleSiteVerification}
            onChange={(e) => handleChange("googleSiteVerification", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">The content attribute value from Google&apos;s meta tag</p>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="yandex-verification">
            Yandex Verification{" "}
            <Badge variant="secondary" className="ml-2 text-xs">
              Yandex Webmaster
            </Badge>
          </Label>
          <Input
            id="yandex-verification"
            placeholder="Paste your Yandex verification meta tag content here"
            value={data.yandexVerification}
            onChange={(e) => handleChange("yandexVerification", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">The content attribute value from Yandex&apos;s meta tag</p>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="bing-msvalidate">
            Bing Verification{" "}
            <Badge variant="secondary" className="ml-2 text-xs">
              Bing Webmaster Tools
            </Badge>
          </Label>
          <Input
            id="bing-msvalidate"
            placeholder="Paste your Bing verification meta tag content here"
            value={data.bingMsvalidate}
            onChange={(e) => handleChange("bingMsvalidate", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">The content attribute value from Bing&apos;s meta tag</p>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="pinterest-verification">
            Pinterest Verification{" "}
            <Badge variant="secondary" className="ml-2 text-xs">
              Pinterest
            </Badge>
          </Label>
          <Input
            id="pinterest-verification"
            placeholder="Paste your Pinterest verification meta tag content here"
            value={data.pinterestVerification}
            onChange={(e) => handleChange("pinterestVerification", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">The content attribute value from Pinterest&apos;s meta tag</p>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="additional-meta">Additional Meta Tags</Label>
          <Textarea
            id="additional-meta"
            placeholder="Add any other custom meta tags here (one per line)"
            value={data.additionalMeta}
            onChange={(e) => handleChange("additionalMeta", e.target.value)}
            rows={3}
          />
          <p className="text-xs text-muted-foreground">Example: description=&quot;Your meta description&quot;</p>
        </div>
      </CardContent>
    </Card>
  )
}
