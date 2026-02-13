import { supabase } from '../lib/supabaseClient';

// Types matching the CompanyJobIntake form data
export type CompanyJobIntakeData = {
  company_id: string;
  company_name: string;
  job_role: string;
  job_type: string;
  experience_range: string;
  location: string;
  work_mode: string;
  education_requirements: {
    minimum_degree_required: string;
    minimum_gpa_required: number;
    preferred_streams: string[];
    tier_preference_if_any: string;
    certifications_preferred: string[];
    is_degree_mandatory: boolean;
  };
  company_objectives: {
    primary_business_goal: string;
    secondary_goals: string[];
    expected_impact_in_first_6_months: string;
    expected_impact_in_first_1_year: string;
    success_metrics: {
      metric_name: string;
      target_value: string;
      measurement_method: string;
    }[];
    failure_conditions: string;
  };
  role_responsibilities: {
    core_responsibilities: string[];
    decision_making_authority_level: number;
    cross_team_collaboration_required: boolean;
    stakeholders_interacting_with: string[];
    ownership_scope_description: string;
  };
  technical_skills: {
    mandatory_skills: {
      skill_name: string;
      required_proficiency_level_1_to_5: number;
      minimum_years_experience: number;
      importance_weight: number;
    }[];
    good_to_have_skills: {
      skill_name: string;
      importance_weight: number;
    }[];
    programming_languages_allowed: string[];
    architecture_knowledge_required: string[];
    cloud_or_infrastructure_exposure_required: string[];
    testing_expectation: string;
    code_review_experience_required: boolean;
    system_design_depth_required_1_to_5: number;
  };
  problem_solving: {
    dsa_importance_level_1_to_5: number;
    real_world_problem_solving_bias: boolean;
    expected_optimization_awareness: boolean;
    algorithmic_complexity_understanding_required: boolean;
    debugging_skill_importance_level_1_to_5: number;
  };
  cultural_expectations: {
    ownership_level_expected_1_to_5: number;
    communication_importance_1_to_5: number;
    teamwork_importance_1_to_5: number;
    adaptability_importance_1_to_5: number;
    leadership_potential_evaluated: boolean;
    must_have_behavioral_traits: string[];
    red_flag_behaviors: string[];
  };
  interview_config: {
    number_of_rounds: number;
    round_details: {
      round_type: string;
      duration_minutes: number;
      elimination_round: boolean;
      focus_area: string;
    }[];
    difficulty_level_overall_1_to_5: number;
    live_coding_required: boolean;
    take_home_assignment_allowed: boolean;
  };
  evaluation: {
    evaluation_weights: {
      technical_skills: number;
      problem_solving: number;
      system_design: number;
      behavioral: number;
      communication: number;
      culture_alignment: number;
    };
    minimum_passing_score_threshold: number;
    critical_must_pass_sections: string[];
    automatic_rejection_conditions: string[];
  };
  compensation: {
    salary_range: {
      minimum: number;
      maximum: number;
    };
    notice_period_limit_days: number;
    relocation_supported: boolean;
    work_hours_expectation: string;
    travel_requirement_percentage: number;
  };
  growth_expectations: {
    expected_growth_path: string;
    promotion_timeline_expectation: string;
    future_role_expansion_possibility: boolean;
  };
  risk_flags: {
    is_high_pressure_role: boolean;
    client_facing_role: boolean;
    requires_on_call_support: boolean;
    security_clearance_required: boolean;
  };
};

export type CompanyJobIntakeRecord = CompanyJobIntakeData & {
  id: string;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  is_active: boolean;
};

/**
 * Create a new job intake record
 */
export async function createJobIntake(data: CompanyJobIntakeData) {
  try {
    const { data: result, error } = await supabase
      .from('company_job_intake')
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error('Error creating job intake:', error);
      throw error;
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Exception in createJobIntake:', error);
    return { success: false, error };
  }
}

/**
 * Get all job intakes for a specific company
 */
export async function getJobIntakesByCompany(companyId: string) {
  try {
    const { data, error } = await supabase
      .from('company_job_intake')
      .select('*')
      .eq('company_id', companyId)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching job intakes:', error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Exception in getJobIntakesByCompany:', error);
    return { success: false, error };
  }
}

/**
 * Get a specific job intake by ID
 */
export async function getJobIntakeById(id: string) {
  try {
    const { data, error } = await supabase
      .from('company_job_intake')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching job intake:', error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Exception in getJobIntakeById:', error);
    return { success: false, error };
  }
}

/**
 * Update an existing job intake
 */
export async function updateJobIntake(id: string, updates: Partial<CompanyJobIntakeData>) {
  try {
    const { data, error } = await supabase
      .from('company_job_intake')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating job intake:', error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Exception in updateJobIntake:', error);
    return { success: false, error };
  }
}

/**
 * Soft delete (deactivate) a job intake
 */
export async function deleteJobIntake(id: string) {
  try {
    const { data, error } = await supabase
      .from('company_job_intake')
      .update({ is_active: false })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error deleting job intake:', error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Exception in deleteJobIntake:', error);
    return { success: false, error };
  }
}

/**
 * Hard delete a job intake (permanent)
 */
export async function permanentDeleteJobIntake(id: string) {
  try {
    const { error } = await supabase
      .from('company_job_intake')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error permanently deleting job intake:', error);
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Exception in permanentDeleteJobIntake:', error);
    return { success: false, error };
  }
}

/**
 * Get all active job intakes (admin view)
 */
export async function getAllActiveJobIntakes() {
  try {
    const { data, error } = await supabase
      .from('company_job_intake')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all job intakes:', error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Exception in getAllActiveJobIntakes:', error);
    return { success: false, error };
  }
}

/**
 * Search job intakes by job role
 */
export async function searchJobIntakesByRole(searchTerm: string) {
  try {
    const { data, error } = await supabase
      .from('company_job_intake')
      .select('*')
      .ilike('job_role', `%${searchTerm}%`)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error searching job intakes:', error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Exception in searchJobIntakesByRole:', error);
    return { success: false, error };
  }
}
