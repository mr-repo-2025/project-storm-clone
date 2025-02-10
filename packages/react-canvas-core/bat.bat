@echo off
time /T
npm run clean & npx tsc & npm run build & xcopy C:\build_diagrams\build_sa\packages\react-canvas-core\dist\ "C:\build_diagrams\projectStormClone\react-canvas-core\dist" /i /s /y & cd C:\build_diagrams\projectStormClone & git add . & git commit -m "init...." & git push & cd C:\Users\mario\OneDrive\Escritorio\work\proyectos\test\STELA-UI imple new diag & rmdir /s /q node_modules & yarn install & yarn upgrade @projectstorm &  npm run start 
time /T 