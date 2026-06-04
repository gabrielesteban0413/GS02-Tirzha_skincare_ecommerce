import os

ruta_proyecto = r"C:\Users\Sanch\Downloads\REPO\GS02-Tirzha_skincare_ecommerce"

excluir = {
    'node_modules', '.next', '.turbo', '.git', 'dist',
    '__pycache__', '.pnpm', '.prisma', 'migrations'
}

def obtener_icono(archivo):
    ext = archivo.split('.')[-1] if '.' in archivo else ''
    iconos = {
        'ts': '', 'js': '', 'tsx': '⚛️', 'jsx': '⚛️',
        'json': '{}', 'css': '🎨', 'prisma': '🗄️', 'sql': '🗄️',
        'yaml': '⚙️', 'yml': '⚙️', 'env': '⚙️', 'md': '📝', 'sh': '🔧',
    }
    return iconos.get(ext, '📄')

def generar_esquema():
    with open('esquema_proyecto.txt', 'w', encoding='utf-8') as f:
        f.write("ESTRUCTURA COMPLETA DEL PROYECTO\n")
        f.write("Ruta: " + ruta_proyecto + "\n")
        f.write("=" * 80 + "\n\n")

        for root, dirs, files in os.walk(ruta_proyecto):
            dirs[:] = sorted([d for d in dirs if d not in excluir and not d.startswith('.')])
            files = sorted([f for f in files if not f.startswith('.')])

            nivel = root.replace(ruta_proyecto, '').count(os.sep)
            indentacion = '│   ' * nivel
            nombre_carpeta = os.path.basename(root) or 'GS02-Tirzha_skincare_ecommerce'

            if nivel == 0:
                f.write(f"📁 {nombre_carpeta}/\n")
            else:
                f.write(f"{indentacion[:-4]}├── 📁 {nombre_carpeta}/\n")

            subindentacion = '│   ' * (nivel + 1)
            for archivo in files:
                icono = obtener_icono(archivo)
                f.write(f"{subindentacion[:-4]}├── {icono} {archivo}\n")

        f.write("\n" + "=" * 80 + "\n")
        f.write("TOTAL ARCHIVOS: " + str(sum(1 for _ in open('esquema_proyecto.txt', encoding='utf-8') if _ and not _.startswith('=') and not _.startswith('ESTRUCTURA') and not _.startswith('Ruta:'))))
        f.write("\n" + "=" * 80 + "\n")

    print("✅ Esquema generado: esquema_proyecto.txt")

if __name__ == "__main__":
    if not os.path.exists(ruta_proyecto):
        print(f"❌ Ruta no encontrada: {ruta_proyecto}")
    else:
        generar_esquema()