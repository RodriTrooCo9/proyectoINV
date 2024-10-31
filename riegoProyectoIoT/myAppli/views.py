from django.shortcuts import render
from django.http import JsonResponse
import serial

def index(request):
    return render(request, 'mi_app/index.html')

def conectar_arduino():
    try:
        return serial.Serial('COM4', 9600, timeout=1)
    except serial.SerialException as e:
        print("Error al conectar con el Arduino:", e)
        return None

def control_dispositivo(request, dispositivo):
    ser = conectar_arduino()
    if ser is None:
        return JsonResponse({'status': 'error', 'message': 'Arduino no encontrado'})

    if request.method == 'POST':
        action = request.POST.get('action')
        try:
            if dispositivo == 'riego':
                ser.write(b'r' if action == 'on' else b's')  # Enciende o apaga el riego
            elif dispositivo == 'ventilador':
                ser.write(b'v' if action == 'on' else b't')  # Enciende o apaga el ventilador
            return JsonResponse({'status': 'success'})
        except serial.SerialException as e:
            return JsonResponse({'status': 'error', 'message': 'Error al comunicar con el Arduino', 'detail': str(e)})

    return JsonResponse({'status': 'error', 'message': 'Invalid method'})

def control_riego(request):
    return control_dispositivo(request, 'riego')

def control_ventilador(request):
    return control_dispositivo(request, 'ventilador')

def get_temperatura(request):
    ser = conectar_arduino()
    if ser is None:
        return JsonResponse({'status': 'error', 'message': 'Arduino no encontrado'})

    try:
        ser.write(b'T')  # Envía un comando para obtener temperatura
        temperatura = ser.readline().decode('utf-8').strip()
        return JsonResponse({'temperatura': temperatura})
    except serial.SerialException as e:
        return JsonResponse({'status': 'error', 'message': 'Error al comunicar con el Arduino', 'detail': str(e)})
