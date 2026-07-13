export interface ClienteInput {
  gender: "Male" | "Female"
  SeniorCitizen: 0 | 1
  Partner: "Yes" | "No"
  Dependents: "Yes" | "No"
  tenure: number
  PhoneService: "Yes" | "No"
  MultipleLines: "No" | "Yes" | "No phone service"
  InternetService: "DSL" | "Fiber optic" | "No"
  OnlineSecurity: "No" | "Yes" | "No internet service"
  OnlineBackup: "No" | "Yes" | "No internet service"
  DeviceProtection: "No" | "Yes" | "No internet service"
  TechSupport: "No" | "Yes" | "No internet service"
  StreamingTV: "No" | "Yes" | "No internet service"
  StreamingMovies: "No" | "Yes" | "No internet service"
  Contract: "Month-to-month" | "One year" | "Two year"
  PaperlessBilling: "Yes" | "No"
  PaymentMethod: string
  MonthlyCharges: number
  TotalCharges: number
}

export interface RecomendarResponse {
  probabilidad_abandono: number
  accion_recomendada: string
  utilidad_por_accion: Record<string, number>
}
