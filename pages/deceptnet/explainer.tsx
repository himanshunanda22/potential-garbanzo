// pages/deceptnet/explainer.tsx
import DeceptNetLayout from '../../components/DeceptNet/DeceptNetLayout'

export default function ExplainerPage() {
  return (
    <DeceptNetLayout title="DeceptNet — Architecture & Mathematics">
      <div style={{ width: '100%', height: 'calc(100vh - 52px)', overflow: 'hidden' }}>
        <iframe
          src="/deceptnet/explainer.html"
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          title="DeceptNet — Architecture & Mathematics"
        />
      </div>
    </DeceptNetLayout>
  )
}
