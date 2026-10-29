export interface SectorItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  metrics: { value: string; label: string }[];
  highlightSolutions: string[];
}

export const SECTORS_DATA: SectorItem[] = [
  {
    id: "finance",
    name: "Banking & Financial Services",
    tagline: "Ultra-low-latency compliance, automated risk modeling, and seamless core banking reconciliation.",
    description: "Eliminate manual verification backlogs. Nexsolia enables Tier-1 financial institutions to orchestrate automated KYC/AML checks, real-time wire dispute settlements, and algorithmic loan underwriting with strict auditability.",
    icon: "Landmark",
    metrics: [
      { value: "82%", label: "Faster KYC Approval" },
      { value: "$4.2M", label: "Annual Labor Savings" },
      { value: "0", label: "Regulatory Compliance Breaches" },
    ],
    highlightSolutions: ["Autonomous Agent Swarms", "Zero-Trust Security", "Legacy ERP Connectors"],
  },
  {
    id: "healthcare",
    name: "Healthcare & Life Sciences",
    tagline: "HIPAA-compliant patient journey automation, claims adjudication, and clinical research data pipelines.",
    description: "Connect disparate hospital EHR systems, medical imaging repositories, and insurance clearinghouses into an intelligent unified orchestration pipeline while safeguarding sensitive patient PHI.",
    icon: "HeartPulse",
    metrics: [
      { value: "96%", label: "Faster Prior Authorizations" },
      { value: "3.4x", label: "Clinical Intake Throughput" },
      { value: "100%", label: "HIPAA / HITECH Compliance" },
    ],
    highlightSolutions: ["Document Intelligence (OCR+NLP)", "Human-in-the-Loop Governance", "Air-Gapped Sovereign Deployment"],
  },
  {
    id: "supply-chain",
    name: "Supply Chain & Smart Logistics",
    tagline: "Dynamic route optimization, automated customs processing, and warehouse robotics orchestration.",
    description: "Synchronize inventory across thousands of fulfillment centers, customs checkpoints, and ocean freight tracking systems in real time with automated predictive re-routing.",
    icon: "Truck",
    metrics: [
      { value: "-44%", label: "Inventory Holding Costs" },
      { value: "99.4%", label: "On-Time Dispatch Rate" },
      { value: "<2 min", label: "Automated Customs Clearance" },
    ],
    highlightSolutions: ["Event-Driven Orchestrator", "Edge IoT Gateway", "Computer Vision UI Drivers"],
  },
  {
    id: "manufacturing",
    name: "Industrial & Advanced Manufacturing",
    tagline: "Predictive maintenance, automated shop-floor scheduling, and sub-millisecond edge quality control.",
    description: "Modernize discrete and process manufacturing. Our edge micro-nodes monitor machine vibration, thermal metrics, and PLC signals to detect impending failures before costly downtime occurs.",
    icon: "Factory",
    metrics: [
      { value: "73%", label: "Reduction in Unplanned Downtime" },
      { value: "4.8x", label: "Defect Detection Speed" },
      { value: "31%", label: "Overall Equipment Effectiveness (OEE) Gain" },
    ],
    highlightSolutions: ["Industrial Protocol Adapters", "Local Inference Micro-Nodes", "Anomaly & Fault Predictors"],
  },
  {
    id: "energy",
    name: "Energy, Utilities & Smart Infrastructure",
    tagline: "Grid load forecasting, automated pipeline safety surveillance, and carbon emission compliance auditing.",
    description: "Orchestrate distributed power generation, smart meter telemetry, and grid switching nodes with military-grade failover security and real-time predictive demand arbitration.",
    icon: "Zap",
    metrics: [
      { value: "18%", label: "Peak Demand Load Shaving" },
      { value: "<5ms", label: "Substation Failover Reaction" },
      { value: "100%", label: "Automated ESG Regulatory Reporting" },
    ],
    highlightSolutions: ["Edge IoT Mesh", "Distributed Tracing Engine", "Zero-Trust Identity Fabric"],
  },
  {
    id: "enterprise-tech",
    name: "High-Growth SaaS & Telecommunications",
    tagline: "Autonomous customer provisioning, multi-cloud infrastructure right-sizing, and network failover.",
    description: "Scale from thousands to millions of subscribers without linearly growing engineering headcount. Nexsolia automates complex multi-tenant onboarding, billing arbitration, and 24/7 cloud self-healing.",
    icon: "Server",
    metrics: [
      { value: "65%", label: "Lower DevOps Toil" },
      { value: "38%", label: "Cloud Spend Optimization" },
      { value: "99.999%", label: "Customer Facing Service Uptime" },
    ],
    highlightSolutions: ["Multi-LLM Dynamic Router", "Stateful Transaction Manager", "Autonomous Cost Optimizer"],
  },
];
