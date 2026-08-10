export const packageLabels = {
  en: { digitalAudit: "Website Review", digitalFoundation: "Digital Foundation", growthSetup: "Growth Setup", aiDataUpgrade: "AI/Data Upgrade", websiteMaintenance: "Website Maintenance" },
  de: { digitalAudit: "Website-Check", digitalFoundation: "Digitale Grundlage", growthSetup: "Wachstums-Setup", aiDataUpgrade: "KI- und Daten-Upgrade", websiteMaintenance: "Website-Wartung" },
  hu: { digitalAudit: "Weboldal-áttekintés", digitalFoundation: "Digitális alapcsomag", growthSetup: "Növekedési csomag", aiDataUpgrade: "AI/adat fejlesztés", websiteMaintenance: "Weboldal karbantartás" },
  pl: { digitalAudit: "Przegląd strony", digitalFoundation: "Fundament cyfrowy", growthSetup: "Pakiet wzrostu", aiDataUpgrade: "Rozbudowa AI i danych", websiteMaintenance: "Utrzymanie strony" },
  es: { digitalAudit: "Revisión web", digitalFoundation: "Base digital", growthSetup: "Configuración de crecimiento", aiDataUpgrade: "Mejora de IA y datos", websiteMaintenance: "Mantenimiento web" },
  fr: { digitalAudit: "Revue de site", digitalFoundation: "Base digitale", growthSetup: "Configuration croissance", aiDataUpgrade: "Amélioration IA et données", websiteMaintenance: "Maintenance de site" },
  it: { digitalAudit: "Revisione sito", digitalFoundation: "Base digitale", growthSetup: "Pacchetto crescita", aiDataUpgrade: "Upgrade AI e dati", websiteMaintenance: "Manutenzione sito" },
  cz: { digitalAudit: "Kontrola webu", digitalFoundation: "Digitální základ", growthSetup: "Růstový balíček", aiDataUpgrade: "AI a datové rozšíření", websiteMaintenance: "Údržba webu" },
  sk: { digitalAudit: "Kontrola webu", digitalFoundation: "Digitálny základ", growthSetup: "Rastový balík", aiDataUpgrade: "AI a dátové rozšírenie", websiteMaintenance: "Údržba webu" },
  pt: { digitalAudit: "Revisão do site", digitalFoundation: "Base digital", growthSetup: "Pacote de crescimento", aiDataUpgrade: "Upgrade de IA e dados", websiteMaintenance: "Manutenção de site" },
  da: { digitalAudit: "Website-gennemgang", digitalFoundation: "Digitalt fundament", growthSetup: "Vækstpakke", aiDataUpgrade: "AI- og dataopgradering", websiteMaintenance: "Website-vedligeholdelse" },
  nl: { digitalAudit: "Websitecheck", digitalFoundation: "Digitale basis", growthSetup: "Groeipakket", aiDataUpgrade: "AI- en data-upgrade", websiteMaintenance: "Website-onderhoud" },
  ja: { digitalAudit: "Webサイトレビュー", digitalFoundation: "デジタル基盤", growthSetup: "成長支援パッケージ", aiDataUpgrade: "AI・データ強化", websiteMaintenance: "Webサイト保守" },
} as const;

export function getPackageLabels(locale: string) {
  return packageLabels[locale as keyof typeof packageLabels] ?? packageLabels.en;
}
