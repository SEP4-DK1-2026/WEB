import './App.css'
import MyLineChart from './components/MyLineChart'

function App() {

  return (
    <>
      <section id="center">
        <MyLineChart includeAxes={false} />
      </section>
    </>
  )
}

export default App
