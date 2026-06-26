export const packageLabels = {
  en: { digitalFoundation: "Digital Foundation", growthSetup: "Growth Setup", aiDataUpgrade: "AI/Data Upgrade", websiteMaintenance: "Website Maintenance" },
  de: { digitalFoundation: "Digitale Grundlage", growthSetup: "Wachstums-Setup", aiDataUpgrade: "KI- und Daten-Upgrade", websiteMaintenance: "Website-Wartung" },
  hu: { digitalFoundation: "Digitális alapcsomag", growthSetup: "Növekedési csomag", aiDataUpgrade: "AI/adat fejlesztés", websiteMaintenance: "Weboldal karbantartás" },
  pl: { digitalFoundation: "Fundament cyfrowy", growthSetup: "Pakiet wzrostu", aiDataUpgrade: "Rozbudowa AI i danych", websiteMaintenance: "Utrzymanie strony" },
  es: { digitalFoundation: "Base digital", growthSetup: "Configuración de crecimiento", aiDataUpgrade: "Mejora de IA y datos", websiteMaintenance: "Mantenimiento web" },
  fr: { digitalFoundation: "Base digitale", growthSetup: "Configuration croissance", aiDataUpgrade: "Amélioration IA et données", websiteMaintenance: "Maintenance de site" },
  it: { digitalFoundation: "Base digitale", growthSetup: "Pacchetto crescita", aiDataUpgrade: "Upgrade AI e dati", websiteMaintenance: "Manutenzione sito" },
  cz: { digitalFoundation: "Digitální základ", growthSetup: "Růstový balíček", aiDataUpgrade: "AI a datové rozšíření", websiteMaintenance: "Údržba webu" },
  sk: { digitalFoundation: "Digitálny základ", growthSetup: "Rastový balík", aiDataUpgrade: "AI a dátové rozšírenie", websiteMaintenance: "Údržba webu" },
  pt: { digitalFoundation: "Base digital", growthSetup: "Pacote de crescimento", aiDataUpgrade: "Upgrade de IA e dados", websiteMaintenance: "Manutenção de site" },
  da: { digitalFoundation: "Digitalt fundament", growthSetup: "Vækstpakke", aiDataUpgrade: "AI- og dataopgradering", websiteMaintenance: "Website-vedligeholdelse" },
  nl: { digitalFoundation: "Digitale basis", growthSetup: "Groeipakket", aiDataUpgrade: "AI- en data-upgrade", websiteMaintenance: "Website-onderhoud" },
  ja: { digitalFoundation: "デジタル基盤", growthSetup: "成長支援パッケージ", aiDataUpgrade: "AI・データ強化", websiteMaintenance: "Webサイト保守" },
} as const;

export function getPackageLabels(locale: string) {
  return packageLabels[locale as keyof typeof packageLabels] ?? packageLabels.en;
}
