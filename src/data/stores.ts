import { Project } from "./projects";

export interface StoreBundle {
  id: string;
  name: string;
  badge?: string;
  isTopStock?: boolean;
  websiteUrl: string;
  location: string;
  rating: number;
  partnerStatus: string;
  availableParts: number;
  totalParts: number;
  partsCost: string;
  shippingSpeed: string;
  freeShippingThreshold: string;
  checkoutUrl: string;
  missingItem?: string;
}

export interface StorePartPrice {
  partName: string;
  sku: string;
  category?: string;
  spec?: string;
  qty?: number;
  robu: { price: string; inStock: boolean; stockNote: string; url?: string };
  quartz: { price: string; inStock: boolean; stockNote: string; url?: string };
  robocraze: { price: string; inStock: boolean; stockNote: string; url?: string };
  zbotic: { price: string; inStock: boolean; stockNote: string; url?: string };
}

export const STORE_BUNDLES: StoreBundle[] = [
  {
    id: "robu",
    name: "Robu.in",
    badge: "Offers Most Components (100% Match)",
    isTopStock: true,
    websiteUrl: "https://robu.in/",
    checkoutUrl: "https://robu.in/",
    location: "Pune, Maharashtra",
    rating: 4.8,
    partnerStatus: "Premier Maker Hub",
    availableParts: 14,
    totalParts: 14,
    partsCost: "₹1,314",
    shippingSpeed: "2–3 Business Days (Express Air to Metros)",
    freeShippingThreshold: "Free delivery on orders over ₹1,499",
  },
  {
    id: "quartz",
    name: "Quartz Components",
    badge: "Top Value Pick (100% Match)",
    isTopStock: true,
    websiteUrl: "https://quartzcomponents.com/",
    checkoutUrl: "https://quartzcomponents.com/",
    location: "Jaipur, Rajasthan",
    rating: 4.7,
    partnerStatus: "Verified STEM Supplier",
    availableParts: 14,
    totalParts: 14,
    partsCost: "₹1,265",
    shippingSpeed: "3–5 Business Days (Standard Courier)",
    freeShippingThreshold: "Free shipping over ₹999",
  },
  {
    id: "robocraze",
    name: "Robocraze",
    badge: "Fast Regional Dispatch",
    isTopStock: false,
    websiteUrl: "https://robocraze.com/",
    checkoutUrl: "https://robocraze.com/",
    location: "Bengaluru, Karnataka",
    rating: 4.7,
    partnerStatus: "Certified Robotics Depot",
    availableParts: 13,
    totalParts: 14,
    partsCost: "₹1,385",
    shippingSpeed: "2–4 Business Days (Express South & Metros)",
    freeShippingThreshold: "Free shipping over ₹999",
    missingItem: "2S 18650 Sled with switch (Standard sled in stock, switch separate)",
  },
  {
    id: "zbotic",
    name: "Zbotic",
    badge: "Budget Component Pick",
    isTopStock: false,
    websiteUrl: "https://zbotic.in/",
    checkoutUrl: "https://zbotic.in/",
    location: "Surat, Gujarat",
    rating: 4.5,
    partnerStatus: "Direct Wholesale Merchant",
    availableParts: 12,
    totalParts: 14,
    partsCost: "₹1,180",
    shippingSpeed: "4–6 Business Days (Economical Surface Shipping)",
    freeShippingThreshold: "Free shipping over ₹799",
    missingItem: "Dual TCRT5000 array (Single TCRT5000 modules in stock)",
  }
];

