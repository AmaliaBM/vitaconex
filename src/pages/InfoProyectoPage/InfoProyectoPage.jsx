import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function InfoProyectoPage() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 mb-5">
      <Card>
        <Card.Body>
          <h4 className="mb-3">Acerca del Proyecto</h4>
            <p>
            <strong>Amalia Barrigas Munuera</strong> desarrolla <strong>VitaConex</strong>, una aplicación web creada como proyecto final del <strong>bootcamp de Desarrollo Web</strong> impartido por Ironhack. 
            El desarrollo completo se llevó a cabo en un periodo intensivo de una semana y media, combinando tanto el diseño como la implementación técnica de la plataforma.
            </p>

          <p>
            El objetivo de esta app, además de facilitar la gestión a equipos sanitarios y centros de salud, es crear un acercamiento humano entre sanitarios y pacientes. 
            La parte más interesante del enfoque de esta aplicación es la <strong>experiencia del paciente</strong>, quien tiene la posibilidad de compartir su estado emocional y cómo se siente en su día a día. 
            Esta información puede ser consultada por el profesional sanitario asignado antes o durante la consulta, generando una relación más cercana y empática entre ambas partes. 
            Esta funcionalidad pone en valor la conexión real entre el cuerpo físico y la parte emocional de los seres humanos.<br />
            
          </p>

          <p>
            Cómo nos sentimos, cómo avanzamos, cuáles son nuestras emociones… no son solo aspectos relevantes para profesionales como psicólogos o psiquiatras. 
            Son pilares fundamentales del bienestar integral y relevantes para todos aquellos especialistas que acompañan, cuidan y ayudan a mejorar y sanar a otras personas.
          </p>

          <h5 className="mt-4">👥 Roles de usuario</h5>
          <p>
            La aplicación contempla tres tipos de rol:
          </p>
          <ul>
            <li><strong>Paciente:</strong> puede gestionar sus citas, ver a su sanitario asignado y compartir cómo se siente.</li>
            <li><strong>Sanitario:</strong> puede consultar el estado emocional de sus pacientes, gestionar sus citas y ver su historial.</li>
            <li><strong>Administrador:</strong> tiene acceso total a la gestión de usuarios, citas y datos. Este rol puede eliminar registros de la base de datos.</li>
          </ul>
          <p>
            Para seguridad del sistema, no se facilita acceso público al rol de <strong>administrador</strong>. 
            Si deseas conocer en profundidad cómo funciona este perfil, puedes solicitar una <strong>entrevista personal</strong> donde te mostraré las funcionalidades de este rol en tiempo real.
          </p>

          <h5 className="mt-4">🧠 Tecnologías utilizadas</h5>
          <ul>
            <li><strong>Frontend:</strong> React, JavaScript, HTML, CSS, JWT. Imágenes alojadas en Cloudinary.</li>
            <li><strong>Backend:</strong> Node.js, Express, Mongoose, JSON Web Token (JWT), Morgan.</li>
          </ul>

          <h5 className="mt-4">🎨 Diseño y experiencia de usuario</h5>
          <p>
            VitaConex ha sido diseñada respetando principios básicos de <strong>accesibilidad</strong> y <strong>usabilidad</strong>. 
            Se ha priorizado una navegación clara y sencilla, con una estética coherente y pensada para facilitar la experiencia de pacientes y personal sanitario.
          </p>

          <p>
            Las ilustraciones utilizadas en la página principal, visible sin necesidad de registro, pertenecen al banco de imágenes gratuito <strong>Freepik</strong>.
          </p>

          <div className="mt-4 text-end">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              ← Volver atrás
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default InfoProyectoPage;
