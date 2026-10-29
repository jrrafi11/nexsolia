export interface SolutionDetail {
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  stats: { label: string; value: string }[];
  keyFeatures: string[];
  techStack: string[];
  architectureHighlights: string[];
  useCases: string[];
}

export const SOLUTIONS_DATA: SolutionDetail[] = [
  {
    id: "cognitive-agents",
    category: "Autonomous Intelligence",
    title: "Cognitive AI Agent Swarms & Multi-LLM Pipelines",
    tagline: "High-precision autonomous reasoning designed to solve complex multi-step enterprise workflows.",
    description: "Nexsolia's cognitive architecture goes beyond simple prompt wrappers. We orchestrate specialized swarms of autonomous agents equipped with deterministic planning, stateful episodic memory, and real-time tool calling. Every output passes through strict hallucination guardrails and regulatory compliance filters.",
    stats: [
      { label: "Accuracy Rate", value: "99.8%" },
      { label: "Latency per Step", value: "<180ms" },
      { label: "Task Completion", value: "94.2%" },
      { label: "Cost Reduction", value: "68%" },
    ],
    keyFeatures: [
      "Dynamic Multi-LLM Arbitration (routes queries across Claude, GPT, Llama, and specialized fine-tuned models)",
      "Persistent Context Graph with vector and semantic memory nodes",
      "Human-in-the-Loop verification gates for high-stakes financial & legal decisions",
      "Deterministic tool execution sandboxes with zero-leak credential isolation",
      "Self-reflective error correction & automatic retry with alternative reasoning branches",
    ],
    techStack: ["PyTorch", "vLLM", "LangChain/LangGraph", "Qdrant", "PostgreSQL pgvector", "Kafka"],
    architectureHighlights: [
      "Multi-Agent Supervisor Hierarchy with specialized worker nodes",
      "Cryptographically isolated execution memory layers",
      "Air-gapped deployment compatibility with zero telemetry leakage",
    ],
    useCases: [
      "Automated Claims Adjudication in Insurance",
      "High-Frequency Regulatory Compliance Auditing",
      "Complex Multi-Vendor Procurement Processing",
      "Autonomous Customer Engineering Support",
    ],
  },
  {
    id: "workflow-orchestration",
    category: "Distributed Systems",
    title: "Enterprise Workflow Mesh & Event Orchestration",
    tagline: "Ultra-resilient distributed orchestration processing millions of events per second with zero drift.",
    description: "Built for mission-critical enterprise environments where failure is not an option. Nexsolia Workflow Mesh coordinates asynchronous microservices, streaming pipelines, cloud serverless workers, and legacy on-premises nodes into a unified reactive graph.",
    stats: [
      { label: "Throughput", value: "1.2M msg/s" },
      { label: "Failover Time", value: "<15ms" },
      { label: "Historical Uptime", value: "99.999%" },
      { label: "Max Pipeline Depth", value: "1,000+ steps" },
    ],
    keyFeatures: [
      "Reactive DAG execution engine with dynamic branch pruning",
      "Stateful distributed transaction rollback (Saga pattern) across legacy and cloud backends",
      "Zero-latency distributed lock-free queuing backed by memory-mapped logs",
      "Visual pipeline composer and real-time live execution debugging",
      "Hot-reloadable workflow definitions without restarting cluster nodes",
    ],
    techStack: ["Rust", "Apache Kafka", "Redis Cluster", "gRPC", "Kubernetes", "Temporal/Cadence"],
    architectureHighlights: [
      "Multi-region active-active cluster topology",
      "Idempotent message processing with cryptographic dedup",
      "Dynamic rate limiting and backpressure management",
    ],
    useCases: [
      "End-to-end Cross-Border Payment Settlement",
      "Just-in-Time Warehouse Inventory Realignment",
      "Multi-Cloud Disaster Recovery Failover",
      "Real-time Telecom Subscription Provisioning",
    ],
  },
  {
    id: "rpa-cognitive",
    category: "Robotic Automation",
    title: "Cognitive Robotic Process Automation (Next-Gen RPA)",
    tagline: "Computer vision and neural actuators that automate legacy screens, mainframe apps, and thick clients.",
    description: "Traditional RPA breaks whenever a UI layout shifts by a few pixels. Nexsolia Cognitive RPA uses spatial neural networks to identify and interact with software elements semantically, regardless of resolution, themes, or platform upgrades.",
    stats: [
      { label: "Script Breakage", value: "<0.01%" },
      { label: "Processing Speed", value: "4.8x faster" },
      { label: "Legacy System Support", value: "100%" },
      { label: "Audit Accuracy", value: "100%" },
    ],
    keyFeatures: [
      "Semantic UI comprehension without relying on brittle DOM or XPath selectors",
      "Universal driver support: Windows Win32, Java Swing, SAP GUI, Terminal 3270, and Citrix Virtual Desktops",
      "Integrated OCR & Document Understanding extracting structured data from distorted scans and handwritten forms",
      "Autonomous self-healing routines that adapt to UI cosmetic revisions dynamically",
      "Tamper-proof visual session recordings and keystroke telemetry for total compliance",
    ],
    techStack: ["OpenCV", "TensorFlow Lite", "ONNX Runtime", "Windows UI Automation", "FastAPI"],
    architectureHighlights: [
      "Headless virtual worker pools running inside isolated micro-VMs",
      "Cryptographic credential vault injection with zero plaintext memory residency",
      "Live operator takeover mode with seamless handoff",
    ],
    useCases: [
      "Mortgage Document Extraction & Core Banking Entry",
      "Legacy ERP Order Reconciliation (SAP / AS400)",
      "High-Volume Tariff & Customs Filing",
      "Automated Hospital Patient Chart Ingestion",
    ],
  },
  {
    id: "edge-iot",
    category: "Edge & Industrial",
    title: "Edge IoT Mesh & Real-Time Industrial Telemetry",
    tagline: "Deterministic low-latency computing right at the edge of manufacturing, energy, and robotics infrastructure.",
    description: "Brings intelligence directly to where the physical work happens. Nexsolia Edge Mesh deploys hardened micro-nodes to industrial plants, offshore oil rigs, and logistics hubs, delivering predictive maintenance and sub-millisecond local telemetry.",
    stats: [
      { label: "Edge Latency", value: "<8ms" },
      { label: "Offline Autonomy", value: "90+ days" },
      { label: "Supported Protocols", value: "24+" },
      { label: "Hardware Footprint", value: "<64MB RAM" },
    ],
    keyFeatures: [
      "Native industrial protocol ingestion (Modbus TCP/RTU, OPC-UA, MQTT, EtherCAT, CAN bus)",
      "On-device neural inference for vibration, thermal, and acoustic anomaly detection",
      "Store-and-forward cryptographic sync when internet connection is intermittent",
      "Zero-touch provisioning and encrypted over-the-air firmware orchestration",
      "Local fail-safe interlocks executing safety shutoffs in under 5 milliseconds",
    ],
    techStack: ["Rust", "Embedded Linux", "Zephyr RTOS", "MQTT", "TimescaleDB", "Grafana"],
    architectureHighlights: [
      "Mesh peer-to-peer redundancy between adjacent field gateways",
      "Hardware-enforced TPM 2.0 device identity and secure boot",
      "Dynamic payload compression yielding 85% bandwidth reduction",
    ],
    useCases: [
      "Predictive Bearing & Turbine Failure in Renewable Energy",
      "Autonomous Guided Vehicle (AGV) Fleet Telemetry in Warehouses",
      "Cold Chain Pharmaceutical Temperature Verification",
      "Chemical Batch Process Optimization & Hazard Prevention",
    ],
  },
  {
    id: "security-governance",
    category: "Enterprise Security",
    title: "Zero-Trust Security, Data Sovereignty & Audit Governance",
    tagline: "Cryptographic transparency, immutable ledgers, and air-gapped protection for regulated industries.",
    description: "Every automated decision and data transformation must be explainable, secure, and provable to regulators. Nexsolia embeds zero-trust access control, automatic PII masking, and append-only cryptographic audit logs into every layer of our stack.",
    stats: [
      { label: "Compliance Score", value: "100%" },
      { label: "Audit Log Retrieval", value: "<50ms" },
      { label: "Certifications", value: "SOC2 Type II" },
      { label: "PII Leak Prevention", value: "100%" },
    ],
    keyFeatures: [
      "Role-based and attribute-based access control (RBAC & ABAC) for human and synthetic agent actors",
      "Dynamic data masking and synthetic data replacement before external LLM interaction",
      "Cryptographic merkle-tree audit ledger logging every state change and decision branch",
      "Full sovereign air-gapped deployment option running without internet access",
      "Automated continuous compliance reporting for SOC 2 Type II, ISO 27001, HIPAA, and GDPR",
    ],
    techStack: ["Vault by HashiCorp", "SPIFFE/SPIRE", "WireGuard", "Open Policy Agent (OPA)", "eBPF"],
    architectureHighlights: [
      "Micro-segmented network policies restricting east-west agent traffic",
      "Hardware security module (HSM) root of trust for all cryptographic signatures",
      "Automated data residency boundary enforcement across cloud regions",
    ],
    useCases: [
      "Central Bank & Sovereign Wealth Fund Automation",
      "Defense Contractor Secure Workflow Routing",
      "Clinical Trials Patient Data Processing",
      "Cross-Border Multi-Jurisdiction Financial Transactions",
    ],
  },
  {
    id: "command-observability",
    category: "Telemetry & Ops",
    title: "Unified Command Center & Real-Time Operational Canvas",
    tagline: "A single pane of glass providing complete visibility, distributed tracing, and autonomous optimization.",
    description: "Modern enterprise automation cannot remain a black box. Nexsolia's Command Canvas visualizes your entire automated ecosystem in real time—tracking throughput, bottleneck formation, operational expenditures, and human intervention rates.",
    stats: [
      { label: "Real-time Telemetry", value: "Sub-second" },
      { label: "Distributed Tracing", value: "100% of calls" },
      { label: "Cost Optimization", value: "Up to 42%" },
      { label: "SLA Prediction Alert", value: "30 min early" },
    ],
    keyFeatures: [
      "Interactive multi-dimensional workflow topology graph with live pulse animations",
      "Distributed OpenTelemetry tracing linking user requests through microservices down to AI tokens",
      "Automated cloud compute right-sizing reducing idle infrastructure costs",
      "Machine-learning SLA breach forecasting alerting operators before bottlenecks impact users",
      "C-Suite economic value dashboard quantifying hours saved and cost impact in real time",
    ],
    techStack: ["OpenTelemetry", "ClickHouse", "React / Next.js", "WebGL / Three.js", "Prometheus"],
    architectureHighlights: [
      "Sub-second streaming analytics powered by columnar in-memory pipelines",
      "Granular role-specific dashboard views (Executive, Architect, Security Officer, Operator)",
      "Autonomous remediation webhooks triggering scale-out actions instantly",
    ],
    useCases: [
      "Global Operations Command Centers (NOC/SOC)",
      "Enterprise Cloud Infrastructure Cost Arbitrage",
      "High-Volume Retail Black Friday Live Orchestration",
      "Executive Board Automation ROI Reporting",
    ],
  },
];
