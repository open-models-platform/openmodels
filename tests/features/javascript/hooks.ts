import postgres from 'postgres'
import crossFetch from 'cross-fetch'
import { faker } from '@faker-js/faker'
import {
  AuthResponse,
  createClient,
  SupabaseClient,
  SupabaseClientOptions,
  User,
  UserAttributes,
  UserResponse,
} from '@supabase/supabase-js'

import { JasmineAllureReporter, step } from '../../.jest/jest-custom-reporter'

export abstract class Hooks {
  static sql = postgres({
    host: process.env.OPENMODELS_DB_HOST,
    port: parseInt(process.env.OPENMODELS_DB_PORT),
    database: 'postgres',
    username: 'postgres',
    password: process.env.OPENMODELS_DB_PASS,
  })

  @step('terminate sql connection')
  static async after(): Promise<any> {
    try {
      Hooks.sql.end({ timeout: 100 })
      return Promise.resolve(null)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  @step('Create OpenModels client')
  createSupaClient(
    url: string,
    key: string,
    options: SupabaseClientOptions<'public'> = {}
  ): SupabaseClient {
    options.auth = options.auth || {}
    options.auth.persistSession = false

    return createClient(url, key, options)
  }

  @step('Create a valid user')
  async createUser(data: object = {}): Promise<{
    email: string
    password: string
    username: string
    id: string
  }> {
    const openmodels = this.createSupaClient(process.env.OPENMODELS_URL, process.env.OPENMODELS_KEY_ANON)

    const fakeUser = {
      email: faker.internet.exampleEmail(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
      id: '',
    }
    const {
      error: signUpError,
      data: { user },
    } = await this.signUp(openmodels, fakeUser, {
      data: data,
    })
    expect(signUpError).toBeNull()
    expect(user).not.toBeNull()
    fakeUser.id = user.id

    return fakeUser
  }

  // todo: rework this
  @step((token: string) => `verify with token ${token}`)
  async verify(token: string, email: string): Promise<Response> {
    return crossFetch(`${process.env.OPENMODELS_GOTRUE}/verify`, {
      method: 'POST',
      body: JSON.stringify({
        type: 'signup',
        token: token,
        email: email,
      }),
    })
  }

  @step((user: User) => `get confirmation token for user ${user.id}`)
  async getConfirmationToken(user: User): Promise<[{ confirmation_token: any }]> {
    return Hooks.sql`
      select confirmation_token 
      from auth.users
      where id = ${user.id}
    `
  }

  @step('I sign up with a valid email and password')
  async signUp(
    openmodels: SupabaseClient,
    {
      email = faker.internet.exampleEmail(),
      password = faker.internet.password(),
    }: {
      email?: string
      password?: string
    } = {},
    options: {
      redirectTo?: string
      data?: object
      captchaToken?: string
    } = {}
  ): Promise<AuthResponse> {
    return openmodels.auth.signUp({
      email: email,
      password: password,
      options: options,
    })
  }

  @step('Check if I am being able to log out')
  async signOut(openmodels: SupabaseClient): Promise<{ error: any }> {
    return openmodels.auth.signOut()
  }

  @step('Get user data, if there is a logged in user')
  getUser(openmodels: SupabaseClient) {
    return openmodels.auth.getUser()
  }

  @step((user: User) => `Get user by ID (${user.id}) from OpenModels auth schema`)
  async selectUser(user: User): Promise<[{ email: string }]> {
    return Hooks.sql`
        select
        email
      from auth.users
      where
        id = ${user.id}
    `
  }

  @step('I sign up with a valid email and password')
  async signUpByPhone(
    openmodels: SupabaseClient,
    {
      phone = faker.phone.phoneNumber(),
      password = faker.internet.password(),
    }: {
      phone?: string
      password?: string
    } = {},
    options: {
      redirectTo?: string
      data?: object
    } = {}
  ): Promise<AuthResponse> {
    return openmodels.auth.signUp({
      phone: phone,
      password: password,
      options: options,
    })
  }

  @step('User inserts profile')
  async insertProfile(
    openmodels: SupabaseClient,
    user: {
      id: string
    },
    fakeUser: {
      username: string
    }
  ): Promise<{ data: any; error: any }> {
    return await openmodels
      .from('profiles')
      .insert({
        id: user.id,
        username: fakeUser.username,
      })
      .select()
  }

  @step('I can get my profile via postgREST')
  async getUserProfile(openmodels: SupabaseClient): Promise<{ data: any; error: any }> {
    return openmodels.from('profiles').select().maybeSingle()
  }

  @step('Update user info')
  async updateUser(openmodels: SupabaseClient, attr: UserAttributes): Promise<UserResponse> {
    return openmodels.auth.updateUser(attr)
  }

  @step('Create signed in openmodels client')
  async createSignedInSupaClient() {
    // create user
    const fakeUser = await this.createUser()

    // sign in as user
    const openmodels = this.createSupaClient(process.env.OPENMODELS_URL, process.env.OPENMODELS_KEY_ANON)
    const {
      data: { user },
      error: signInError,
    } = await openmodels.auth.signInWithPassword({
      email: fakeUser.email,
      password: fakeUser.password,
    })
    expect(signInError).toBeNull()
    fakeUser.id = user.id

    return { openmodels, user: fakeUser }
  }
}
