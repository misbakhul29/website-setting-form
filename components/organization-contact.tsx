"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Phone } from "lucide-react"

interface ContactData {
  email: string
  phone: string
  fax: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
}

interface OrganizationContactProps {
  data: ContactData
  onChange: (data: ContactData) => void
}

export function OrganizationContact({ data, onChange }: OrganizationContactProps) {
  const handleChange = (field: keyof ContactData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Organization Contact</CardTitle>
        </div>
        <CardDescription>Contact information for your organization</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email Address</Label>
            <Input
              id="contact-email"
              type="email"
              placeholder="contact@acme.com"
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-phone">Phone Number</Label>
            <Input
              id="contact-phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={data.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-fax">Fax Number (Optional)</Label>
          <Input
            id="contact-fax"
            type="tel"
            placeholder="+1 (555) 123-4568"
            value={data.fax}
            onChange={(e) => handleChange("fax", e.target.value)}
          />
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="contact-address">Street Address</Label>
          <Input
            id="contact-address"
            placeholder="123 Main Street, Suite 100"
            value={data.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contact-city">City</Label>
            <Input
              id="contact-city"
              placeholder="San Francisco"
              value={data.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-state">State / Province</Label>
            <Input
              id="contact-state"
              placeholder="California"
              value={data.state}
              onChange={(e) => handleChange("state", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contact-postal">Postal Code</Label>
            <Input
              id="contact-postal"
              placeholder="94102"
              value={data.postalCode}
              onChange={(e) => handleChange("postalCode", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-country">Country</Label>
            <Input
              id="contact-country"
              placeholder="United States"
              value={data.country}
              onChange={(e) => handleChange("country", e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
