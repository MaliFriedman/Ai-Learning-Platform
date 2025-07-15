export function isValidName(name: any): boolean {
    return typeof name === "string" && name.trim().length >= 2 && name.trim().length <= 30;
  }
  
  export function isValidPhone(phone: any): boolean {
    return typeof phone === "string" && /^\+?\d{9,15}$/.test(phone.trim());
  }
  
  export function isValidId(id: any): boolean {
    return typeof id === "string" && /^\d{5,15}$/.test(id.trim());
  }
  