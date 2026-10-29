export interface FaqItem {
  id: string;
  question: string;
  category: string;
  answer: string;
}

export const FAQS_DATA: FaqItem[] = [
  {
    id: "faq-1",
    category: "Architecture",
    question: "How does Nexsolia differ from generic LLM wrappers or legacy RPA tools?",
    answer: "Traditional RPA relies on brittle coordinate or DOM selectors that fail upon minor UI updates, while generic LLM wrappers lack stateful transactional memory, deterministic safety guardrails, and enterprise auditability. Nexsolia combines cognitive neural vision, multi-agent arbitration swarms, and an ACID-compliant distributed workflow mesh. Every action is cryptographically logged, bounded by strict policy constraints, and guaranteed to execute with sub-second latency.",
  },
  {
    id: "faq-2",
    category: "Security & Sovereignty",
    question: "Can Nexsolia run fully on-premises without sending sensitive data to external AI APIs?",
    answer: "Yes. For defense, banking, and healthcare clients, we provide our Sovereign Air-Gapped Edition. This deploys on bare-metal hardware or private air-gapped Kubernetes clusters using quantized state-of-the-art open models (such as Llama 3, Mistral, and Nemotron). Zero telemetry or prompt tokens ever exit your private perimeter.",
  },
  {
    id: "faq-3",
    category: "Reliability & Edge",
    question: "What happens if our internet or cloud connection drops during critical factory or trading operations?",
    answer: "Nexsolia's Edge Mesh is engineered with autonomous store-and-forward architecture. Edge micro-nodes continue processing sensor inputs, executing local robotic workflows, and making real-time safety interlock decisions for up to 90 days offline. Once network connectivity is restored, states synchronize seamlessly via conflict-free replicated data types (CRDTs).",
  },
  {
    id: "faq-4",
    category: "Governance",
    question: "How do you ensure AI agents don't hallucinate or execute erroneous financial or clinical actions?",
    answer: "We implement a multi-layered defense: First, all unstructured reasoning is validated against deterministic schema validators and semantic policy guardrails. Second, high-impact transactions (e.g. fund transfers over threshold or prescription changes) require explicit cryptographic sign-off through our Human-in-the-Loop approval gate. Third, our self-reflective error correction halts execution and flags anomalies before actions hit core databases.",
  },
  {
    id: "faq-5",
    category: "Integration",
    question: "Can Nexsolia integrate with our legacy ERP systems (SAP, AS400, Oracle, Mainframes)?",
    answer: "Absolutely. Nexsolia provides native bidirectional adapters for SAP GUI/BAPI, AS400 Terminal 3270/5250, Oracle EBS, and custom SQL/ODBC databases. For legacy thick clients without APIs, our Computer Vision RPA interacts directly with the screen interface using neural spatial perception at 60 FPS.",
  },
  {
    id: "faq-6",
    category: "Deployment & ROI",
    question: "What is the typical deployment timeline and SLA guarantee from initial audit to production rollout?",
    answer: "A standard enterprise deployment takes 4 to 8 weeks, structured across our 7-step delivery framework. All enterprise contracts include a guaranteed 99.99% orchestration availability SLA, sub-15ms edge response guarantees, and an executive ROI milestone assessment targeting payback within 4 to 6 months.",
  },
];
