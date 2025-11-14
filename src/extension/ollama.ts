import { workspace } from "vscode"

import { TwinnyProvider } from "./provider-manager"

export class OllamaService {
  private _config = workspace.getConfiguration("twinny")
  private _baseUrl: string

  constructor(provider?: TwinnyProvider) {
    if (provider) {
      // Use provider configuration if provided
      const protocol = provider.apiProtocol || "http"
      const hostname = provider.apiHostname || "localhost"
      const port = provider.apiPort ? `:${provider.apiPort}` : ""
      this._baseUrl = `${protocol}://${hostname}${port}`
    } else {
      // Fall back to Ollama configuration for backward compatibility
      const protocol = (this._config.get("ollamaUseTls") as boolean)
        ? "https"
        : "http"
      const hostname = this._config.get("ollamaHostname") as string
      const port = this._config.get("ollamaApiPort") as string
      this._baseUrl = `${protocol}://${hostname}:${port}`
    }
  }

  public fetchModels = async (resource = "/api/tags") => {
    try {
      const response = await fetch(`${this._baseUrl}${resource}`)
      const { models } = await response.json()
      return Array.isArray(models) ? [...new Set(models)] : []
    } catch {
      return []
    }
  }
}
