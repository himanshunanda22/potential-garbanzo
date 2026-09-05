// pages/deceptnet/deep-explainer.tsx
import DeceptNetLayout from '../../components/DeceptNet/DeceptNetLayout'

export default function DeepExplainerPage() {
  return (
    <DeceptNetLayout title="DeceptNet — Deep Mathematical Explainer">
      <div className="deceptnet-embed-shell">
        <iframe className="deceptnet-embed-frame" src="/deceptnet/deep-explainer.html" title="DeceptNet — Deep Mathematical Explainer" />
      </div>
    </DeceptNetLayout>
  )
}
