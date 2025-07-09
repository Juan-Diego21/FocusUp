from flask import Blueprint, render_template, request, redirect, url_for, current_app, flash,session
from flask_bcrypt import Bcrypt
import os
from werkzeug.utils import secure_filename

#Creamos el blueprint

event_bp = Blueprint('event_bp', __name__)
#Cifrar contraseñas
bcrypt = Bcrypt()

#get recivir
#post eviar datos 
@event_bp.route('/eventos', methods=['GET', 'POST'])
def eventos():
    return render_template('eventos1.html')

@event_bp.route('/GestionarEven/Programar', methods=['GET', 'POST'])
def event_create():
    eventos = []
    connection = current_app.connection

    try:
        if request.method == 'POST':
            # ✅ Asegúrate de que el usuario haya iniciado sesión
            id_usuario = session.get('id_usuario')
            if not id_usuario:
                return redirect(url_for('user_bp.login'))

            nombre_evento = request.form['nombre_evento']
            fecha_evento = request.form['fecha_evento']
            hora_evento = request.form['hora_evento']
            descripcion_evento = request.form['descripcion_evento']

            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO Eventos (nombre_evento, fecha_evento, hora_evento, descripcion_evento, id_usuario) VALUES (%s, %s, %s, %s, %s)",
                    (nombre_evento, fecha_evento, hora_evento, descripcion_evento, id_usuario)
                )
                connection.commit()

        # Mostrar los eventos existentes
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM Eventos")
            eventos = cursor.fetchall()

    except Exception as e:
        return f"Error al programar evento: {str(e)}"

    return render_template('eventos.html', eventos=eventos)

