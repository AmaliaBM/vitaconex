import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function InfoProyectoPage() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 mb-5">
      <Card>
        <Card.Body>
          <div style={{ textAlign: 'center' }}>
            <img
              src="/vitaconex.svg"
              alt="Logotipo de VitaConex"
              style={{ width: '300px', marginBottom: '1.5rem' }}
            />
          </div>

          <h4 className="mb-3">Acerca del Proyecto</h4>
          <p>
            Soy <strong>Amalia Barrigas Munuera</strong> y he desarrollado <strong>VitaConex</strong>, una aplicación web que constituye mi proyecto final del <strong>bootcamp de Desarrollo Web</strong> impartido por Ironhack. 
            Llevé a cabo el diseño y la implementación técnica en un periodo intensivo de una semana y media.
          </p>

          <p>
            El objetivo de esta app, además de facilitar la gestión para equipos sanitarios y centros de salud, es fomentar un acercamiento humano entre sanitarios y pacientes. 
            Para mí, la parte más valiosa del proyecto es la <strong>experiencia del paciente</strong>, quien puede compartir su estado emocional y cómo se siente en su día a día. 
            Esta información puede ser consultada por el profesional sanitario asignado antes o durante la consulta, generando una relación más cercana y empática entre ambas partes.
          </p>

          <p>
            Cómo nos sentimos, cómo avanzamos, cuáles son nuestras emociones… no son solo aspectos relevantes para profesionales como psicólogos o psiquiatras. 
            Son pilares fundamentales del bienestar integral, y por eso quise que esta aplicación lo tuviera presente desde el enfoque médico general.
          </p>

          <p>
            La base de datos de VitaConex contiene los registros de <strong>citas médicas</strong>, un espacio de <strong>journaling</strong> o diario emocional que el paciente comparte con sus sanitarios de confianza, 
            el <strong>historial médico</strong> de cada paciente, así como los <strong>usuarios</strong> con sus distintos roles. Toda esta información está organizada y protegida para que cada perfil acceda únicamente a lo que necesita.
          </p>

          <h5 className="mt-4">👥 Roles de usuario</h5>
          <p>La aplicación contempla tres tipos de rol:</p>
          <ul>
            <li><strong>Paciente:</strong> puede gestionar sus citas, ver a su sanitario asignado y compartir cómo se siente.</li>
            <li><strong>Sanitario:</strong> puede consultar el estado emocional de sus pacientes, gestionar sus citas y ver su historial.</li>
            <li><strong>Administrador:</strong> tiene acceso total a la gestión de usuarios, citas y datos. Este rol puede eliminar registros de la base de datos.</li>
          </ul>
          <p>
            Por seguridad, no he habilitado el acceso público al rol de <strong>administrador</strong>. 
            Si deseas conocer en profundidad cómo funciona este perfil, puedo mostrarte sus funcionalidades en una <strong>entrevista personal</strong>.
          </p>

          <h5 className="mt-4">🧠 Tecnologías utilizadas</h5>
          <ul>
            <li><strong>Frontend:</strong> React, JavaScript, HTML, CSS, JWT. Imágenes alojadas en Cloudinary.</li>
            <li><strong>Backend:</strong> Node.js, Express, Mongoose, JSON Web Token (JWT), Morgan.</li>
            <li><strong>Otros:</strong> npm.</li>
          </ul>

          <h5 className="mt-4">🎨 Diseño y experiencia de usuario</h5>
          <p>
            Diseñé VitaConex teniendo muy en cuenta los principios de <strong>accesibilidad</strong> y <strong>usabilidad</strong>. 
            Priorizo siempre una navegación clara, con una estética coherente que facilite el uso tanto a pacientes como al personal sanitario.
          </p>

          <p>
            El logotipo es un diseño propio que realicé con Illustrator. Se trata de un <strong>isologo tipográfico</strong> donde la letra “O” ha sido sustituida por un <strong>corazón</strong>, 
            simbolizando el componente humano y emocional que quise reflejar desde el inicio del proyecto.
          </p>

          <p>
            Las ilustraciones pertenecen al banco de imágenes gratuito <strong>Freepik</strong>.
          </p>

          <p>
            He utilizado la fuente <strong>Arkinson Hyperlegible</strong>, especialmente diseñada para personas con discapacidad visual. 
            Me parecía coherente incorporar la mayor cantidad posible de recursos que favorezcan la <strong>accesibilidad</strong>, 
            teniendo en cuenta que esta es una aplicación centrada en el ámbito sanitario.
          </p>

          <p>
            Reconozco que algunos elementos de la interfaz no pueden personalizarse todo lo que me gustaría, 
            ya que ciertos paquetes como React-Bootstrap son algo rígidos a la hora de adaptarlos a estilos más creativos. 
            Aun así, dentro de esas limitaciones, he intentado crear una experiencia lo más <strong>interesante</strong> y <strong>accesible</strong> posible.
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



