

class Usuarios {
    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala };
        this.personas.push(persona);

        return this.personas;
    }

    getPersona(id) {
        // Regresa sólo la posición 0, de todos los ids que tienen coincidencia con el mandado
        let persona = this.personas.filter(persona => persona.id === id)[0];
        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => persona.sala === sala);
        return personasEnSala;
    }

    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);

        // Devuelve un nuevo arreglo el cual ya no tiene el id que mandamos
        this.personas = this.personas.filter(persona => persona.id !== id);

        return personaBorrada;
    }
}

module.exports = {
    Usuarios
}