// pages/deceptnet/simulation.tsx
import DeceptNetLayout from '../../components/DeceptNet/DeceptNetLayout'

export default function SimulationPage() {
  return (
    <DeceptNetLayout title="DeceptNet — Session Simulation">
      <div style={{ width: '100%', height: 'calc(100vh - 52px)', overflow: 'hidden' }}>
        <iframe
          src="/deceptnet/simulation.html"
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          title="DeceptNet — Live Session Simulation"
        />
      </div>
    </DeceptNetLayout>
  )
}
