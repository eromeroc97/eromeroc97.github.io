<?php
// Obtener la fecha del último commit en el formato deseado
$lastUpdate = shell_exec('git log -1 --format=%cd --date=iso');
echo htmlspecialchars($lastUpdate);
?>
