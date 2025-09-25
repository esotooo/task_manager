export const passwordRequirements = [
    { test: /.{8,}/, label: 'Mínimo 8 caracteres.' },
    { test: /[A-Z]/, label: 'Al menos una mayúscula.' },
    { test: /[a-z]/, label: 'Al menos una minúscula.' },
    { test: /\d/, label: 'Al menos un número.' },
    { test: /[^A-Za-z0-9]/, label: 'Al menos un carácter especial.' }
]