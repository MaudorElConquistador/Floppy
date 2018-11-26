USE Floppy
DELIMITER $$
DROP PROCEDURE IF EXISTS InsertIdVig$$
DROP PROCEDURE IF EXISTS ConsultarVigyFrac$$
DROP PROCEDURE IF EXISTS TransaFrac$$
DROP PROCEDURE IF EXISTS TransaUser$$
DROP PROCEDURE IF EXISTS ConsultarVig$$
DROP FUNCTION IF EXISTS ModifiVig$$

CREATE PROCEDURE ConsultarVig(IN Correo VARCHAR(100))
    BEGIN
		SELECT * FROM vigilante WHERE cor_vig=Correo;
    END$$
CREATE PROCEDURE InsertIdVig()
    BEGIN
		UPDATE fraccionamiento INNER JOIN vigilante ON (vigilante.dir_vig = fraccionamiento.dir_fra) SET fraccionamiento.id_vig = vigilante.id_vig WHERE dir_fra = vigilante.dir_vig;
    END$$
CREATE PROCEDURE ConsultarVigyFrac()
    BEGIN
		SELECT  * FROM (fraccionamiento INNER JOIN vigilante ON (vigilante.dir_vig = fraccionamiento.dir_fra));
    END$$
CREATE PROCEDURE TransaFrac(IN Direccion VARCHAR(100), Capacidad INT, Clave TEXT, Nombre VARCHAR(100), Password VARCHAR(100), Correo VARCHAR(100),Telefono INT) 
	BEGIN
		START TRANSACTION;
			INSERT INTO fraccionamiento(dir_fra,cap_fra,cla_fra) VALUES(Direccion, Capacidad, Clave);
			INSERT INTO vigilante(nom_vig,pas_vig,cor_vig,dir_vig,tel_vig) VALUES (Nombre,Password,Correo,Direccion,Telefono);
			UPDATE fraccionamiento INNER JOIN vigilante ON (vigilante.dir_vig = fraccionamiento.dir_fra) SET fraccionamiento.id_vig = vigilante.id_vig WHERE dir_fra = vigilante.dir_vig;
		COMMIT;
	END$$
CREATE PROCEDURE TransaUser(IN Nombre VARCHAR(100), Correo VARCHAR(100),Password TEXT, Letras VARCHAR(100), Fraccionamiento INT, Marca VARCHAR(100)) 
	BEGIN
		START TRANSACTION;
			INSERT INTO habitante(nom_usu, cor_usu ,pas_usu, let_hab, id_fra) VALUES(Nombre, Correo, Password, Letras, Fraccionamiento);
			INSERT INTO car(let_car,mar_car) VALUES (Letras, Marca);
			UPDATE habitante INNER JOIN car ON (habitante.let_hab = car.let_car) SET habitante.id_car = car.id_car, car.id_usu =habitante.id_usu  WHERE habitante.let_hab = car.let_car;
		COMMIT;
	END$$