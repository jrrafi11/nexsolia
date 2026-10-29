export interface MegaMenuSubItem {
  title: string;
  href: string;
  description: string;
  badge?: string;
}

export interface MegaMenuCategory {
  id: string;
  name: string;
  count: number;
  icon: string;
  description: string;
  items: MegaMenuSubItem[];
}

export const MEGA_MENU_CATEGORIES: MegaMenuCategory[] = [
  {
    id: "cognitive-agents",
    name: "Cognitive AI Agents & LLM Pipelines",
    count: 7,
    icon: "Bot",
    description: "Autonomous reasoning agents, multi-agent swarms, and RAG architectures tailored for enterprise governance.",
    items: [
      { title: "Autonomous Agent Swarms", href: "/solutions#agent-swarms", description: "Self-coordinating task execution meshes", badge: "Core" },
      { title: "Multi-LLM Dynamic Router", href: "/solutions#llm-router", description: "Cost, latency & accuracy model arbitration" },
      { title: "Enterprise RAG & Knowledge Graphs", href: "/solutions#rag-graphs", description: "Deterministic retrieval with source citation" },
      { title: "Human-in-the-Loop Governance", href: "/solutions#human-loop", description: "Audit trails, policy guards & approval gates" },
      { title: "Code & Logic Synthesis Engines", href: "/solutions#code-synthesis", description: "Self-healing pipeline code generation" },
      { title: "Agentic Decision Memory Hub", href: "/solutions#memory-hub", description: "Persistent episodic and semantic vector stores" },
      { title: "Safety & Hallucination Guardrails", href: "/solutions#guardrails", description: "Real-time semantic policy enforcement", badge: "SOC2" },
    ],
  },
  {
    id: "workflow-orchestration",
    name: "Workflow Orchestration & Mesh",
    count: 6,
    icon: "Network",
    description: "Distributed workflow engines capable of orchestrating millions of daily mission-critical operations.",
    items: [
      { title: "Event-Driven Orchestrator", href: "/solutions#event-orchestrator", description: "Zero-latency reactive pub/sub pipelines", badge: "Popular" },
      { title: "Stateful Transaction Manager", href: "/solutions#stateful-tx", description: "ACID-compliant long-running orchestrations" },
      { title: "Hybrid Mesh Gateway", href: "/solutions#hybrid-mesh", description: "Bridging air-gapped legacy & multi-cloud" },
      { title: "Failover & Circuit Breakers", href: "/solutions#failover", description: "Autonomous self-healing cluster recovery" },
      { title: "Dynamic Flow Telemetry", href: "/solutions#flow-telemetry", description: "Real-time dependency graph visualization" },
      { title: "Low-Latency Edge Workers", href: "/solutions#edge-workers", description: "Micro-second execution at the enterprise perimeter" },
    ],
  },
  {
    id: "rpa-cognitive",
    name: "Cognitive Robotic Process Automation",
    count: 5,
    icon: "Cpu",
    description: "Bridging modern APIs with legacy green-screen, desktop, and ERP enterprise interfaces.",
    items: [
      { title: "Computer Vision UI Drivers", href: "/solutions#vision-rpa", description: "Pixel-accurate UI interaction without brittle selectors", badge: "Patented" },
      { title: "Document Intelligence (OCR+NLP)", href: "/solutions#doc-ai", description: "Complex invoice, contract & deed parsing" },
      { title: "Legacy ERP Connectors", href: "/solutions#erp-connectors", description: "SAP, Oracle, AS400 & mainframe automated bridges" },
      { title: "Bot Fleet Manager", href: "/solutions#bot-fleet", description: "Dynamic resource scheduling & worker scaling" },
      { title: "Audit & Keystroke Telemetry", href: "/solutions#audit-telemetry", description: "Cryptographically verified action logs" },
    ],
  },
  {
    id: "edge-iot",
    name: "Edge IoT & Industrial Telemetry",
    count: 6,
    icon: "Radio",
    description: "Real-time edge computation for factory floors, energy grids, and smart logistics hubs.",
    items: [
      { title: "Industrial Protocol Adapters", href: "/solutions#industrial-protocols", description: "Modbus, OPC-UA, MQTT, and CAN bus" },
      { title: "Local Inference Micro-Nodes", href: "/solutions#micro-nodes", description: "Deterministic offline AI execution" },
      { title: "Anomaly & Fault Predictors", href: "/solutions#fault-predictors", description: "Sub-millisecond machine telemetry alerting", badge: "Real-time" },
      { title: "Fleet Firmware Orchestrator", href: "/solutions#fleet-firmware", description: "Over-the-air safe cryptographic updates" },
      { title: "Environmental Telemetry Hub", href: "/solutions#environmental-hub", description: "Power, thermal & acoustic vibration tracking" },
      { title: "Autonomous Edge Gateways", href: "/solutions#edge-gateways", description: "Ruggedized compute hardware integration" },
    ],
  },
  {
    id: "security-governance",
    name: "Zero-Trust Security & Compliance",
    count: 5,
    icon: "ShieldCheck",
    description: "Cryptographic verification, data sovereignty, and regulatory compliance baked into every pipeline.",
    items: [
      { title: "Zero-Trust Identity Fabric", href: "/solutions#zero-trust", description: "mTLS, SPIFFE/SPIRE & role-based agent tokens" },
      { title: "Data Anonymization Sandbox", href: "/solutions#anonymization", description: "Automated PII scrubbing before inference" },
      { title: "Immutable Audit Ledger", href: "/solutions#audit-ledger", description: "Append-only cryptographic proof of execution" },
      { title: "Air-Gapped Sovereign Deployment", href: "/solutions#sovereign-deploy", description: "100% on-premise execution with zero outbound leaks", badge: "Defense Grade" },
      { title: "Continuous Compliance Monitor", href: "/solutions#compliance-monitor", description: "Automated HIPAA, SOC2 & GDPR checks" },
    ],
  },
  {
    id: "command-observability",
    name: "Command Center & Observability",
    count: 5,
    icon: "BarChart3",
    description: "Unified telemetry, performance tracing, cost budgeting, and autonomous optimization.",
    items: [
      { title: "Central Operations Canvas", href: "/solutions#command-canvas", description: "Single-pane-of-glass multi-system radar" },
      { title: "Distributed Tracing Engine", href: "/solutions#distributed-tracing", description: "End-to-end trace from user request to sub-agent" },
      { title: "Autonomous Cost Optimizer", href: "/solutions#cost-optimizer", description: "Dynamic resource down-scaling during low load" },
      { title: "Predictive SLA Forecaster", href: "/solutions#sla-forecaster", description: "Early bottleneck alerts before SLAs breach" },
      { title: "Executive Impact Dashboard", href: "/solutions#impact-dashboard", description: "Real-time monetary & hours-saved calculations" },
    ],
  },
];

export const NAV_LINKS = [
  { title: "Home", href: "/" },
  { title: "Intelligent Solutions", href: "/solutions", hasMega: true },
  { title: "Target Sectors", href: "/#sectors" },
  { title: "Case Studies", href: "/projects" },
  { title: "System Architecture", href: "/compare" },
  { title: "About Us", href: "/about" },
];
