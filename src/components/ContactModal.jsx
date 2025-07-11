import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ContactModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    motivo: "",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, apellido, telefono, motivo } = formData;
    if (!nombre || !apellido || !telefono || !motivo) {
      alert("Por favor, completá todos los campos.");
      return;
    }
    const mensaje = `Hola, soy ${nombre} ${apellido}. Mi teléfono es ${telefono}. Quisiera consultar sobre: ${motivo}`;
    const urlWhatsapp = `https://wa.me/5491123456789?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsapp, "_blank");
    onClose();
    setFormData({ nombre: "", apellido: "", telefono: "", motivo: "" });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#121214] rounded-xl shadow-xl p-8 w-full max-w-md relative"
          >
            <button
              onClick={onClose}
              aria-label="Cerrar modal"
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>

            <h3 className="text-xl font-semibold mb-6 text-white">Contacto por WhatsApp</h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-white">
              <div>
                <label htmlFor="nombre" className="block mb-1">Nombre</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full rounded-md bg-[#18181b] border border-[#2a2a2e] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
                  required
                />
              </div>

              <div>
                <label htmlFor="apellido" className="block mb-1">Apellido</label>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="w-full rounded-md bg-[#18181b] border border-[#2a2a2e] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
                  required
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block mb-1">Número de teléfono</label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+54 9 11 1234 5678"
                  className="w-full rounded-md bg-[#18181b] border border-[#2a2a2e] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
                  required
                />
              </div>

              <div>
                <label htmlFor="motivo" className="block mb-1">Motivo del contacto</label>
                <textarea
                  id="motivo"
                  name="motivo"
                  value={formData.motivo}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-md bg-[#18181b] border border-[#2a2a2e] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-[#00BFFF] hover:bg-blue-400 w-full py-3 rounded-lg font-semibold transition"
              >
                Enviar por WhatsApp
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
