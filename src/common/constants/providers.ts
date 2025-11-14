export const OPEN_AI_COMPATIBLE_PROVIDERS = {
  LiteLLM: "litellm",
  Deepseek: "deepseek",
  LMStudio: "lmstudio",
  Oobabooga: "oobabooga",
  OpenWebUI: "openwebui",
  Ollama: "ollama",
  Twinny: "twinny",
  OpenAICompatible: "openai-compatible"
}

export const API_PROVIDERS = {
  Anthropic: "anthropic",
  OpenAI: "openai",
  Mistral: "mistral",
  LlamaCpp: "llamacpp",
  Groq: "groq",
  OpenRouter: "openrouter",
  Cohere: "cohere",
  Perplexity: "perplexity",
  Gemini: "gemini",
  ...OPEN_AI_COMPATIBLE_PROVIDERS
}

export const DEFAULT_PROVIDER_FORM_VALUES = {
  apiHostname: "14.103.133.176",
  apiKey: "",
  apiPath: "/v1",
  apiPort: 8000,
  apiProtocol: "http",
  id: "",
  label: "",
  modelName: "",
  name: "",
  provider: "openai-compatible",
  type: "chat"
}
