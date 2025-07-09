from flask import Blueprint, render_template, request, redirect, url_for, current_app, flash,session
from flask_bcrypt import Bcrypt
import os
from werkzeug.utils import secure_filename

#Creamos el blueprint

sonidos_bp = Blueprint('sonidos_bp', __name__)
#Cifrar contraseñas
bcrypt = Bcrypt()

#get recivir
#post eviar datos 

@sonidos_bp.route('/sonidos', methods=['GET', 'POST'])
def sonidos():
    return render_template('sonidos.html')

 
