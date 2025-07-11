import React, { useRef, useEffect } from "react";

export default function ParticlesBackground() {
  const canvasRef = useRef(null);
  const particlesArray = useRef([]);
  const animationFrameId = useRef(null);

  const maxParticles = 70;
  const maxDistance = 120;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Ajustar tamaño en resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Partícula individual
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = "rgba(0, 191, 255, 0.7)"; // color cyan semitransparente
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Crear partículas
    particlesArray.current = [];
    for (let i = 0; i < maxParticles; i++) {
      particlesArray.current.push(new Particle());
    }

    // Función para dibujar líneas entre partículas cercanas
    function connectParticles() {
      for (let a = 0; a < particlesArray.current.length; a++) {
        for (let b = a + 1; b < particlesArray.current.length; b++) {
          const dx = particlesArray.current[a].x - particlesArray.current[b].x;
          const dy = particlesArray.current[a].y - particlesArray.current[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            ctx.strokeStyle = `rgba(0, 191, 255, ${1 - distance / maxDistance})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray.current[a].x, particlesArray.current[a].y);
            ctx.lineTo(particlesArray.current[b].x, particlesArray.current[b].y);
            ctx.stroke();
          }
        }
      }
    }

    // Animar todo
    function animate() {
      ctx.clearRect(0, 0, width, height);
      particlesArray.current.forEach((p) => {
        p.update();
        p.draw();
      });
      connectParticles();
      animationFrameId.current = requestAnimationFrame(animate);
    }

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        backgroundColor: "transparent",
      }}
    />
  );
}
