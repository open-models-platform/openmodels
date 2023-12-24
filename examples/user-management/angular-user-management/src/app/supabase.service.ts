import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { Database } from 'src/schema';

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private openmodels: SupabaseClient<Database>;
  _session: AuthSession | null = null;

  constructor() {
    this.openmodels = createClient<Database>(
      environment.openmodelsUrl,
      environment.openmodelsKey
    );
  }

  get session() {
    this.openmodels.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  profile(user: User) {
    return this.openmodels
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.openmodels.auth.onAuthStateChange(callback);
  }

  signIn(email: string) {
    return this.openmodels.auth.signInWithOtp({ email });
  }

  signOut() {
    return this.openmodels.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };

    return this.openmodels.from('profiles').upsert(update);
  }

  downLoadImage(path: string) {
    return this.openmodels.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.openmodels.storage.from('avatars').upload(filePath, file);
  }
}
