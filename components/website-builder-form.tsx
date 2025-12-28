"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { OrganizationInformation } from "@/components/organization-information"
import { OrganizationContact } from "@/components/organization-contact"
import { WebsiteInformation } from "@/components/website-information"
import { ColorPaletteGenerator } from "@/components/color-palette-generator"
import { DomainConfiguration } from "@/components/domain-configuration"
import { LanguageSelector } from "@/components/language-selector"
import { TemplateSelector } from "@/components/template-selector"
import { StaticPages } from "@/components/static-pages"
import { SEOSettings } from "@/components/seo-settings"
import { MetaVerification } from "@/components/meta-verification"
import { RobotsMeta } from "@/components/robots-meta"

export function WebsiteBuilderForm() {
  const [organization, setOrganization] = useState({
    name: "",
    legalName: "",
    description: "",
    foundedYear: "",
    industry: "",
    website: "",
    logo: "",
  })

  const [contact, setContact] = useState({
    email: "",
    phone: "",
    fax: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  })

  const [website, setWebsite] = useState({
    name: "",
    description: "",
  })

  const [domain, setDomain] = useState({
    domain: "",
    useSubdomain: false,
    subdomain: "",
  })

  const [selectedLocale, setSelectedLocale] = useState("en")
  const [alternateLocales, setAlternateLocales] = useState<string[]>([])

  const [selectedTemplate, setSelectedTemplate] = useState("")

  const [staticPages, setStaticPages] = useState({
    aboutUs: "",
    contactUs: "",
    termsOfService: "",
    disclaimer: "",
    privacyPolicy: "",
  })

  const [seo, setSeo] = useState({
    title: "",
    description: "",
    keywords: "",
    ogImage: "",
  })

  const [metaVerification, setMetaVerification] = useState({
    googleSiteVerification: "",
    yandexVerification: "",
    bingMsvalidate: "",
    pinterestVerification: "",
    additionalMeta: "",
  })

  const [robotsMeta, setRobotsMeta] = useState({
    robotsContent: "index, follow",
    allowIndexing: true,
    allowFollowLinks: true,
    allowImageIndexing: true,
    customRobotsTxt: "",
  })

  const handlePrimaryLocaleChange = (locale: string) => {
    setSelectedLocale(locale)
    setAlternateLocales((prev) => prev.filter((code) => code !== locale))
  }

  const handleAlternateLocalesChange = (locales: string[]) => {
    setAlternateLocales(locales)
  }

  const handleCreateWebsite = () => {
    if (!selectedTemplate) {
      alert("Please select a template")
      return
    }

    const formData = {
      organization,
      contact,
      website,
      domain,
      locales: {
        primary: selectedLocale,
        alternates: alternateLocales,
      },
      template: selectedTemplate,
      staticPages,
      seo,
      metaVerification,
      robotsMeta,
    }

    console.log("[v0] Form submitted with data:", formData)
    // Handle form submission here
  }

  return (
    <form
      className="w-full max-w-4xl mx-auto space-y-8 py-8"
      onSubmit={(e) => {
        e.preventDefault()
        handleCreateWebsite()
      }}
    >
      {/* Organization Section */}
      <OrganizationInformation data={organization} onChange={setOrganization} />

      {/* Contact Section */}
      <OrganizationContact data={contact} onChange={setContact} />

      {/* Website Info Section */}
      <WebsiteInformation data={website} onChange={setWebsite} />

      {/* Color Palette Section */}
      <ColorPaletteGenerator />

      {/* Domain Section */}
      <DomainConfiguration data={domain} onChange={setDomain} />

      {/* Language Section */}
      <LanguageSelector
        primaryLocale={selectedLocale}
        alternateLocales={alternateLocales}
        onPrimaryLocaleChange={handlePrimaryLocaleChange}
        onAlternateLocalesChange={handleAlternateLocalesChange}
      />

      {/* Template Section */}
      <TemplateSelector selectedTemplate={selectedTemplate} onTemplateChange={setSelectedTemplate} />

      {/* Static Pages Section */}
      <StaticPages data={staticPages} onChange={setStaticPages} />

      {/* SEO Settings Section */}
      <SEOSettings data={seo} onChange={setSeo} />

      {/* Meta Verification Section */}
      <MetaVerification data={metaVerification} onChange={setMetaVerification} />

      {/* Robots Meta Section */}
      <RobotsMeta data={robotsMeta} onChange={setRobotsMeta} />

      {/* Submit Button */}
      <Button className="w-full" size="lg" disabled={!selectedTemplate}>
        Create Website
      </Button>
    </form>
  )
}
