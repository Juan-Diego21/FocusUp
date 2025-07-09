from flask import Blueprint, render_template, request, redirect, url_for, current_app, session
from flask_bcrypt import Bcrypt
from datetime import date

user_bp = Blueprint('user_bp', __name__)
bcrypt = Bcrypt()

# LOGIN
@user_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        contraseña = request.form['contraseña']

        connection = current_app.connection
        try:
            with connection.cursor() as cursor:
                # Ahora pedimos también el id_usuario
                cursor.execute("SELECT id_usuario, contraseña FROM Usuario WHERE email=%s", (email,))
                result = cursor.fetchone()

                if result and bcrypt.check_password_hash(result['contraseña'], contraseña):
                    session['id_usuario'] = result['id_usuario']  # Guardamos el ID en la sesión
                    session['user_email'] = email
                    return redirect(url_for('user_bp.profile'))
                else:
                    return "Login incorrecto. Verifica tus credenciales."
        except Exception as e:
            return str(e)

    return render_template('login.html')


# REGISTRO
@user_bp.route('/register', methods=['GET', 'POST'])
def register():
    connection = current_app.connection
    if request.method == 'POST':
        nombre = request.form['nombre']
        email = request.form['email']
        contraseña = request.form['contraseña']
        hashed_password = bcrypt.generate_password_hash(contraseña).decode('utf-8')

        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    INSERT INTO Usuario (nombre, email, contraseña, fecha_registro)
                    VALUES (%s, %s, %s, %s)
                """, (nombre, email, hashed_password, date.today()))
                connection.commit()
            # Guardar el email en la sesión después del registro exitoso
                session['user_email'] = email
            return redirect(url_for('user_bp.register2'))
        except Exception as e:
            return str(e)

    return render_template('register.html')

@user_bp.route('/register2', methods=['GET', 'POST'])
def register2():
    # Verificar si el usuario completó el primer paso de registro
    if 'user_email' not in session:
        return redirect(url_for('user_bp.register'))

    if request.method == 'POST':
        accion = request.form.get('accion')

        if accion == 'encuesta':
            return redirect(url_for('user_bp.encuesta'))
        
        elif accion == 'saltar':
            return redirect(url_for('user_bp.login'))

    return render_template('register2.html')


@user_bp.route('/encuesta', methods=['GET', 'POST'])
def encuesta():
    if request.method == 'POST':
        # Procesar formulario
        distracciones = [request.form.get(f'distraccion_{i}') for i in range(3)]
        objetivo = request.form.get('objetivo')
        try:
            connection = current_app.connection
            with connection.cursor() as cursor:
                # Guardar las distracciones seleccionadas
                for distraccion in distracciones:
                    if distraccion:
                        cursor.execute("""INSERT INTO Usuario_has_Distracciones 
                            (Usuario_id_usuario, Distracciones_idDistracciones) 
                            VALUES (%s, %s)
                        """, (session['id_usuario'], distraccion))
                
                # Guardar el objetivo de estudio
                cursor.execute("""UPDATE Usuario SET idObjetivoEstudio = %s WHERE id_usuario = %s""", (objetivo, session['id_usuario']))
            return redirect(url_for('user_bp.profile'))
        except Exception as e:
            # Manejar errores de base de datos
            return str(e)
            
    return render_template('encuesta.html')

# PERFIL
@user_bp.route('/profile')
def profile():
    email = session.get('user_email')
    if not email:
        return redirect(url_for('user_bp.login'))

    connection = current_app.connection
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT nombre, email, fecha_registro FROM Usuario WHERE email=%s", (email,))
            user = cursor.fetchone()
            if not user:
                return "Usuario no encontrado."
    except Exception as e:
        return str(e)

    return render_template('profile.html', user=user)
