CREATE TABLE usuarios (
    id_usuarios        BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre             VARCHAR(150) NOT NULL,
    correo             VARCHAR(150) NOT NULL UNIQUE,
    password         VARCHAR(255) NOT NULL,
    rol                enum('admin','usuario') DEFAULT 'usuario',
    estado             TINYINT(1) DEFAULT 1,         
    fecha_creacion     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE tareas (
    id_tareas          BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo             VARCHAR(200) NOT NULL,
    descripcion        TEXT,
    estado_actividad             enum('finalizada', 'en proceso' , 'pendiente') DEFAULT 'pendiente',  -- pendiente, en_progreso, completada
    fecha_creacion     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_limite       DATE,
    id_usuarios        BIGINT NOT NULL,
    estado             TINYINT(1) DEFAULT 1,         

    CONSTRAINT fk_tareas_usuarios
        FOREIGN KEY (id_usuarios) REFERENCES usuarios(id_usuarios)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);