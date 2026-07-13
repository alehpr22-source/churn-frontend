"use client"

import { useState, useEffect } from "react"
import type { ClienteInput, RecomendarResponse, HistorialEntry } from "@/lib/types"
import { recomendar } from "@/lib/api"
import SelectField from "./SelectField"
import FormField from "./FormField"
import RiskMeter from "./RiskMeter"
import ActionCard from "./ActionCard"
import UtilityTable from "./UtilityTable"
import ExplanationCard from "./ExplanationCard"
import HowItWorks from "./HowItWorks"

const initialForm: ClienteInput = {
  gender: "Female",
  SeniorCitizen: 0,
  Partner: "No",
  Dependents: "No",
  tenure: 12,
  PhoneService: "Yes",
  MultipleLines: "No",
  InternetService: "Fiber optic",
  OnlineSecurity: "No",
  OnlineBackup: "No",
  DeviceProtection: "No",
  TechSupport: "No",
  StreamingTV: "No",
  StreamingMovies: "No",
  Contract: "Month-to-month",
  PaperlessBilling: "Yes",
  PaymentMethod: "Electronic check",
  MonthlyCharges: 89.9,
  TotalCharges: 1078.8,
}

const CLIENTE_ALTO_RIESGO: ClienteInput = {
  gender: "Male",
  SeniorCitizen: 0,
  Partner: "No",
  Dependents: "No",
  tenure: 2,
  PhoneService: "Yes",
  MultipleLines: "No",
  InternetService: "Fiber optic",
  OnlineSecurity: "No",
  OnlineBackup: "No",
  DeviceProtection: "No",
  TechSupport: "No",
  StreamingTV: "Yes",
  StreamingMovies: "Yes",
  Contract: "Month-to-month",
  PaperlessBilling: "Yes",
  PaymentMethod: "Electronic check",
  MonthlyCharges: 118.75,
  TotalCharges: 237.5,
}

const CLIENTE_BAJO_RIESGO: ClienteInput = {
  gender: "Female",
  SeniorCitizen: 0,
  Partner: "Yes",
  Dependents: "Yes",
  tenure: 72,
  PhoneService: "Yes",
  MultipleLines: "No",
  InternetService: "DSL",
  OnlineSecurity: "Yes",
  OnlineBackup: "Yes",
  DeviceProtection: "Yes",
  TechSupport: "Yes",
  StreamingTV: "No",
  StreamingMovies: "No",
  Contract: "Two year",
  PaperlessBilling: "No",
  PaymentMethod: "Bank transfer (automatic)",
  MonthlyCharges: 55.2,
  TotalCharges: 3974.4,
}

const SI_NO = [
  { value: "No", label: "No" },
  { value: "Yes", label: "Sí" },
]

const SI_NO_INTERNET = [
  { value: "No", label: "No" },
  { value: "Yes", label: "Sí" },
  { value: "No internet service", label: "Sin servicio de internet" },
]