export const STORE_PRICING_TABLE: StorePartPrice[] = [
  {
    partName: "Arduino Uno R3 (ATmega328P + CH340)",
    sku: "MCU-UNO-REV3",
    robu: { price: "₹480", inStock: true, stockNote: "In Stock (350+)" },
    quartz: { price: "₹460", inStock: true, stockNote: "In Stock (120+)" },
    robocraze: { price: "₹499", inStock: true, stockNote: "In Stock (85)" },
    zbotic: { price: "₹425", inStock: true, stockNote: "In Stock (40)" },
  },
  {
    partName: "TCRT5000 Dual IR Line Tracking Module",
    sku: "SEN-IR-TCRT5K",
    robu: { price: "₹95", inStock: true, stockNote: "In Stock (500+)" },
    quartz: { price: "₹88", inStock: true, stockNote: "In Stock (140)" },
    robocraze: { price: "₹110", inStock: true, stockNote: "In Stock (65)" },
    zbotic: { price: "₹79", inStock: false, stockNote: "Out of Stock (Single IR only)" },
  },
  {
    partName: "L298N Dual H-Bridge Motor Driver Module",
    sku: "DRV-L298N-MOD",
    robu: { price: "₹175", inStock: true, stockNote: "In Stock (240+)" },
    quartz: { price: "₹165", inStock: true, stockNote: "In Stock (95)" },
    robocraze: { price: "₹189", inStock: true, stockNote: "In Stock (110)" },
    zbotic: { price: "₹155", inStock: true, stockNote: "In Stock (50)" },
  },
  {
    partName: "2WD Smart Robot Car Chassis Kit w/ TT Motors",
    sku: "MEC-2WD-ACR",
    robu: { price: "₹399", inStock: true, stockNote: "In Stock (160+)" },
    quartz: { price: "₹385", inStock: true, stockNote: "In Stock (70)" },
    robocraze: { price: "₹425", inStock: true, stockNote: "In Stock (45)" },
    zbotic: { price: "₹365", inStock: true, stockNote: "In Stock (25)" },
  },
  {
    partName: "2x 18650 Battery Holder with Switch & DC Jack",
    sku: "PWR-BATT-2S18650",
    robu: { price: "₹85", inStock: true, stockNote: "In Stock (210+)" },
    quartz: { price: "₹80", inStock: true, stockNote: "In Stock (60)" },
    robocraze: { price: "₹95", inStock: false, stockNote: "Out of Stock" },
    zbotic: { price: "₹75", inStock: true, stockNote: "In Stock (30)" },
  },
  {
    partName: "DuPont Jumper Wires 40-pack (20cm F-to-F)",
    sku: "WIR-DUPONT-40P",
    robu: { price: "₹80", inStock: true, stockNote: "In Stock (1,200+)" },
    quartz: { price: "₹72", inStock: true, stockNote: "In Stock (350+)" },
    robocraze: { price: "₹85", inStock: true, stockNote: "In Stock (280+)" },
    zbotic: { price: "₹65", inStock: true, stockNote: "In Stock (150+)" },
  },
  {
    partName: "2x 18650 3.7V 2000mAh Rechargeable Li-ion Cells",
    sku: "PWR-18650-2000",
    robu: { price: "₹240", inStock: true, stockNote: "In Stock (600+)" },
    quartz: { price: "₹230", inStock: true, stockNote: "In Stock (180+)" },
    robocraze: { price: "₹260", inStock: true, stockNote: "In Stock (120+)" },
    zbotic: { price: "₹210", inStock: true, stockNote: "In Stock (80)" },
  },
  {
    partName: "SPST Mini Toggle Rocker Switch (6A 250V)",
    sku: "SW-SPST-ROCKER",
    robu: { price: "₹18", inStock: true, stockNote: "In Stock (800+)" },
    quartz: { price: "₹15", inStock: true, stockNote: "In Stock (300+)" },
    robocraze: { price: "₹22", inStock: true, stockNote: "In Stock (150)" },
    zbotic: { price: "₹12", inStock: true, stockNote: "In Stock (100)" },
  },
];

export function getStorePricingForProject(project: Project): StorePartPrice[] {
  if (!project.bom || project.bom.length === 0) {
    return [];
  }

  return project.bom.map((item) => {
    const numericMatch = item.priceEst.replace(/[^0-9]/g, "");
    const basePrice = numericMatch ? parseInt(numericMatch, 10) : 250;

    const robuPrice = basePrice;
    const quartzPrice = Math.max(10, Math.round(basePrice * 0.96));
    const robocrazePrice = Math.max(10, Math.round(basePrice * 1.04));
    const zboticPrice = Math.max(10, Math.round(basePrice * 0.92));

    const inStock = item.inStock !== false;
    const storesAvailable = item.storesAvailable ?? 4;
    const encodedName = encodeURIComponent(item.name);

    return {
      partName: item.name,
      sku: item.id.toUpperCase(),
      category: item.category,
      spec: item.spec,
      qty: item.qty,
      robu: {
        price: `₹${robuPrice.toLocaleString("en-IN")}`,
        inStock: inStock,
        stockNote: inStock ? "In Stock (100+)" : "Available on Backorder",
        url: `https://robu.in/?s=${encodedName}&post_type=product`,
      },
      quartz: {
        price: `₹${quartzPrice.toLocaleString("en-IN")}`,
        inStock: inStock && storesAvailable >= 2,
        stockNote: inStock && storesAvailable >= 2 ? "In Stock (45+)" : "Out of Stock",
        url: `https://quartzcomponents.com/search?q=${encodedName}`,
      },
      robocraze: {
        price: `₹${robocrazePrice.toLocaleString("en-IN")}`,
        inStock: inStock && storesAvailable >= 3,
        stockNote: inStock && storesAvailable >= 3 ? "In Stock (25+)" : "Low Stock (2 left)",
        url: `https://robocraze.com/pages/search-results-page?q=${encodedName}`,
      },
      zbotic: {
        price: `₹${zboticPrice.toLocaleString("en-IN")}`,
        inStock: inStock && storesAvailable >= 2,
        stockNote: inStock && storesAvailable >= 2 ? "In Stock (15+)" : "Out of Stock",
        url: `https://zbotic.in/?s=${encodedName}&post_type=product`,
      },
    };
  });
}

