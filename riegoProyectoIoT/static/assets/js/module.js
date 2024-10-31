'use strict'

export const weekDayNames = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
];

export const monthNames = [
"enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];

export const getDate = function(dateUnix, timezone){
    const date = new Date((dateUnix + timezone)*1000);
    const weekDayName = weekDayNames[date.getUTCDay()];
    const monthName = monthNames[date.getUTCMonth()];

    return `${weekDayName} ${date.getUTCDate()}, ${monthName}`;
}

/**
 *
 * @param {number} timeUnix
 * @param {number} timezone
 * @returns {s}
 *
 *
 */

export const getTime = function (timeUnix, timezone){
    const date = new Date((timeUnix + timezone)*1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const period = hours >= 12 ? "PM" : "AM";

    return `${hours % 12 || 12}: ${minutes} ${period}`
}

/**
 *
 * @param {number} timeUnix
 * @param {number} timezone
 * @returns {s}
 *
 *
 */

export const getHours = function (timeUnix, timezone){
    const date = new Date((timeUnix + timezone)*1000);
    const hours = date.getUTCHours();
    const period = hours >= 12 ? "PM" : "AM";

    return `${hours % 12 || 12} ${period}`
}
/**
 *
 * @param {number} mps
 * @returns {number}
 */
export const mps_to_kmh = mps => {
    const mph = mps * 3600;
    return mph /1000;
}

export const aqiText = {
    1:{
        level: "bueno",
        message: "El aire es considerado satisfactorio, y el aire no esta contaminado"
    },
    2:{
        level: "bajo",
        message:"El aire no es aceptable existe residuos de contaminacion en el aire"
    },
    3:{
        level: "moderado",
        message:"El aire no es aceptable existe residuos de contaminacion en el aire"
    },
    4:{
        level: "alto",
        message:"El aire no es aceptable existe residuos de contaminacion en el aire"
    },
    5:{
        level: "muy alto",
        message:"El aire no es aceptable existe residuos de contaminacion en el aire"
    },
}