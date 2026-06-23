export const packageLabels = {
  en: { digitalFoundation: "Digital Foundation", growthSetup: "Growth Setup", aiDataUpgrade: "AI/Data Upgrade" },
  de: { digitalFoundation: "Digitale Grundlage", growthSetup: "Wachstums-Setup", aiDataUpgrade: "KI- und Daten-Upgrade" },
  hu: { digitalFoundation: "Digitális alapcsomag", growthSetup: "Növekedési csomag", aiDataUpgrade: "AI/adat fejlesztés" },
  pl: { digitalFoundation: "Fundament cyfrowy", growthSetup: "Pakiet wzrostu", aiDataUpgrade: "Rozbudowa AI i danych" },
  es: { digitalFoundation: "Base digital", growthSetup: "Configuración de crecimiento", aiDataUpgrade: "Mejora de IA y datos" },
  fr: { digitalFoundation: "Base digitale", growthSetup: "Configuration croissance", aiDataUpgrade: "Amélioration IA et données" },
  it: { digitalFoundation: "Base digitale", growthSetup: "Pacchetto crescita", aiDataUpgrade: "Upgrade AI e dati" },
  cz: { digitalFoundation: "Digitální základ", growthSetup: "Růstový balíček", aiDataUpgrade: "AI a datové rozšíření" },
  pt: { digitalFoundation: "Base digital", growthSetup: "Pacote de crescimento", aiDataUpgrade: "Upgrade de IA e dados" },
  da: { digitalFoundation: "Digitalt fundament", growthSetup: "Vækstpakke", aiDataUpgrade: "AI- og dataopgradering" },
  nl: { digitalFoundation: "Digitale basis", growthSetup: "Groeipakket", aiDataUpgrade: "AI- en data-upgrade" },
  ja: { digitalFoundation: "デジタル基盤", growthSetup: "成長支援パッケージ", aiDataUpgrade: "AI・データ強化" },
} as const;

export function getPackageLabels(locale: string) {
  return packageLabels[locale as keyof typeof packageLabels] ?? packageLabels.en;
}
