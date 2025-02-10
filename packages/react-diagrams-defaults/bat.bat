@echo off
time /T
npm run clean & npx tsc & npm run build & xcopy C:\build_diagrams\build_sa\packages\react-diagrams-defaults\dist\ "C:\build_diagrams\projectStormClone\react-diagrams-defaults\dist" /i /s /y & cd C:\build_diagrams\projectStormClone & git add . & git commit -m "init...." & git push & cd C:\Users\mario\OneDrive\Escritorio\work\proyectos\STELA-UI-NUEVO & rmdir /s /q node_modules & yarn install & yarn upgrade @projectstorm &  npm run start 
time /T 