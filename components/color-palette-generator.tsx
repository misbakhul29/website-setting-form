"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Palette, Check, X, Save } from "lucide-react"

interface ColorPalette {
  name: string
  primary: string
  secondary: string
  colors: Record<number, string>
}

const shades = [50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900]

// Color harmony functions
function hexToHsl(hex: string): [number, number, number] {
  const r = Number.parseInt(hex.slice(1, 3), 16) / 255
  const g = Number.parseInt(hex.slice(3, 5), 16) / 255
  const b = Number.parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return [h * 360, s * 100, l * 100]
}

function hslToHex(h: number, s: number, l: number): string {
  h = h % 360
  if (h < 0) h += 360
  s = Math.max(0, Math.min(100, s))
  l = Math.max(0, Math.min(100, l))

  s /= 100
  l /= 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2

  let r = 0,
    g = 0,
    b = 0

  if (0 <= h && h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= h && h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= h && h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= h && h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= h && h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= h && h < 360) {
    r = c
    g = 0
    b = x
  }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

function generateColorShades(hex: string): Record<number, string> {
  const [h, s, l] = hexToHsl(hex)
  const shades: Record<number, string> = {}

  shades[50] = hslToHex(h, s, 95)
  shades[100] = hslToHex(h, s, 90)
  shades[150] = hslToHex(h, s, 85)
  shades[200] = hslToHex(h, s, 80)
  shades[300] = hslToHex(h, s, 70)
  shades[400] = hslToHex(h, s, 60)
  shades[500] = hslToHex(h, s, 50)
  shades[600] = hslToHex(h, s, 40)
  shades[700] = hslToHex(h, s, 30)
  shades[800] = hslToHex(h, s, 20)
  shades[900] = hslToHex(h, s, 10)

  return shades
}

function generateComplementaryColor(hex: string): string {
  const [h, s, l] = hexToHsl(hex)
  return hslToHex((h + 180) % 360, s, l)
}

function generateAnalogousColors(hex: string): string[] {
  const [h, s, l] = hexToHsl(hex)
  return [hslToHex((h + 30) % 360, s, l), hslToHex((h - 30 + 360) % 360, s, l)]
}

function generateTriadicColors(hex: string): string[] {
  const [h, s, l] = hexToHsl(hex)
  return [hslToHex((h + 120) % 360, s, l), hslToHex((h + 240) % 360, s, l)]
}

export function ColorPaletteGenerator() {
  const [primaryColor, setPrimaryColor] = useState("#3B82F6")
  const [harmonyMode, setHarmonyMode] = useState<"complementary" | "analogous" | "triadic">("complementary")
  const [secondaryColor, setSecondaryColor] = useState(generateComplementaryColor("#3B82F6"))
  const [palettes, setPalettes] = useState<ColorPalette[]>([])
  const [paletteName, setPaletteName] = useState("")
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  const primaryShades = generateColorShades(primaryColor)
  const secondaryShades = generateColorShades(secondaryColor)

  const handlePrimaryColorChange = (color: string) => {
    setPrimaryColor(color)
    updateSecondaryColor(color)
  }

  const updateSecondaryColor = (primary: string) => {
    let secondary = primary
    if (harmonyMode === "complementary") {
      secondary = generateComplementaryColor(primary)
    } else if (harmonyMode === "analogous") {
      secondary = generateAnalogousColors(primary)[0]
    } else if (harmonyMode === "triadic") {
      secondary = generateTriadicColors(primary)[1]
    }
    setSecondaryColor(secondary)
  }

  const handleHarmonyModeChange = (mode: "complementary" | "analogous" | "triadic") => {
    setHarmonyMode(mode)
    updateSecondaryColor(primaryColor)
  }

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color)
    setCopiedColor(color)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const savePalette = () => {
    if (!paletteName.trim()) return

    const newPalette: ColorPalette = {
      name: paletteName,
      primary: primaryColor,
      secondary: secondaryColor,
      colors: { ...primaryShades, ...secondaryShades },
    }

    setPalettes([...palettes, newPalette])
    setPaletteName("")
  }

  const loadPalette = (palette: ColorPalette) => {
    setPrimaryColor(palette.primary)
    setSecondaryColor(palette.secondary)
  }

  const removePalette = (index: number) => {
    setPalettes(palettes.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {/* Primary Color Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Color Palette Generator
          </CardTitle>
          <CardDescription>Create and manage color palettes with harmony schemes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Color Pickers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex items-center gap-3 mt-2">
                <input
                  id="primary-color"
                  type="color"
                  value={primaryColor}
                  onChange={(e) => handlePrimaryColorChange(e.target.value)}
                  className="h-12 w-20 rounded cursor-pointer border border-border"
                />
                <Input
                  value={primaryColor}
                  onChange={(e) => handlePrimaryColorChange(e.target.value)}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="secondary-color">Secondary Color (Auto-generated)</Label>
              <div className="flex items-center gap-3 mt-2">
                <div className="h-12 w-20 rounded border border-border" style={{ backgroundColor: secondaryColor }} />
                <Input value={secondaryColor} readOnly className="flex-1" />
              </div>
            </div>
          </div>

          {/* Harmony Mode Selection */}
          <div>
            <Label>Color Harmony Scheme</Label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {["complementary", "analogous", "triadic"].map((mode) => (
                <Button
                  key={mode}
                  variant={harmonyMode === mode ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleHarmonyModeChange(mode as typeof harmonyMode)}
                  className="capitalize"
                >
                  {mode}
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {harmonyMode === "complementary" &&
                "Complementary colors are opposite on the color wheel for high contrast."}
              {harmonyMode === "analogous" && "Analogous colors are adjacent on the color wheel for harmony."}
              {harmonyMode === "triadic" && "Triadic colors are evenly spaced around the color wheel for balance."}
            </p>
          </div>

          {/* Save Palette */}
          <div className="flex gap-2">
            <Input
              value={paletteName}
              onChange={(e) => setPaletteName(e.target.value)}
              placeholder="Enter palette name..."
              onKeyPress={(e) => e.key === "Enter" && savePalette()}
            />
            <Button onClick={savePalette} disabled={!paletteName.trim()} className="gap-2">
              <Save className="h-4 w-4" />
              Save
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Color Shades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primary Shades */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Primary Color Shades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {shades.map((shade) => (
                <div
                  key={shade}
                  className="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer transition"
                  onClick={() => copyToClipboard(primaryShades[shade])}
                >
                  <div
                    className="w-10 h-10 rounded border border-border flex-shrink-0"
                    style={{ backgroundColor: primaryShades[shade] }}
                  />
                  <div className="flex-1 text-sm">
                    <p className="font-medium">Shade {shade}</p>
                    <p className="text-xs text-muted-foreground">{primaryShades[shade]}</p>
                  </div>
                  {copiedColor === primaryShades[shade] ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Secondary Shades */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Secondary Color Shades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {shades.map((shade) => (
                <div
                  key={shade}
                  className="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer transition"
                  onClick={() => copyToClipboard(secondaryShades[shade])}
                >
                  <div
                    className="w-10 h-10 rounded border border-border flex-shrink-0"
                    style={{ backgroundColor: secondaryShades[shade] }}
                  />
                  <div className="flex-1 text-sm">
                    <p className="font-medium">Shade {shade}</p>
                    <p className="text-xs text-muted-foreground">{secondaryShades[shade]}</p>
                  </div>
                  {copiedColor === secondaryShades[shade] ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Saved Palettes */}
      {palettes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Saved Palettes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {palettes.map((palette, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border hover:border-primary transition cursor-pointer"
                  onClick={() => loadPalette(palette)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium text-sm">{palette.name}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removePalette(index)
                      }}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <div
                      className="flex-1 h-16 rounded border border-border"
                      style={{ backgroundColor: palette.primary }}
                    />
                    <div
                      className="flex-1 h-16 rounded border border-border"
                      style={{ backgroundColor: palette.secondary }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Color Combination Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-lg text-white" style={{ backgroundColor: primaryColor }}>
              <h3 className="text-lg font-bold mb-2">Primary Button</h3>
              <p className="text-sm opacity-90">This is how your primary color looks with text</p>
            </div>
            <div className="p-6 rounded-lg text-white" style={{ backgroundColor: secondaryColor }}>
              <h3 className="text-lg font-bold mb-2">Secondary Button</h3>
              <p className="text-sm opacity-90">This is how your secondary color looks with text</p>
            </div>
          </div>
          <div className="p-6 rounded-lg border-2" style={{ borderColor: primaryColor }}>
            <h3 className="text-lg font-bold mb-2" style={{ color: primaryColor }}>
              Accent Text
            </h3>
            <p className="text-sm text-muted-foreground">This shows how the primary color works for text and borders</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
