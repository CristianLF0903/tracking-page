import Card from "../components/ui/Card";
import SearchForm from "../components/tracking/SearchForm";
import { PackageSearch } from "lucide-react";
import Logo from "../assets/logo.svg";
import { useTrackingStore } from "../store/useTrackingStore";

const HomePage = () => {
  const fetchTracking = useTrackingStore((state) => state.fetchTracking);

  const handleSearch = (id) => {
    fetchTracking(id.trim());
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 md:py-20">
      <div className="text-center mb-12 animate-in fade-in slide-in-from-top-6 duration-700">
        <img src={Logo} alt="Madecentro" className="h-12 mx-auto mb-8" />
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-6">
          <PackageSearch size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Consulta tu pedido
        </h1>
        <p className="text-lg text-secondary max-w-lg mx-auto">
          Rastrea tus compras de Madecentro de forma fácil y rápida con tu
          número de pedido o guía.
        </p>
      </div>

      <Card className="w-full max-w-xl p-6 md:p-8" animate>
        <SearchForm onSearch={handleSearch} />
      </Card>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl">
        <div className="text-center">
          <div className="text-primary font-bold text-xl mb-1">01</div>
          <h3 className="font-bold text-secondary-dark mb-2">
            Ingresa tus datos
          </h3>
          <p className="text-sm text-secondary">
            Digita el número que recibiste en tu correo.
          </p>
        </div>
        <div className="text-center">
          <div className="text-primary font-bold text-xl mb-1">02</div>
          <h3 className="font-bold text-secondary-dark mb-2">Estado en vivo</h3>
          <p className="text-sm text-secondary">
            Mira en qué parte del proceso está tu compra.
          </p>
        </div>
        <div className="text-center">
          <div className="text-primary font-bold text-xl mb-1">03</div>
          <h3 className="font-bold text-secondary-dark mb-2">
            ¡Recibe y disfruta!
          </h3>
          <p className="text-sm text-secondary">
            Te avisaremos cuando estemos por llegar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
