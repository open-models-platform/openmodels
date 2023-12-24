//
//  OpenModels.swift
//  UserManagement
//
//  Created by Guilherme Souza on 17/11/23.
//

import Foundation
import OpenModels

let openmodels = SupabaseClient(
  openmodelsURL: URL(string: "https://PROJECT_ID.openmodels.co")!,
  openmodelsKey: "YOUR_OPENMODELS_ANON_KEY"
)
