export interface ProjectItem {
  id: string;
  category: "fintech" | "healthcare" | "logistics" | "manufacturing" | "energy";
  categoryLabel: string;
  title: string;
  client: string;
  location: string;
  year: string;
  tagline: string;
  summary: string;
  impactMetrics: { value: string; label: string }[];
  technologies: string[];
  architectureOverview: string;
  deliverables: string[];
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "apex-capital",
    category: "fintech",
    categoryLabel: "FinTech & Banking",
    title: "Autonomous High-Frequency Transaction Reconciliation & Compliance Swarm",
    client: "Apex Global Capital (Tier-1 Asset Manager)",
    location: "New York / London / Zurich",
    year: "2025",
    tagline: "Replaced 48 hours of manual end-of-day multi-broker ledger reconciliation with an autonomous 4-minute verification pipeline.",
    summary: "Apex handled over 14 million daily derivative and equity settlements across 38 global exchanges. Fragmented legacy formats caused costly settlement delays. Nexsolia deployed a hierarchical swarm of cognitive verification agents that cross-reference Swift MT messages, FIX protocol logs, and internal accounting ledgers with zero human intervention.",
    impactMetrics: [
      { value: "4 min", label: "Settlement Cycle (Down from 48h)" },
      { value: "99.998%", label: "First-Pass Settlement Match" },
      { value: "$7.8M", label: "Annual Capital Charge Savings" },
    ],
    technologies: ["Multi-Agent Swarms", "Rust Microservices", "Kafka Streams", "Zero-Trust Identity", "ClickHouse"],
    architectureOverview: "Dual-redundant active-active event mesh executing cryptographic Merkle verification across trade confirmations before auto-committing into core banking ledgers.",
    deliverables: [
      "Custom FIX & Swift protocol stream parser",
      "Autonomous exception resolution agent swarm",
      "Real-time SEC & FINRA compliance audit ledger",
      "Executive settlement risk telemetry cockpit",
    ],
  },
  {
    id: "biogenix-health",
    category: "healthcare",
    categoryLabel: "Healthcare & Life Sciences",
    title: "Universal Clinical Intake & Multi-EHR Cognitive Orchestration Mesh",
    client: "BioGenix Health Network (24 Regional Hospitals)",
    location: "Boston / Philadelphia",
    year: "2025",
    tagline: "Unified 4 incompatible EHR platforms and accelerated insurance prior authorization turnaround from 9 days to 14 minutes.",
    summary: "With over 320,000 monthly patient encounters, staff spent thousands of hours re-keying medical charts and waiting on insurer pre-authorizations. Nexsolia established an air-gapped document intelligence and agentic pipeline that analyzes clinician notes, maps ICD-10/CPT codes, and interfaces directly with 42 payer portals via semantic RPA.",
    impactMetrics: [
      { value: "14 min", label: "Prior Auth Response Time" },
      { value: "92%", label: "Intake Automation Rate" },
      { value: "100%", label: "HIPAA & HITECH Compliance" },
    ],
    technologies: ["Document Intelligence (OCR+NLP)", "Cognitive RPA", "FastAPI", "Postgres pgvector", "SPIFFE/SPIRE"],
    architectureOverview: "On-premise sovereign compute cluster running isolated language models with deterministic PII pseudonymization before any insurance submission.",
    deliverables: [
      "Epic, Cerner & Meditech universal semantic bridge",
      "Automated clinical chart summarization pipeline",
      "Payer portal RPA auto-filing engine",
      "Patient privacy verification sandbox",
    ],
  },
  {
    id: "omnifreight-logistics",
    category: "logistics",
    categoryLabel: "Smart Logistics",
    title: "Autonomous Port-to-Door Multimodal Freight Telemetry & Routing Engine",
    client: "OmniFreight Global Logistics",
    location: "Rotterdam / Singapore / Dubai",
    year: "2025",
    tagline: "Dynamic predictive dispatch coordinating ocean containers, intermodal rail, and last-mile trucking with real-time customs automation.",
    summary: "Global freight delays often compound into millions in demurrage and cold-chain losses. OmniFreight implemented Nexsolia's Event-Driven Orchestration Mesh to dynamically recalculate transit paths based on port berth congestion, weather forecasts, and customs clearance queues.",
    impactMetrics: [
      { value: "-38%", label: "Average Demurrage Fees" },
      { value: "4.2x", label: "Customs Document Processing Speed" },
      { value: "99.2%", label: "Real-time Telemetry Coverage" },
    ],
    technologies: ["Event-Driven Orchestrator", "MQTT Telemetry", "vLLM Inference", "Redis Cluster", "Grafana Cloud"],
    architectureOverview: "Hybrid cloud-to-edge architecture receiving millions of satellite container pings and generating autonomous route realignment orders.",
    deliverables: [
      "Autonomous container IoT stream ingestor",
      "Global customs bill-of-lading generator",
      "Carrier rate and capacity auction agent",
      "Dynamic demurrage risk forecasting radar",
    ],
  },
  {
    id: "titan-robotics",
    category: "manufacturing",
    categoryLabel: "Advanced Manufacturing",
    title: "Plant-Wide Predictive Edge Anomaly Radar & Robotic Synchronization",
    client: "Titan Precision Robotics & Automotive Systems",
    location: "Munich / Detroit",
    year: "2025",
    tagline: "Prevented 14 catastrophic stamping press failures and achieved sub-5ms acoustic anomaly detection on the live assembly line.",
    summary: "Automotive robotic lines incur over $22,000 per minute during unplanned downtime. Titan integrated Nexsolia Edge Micro-Nodes directly into 180 robotic weld and stamping cells. High-frequency vibration and thermal streams are processed locally without cloud round-tripping.",
    impactMetrics: [
      { value: "<5ms", label: "Acoustic Defect Detection" },
      { value: "0", label: "Unplanned Line Stoppages (12 mo)" },
      { value: "28%", label: "Maintenance Cost Reduction" },
    ],
    technologies: ["Industrial Protocol Adapters (OPC-UA)", "Zephyr RTOS", "TensorFlow Lite", "TimescaleDB", "Rust"],
    architectureOverview: "Ruggedized DIN-rail industrial edge processors executing quantised convolutional neural networks with local PLC relay interlocks.",
    deliverables: [
      "High-speed Modbus and OPC-UA bus sniffers",
      "On-device acoustic wavelet transformation models",
      "Autonomous spare part reorder dispatch",
      "Technician augmented reality diagnostics app",
    ],
  },
  {
    id: "helios-energy",
    category: "energy",
    categoryLabel: "Energy & Utilities",
    title: "Sovereign Distributed Energy Telemetry Mesh & Grid Balancing",
    client: "Helios Renewable Power Corporation",
    location: "Texas / California",
    year: "2025",
    tagline: "Autonomous battery storage and solar inverter dispatch responding to regional grid price spikes in under 12 milliseconds.",
    summary: "Renewable energy volatility requires microsecond dispatch decisions across utility-scale battery sites and solar arrays. Helios deployed Nexsolia's Stateful Transaction Manager to arbitrate wholesale energy markets while preserving lithium-ion battery state-of-health curves.",
    impactMetrics: [
      { value: "+34%", label: "Arbitrage Revenue Improvement" },
      { value: "<12ms", label: "Grid Frequency Response" },
      { value: "99.999%", label: "System Availability" },
    ],
    technologies: ["Stateful Transaction Manager", "C++ Engine", "gRPC", "Prometheus", "Kubernetes"],
    architectureOverview: "Federated peer-to-peer control network capable of isolated autonomous operation even during total wide-area cellular or satellite blackouts.",
    deliverables: [
      "Automated battery degradation-aware dispatch",
      "Substation telemetry ingest pipeline",
      "ISO/RTO real-time bidding bot swarm",
      "Cyber-resilient air-gapped recovery nodes",
    ],
  },
];
