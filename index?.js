const scrapper = require('./scrapper')

const handleFiles = (files) => scrapper(files)

module.exports = () => `
<!DOCTYPE html>
<!-- xlsx.js (C) 2013-present  SheetJS http://sheetjs.com -->
<!-- vim: set ts=2: -->
<html>
  <head>
    <title>SheetJS Live Grid Demo</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="icon" type="image/png" href="assets/img/logo.png" />
    <link rel="stylesheet" href="assets/css/sheetjs.css">
  </head>
  <body>
    <script src="assets/vendor/alertify.js"></script>
    <script src="//unpkg.com/canvas-datagrid/dist/canvas-datagrid.js"></script>

    <link rel="stylesheet" media="screen" href="assets/vendor/samples.css">
    <link rel="stylesheet" media="screen" href="assets/vendor/alertify.css">

    <div id="body">
      <div id="left">
        <div id="logo">
          <a href="http://sheetjs.com"><img src="assets/img/logo.png" class="logo" alt="SheetJS Logo" width=128px height=128px /></a>
        </div>
      <div id="drop">Drop a file here</div>
      <input type="file" id="file" value=""/><label for="file">... or click here to select a file</label>
      <h3> Choose a worksheet:</h3>
      <div id="buttons"></div>
    </div>

    <script src="assets/js/shim.js"></script>
    <script src="//unpkg.com/xlsx/dist/xlsx.full.min.js"></script>
    <script src="assets/js/dropsheet.js"></script>
    <script src="assets/js/main.js"></script>

    <script src="assets/vendor/spin.js"></script>
  </body>
</html>
`