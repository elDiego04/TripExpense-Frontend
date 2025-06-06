import React, { useEffect, useState } from 'react';
import './CreateHotelModal.css';
import api from '../../services/api';
import { useForm } from 'react-hook-form';

const amenitiesList = ['Wi-Fi', 'Piscina', 'Gimnasio', 'Desayuno', 'Aire acondicionado', 'Spa', 'Estacionamiento', 'Restaurante', 'Bar', 'Lavandería', 'Servicio a la habitación', 'Pet friendly', 'Actividades recreativas'];

const CreateHotelModal = ({ isOpen, onClose, onCreate }) => {
  const [cities, setCities] = useState([]);
  const [imagePreview, setImagePreview] = useState('');

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (isOpen) {
      // Carga ciudades SOLO al abrir modal
      const fetchCities = async () => {
        try {
          const res = await api.get('/cities');
          setCities(res.data);
        } catch (error) {
          console.error('Error al cargar ciudades:', error);
        }
      };

      fetchCities();
      reset(); // resetear formulario cada vez que se abre el modal
      setImagePreview(''); // limpiar preview imagen
      setValue('imageUrl', ''); // limpiar url en formulario
    }
  }, [isOpen, reset, setValue]);

  const onSubmit = async (data) => {
    try {
      console.log('Datos recibidos del formulario (antes de cambios):', data);

      // Convertir tipos
      data.stars = parseInt(data.stars);
      // Importante: city debe enviarse como objeto con id para evitar "The given id must not be null"
      data.cityId  = parseInt(data.cityId);

      console.log('Datos preparados para enviar al backend:', data);

      const response = await api.post('/hotels', data);
      console.log('Respuesta backend:', response.data);

      onCreate(response.data);

      reset();
      setImagePreview('');
      onClose();
    } catch (err) {
      console.error('Error al crear hotel:', err);

      if (err.response) {
        console.error('Error response data:', err.response.data);
        console.error('Error response status:', err.response.status);
        console.error('Error response headers:', err.response.headers);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setValue('imageUrl', url); // Actualizar campo hidden con URL
    }
  };

  if (!isOpen) return null;

  return (
    <div className="create-hotel-modal-overlay">
      <div className="create-hotel-modal-container">
        <h2>Crear Hotel</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="create-hotel-modal-form">

          <div className="create-hotel-form-group">
            <label>Nombre:</label>
            <input {...register('name', { required: 'El nombre es obligatorio', maxLength: 100 })} />
            {errors.name && <span className="create-hotel-error">{errors.name.message}</span>}
          </div>

          <div className="create-hotel-form-group">
            <label>Ciudad:</label>
            <select {...register('cityId ', { required: 'La ciudad es obligatoria' })} defaultValue="">
              <option value="" disabled>Seleccione una ciudad</option>
              {cities.map(city => (
                <option key={city.cityId} value={city.cityId}>{city.name}</option>
              ))}
            </select>
            {errors.city && <span className="create-hotel-error">{errors.city.message}</span>}
          </div>

          <div className="create-hotel-form-group">
            <label>Dirección:</label>
            <input {...register('address', { required: 'La dirección es obligatoria', maxLength: 255 })} />
            {errors.address && <span className="create-hotel-error">{errors.address.message}</span>}
          </div>

          <div className="create-hotel-form-group create-hotel-image-file">
            <label>Imagen:</label>
            <input type="file" onChange={handleImageChange} accept="image/*" />
            {imagePreview && <img src={imagePreview} alt="Vista previa" style={{ width: '100px' }} />}
          </div>

          <input type="hidden" {...register('imageUrl', {
            maxLength: 255,
            pattern: {
              value: /^https?:\/\/.+/,
              message: 'Debe ser una URL válida'
            }
          })} />

          <div className="create-hotel-form-group">
            <label>Estrellas:</label>
            <select
              {...register('stars', {
                required: 'Las estrellas son obligatorias',
                validate: value => [1, 2, 3, 4, 5].includes(Number(value)) || 'Debe estar entre 1 y 5'
              })}
              defaultValue=""
            >
              <option value="" disabled>Seleccione estrellas</option>
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n} estrella{n > 1 && 's'}</option>
              ))}
            </select>
            {errors.stars && <span className="create-hotel-error">{errors.stars.message}</span>}
          </div>

          <div className="create-hotel-form-group">
            <label>Descripción:</label>
            <textarea {...register('description')} />
          </div>

          <div className="create-hotel-form-group create-hotel-form-group-amenities">
            <fieldset>
              <legend>Amenities:</legend>
              <div className="create-hotel-amenities-container">
                {amenitiesList.map(a => (
                  <div key={a} className="create-hotel-amenities-option">
                    <input type="checkbox" value={a} {...register('amenities')} />
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="create-hotel-form-group">
            <label>Check-In:</label>
            <input type="time" {...register('checkInTime', { required: 'Hora de check-in obligatoria' })} />
            {errors.checkInTime && <span className="create-hotel-error">{errors.checkInTime.message}</span>}
          </div>

          <div className="create-hotel-form-group">
            <label>Check-Out:</label>
            <input type="time" {...register('checkOutTime', { required: 'Hora de check-out obligatoria' })} />
            {errors.checkOutTime && <span className="create-hotel-error">{errors.checkOutTime.message}</span>}
          </div>

          <div className="create-hotel-form-group">
            <label>Email:</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email obligatorio',
                maxLength: 100,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Formato de email inválido'
                }
              })}
            />
            {errors.email && <span className="create-hotel-error">{errors.email.message}</span>}
          </div>

          <div className="create-hotel-form-group">
            <label>Teléfono:</label>
            <input {...register('phone', { maxLength: 20 })} />
            {errors.phone && <span className="create-hotel-error">{errors.phone.message}</span>}
          </div>

          <div className="create-hotel-modal-actions">
            <button type="submit">Crear</button>
            <button type="button" onClick={() => { reset(); setImagePreview(''); onClose(); }}>Cancelar</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateHotelModal;
