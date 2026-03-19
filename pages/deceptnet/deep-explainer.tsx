// pages/deceptnet/deep-explainer.tsx
import DeceptNetLayout from '../../components/DeceptNet/DeceptNetLayout'

export default function DeepExplainerPage() {
  return (
    <DeceptNetLayout title="DeceptNet — Deep Mathematical Explainer">
      <div style={{ width: '100%', height: 'calc(100vh - 52px)', overflow: 'hidden' }}>
        <iframe
          src="/deceptnet/deep-explainer.html"
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          title="DeceptNet — Deep Mathematical Explainer"
        />
      </div>
    </DeceptNetLayout>
  )
}
