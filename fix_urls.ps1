$files = Get-ChildItem -Path "c:\xampp\htdocs\salem-connect\src" -Recurse -Include "*.tsx","*.ts"
foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    if ($content -match "http://localhost/salem-connect/backend") {
        $updated = $content -replace "http://localhost/salem-connect/backend", "/backend"
        [System.IO.File]::WriteAllText($file.FullName, $updated, [System.Text.Encoding]::UTF8)
        Write-Host "Updated: $($file.Name)"
    }
}
Write-Host "Done."
