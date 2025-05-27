import React, { useState, useEffect } from "react";
import "./SignUpPage.css";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const images = [image1, image2, image3];

const SignUpPage = () => {
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{7,15}$/;

    if (!form.name.trim()) {
      newErrors.name = "* El nombre es obligatorio";
    }

    if (!form.lastname.trim()) {
      newErrors.lastname = "* El apellido es obligatorio";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "* El teléfono es obligatorio";
    } else if (!phoneRegex.test(form.phone)) {
      newErrors.phone = "* El teléfono debe tener solo números (7-15 dígitos)";
    }

    if (!form.email.trim()) {
      newErrors.email = "* El correo es obligatorio";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "* El correo no es válido";
    }

    if (!form.password.trim()) {
      newErrors.password = "* La contraseña es obligatoria";
    } else if (form.password.length < 6) {
      newErrors.password = "* La contraseña debe tener al menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await api.post("/auth/signup", form);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error al registrarse: ", error);
    }
  };

  return (
    <div className="su-page">
      <div className="su-container">
        <div className="su-images">
          <img src={images[currentIndex]} alt="Fondo" />
          <div className="su-dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={index === currentIndex ? "su-dot su-active" : "su-dot"}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>

        <div className="su-form-container">
          <h2>Crear Cuenta</h2>
          <p>Ingresa tus datos para registrarte.</p>
          <form onSubmit={handleSignUp}>
            <div className="su-input-group">
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? "error" : ""}
              />
            </div>
            {errors.name && <p className="su-error-message">{errors.name}</p>}

            <div className="su-input-group">
              <input
                type="text"
                name="lastname"
                placeholder="Apellido"
                value={form.lastname}
                onChange={handleChange}
                className={errors.lastname ? "error" : ""}
              />
            </div>
            {errors.lastname && <p className="su-error-message">{errors.lastname}</p>}

            <div className="su-input-group">
              <input
                type="text"
                name="phone"
                placeholder="Teléfono"
                value={form.phone}
                onChange={handleChange}
                className={errors.phone ? "error" : ""}
              />
            </div>
            {errors.phone && <p className="su-error-message">{errors.phone}</p>}

            <div className="su-input-group">
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
            </div>
            {errors.email && <p className="su-error-message">{errors.email}</p>}

            <div className="su-input-group">
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
              />
            </div>
            {errors.password && <p className="su-error-message">{errors.password}</p>}

            <button type="submit" className="su-button">
              Registrarse
            </button>

            <p className="su-login-text">
              ¿Ya tienes cuenta?{" "}
              <a href="/login" className="su-login-link">
                Inicia sesión
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
