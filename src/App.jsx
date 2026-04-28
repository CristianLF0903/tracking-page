import { useState } from 'react'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-light">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Madecentro Tracking</h1>
        <p className="text-secondary mb-6">
          Plataforma de consulta de pedidos en desarrollo.
        </p>
        <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition-standard font-semibold">
          Iniciar Consulta
        </button>
      </div>
    </div>
  )
}

export default App
