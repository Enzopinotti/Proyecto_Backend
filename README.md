# Proyecto Backend — Ecommerce (histórico)

Backend de aprendizaje construido con **Node.js, Express y MongoDB** para practicar una arquitectura ecommerce con autenticación, sesiones, API REST, carritos, productos, categorías, usuarios, mensajería y documentación Swagger.

Este repositorio se conserva como **antecedente histórico** dentro de la evolución que más adelante desembocó en la línea Meow Matrix. No es la autoridad moderna del ecommerce actual y no debe confundirse con [`MeowMatrix---Backend-2v`](https://github.com/Enzopinotti/MeowMatrix---Backend-2v), que es el backend mantenido y modernizado en 2026.

## Qué contiene

La implementación histórica incluye, entre otros conceptos:

- Express;
- MongoDB;
- autenticación local y OAuth con GitHub;
- sesiones persistidas con Mongo;
- JWT;
- rutas de productos, categorías, carritos, usuarios, sesiones y mensajes;
- Swagger/OpenAPI;
- Docker y material de experimentación de infraestructura.

## Ejecución histórica

Requiere Node.js y una instancia de MongoDB/Atlas.

```bash
npm install
npm start
```

La aplicación espera configuración local mediante variables de entorno para MongoDB, sesión/JWT y OAuth. **No se deben versionar valores reales ni reutilizar credenciales históricas.**

## Relación con Meow Matrix

Durante la auditoría de portfolio 2026 se trató este repositorio como parte de la misma genealogía técnica que:

- [`Meow-Matrix---Frontend`](https://github.com/Enzopinotti/Meow-Matrix---Frontend)
- [`MeowMatrix---Backend-2v`](https://github.com/Enzopinotti/MeowMatrix---Backend-2v)

La conclusión actual es simple:

- este repositorio conserva valor histórico y educativo;
- Meow Matrix 2026 es la autoridad moderna para el showcase ecommerce full-stack;
- no corresponde mantener dos backends paralelos fingiendo que ambos son producción;
- cualquier modernización futura de este repo debe enfocarse en preservación, seguridad e higiene, no en duplicar Meow.

## Deuda/higiene conocida

La auditoría central detectó artefactos de infraestructura y archivos generados que no deberían considerarse autoridad de código actual, incluyendo binarios/logs históricos. La estrategia correcta es removerlos de la rama mantenida cuando este repo tenga su carril dedicado, **sin reescribir ni borrar el valor del historial Git**.

También deben revisarse antes de cualquier reutilización:

- dependencias y runtime;
- manejo histórico de contraseñas/sesiones/JWT;
- variables de entorno y credenciales antiguas;
- tests que realmente sigan representando comportamiento válido;
- assets Docker/Kubernetes como material de aprendizaje vs. infraestructura operativa.

## Estado en el portfolio

**Clasificación:** backend/full-stack histórico con lineage resuelto.

**Tratamiento:** preservar y documentar; no convertirlo en un segundo ecommerce moderno.

Portfolio coordination: [`Enzopinotti/Enzopinotti#19`](https://github.com/Enzopinotti/Enzopinotti/issues/19)

## Autor

Enzo Daniel Pinotti
