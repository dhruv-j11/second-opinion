export interface Profile {
  id: string;
  first_name: string | null;
  age: number | null;
  sex: string | null;
  known_conditions: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface Report {
  id: string;
  user_id: string;
  title: string | null;
  upload_type: "image" | "pdf" | "manual";
  file_url: string | null;
  raw_extracted_text: string | null;
  analysis_json: AnalysisResult | null;
  overall_status: "normal" | "some_attention" | "needs_discussion" | null;
  created_at: string;
}

export interface Biomarker {
  id: string;
  report_id: string;
  user_id: string;
  name: string;
  value: number | null;
  unit: string | null;
  reference_range: string | null;
  status: "normal" | "borderline" | "flagged";
  recorded_at: string;
}

export interface Medication {
  id: string;
  user_id: string;
  name: string;
  dosage: string | null;
  frequency: string | null;
  active: boolean;
  created_at: string;
}

export interface AnalysisResult {
  summary: string;
  overall_status: "normal" | "some_attention" | "needs_discussion";
  biomarkers: BiomarkerAnalysis[];
  general_questions_for_doctor: string[];
  disclaimer: string;
}

export interface BiomarkerAnalysis {
  name: string;
  value: string;
  unit: string;
  reference_range: string;
  status: "normal" | "borderline" | "flagged";
  explanation: string;
  lifestyle_factors: string[];
  doctor_questions: string[];
}

export interface ExtractedLabValue {
  name: string;
  value: string;
  unit: string;
  reference_range: string;
}

export interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
}
