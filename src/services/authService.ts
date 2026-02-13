import { supabase } from '../lib/supabaseClient';

// ============================================
// AUTHENTICATION TYPES
// ============================================

export type UserProfile = {
  id: string;
  email: string;
  full_name?: string;
  username?: string;
  avatar_url?: string;
  user_type: 'candidate' | 'company' | 'interviewer';
  company_name?: string;
  company_id?: string;
  job_title?: string;
  years_of_experience?: number;
  user_role?: string;
  resume_url?: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  preferred_languages?: string[];
  skills?: string[];
  auth_provider?: string;
  is_active: boolean;
  is_verified: boolean;
  onboarding_completed: boolean;
  last_login_at?: string;
  remember_me: boolean;
  created_at: string;
  updated_at: string;
};

export type UpsertUserProfile = Partial<UserProfile> & {
  id: string;
  email?: string;
};

export type SignUpData = {
  email: string;
  password: string;
  full_name?: string;
  user_type?: 'candidate' | 'company' | 'interviewer';
};

export type SignInData = {
  email: string;
  password: string;
  remember_me?: boolean;
};

// ============================================
// SIGN UP / REGISTER
// ============================================

/**
 * Register a new user with email and password
 */
export async function signUpWithEmail({ email, password, full_name, user_type = 'candidate' }: SignUpData) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          user_type,
        },
        emailRedirectTo: `${window.location.origin}/company/job-intake`,
      },
    });

    if (error) throw error;

    // Create or update user profile with additional info
    if (data.user) {
      await upsertUserProfile({
        id: data.user.id,
        email: data.user.email || email,
        full_name,
        user_type,
        onboarding_completed: false,
        is_active: true,
        is_verified: !!data.user.email_confirmed_at,
      });
    }

    return { success: true, data, user: data.user };
  } catch (error: any) {
    console.error('Sign up error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// SIGN IN / LOGIN
// ============================================

/**
 * Sign in with email and password
 */
export async function signInWithEmail({ email, password, remember_me = false }: SignInData) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Update last login and remember_me preference
    if (data.user) {
      await supabase
        .from('user_profiles')
        .update({ 
          last_login_at: new Date().toISOString(),
          remember_me 
        })
        .eq('id', data.user.id);
    }

    // Store tokens based on remember_me
    if (remember_me) {
      // Tokens will persist in localStorage (default behavior)
    } else {
      // TODO: Configure session to use sessionStorage instead
    }

    return { success: true, data, user: data.user, session: data.session };
  } catch (error: any) {
    console.error('Sign in error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Sign in with Google OAuth
 */
export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;

    return { success: true, data };
  } catch (error: any) {
    console.error('Google sign in error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Sign in with GitHub OAuth
 */
export async function signInWithGitHub() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) throw error;

    return { success: true, data };
  } catch (error: any) {
    console.error('GitHub sign in error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// SIGN OUT / LOGOUT
// ============================================

/**
 * Sign out current user
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;

    // Clear local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('needsOnboarding');
    localStorage.removeItem('jobIntakeComplete');
    localStorage.removeItem('jobConfiguration');
    localStorage.removeItem('jobIntakeId');

    return { success: true };
  } catch (error: any) {
    console.error('Sign out error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// USER SESSION & PROFILE
// ============================================

/**
 * Get current user session
 */
export async function getCurrentSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) throw error;

    return { success: true, session };
  } catch (error: any) {
    console.error('Get session error:', error);
    return { success: false, error: error.message, session: null };
  }
}

/**
 * Get current user
 */
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) throw error;

    return { success: true, user };
  } catch (error: any) {
    console.error('Get user error:', error);
    return { success: false, error: error.message, user: null };
  }
}

/**
 * Get user profile from user_profiles table
 */
export async function getUserProfile(userId?: string) {
  try {
    const id = userId || (await getCurrentUser()).user?.id;
    
    if (!id) throw new Error('No user ID provided');

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;

    return { success: true, data };
  } catch (error: any) {
    console.error('Get user profile error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Create or update user profile
 */
export async function upsertUserProfile(profile: UpsertUserProfile) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert(profile, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error: any) {
    console.error('Upsert profile error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error: any) {
    console.error('Update profile error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// PASSWORD MANAGEMENT
// ============================================

/**
 * Send password reset email
 */
export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;

    return { success: true };
  } catch (error: any) {
    console.error('Password reset error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Update password (when logged in)
 */
export async function updatePassword(newPassword: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;

    return { success: true };
  } catch (error: any) {
    console.error('Update password error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// AUTH STATE LISTENER
// ============================================

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(callback: (event: string, session: any) => void) {
  return supabase.auth.onAuthStateChange(callback);
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if user is authenticated
 */
export async function isAuthenticated() {
  const { session } = await getCurrentSession();
  return !!session;
}

/**
 * Check if email is already registered
 */
export async function checkEmailExists(email: string) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    return { exists: !!data, error };
  } catch (error: any) {
    console.error('Check email error:', error);
    return { exists: false, error };
  }
}
