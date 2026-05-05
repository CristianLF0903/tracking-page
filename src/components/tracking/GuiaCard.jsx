import Card from "../ui/Card";
import Badge from "../ui/Badge";
import TrackingTimeline from "./TrackingTimeline";
import { Truck, ExternalLink, Calendar, Package } from "lucide-react";
import { formatDate } from "../../utils/formatters";

const GuiaCard = ({ guia }) => {
  const {
    _tracking_number,
    _tracking_company,
    _tracking_url,
    _fulfillment_created_at,
    _products,
    _fulfillment_status,
  } = guia;

  // Mapeo de estados de la API a los estados internos del flujo
  const statusMap = {
    Enviado: "Despachado",
    "En camino": "En camino",
    Recibido: "Entregado",
  };

  const shipping_status = statusMap[_fulfillment_status] || _fulfillment_status || "Preparando";

  // Parseamos los productos si vienen como string JSON
  let products = [];
  try {
    products =
      typeof _products === "string" ? JSON.parse(_products) : _products || [];
  } catch (e) {
    console.error("Error parsing products:", e);
  }

  return (
    <Card className="p-6 md:p-8" animate>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-gray-50 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
            <Truck size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg text-secondary-dark">
                Guía #{_tracking_number}
              </h3>
              <Badge
                variant={
                  shipping_status === "Entregado" ? "success" : "primary"
                }
              >
                {shipping_status}
              </Badge>
            </div>
            <p className="text-sm text-secondary font-medium">
              {_tracking_company}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 text-right">
          <div className="flex items-center gap-2 text-xs text-secondary/60">
            <Calendar size={14} />
            <span>
              Última actualización: {formatDate(_fulfillment_created_at)}
            </span>
          </div>
          {_tracking_url && (
            <a
              href={_tracking_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark text-sm font-semibold flex items-center gap-1.5 transition-standard"
            >
              Rastreo transportadora
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      <div className="mb-8">
        <TrackingTimeline currentStatus={shipping_status} />
      </div>

      {/* Lista de Productos */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <h4 className="text-sm font-bold text-secondary-dark uppercase tracking-wider mb-4">
          Productos en este envío
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product, idx) => (
            <div
              key={product.product_id || idx}
              className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100"
            >
              <div className="w-16 h-16 rounded-lg bg-white border border-gray-200 overflow-hidden flex-shrink-0">
                {product.url_img ? (
                  <img
                    src={product.url_img}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Package size={24} />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <p className="text-sm font-bold text-secondary-dark truncate">
                    {product.name || "Producto sin título"}
                  </p>
                  {product.quantity > 0 && (
                    <span className="bg-secondary-light text-secondary-dark px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap">
                      x{product.quantity}
                    </span>
                  )}
                </div>
                <p className="text-xs text-secondary/60 font-medium">
                  SKU: {product.sku || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default GuiaCard;
