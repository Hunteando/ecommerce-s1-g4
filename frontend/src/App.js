import './App.css';
import Footer from './componentes/footer';
import Formulario from './componentes/formularioEx';
import Slideshow from './componentes/slideshow';
import barraInformativa from './componentes/barraInformativa';


function App() {
  return (
    <>
    <main>

      <barraInformativa />
      <Slideshow />
      <Footer />
    </main><main>
        <form>
          <label htmlFor=''>Usuario</label>
          <input type='text' placeholder='Usuario' />
          <p>Lorem</p>
        </form>
      </main>
      </>
    
      
  );
}

export default App;
