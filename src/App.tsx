import { StatCounter } from '@/components/StatCounter'

export default function App() {
  return (
    <main className="demo">
      <h1>stat counter demo</h1>

      <div className="stats">
        <StatCounter end={342} label="sensitive files" />
        <StatCounter end={40815} label="links scanned" />
        <StatCounter end={1284} prefix="$" suffix="+" label="saved per month" />
      </div>
    </main>
  )
}
