import { Framework, ReportPeriod } from '@/types';
import { Accomplishment, Observation } from '@/types';

interface GenerateReportParams {
  employeeName: string;
  employeeRole: string;
  period: ReportPeriod;
  framework: Framework;
  year: number;
  accomplishments: Accomplishment[];
  observations: Observation[];
}

const FRAMEWORK_DESCRIPTIONS: Record<Framework, string> = {
  OKR: `Objectives and Key Results (OKR) is a goal-setting framework that defines:
- Objectives: Qualitative, inspirational goals
- Key Results: Quantifiable, measurable outcomes
- Focus: Objective achievement, measurable results, progress tracking
- Evaluation criteria: Clarity of objectives, measurability of key results, achievement percentage`,

  BARS: `Behaviorally Anchored Rating Scale (BARS) evaluates performance based on:
- Specific behavioral examples at different performance levels
- Observable and measurable behaviors
- Focus: Behavioral indicators, performance consistency, behavioral examples
- Evaluation criteria: Quality of behaviors demonstrated, consistency, impact of actions`,

  MBO: `Management by Objectives (MBO) focuses on:
- Goal setting and achievement
- Manager-employee collaboration on objectives
- Results-oriented evaluation
- Focus: Goal attainment, management effectiveness, objective achievement
- Evaluation criteria: Goal completion rate, quality of outcomes, self-management capabilities`,

  Competency: `Competency-Based Evaluation assesses:
- Skills and competencies required for the role
- Behavioral indicators for each competency
- Focus: Skills assessment, behavioral indicators, capability development
- Evaluation criteria: Proficiency level, skill application, growth potential`
};

const PERIOD_MAPPING: Record<ReportPeriod, string[]> = {
  'yearly': ['Q1', 'Q2', 'Q3', 'Q4', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  'Q1': ['Q1', 'Jan', 'Feb', 'Mar'],
  'Q2': ['Q2', 'Apr', 'May', 'Jun'],
  'Q3': ['Q3', 'Jul', 'Aug', 'Sep'],
  'Q4': ['Q4', 'Oct', 'Nov', 'Dec'],
};

function filterAccomplishmentsByPeriod(
  items: Accomplishment[],
  period: ReportPeriod,
  year: number
): Accomplishment[] {
  const keywords = PERIOD_MAPPING[period];

  return items.filter(item => {
    const itemYear = new Date(item.created_at).getFullYear();
    if (itemYear !== year) return false;

    if (period === 'yearly') return true;

    const itemPeriod = (item.period || '').toLowerCase();
    return keywords.some(keyword => itemPeriod.includes(keyword.toLowerCase()));
  });
}

function filterObservationsByPeriod(
  items: Observation[],
  period: ReportPeriod,
  year: number
): Observation[] {
  // Observations are filtered by year only, since they don't have a period field
  return items.filter(item => {
    const itemYear = new Date(item.created_at).getFullYear();
    return itemYear === year;
  });
}

function buildPrompt(params: GenerateReportParams): string {
  const { employeeName, employeeRole, period, framework, year, accomplishments, observations } = params;

  const filteredAccomplishments = filterAccomplishmentsByPeriod(accomplishments, period, year);
  const filteredObservations = filterObservationsByPeriod(observations, period, year);

  const accomplishmentsList = filteredAccomplishments.length > 0
    ? filteredAccomplishments.map(a => `- [${a.period}] ${a.description}`).join('\n')
    : '- No accomplishments recorded for this period';

  const observationsList = filteredObservations.length > 0
    ? filteredObservations.map(o => `- [${o.category || 'other'}] ${o.description}`).join('\n')
    : '- No observations recorded for this period';

  const periodText = period === 'yearly' ? `Yearly ${year}` : `${period} ${year}`;

  return `You are generating a ${framework} performance evaluation for ${employeeName}, a ${employeeRole}.

Time Period: ${periodText}

Evaluation Framework: ${framework}
${FRAMEWORK_DESCRIPTIONS[framework]}

Employee Accomplishments:
${accomplishmentsList}

Observations:
${observationsList}

Please generate a structured performance review including:
1. Executive Summary
2. Key Achievements (with specific examples from accomplishments)
3. Performance Analysis (based on ${framework} criteria)
4. Areas of Strength
5. Areas for Improvement
6. Specific Recommendations
7. Overall Assessment

Format the report in markdown with clear section headers (##, ###) and bullet points where appropriate.
Be specific and reference the actual accomplishments and observations provided.
`;
}

export async function generateReport(params: GenerateReportParams): Promise<string> {
  const prompt = buildPrompt(params);

  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gemma3:12b-it-qat',
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          num_predict: 2048,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error calling Ollama:', error);
    throw new Error('Failed to generate report. Make sure Ollama is running on localhost:11434 with the gemma3:12b-it-qat model.');
  }
}

export async function checkOllamaHealth(): Promise<boolean> {
  try {
    const response = await fetch('http://localhost:11434/api/tags', {
      method: 'GET',
    });

    return response.ok;
  } catch {
    return false;
  }
}
