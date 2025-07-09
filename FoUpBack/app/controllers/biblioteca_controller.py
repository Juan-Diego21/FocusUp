from flask import Blueprint, render_template, request, redirect, url_for, current_app, flash,session
from flask_bcrypt import Bcrypt
import os
from werkzeug.utils import secure_filename

#Creamos el blueprint

biblioteca_bp = Blueprint('biblioteca_bp', __name__)
#Cifrar contraseñas
bcrypt = Bcrypt()

#get recivir
#post eviar datos 

@biblioteca_bp.route('/biblioteca', methods=['GET', 'POST'])
def mostrar_biblioteca():
    return render_template('biblioteca.html')

@biblioteca_bp.route('/biblioteca/pomodoro', methods=['GET', 'POST'])
def metodo_pomodoro():
    return render_template('metoPomodoro.html')

 

