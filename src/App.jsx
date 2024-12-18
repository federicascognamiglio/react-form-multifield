import AppArticles from './components/AppArticles';

function App() {

  return (
    <>
      {/* Header */}
      <header>
        <h1 className='text-center pt-4'>ARTICLES</h1>
      </header>
      {/* Main */}
      <main className='container'>
        <section>
          <AppArticles />
        </section>
      </main>
    </>
  )
}

export default App
