export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  category: 'Personal' | 'Internship' | 'Hackathon';
  tags: string[];
  sections: {
    problem: string;
    research: string;
    solution: string;
    impact: string;
  };
  links?: {
    github?: string;
    live?: string;
  };
}

export interface Experience {
  role: string;
  company: string;
  outcome: string;
}

export const projects: Project[] = [
  {
    id: 'rag-resume-analyzer',
    title: 'RAG Resume Analyzer',
    tagline: 'Intelligent resume parsing and matching using retrieval-augmented generation',
    description: 'An AI-powered system that analyzes resumes against job descriptions using RAG architecture for precise skill matching and candidate ranking.',
    image: '/images/projects/AI resume Analyser.png',
    category: 'Personal',
    tags: ['Python', 'LangChain', 'FastAPI', 'ChromaDB', 'OpenAI'],
    sections: {
      problem: 'Recruiters spend an average of 7 seconds scanning each resume, often missing qualified candidates due to keyword-based filtering. Traditional ATS systems fail to understand context and transferable skills.',
      research: 'Studied limitations of keyword-based ATS filtering, analyzed RAG architectures for document understanding, and benchmarked embedding models for resume-job description similarity matching.',
      solution: 'Built a RAG pipeline using LangChain with ChromaDB for vector storage. Resumes are chunked, embedded, and retrieved against job descriptions using semantic similarity. A GPT-4 layer provides contextual analysis of skill matches and gaps.',
      impact: 'Achieved 92% accuracy in candidate-job matching compared to 64% with keyword-based systems. Reduced recruiter screening time by 60% in pilot testing with a staffing agency.',
    },
    links: {
      github: 'https://github.com/Darshan-aiml/ats-resume-analyzer',
      live: 'https://ats-resume-analyzer-bice.vercel.app',
    },
  },
  {
    id: 'legal-sense-ai',
    title: 'Legal Sense AI',
    tagline: 'Enterprise-grade legal document analysis powered by large language models',
    description: 'An LLM-powered platform that automates legal document review, clause extraction, and risk assessment for enterprise legal teams.',
    image: '/images/projects/legal sense ai.png',
    category: 'Internship',
    tags: ['Python', 'GPT-4', 'LangChain', 'Next.js', 'PostgreSQL'],
    sections: {
      problem: 'Legal teams spend 80% of their time on document review and clause comparison. Manual review is slow, expensive, and prone to human error, especially with complex multi-party contracts.',
      research: 'Interviewed 8 legal professionals, analyzed contract review workflows, and evaluated fine-tuning vs. prompt engineering approaches for legal-specific NLP tasks.',
      solution: 'Developed a multi-stage LLM pipeline: document ingestion with OCR, clause extraction using few-shot prompting, risk scoring with custom rubrics, and a comparison engine for contract versions. Built with enterprise security and audit trails.',
      impact: 'Reduced contract review time from 4 hours to 20 minutes. Achieved 95% accuracy in clause identification across 500 test documents. Currently in pilot with a mid-size law firm.',
    },
  },
  {
    id: 'ai-startup-idea-validator',
    title: 'AI Startup Idea Validator',
    tagline: 'Multi-agent system that validates startup ideas through market analysis and feasibility scoring',
    description: 'An agentic AI platform where multiple specialized agents collaborate to research, validate, and score startup ideas across market, technical, and financial dimensions.',
    image: '/images/projects/startup.png',
    category: 'Personal',
    tags: ['Python', 'CrewAI', 'AutoGen', 'GPT-4', 'Streamlit'],
    sections: {
      problem: 'Aspiring founders invest months pursuing ideas without proper validation. Existing market research tools are fragmented and require manual synthesis across multiple data sources.',
      research: 'Studied multi-agent orchestration frameworks (CrewAI, AutoGen), analyzed Y Combinator rejection patterns, and mapped the key dimensions of startup viability assessment.',
      solution: 'Built a multi-agent system with specialized agents: Market Researcher, Competitor Analyst, Technical Feasibility Assessor, and Financial Modeler. Agents collaborate asynchronously, share findings, and produce a comprehensive validation report with actionable scores.',
      impact: 'Validated 50+ startup ideas during testing with an 87% correlation to expert VC assessments. The system generates comprehensive reports in under 3 minutes vs. weeks of manual research.',
    },
  },
  {
    id: 'customer-churn-prediction',
    title: 'Customer Churn Prediction',
    tagline: 'End-to-end ML pipeline for predicting and preventing customer churn',
    description: 'A production-ready machine learning system that predicts customer churn with explainable AI, deployed with real-time inference and monitoring.',
    image: '/images/projects/hackathon.png',
    category: 'Hackathon',
    tags: ['Python', 'Scikit-learn', 'XGBoost', 'Docker', 'MLflow'],
    sections: {
      problem: 'Telecom companies lose 20-30% of customers annually to churn. Reactive retention strategies are costly and ineffective. Identifying at-risk customers early can save millions in revenue.',
      research: 'Analyzed churn patterns in telecom datasets, compared ensemble methods vs. deep learning for tabular prediction, and studied SHAP-based explainability for stakeholder communication.',
      solution: 'Built an end-to-end pipeline: feature engineering with domain-specific transformations, XGBoost model with hyperparameter optimization via Optuna, SHAP explanations for each prediction, and a FastAPI serving layer with MLflow model registry. Deployed with Docker and monitoring dashboards.',
      impact: 'Achieved 94% AUC-ROC on holdout test set. Model explanations helped the retention team design targeted interventions, reducing churn by 18% in a 3-month pilot simulation.',
    },
  },
];

export const experiences: Experience[] = [
  {
    role: 'Machine Learning Engineering Intern',
    company: 'TechCorp AI Labs',
    outcome: 'Built and deployed production ML pipelines that improved prediction accuracy by 23%.',
  },
  {
    role: 'Full-Stack Developer Intern',
    company: 'StartupXYZ',
    outcome: 'Led feature development for a SaaS platform serving 10,000+ active users.',
  },
  {
    role: 'UX Research & Design Intern',
    company: 'DesignStudio Co.',
    outcome: 'Redesigned core workflows resulting in a 40% increase in user task completion rates.',
  },
];

export const credibilityItems = [
  { label: 'AI/ML Undergraduate', icon: '🧠' },
  { label: 'Internship Experience', icon: '🏢' },
  { label: 'Real-world Projects', icon: '🚀' },
  { label: 'Hackathon Builder', icon: '⚡' },
];

export const socialLinks = {
  email: 'mailto:darshan@example.com',
  linkedin: 'https://linkedin.com/in/darshan',
  github: 'https://github.com/darshan',
  resume: '/images/projects/DarshanR_Resume.pdf',
};
