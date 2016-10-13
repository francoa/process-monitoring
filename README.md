# process-monitoring

# Lista de requisitos
- Separar Admin de Monitor
- Instalador y exe de ejecución

Para el Admin:
- Crear, modificar y borrar recetas (BDD)
- Visualizar gráficos y estadísticas de procesos finalizados
- Monitorear proceso Monitor
- Evitar la modificación de recetas una vez se hayan empezado a usar (?)

Para el Monitor:
- Seleccionar receta
- Iniciar proceso
- Lectura de USB (temperatura)
- Temporizadores (para las etapas del proceso)
- Alertas visuales y sonoras
- Progreso del proceso (barra de progreso?)
- Avance manual del proceso (indicación que las acciones requeridas fueron realizadas)
- Loggeo de datos

# Desafíos técnicos
- Arquitectura? Propuesta: cliente-servidor (con el objetivo de tener varios clientes monitoreando el proceso)
- Base de datos?
- Tecnología? (Polymer?)
