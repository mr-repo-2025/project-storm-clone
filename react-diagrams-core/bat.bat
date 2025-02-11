@echo off
time /T
npm run clean & npx tsc & npm run build & cd C:\build_diagrams\projectStormClone & git add . & git commit -m "change" & git push 
& cd C:\Users\mario\OneDrive\Escritorio\work\proyectos\STELA-UI-NUEVO & rmdir /s /q node_modules & yarn install & yarn upgrade @projectstorm &  npm run start 
time /T 