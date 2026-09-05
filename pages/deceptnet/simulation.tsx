// pages/deceptnet/simulation.tsx
import DeceptNetLayout from '../../components/DeceptNet/DeceptNetLayout'

export default function SimulationPage() {
  return (
    <DeceptNetLayout title="DeceptNet — Session Simulation">
      <div className="deceptnet-embed-shell">
        <iframe className="deceptnet-embed-frame" src="/deceptnet/simulation.html" title="DeceptNet — Live Session Simulation" />
      </div>
    </DeceptNetLayout>
  )
}
