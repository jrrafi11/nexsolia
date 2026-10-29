export interface ComparisonArchitecture {
  id: string;
  name: string;
  badge: string;
  idealFor: string;
  summary: string;
  deploymentTime: string;
  latencySLA: string;
  airGappedSupport: string;
  scalability: string;
  governanceModel: string;
  estimatedROI: string;
  costProfile: string;
  features: {
    name: string;
    included: boolean;
    detail: string;
  }[];
}

export const ARCHITECTURES_DATA: ComparisonArchitecture[] = [
  {
    id: "cloud-native",
    name: "Cloud-Native Cognitive Orchestrator",
    badge: "Agile & Fast Time-to-Market",
    idealFor: "FinTech, E-Commerce, High-Growth SaaS, Digital Insurers",
    summary: "Fully managed multi-cloud orchestration deployed across AWS, GCP, or Azure with auto-scaling compute, serverless agents, and elastic vector databases.",
    deploymentTime: "2 to 4 Weeks",
    latencySLA: "<120ms Global Response",
    airGappedSupport: "No (Requires Multi-Cloud VPC)",
    scalability: "Virtually Infinite (Auto-scaling)",
    governanceModel: "SOC 2 Type II / ISO 27001 Cloud Managed",
    estimatedROI: "3.5x to 5.2x in 6 Months",
    costProfile: "Usage & Compute Elastic Tier",
    features: [
      { name: "Multi-Agent Swarms & Dynamic Routing", included: true, detail: "Full access to commercial & open-source LLM gateways" },
      { name: "Zero-Latency Event Mesh", included: true, detail: "Cloud Kafka/Redis managed message streams" },
      { name: "Global CDN & Multi-Region Failover", included: true, detail: "Instant geographical rerouting within 200ms" },
      { name: "Air-Gapped On-Premises Isolation", included: false, detail: "Only available in Sovereign and Hybrid editions" },
      { name: "Edge Industrial Field Telemetry", included: false, detail: "Requires Edge Mesh extension" },
      { name: "Cryptographic Merkle Audit Trail", included: true, detail: "Continuous immutable logging to cloud WORM storage" },
      { name: "Human-in-the-Loop Approval UI", included: true, detail: "Web and Slack/Teams integrated approval channels" },
    ],
  },
  {
    id: "sovereign-node",
    name: "Sovereign Air-Gapped Autonomous Core",
    badge: "Maximum Security & Defense Grade",
    idealFor: "National Defense, Central Banks, Hospitals & Critical Infrastructure",
    summary: "100% on-premises, isolated hardware appliance deployment with zero internet telemetry dependencies and deterministic local weights.",
    deploymentTime: "4 to 8 Weeks",
    latencySLA: "<15ms Deterministic Local Bus",
    airGappedSupport: "Yes (100% Zero-Leak Certified)",
    scalability: "Clustered High-Density Bare-Metal",
    governanceModel: "ITAR, HIPAA, FedRAMP High, Military Grade",
    estimatedROI: "4.8x in 12 Months",
    costProfile: "Perpetual Appliance & On-Premise License",
    features: [
      { name: "Multi-Agent Swarms & Dynamic Routing", included: true, detail: "Local quantized models (Llama 3, Mistral, Nemotron)" },
      { name: "Zero-Latency Event Mesh", included: true, detail: "Local high-throughput shared memory buses" },
      { name: "Global CDN & Multi-Region Failover", included: false, detail: "Isolated to customer private network perimeter" },
      { name: "Air-Gapped On-Premises Isolation", included: true, detail: "Zero outbound network socket connections verified" },
      { name: "Edge Industrial Field Telemetry", included: true, detail: "Direct connection to plant hardware and SCADA systems" },
      { name: "Cryptographic Merkle Audit Trail", included: true, detail: "Hardware HSM secured cryptographic log signing" },
      { name: "Human-in-the-Loop Approval UI", included: true, detail: "Strict biometric and smart-card gated operator terminals" },
    ],
  },
  {
    id: "hybrid-mesh",
    name: "Hybrid Enterprise Mesh Grid",
    badge: "Recommended for Global Enterprises",
    idealFor: "Multinational Corporations, Global Logistics & Manufacturing",
    summary: "Combines cloud-scale elasticity for analytical intelligence with ultra-low-latency edge nodes deployed directly inside plants, regional hubs, and local data centers.",
    deploymentTime: "6 to 10 Weeks",
    latencySLA: "<8ms Edge / <150ms Central Cloud",
    airGappedSupport: "Yes (Edge Nodes continue operating offline)",
    scalability: "Hierarchical Mesh (Edge + Cloud)",
    governanceModel: "Global Unified Sovereign Framework",
    estimatedROI: "5.5x to 7.2x in 12 Months",
    costProfile: "Enterprise Scale Enterprise Agreement",
    features: [
      { name: "Multi-Agent Swarms & Dynamic Routing", included: true, detail: "Hierarchical agent routing from edge to cloud core" },
      { name: "Zero-Latency Event Mesh", included: true, detail: "Peer-to-peer store-and-forward synchronizing mesh" },
      { name: "Global CDN & Multi-Region Failover", included: true, detail: "Automatic failback between edge cluster and central core" },
      { name: "Air-Gapped On-Premises Isolation", included: true, detail: "Local nodes survive 90+ days without cloud link" },
      { name: "Edge Industrial Field Telemetry", included: true, detail: "Universal Modbus, OPC-UA, and CAN bus integration" },
      { name: "Cryptographic Merkle Audit Trail", included: true, detail: "Federated cryptographic chain with cloud anchored hashes" },
      { name: "Human-in-the-Loop Approval UI", included: true, detail: "Unified omnichannel mobile, desktop, and industrial HMI" },
    ],
  },
];
