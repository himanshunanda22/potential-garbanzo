// pages/deceptnet/explainer.tsx
import DeceptNetLayout from '../../components/DeceptNet/DeceptNetLayout'

export default function ExplainerPage() {
  return (
    <DeceptNetLayout title="DeceptNet — Architecture & Mathematics">
      <div className="deceptnet-embed-shell">
        <iframe className="deceptnet-embed-frame" src="/deceptnet/explainer.html" title="DeceptNet — Architecture & Mathematics" />
      </div>
    </DeceptNetLayout>
  )
}
