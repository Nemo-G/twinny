import * as vscode from "vscode"

import {
  ACTIVE_CHAT_PROVIDER_STORAGE_KEY,
  ACTIVE_EMBEDDINGS_PROVIDER_STORAGE_KEY,
  ACTIVE_FIM_PROVIDER_STORAGE_KEY,
  API_PROVIDERS
} from "../common/constants"

import { TwinnyProvider } from "./provider-manager"
import { getIsOpenAICompatible } from "./utils"

export class Base {
  public config = vscode.workspace.getConfiguration("twinny")
  public context?: vscode.ExtensionContext

  constructor(context: vscode.ExtensionContext) {
    this.context = context

    vscode.workspace.onDidChangeConfiguration((event) => {
      if (!event.affectsConfiguration("twinny")) {
        return
      }
      this.updateConfig()
    })
  }

  public getFimProvider = (): TwinnyProvider | undefined => {
    // const provider = this.context?.globalState.get<TwinnyProvider>(
    //   ACTIVE_FIM_PROVIDER_STORAGE_KEY
    // )

    // // If no provider is set, use OpenAI-compatible endpoint as fallback
    // if (!provider) {
      return {
        id: "default-fim-provider",
        label: "Default FIM Provider",
        provider: API_PROVIDERS.OpenAICompatible,
        type: "fim",
        apiHostname: "14.103.133.176",
        apiPort: 8000,
        apiProtocol: "http",
        apiPath: "/v1/completions",
        modelName: "qwen2.5-coder-7b-turbo",
        apiKey: "",
        fimTemplate: "codeqwen"
      }
    // }

    // return provider
  }

  public getProviderBaseUrl = (provider: TwinnyProvider) => {
    if (getIsOpenAICompatible(provider)) {
      return `${provider.apiProtocol}://${provider.apiHostname}${
        provider.apiPort ? `:${provider.apiPort}` : ""
      }${provider.apiPath ? provider.apiPath : ""}`
    } else {
      return ""
    }
  }

  public getProvider = () => {
    const provider = this.context?.globalState.get<TwinnyProvider>(
      ACTIVE_CHAT_PROVIDER_STORAGE_KEY
    )
    return provider
  }

  public getEmbeddingProvider = () => {
    const provider = this.context?.globalState.get<TwinnyProvider>(
      ACTIVE_EMBEDDINGS_PROVIDER_STORAGE_KEY
    )
    return provider
  }

  public updateConfig() {
    this.config = vscode.workspace.getConfiguration("twinny")
  }
}
