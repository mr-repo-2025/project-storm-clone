@echo off
time /T
npm run clean & npx tsc & npm run build  
time /T 