export default function ChurnForm() {
  const [form, setForm] = useState<ClienteInput>(initialForm)
  const [resultado, setResultado] = useState<RecomendarResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [coldStart, setColdStart] = useState(true)
  const [historial, setHistorial] = useState<HistorialEntry[]>([])
  const [historialOpen, setHistorialOpen] = useState(false)
  const [perfilActual, setPerfilActual] = useState<string | null>(null)

  const phoneServiceOff = form.PhoneService === "No"
  const internetServiceOff = form.InternetService === "No"

  useEffect(() => {
    setForm((prev) => {
      const next = { ...prev }
      if (prev.PhoneService === "No") {
        next.MultipleLines = "No phone service"
      }
      if (prev.InternetService === "No") {
        next.OnlineSecurity = "No internet service"
        next.OnlineBackup = "No internet service"
        next.DeviceProtection = "No internet service"
        next.TechSupport = "No internet service"
        next.StreamingTV = "No internet service"
        next.StreamingMovies = "No internet service"
      }
      return next
    })
  }, [form.PhoneService, form.InternetService])

  const cargarCliente = (cliente: ClienteInput, perfil: string) => {
    setForm(cliente)
    setResultado(null)
    setError(null)
    setPerfilActual(perfil)
  }

  const cargarResultadoDelHistorial = (entry: HistorialEntry) => {
    setResultado({
      probabilidad_abandono: entry.probabilidad,
      accion_recomendada: entry.accion,
      utilidad_por_accion: entry.utilidad_por_accion,
    })
    setError(null)
  }

  const reiniciar = () => {
    setForm(initialForm)
    setResultado(null)
    setError(null)
    setPerfilActual(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setPerfilActual(null)
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "SeniorCitizen"
          ? Number(value)
          : ["tenure", "MonthlyCharges", "TotalCharges"].includes(name)
            ? Number(value)
            : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResultado(null)
    try {
      const data = await recomendar(form)
      setResultado(data)
      setColdStart(false)
      setHistorial((prev) => {
        const entry: HistorialEntry = {
          id: Date.now(),
          perfil: perfilActual ?? "Personalizado",
          probabilidad: data.probabilidad_abandono,
          accion: data.accion_recomendada,
          utilidad_por_accion: data.utilidad_por_accion,
          cargoMensual: form.MonthlyCharges,
        }
        return [entry, ...prev].slice(0, 4)
      })
      setHistorialOpen(true)
    } catch (err) {
      if (err instanceof TypeError) {
        setError(
          "La API no respondió. Si es la primera consulta, puede demorar unos segundos (cold start)."
        )
      } else {
        setError(
          "No se pudo obtener una respuesta de la API. Verifica que el backend esté desplegado."
        )
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-6 items-start">
      <section className="bg-white border border-border rounded-xl p-7 shadow-[0_1px_2px_rgba(18,33,61,0.04)]">
        <h2 className="font-heading text-base mb-5 text-primary">
          Datos del cliente
        </h2>

        <div className="flex flex-wrap gap-2 mb-6 pb-5 border-b border-border">
          <button
            type="button"
            onClick={() => cargarCliente(CLIENTE_ALTO_RIESGO, "Alto riesgo")}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-risk-alto/10 text-risk-alto hover:bg-risk-alto/20 transition-colors"
          >
            Cargar alto riesgo
          </button>
          <button
            type="button"
            onClick={() => cargarCliente(CLIENTE_BAJO_RIESGO, "Bajo riesgo")}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-risk-bajo/10 text-risk-bajo hover:bg-risk-bajo/20 transition-colors"
          >
            Cargar bajo riesgo
          </button>
          <button
            type="button"
            onClick={() => cargarCliente(initialForm, "Promedio")}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-text-muted/10 text-text-muted hover:bg-text-muted/20 transition-colors"
          >
            Cargar promedio
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <h3 className="font-heading text-xs uppercase tracking-wider text-text-muted mb-3">
            Perfil del cliente
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
            <SelectField
              label="Género"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              options={[
                { value: "Female", label: "Femenino" },
                { value: "Male", label: "Masculino" },
              ]}
            />
            <SelectField
              label="Adulto mayor"
              name="SeniorCitizen"
              value={String(form.SeniorCitizen)}
              onChange={handleChange}
              options={[
                { value: "0", label: "No" },
                { value: "1", label: "Sí" },
              ]}
            />
            <SelectField
              label="Tiene pareja"
              name="Partner"
              value={form.Partner}
              onChange={handleChange}
              options={SI_NO}
            />
            <SelectField
              label="Tiene dependientes"
              name="Dependents"
              value={form.Dependents}
              onChange={handleChange}
              options={SI_NO}
            />
          </div>

          <hr className="border-none border-t border-border my-5" />

          <h3 className="font-heading text-xs uppercase tracking-wider text-text-muted mb-3">
            Contrato y facturación
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
            <FormField
              label="Antigüedad (meses)"
              name="tenure"
              value={form.tenure}
              onChange={handleChange}
              min="0"
              tooltip="Rango del dataset: 1–72 meses"
            />
            <SelectField
              label="Tipo de contrato"
              name="Contract"
              value={form.Contract}
              onChange={handleChange}
              options={[
                { value: "Month-to-month", label: "Mes a mes" },
                { value: "One year", label: "Un año" },
                { value: "Two year", label: "Dos años" },
              ]}
            />
            <SelectField
              label="Facturación electrónica"
              name="PaperlessBilling"
              value={form.PaperlessBilling}
              onChange={handleChange}
              options={[
                { value: "Yes", label: "Sí" },
                { value: "No", label: "No" },
              ]}
            />
            <SelectField
              label="Método de pago"
              name="PaymentMethod"
              value={form.PaymentMethod}
              onChange={handleChange}
              options={[
                { value: "Electronic check", label: "Cheque electrónico" },
                { value: "Mailed check", label: "Cheque por correo" },
                {
                  value: "Bank transfer (automatic)",
                  label: "Transferencia automática",
                },
                {
                  value: "Credit card (automatic)",
                  label: "Tarjeta de crédito automática",
                },
              ]}
            />
          </div>

          <hr className="border-none border-t border-border my-5" />

          <h3 className="font-heading text-xs uppercase tracking-wider text-text-muted mb-3">
            Servicios contratados
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
            <SelectField
              label="Servicio telefónico"
              name="PhoneService"
              value={form.PhoneService}
              onChange={handleChange}
              options={SI_NO}
            />
            <SelectField
              label="Líneas múltiples"
              name="MultipleLines"
              value={form.MultipleLines}
              onChange={handleChange}
              disabled={phoneServiceOff}
              options={[
                { value: "No", label: "No" },
                { value: "Yes", label: "Sí" },
                { value: "No phone service", label: "Sin servicio telefónico" },
              ]}
            />
            <SelectField
              label="Servicio de internet"
              name="InternetService"
              value={form.InternetService}
              onChange={handleChange}
              options={[
                { value: "Fiber optic", label: "Fibra óptica" },
                { value: "DSL", label: "DSL" },
                { value: "No", label: "Sin internet" },
              ]}
            />
            <SelectField
              label="Seguridad en línea"
              name="OnlineSecurity"
              value={form.OnlineSecurity}
              onChange={handleChange}
              disabled={internetServiceOff}
              options={SI_NO_INTERNET}
            />
            <SelectField
              label="Respaldo en línea"
              name="OnlineBackup"
              value={form.OnlineBackup}
              onChange={handleChange}
              disabled={internetServiceOff}
              options={SI_NO_INTERNET}
            />
            <SelectField
              label="Protección de dispositivo"
              name="DeviceProtection"
              value={form.DeviceProtection}
              onChange={handleChange}
              disabled={internetServiceOff}
              options={SI_NO_INTERNET}
            />
            <SelectField
              label="Soporte técnico"
              name="TechSupport"
              value={form.TechSupport}
              onChange={handleChange}
              disabled={internetServiceOff}
              options={SI_NO_INTERNET}
            />
            <SelectField
              label="Streaming TV"
              name="StreamingTV"
              value={form.StreamingTV}
              onChange={handleChange}
              disabled={internetServiceOff}
              options={SI_NO_INTERNET}
            />
            <SelectField
              label="Streaming películas"
              name="StreamingMovies"
              value={form.StreamingMovies}
              onChange={handleChange}
              disabled={internetServiceOff}
              options={SI_NO_INTERNET}
            />
          </div>

          <hr className="border-none border-t border-border my-5" />

          <h3 className="font-heading text-xs uppercase tracking-wider text-text-muted mb-3">
            Cargos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
            <FormField
              label="Cargo mensual (USD)"
              name="MonthlyCharges"
              value={form.MonthlyCharges}
              onChange={handleChange}
              min="0"
              step="0.01"
              tooltip="Rango del dataset: 18.8–118.75 USD"
            />
            <FormField
              label="Cargo total acumulado (USD)"
              name="TotalCharges"
              value={form.TotalCharges}
              onChange={handleChange}
              min="0"
              step="0.01"
              tooltip="Rango del dataset: 18.8–8684.8 USD"
            />
          </div>

          {form.tenure === 0 && form.TotalCharges > 0 && (
            <div className="mt-4 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-start gap-2">
              <span>⚠️</span>
              <span>
                El cliente tiene antigüedad 0 pero cargos totales mayores a 0.
                Revisa los valores ingresados.
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full py-3 px-4 bg-accent text-[#08302D] font-heading font-semibold text-sm rounded-xl cursor-pointer transition-colors duration-150 hover:bg-accent-dark hover:text-white focus-visible:outline-3 focus-visible:outline-primary focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-wait"
          >
            {loading
              ? coldStart
                ? "Consultando… (la primera carga puede demorar)"
                : "Consultando…"
              : "Consultar predicción"}
          </button>
        </form>
      </section>

      <section className="bg-white border border-border rounded-xl p-7 shadow-[0_1px_2px_rgba(18,33,61,0.04)] md:sticky md:top-6">
        <h2 className="font-heading text-base mb-5 text-primary">
          Resultado
        </h2>

        {!resultado && !error && (
          <p className="text-text-muted text-sm leading-relaxed">
            Completa el formulario y presiona{" "}
            <strong>Consultar predicción</strong> para ver la probabilidad de
            abandono y la acción de retención recomendada. También puedes usar
            los botones de ejemplo para una demo rápida.
          </p>
        )}

        {error && (
          <p className="text-risk-alto text-sm leading-relaxed">{error}</p>
        )}

        {resultado && (
          <div>
            <RiskMeter probabilidad={resultado.probabilidad_abandono} />
            <ActionCard accion={resultado.accion_recomendada} />
            <ExplanationCard
              probabilidad={resultado.probabilidad_abandono}
              accion={resultado.accion_recomendada}
              cargoMensual={form.MonthlyCharges}
            />
            <UtilityTable
              utilidad_por_accion={resultado.utilidad_por_accion}
              accion_recomendada={resultado.accion_recomendada}
            />
            <button
              type="button"
              onClick={reiniciar}
              className="mt-4 w-full py-2 px-3 text-xs font-medium rounded-lg border border-border text-text-muted hover:bg-surface hover:text-text transition-colors cursor-pointer"
            >
              Nueva consulta
            </button>
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-border">
          <button
            type="button"
            onClick={() => setHistorialOpen(!historialOpen)}
            className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text transition-colors"
            disabled={historial.length === 0}
          >
            <span className="font-mono text-xs">
              {historialOpen ? "▼" : "▶"}
            </span>
            Historial ({historial.length})
          </button>
          {historialOpen && historial.length > 0 && (
            <div className="mt-2 space-y-1">
              {historial.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => cargarResultadoDelHistorial(entry)}
                  className="w-full text-left text-xs flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface transition-colors"
                >
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      entry.probabilidad < 0.33
                        ? "bg-risk-bajo"
                        : entry.probabilidad < 0.66
                          ? "bg-risk-medio"
                          : "bg-risk-alto"
                    }`}
                  />
                  <span className="font-mono text-text-muted w-20 truncate">
                    {entry.perfil}
                  </span>
                  <span className="font-mono text-text">
                    {(entry.probabilidad * 100).toFixed(0)}%
                  </span>
                  <span className="text-text-muted truncate">
                    {entry.accion}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <HowItWorks />
      </section>
    </div>
  )
}
