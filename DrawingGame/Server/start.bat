:: Disable Command Printing
@echo off
:: Restart
taskkill /im node.exe
start node server.js