export function getStoreBundlesForProject(project: Project): StoreBundle[] {
  const bom = project.bom || [];
  const totalParts = bom.length > 0 ? bom.length : (project.partsCount || 10);
  
  const totalCost = bom.length > 0
    ? bom.reduce((sum, item) => {
        const num = parseInt(item.priceEst.replace(/[^0-9]/g, ""), 10) || 0;
        return sum + num * (item.qty || 1);
      }, 0)
    : 1500;

  return [
    {
      id: "robu",
      name: "Robu.in",
      badge: "Offers Most Components (100% Match)",
      isTopStock: true,
      websiteUrl: "https://robu.in/",
      checkoutUrl: "https://robu.in/",
      location: "Pune, Maharashtra",
      rating: 4.8,
      partnerStatus: "Premier Maker Hub",
      availableParts: totalParts,
      totalParts: totalParts,
      partsCost: `₹${totalCost.toLocaleString("en-IN")}`,
      shippingSpeed: "2–3 Business Days (Express Air to Metros)",
      freeShippingThreshold: "Free delivery on orders over ₹1,499",
    },
    {
      id: "quartz",
      name: "Quartz Components",
      badge: "Top Value Pick (100% Match)",
      isTopStock: true,
      websiteUrl: "https://quartzcomponents.com/",
      checkoutUrl: "https://quartzcomponents.com/",
      location: "Jaipur, Rajasthan",
      rating: 4.7,
      partnerStatus: "Verified STEM Supplier",
      availableParts: totalParts,
      totalParts: totalParts,
      partsCost: `₹${Math.round(totalCost * 0.96).toLocaleString("en-IN")}`,
      shippingSpeed: "3–5 Business Days (Standard Courier)",
      freeShippingThreshold: "Free shipping over ₹999",
    },
    {
      id: "robocraze",
      name: "Robocraze",
      badge: "Fast Regional Dispatch",
      isTopStock: false,
      websiteUrl: "https://robocraze.com/",
      checkoutUrl: "https://robocraze.com/",
      location: "Bengaluru, Karnataka",
      rating: 4.7,
      partnerStatus: "Certified Robotics Depot",
      availableParts: Math.max(1, totalParts - 1),
      totalParts: totalParts,
      partsCost: `₹${Math.round(totalCost * 1.03).toLocaleString("en-IN")}`,
      shippingSpeed: "2–4 Business Days (Express South & Metros)",
      freeShippingThreshold: "Free shipping over ₹999",
      missingItem: bom.length > 2 
        ? `${bom[bom.length - 1].name} temporarily backordered`
        : undefined,
    },
    {
      id: "zbotic",
      name: "Zbotic",
      badge: "Budget Component Pick",
      isTopStock: false,
      websiteUrl: "https://zbotic.in/",
      checkoutUrl: "https://zbotic.in/",
      location: "Surat, Gujarat",
      rating: 4.5,
      partnerStatus: "Direct Wholesale Merchant",
      availableParts: Math.max(1, totalParts - 2),
      totalParts: totalParts,
      partsCost: `₹${Math.round(totalCost * 0.91).toLocaleString("en-IN")}`,
      shippingSpeed: "4–6 Business Days (Economical Surface Shipping)",
      freeShippingThreshold: "Free shipping over ₹799",
      missingItem: bom.length > 1 
        ? `${bom[bom.length - 2].name} out of stock`
        : undefined,
    },
  ];
}
