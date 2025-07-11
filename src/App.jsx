import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Menu, X } from "lucide-react";
import ParticlesBackground from "./components/ParticlesBackground.jsx";
import ContactModal from "./components/ContactModal.jsx";

const sections = ["inicio", "servicios", "testimonios", "casos", "contacto"];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      let found = "inicio";
      for (const id of sections) {
        const section = document.getElementById(id);
        if (section && window.scrollY >= section.offsetTop - 120) {
          found = id;
        }
      }
      setActiveSection(found);
    };
    window.addEventListener("scroll", handleScroll);
    window.scrollTo(0, 0);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HelmetProvider>
      <div className="relative min-h-screen">
        <ParticlesBackground />
        <Helmet>
          <title>Vertex | Agentes IA para tu empresa</title>
          <meta
            name="description"
            content="Automatización de procesos con agentes IA especializados. Consultoría e implementación profesional."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>

        {/* Navbar */}
        <nav
          className={`fixed top-0 left-0 right-0 z-30 px-6 py-4 transition-colors duration-500 backdrop-blur-xl shadow-lg ${
            scrolled ? "bg-[#121214]/90 border-b border-[#2a2a2e]" : "bg-transparent"
          }`}
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto text-white">
            <div className="text-xl font-bold tracking-widest">VERTEX</div>
            <ul className="hidden md:flex space-x-8 font-medium">
              {sections.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`transition-colors px-3 py-1 rounded-md ${
                      activeSection === id ? "text-[#00BFFF] font-semibold" : "hover:text-[#00BFFF]"
                    }`}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
            <button
              className="md:hidden text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden absolute top-full left-0 right-0 bg-[#121214]/95 border-t border-[#2a2a2e] text-white font-medium px-6 py-4 space-y-4"
            >
              {sections.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    activeSection === id ? "text-[#00BFFF] font-semibold" : "hover:text-[#00BFFF]"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              ))}
            </motion.div>
          )}
        </nav>

        {/* Main content */}
        <main
          className="pt-24"
          style={{
            background:
              "linear-gradient(to bottom, rgba(28,28,30,0.7), rgba(24,24,27,0.7), rgba(18,18,20,0.7))",
            color: "white",
          }}
        >
          {/* Hero / Inicio */}
          <header
            id="inicio"
            className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-background.jpg')" }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1
                className="text-6xl md:text-8xl font-extrabold mb-4 drop-shadow-xl"
                style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.15em" }}
              >
                VERTEX
              </h1>
              <p className="text-md md:text-lg text-gray-300 mb-10 max-w-lg mx-auto font-light">
                Automatizá tareas, mejorá tu productividad y hacé crecer tu negocio con{" "}
                <span className="text-[#00BFFF] font-semibold">Vertex</span>.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="bg-[#00BFFF] hover:bg-blue-400 text-white font-semibold py-4 px-10 rounded-xl shadow-xl transition duration-300"
              >
                Quiero un diagnóstico gratis
              </button>
            </motion.div>
          </header>

          {/* Servicios */}
          <section
            id="servicios"
            className="py-24 px-6 md:px-16 bg-[#121214]/70 backdrop-blur-md rounded-xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              ¿Qué puede hacer Vertex por tu negocio?
            </h2>
            <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto mb-12">
              {[
                "Agentes de soporte",
                "Agentes de venta",
                "Agentes internos",
                "Agentes de onboarding",
                "Bots de WhatsApp",
                "Asistentes de RRHH",
              ].map((title, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.25 }}
                  className="bg-[#1C1C1E] rounded-2xl p-6 shadow-lg border border-[#2a2a2e] hover:shadow-cyan-500/20 transition"
                >
                  <h3 className="text-xl font-semibold mb-3 text-[#00BFFF]">{title}</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {{
                      0: "Responden correos, chats y consultas comunes de clientes 24/7.",
                      1: "Contactan leads automáticamente y hacen seguimiento personalizado.",
                      2: "Automatizan tareas administrativas como informes, alertas o agendado.",
                      3: "Facilitan la incorporación y formación de nuevos empleados.",
                      4: "Gestionan interacciones rápidas vía WhatsApp para tus clientes.",
                      5: "Apoyan procesos internos de recursos humanos con automatización.",
                    }[i]}
                  </p>
                </motion.article>
              ))}
            </div>
          </section>

          {/* Testimonios */}
          <section
            id="testimonios"
            className="py-24 px-6 md:px-16 bg-[#18181B]/70 backdrop-blur-md rounded-xl text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Lo que dicen nuestros clientes</h2>
            <div className="max-w-4xl mx-auto space-y-10">
              {[
                {
                  name: "María López",
                  role: "Gerente de Operaciones",
                  company: "TechCorp",
                  testimonial:
                    "Gracias a Vertex, automatizamos nuestras consultas de clientes y aumentamos la satisfacción un 35%.",
                },
                {
                  name: "Juan Pérez",
                  role: "CTO",
                  company: "Innovatech",
                  testimonial:
                    "Los agentes internos redujeron en un 40% las tareas manuales y mejoraron la eficiencia de nuestros procesos.",
                },
              ].map((t, i) => (
                <motion.blockquote
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.25 }}
                  className="bg-[#121214] p-8 rounded-2xl shadow-md border border-[#2a2a2e]"
                >
                  <p className="text-gray-300 italic mb-4">"{t.testimonial}"</p>
                  <footer className="text-sm text-[#00BFFF] font-semibold">
                    {t.name} – {t.role} en {t.company}
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </section>

          {/* Casos de uso */}
          <section
            id="casos"
            className="py-24 px-6 md:px-16 bg-[#121214]/70 backdrop-blur-md rounded-xl text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Casos de Uso con Agentes IA</h2>
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {[
                {
                  title: "WhatsApp Bot para inmobiliarias",
                  desc: "Publicá propiedades y permití que los clientes las encuentren fácilmente por WhatsApp.",
                },
                {
                  title: "Agentes multicanal para atención al cliente",
                  desc: "Soluciones que transforman completamente la forma en que tu negocio interactúa con tus usuarios.",
                },
                {
                  title: "Agente interno para generación de reportes",
                  desc: "Automatización de reportes periódicos para reducir carga operativa.",
                },
                {
                  title: "Asistente de RRHH para entrevistas",
                  desc: "Filtra candidatos automáticamente y agenda entrevistas según disponibilidad.",
                },
                {
                  title: "Agente de ecommerce con IA generativa",
                  desc: "Recomienda productos en tiempo real a los usuarios usando análisis de intención.",
                },
              ].map((c, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="bg-[#1C1C1E] p-8 rounded-2xl shadow-lg border border-[#2a2a2e]"
                >
                  <h3 className="text-2xl font-semibold text-[#00BFFF] mb-3">{c.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{c.desc}</p>
                </motion.article>
              ))}
            </div>
          </section>

          {/* Contacto */}
          <section
            id="contacto"
            className="py-24 px-6 md:px-16 bg-[#18181B]/70 backdrop-blur-md rounded-xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Hablemos de tu empresa</h2>
              <p className="text-gray-300 mb-10 leading-relaxed">
                Contanos tus desafíos. Creamos soluciones automáticas a medida. Desde agentes de atención hasta procesos internos inteligentes.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="bg-[#00BFFF] hover:bg-blue-400 text-white font-semibold py-4 px-8 rounded-xl shadow-md transition duration-300"
              >
                Escribinos
              </button>
            </motion.div>
          </section>

          {/* Footer */}
          <footer className="bg-[#0f0f10] py-10 text-center text-gray-400 text-sm border-t border-[#2a2a2e]">
            <p>© {new Date().getFullYear()} Vertex - Todos los derechos reservados.</p>
            <p className="mt-2">Hecho con ❤️ en Argentina</p>
          </footer>
        </main>

        {/* Modal */}
        <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </HelmetProvider>
  );
}
