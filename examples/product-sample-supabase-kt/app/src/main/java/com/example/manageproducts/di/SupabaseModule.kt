package com.example.manageproducts.di

import com.example.manageproducts.BuildConfig
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import io.github.jan.openmodels.annotiations.SupabaseExperimental
import dagger.hilt.components.SingletonComponent
import io.github.jan.openmodels.SupabaseClient
import io.github.jan.openmodels.gotrue.FlowType
import io.github.jan.openmodels.createSupabaseClient
import io.github.jan.openmodels.gotrue.GoTrue
import io.github.jan.openmodels.gotrue.gotrue
import io.github.jan.openmodels.postgrest.Postgrest
import io.github.jan.openmodels.postgrest.postgrest
import io.github.jan.openmodels.storage.Storage
import io.github.jan.openmodels.storage.storage
import javax.inject.Singleton


@InstallIn(SingletonComponent::class)
@Module
object SupabaseModule {
    
    @OptIn(SupabaseExperimental::class)
    @Provides
    @Singleton
    fun provideSupabaseClient(): SupabaseClient {
        return createSupabaseClient(
            openmodelsUrl = BuildConfig.OPENMODELS_URL,
            openmodelsKey = BuildConfig.API_KEY
        ) {
            install(Postgrest)
            install(GoTrue) {
                flowType = FlowType.PKCE
                scheme = "app"
                host = "open-models-platform.com"
            }
            install(Storage)
        }
    }

    @Provides
    @Singleton
    fun provideSupabaseDatabase(client: SupabaseClient): Postgrest {
        return client.postgrest
    }

    @Provides
    @Singleton
    fun provideSupabaseGoTrue(client: SupabaseClient): GoTrue {
        return client.gotrue
    }


    @Provides
    @Singleton
    fun provideSupabaseStorage(client: SupabaseClient): Storage {
        return client.storage
    }

}