"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Globe } from "lucide-react"

const locales = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "id", name: "Indonesian", flag: "🇮🇩" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "pt", name: "Portuguese", flag: "🇧🇷" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
]

interface LanguageSelectorProps {
  primaryLocale: string
  alternateLocales: string[]
  onPrimaryLocaleChange: (locale: string) => void
  onAlternateLocalesChange: (locales: string[]) => void
}

export function LanguageSelector({
  primaryLocale,
  alternateLocales,
  onPrimaryLocaleChange,
  onAlternateLocalesChange,
}: LanguageSelectorProps) {
  const toggleAlternateLocale = (localeCode: string) => {
    if (localeCode === primaryLocale) return
    onAlternateLocalesChange(
      alternateLocales.includes(localeCode)
        ? alternateLocales.filter((code) => code !== localeCode)
        : [...alternateLocales, localeCode],
    )
  }

  const handleRemoveAlternate = (localeCode: string) => {
    toggleAlternateLocale(localeCode)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Language & Locale</CardTitle>
        </div>
        <CardDescription>Choose the primary and alternate languages for your website</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="locale">Primary Language</Label>
          <Select value={primaryLocale} onValueChange={onPrimaryLocaleChange}>
            <SelectTrigger id="locale" className="w-full">
              <SelectValue placeholder="Select language..." />
            </SelectTrigger>
            <SelectContent>
              {locales.map((locale) => (
                <SelectItem key={locale.code} value={locale.code}>
                  <div className="flex items-center gap-2">
                    <span>{locale.flag}</span>
                    <span>{locale.name}</span>
                    <span className="text-muted-foreground">({locale.code})</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="space-y-3">
          <Label>Alternate Languages</Label>
          <p className="text-xs text-muted-foreground">Select additional languages for multilingual support</p>
          <div className="grid grid-cols-2 gap-2">
            {locales
              .filter((locale) => locale.code !== primaryLocale)
              .map((locale) => (
                <div
                  key={locale.code}
                  className="flex items-center space-x-2 rounded-md border border-border p-2 hover:bg-accent/50 transition-colors"
                >
                  <Checkbox
                    id={`locale-${locale.code}`}
                    checked={alternateLocales.includes(locale.code)}
                    onCheckedChange={() => toggleAlternateLocale(locale.code)}
                  />
                  <label
                    htmlFor={`locale-${locale.code}`}
                    className="flex items-center gap-2 text-sm cursor-pointer flex-1"
                  >
                    <span>{locale.flag}</span>
                    <span>{locale.name}</span>
                  </label>
                </div>
              ))}
          </div>
        </div>

        {alternateLocales.length > 0 && (
          <div className="space-y-2 animate-in fade-in-50 duration-200">
            <Label>Selected Alternate Languages</Label>
            <div className="flex flex-wrap gap-2">
              {alternateLocales.map((code) => {
                const locale = locales.find((l) => l.code === code)
                return (
                  <Badge key={code} variant="secondary" className="flex items-center gap-1 pr-1">
                    <span>{locale?.flag}</span>
                    <span>{locale?.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAlternate(code)}
                      className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
