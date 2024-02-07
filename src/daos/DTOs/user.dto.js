// UserDTO.js
class UserDTO {
    constructor(name, lastName, email, password, birthDate, phone) {
      this.name = name;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.birthDate = birthDate;
      this.phone = phone;
    }
  
    validate() {
      // Realiza validaciones aquí, por ejemplo:
      if (!this.name || !this.lastName || !this.email || !this.password || !this.birthDate) {
        throw new Error('Los campos obligatorios no pueden estar vacíos.');
      }
  
      // Puedes agregar más validaciones según tus requisitos.
    }
  
    toObject() {
      // Puedes formatear o transformar los datos según sea necesario
      return {
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        birthDate: this.birthDate,
        phone: this.phone,
        rol: 'usuario', // Asignamos el rol por defecto
      };
    }
  }
  
  export default UserDTO;